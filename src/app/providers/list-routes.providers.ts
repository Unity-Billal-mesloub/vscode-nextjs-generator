import {
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  workspace,
} from 'vscode';
import { TreeRefreshBase } from './tree-refresh-base';

import { EXTENSION_ID } from '../configs';
import { ListFilesController } from '../controllers';
import { NodeModel } from '../models';

/**
 * The ListRoutesProvider class
 *
 * @class
 * @classdesc The class that represents the list of files provider.
 * @export
 * @public
 * @implements {TreeDataProvider<NodeModel>}
 * @property {EventEmitter<NodeModel | undefined | null | void>} _onDidChangeTreeData - The onDidChangeTreeData event emitter
 * @property {Event<NodeModel | undefined | null | void>} onDidChangeTreeData - The onDidChangeTreeData event
 * @property {ListFilesController} controller - The list of files controller
 */
export class ListRoutesProvider
  extends TreeRefreshBase<NodeModel>
  implements TreeDataProvider<NodeModel>
{
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ListRoutesProvider class
   *
   * @constructor
   * @public
   */
  constructor() {
    super();
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Returns the tree item for the supplied element.
   *
   * @function getTreeItem
   * @param {NodeModel} element - The element
   * @public
   * @returns {TreeItem | Thenable<TreeItem>} - The tree item
   */
  getTreeItem(element: NodeModel): TreeItem | Thenable<TreeItem> {
    return element;
  }

  /**
   * Returns the children for the supplied element.
   *
   * @function getChildren
   * @param {NodeModel} [element] - The element
   * @public
   * @returns {ProviderResult<NodeModel[]>} - The children
   */
  getChildren(element?: NodeModel): ProviderResult<NodeModel[]> {
    if (element) {
      return element.children;
    }

    return this.getListRoutes();
  }

  // Private methods
  /**
   * Returns the list of route nodes with their children.
   * @private
   * @returns {Promise<NodeModel[] | undefined>} List of route nodes or undefined if none exist.
   */
  private async getListRoutes(): Promise<NodeModel[] | undefined> {
    const allFiles = await ListFilesController.getFiles();

    if (!allFiles) {
      return;
    }

    for (const file of allFiles) {
      const document = await workspace.openTextDocument(
        file.resourceUri?.path ?? '',
      );

      // Create an array of line nodes for each file
      const lineNodes = Array.from(
        { length: document.lineCount },
        (_, index) => {
          const line = document.lineAt(index);

          // Create a route node for each line that matches the pattern
          let routeNode: NodeModel | undefined;

          if (line.text.match(/:[\w\s]+procedure/gi)) {
            routeNode = new NodeModel(
              line.text.trim(),
              new ThemeIcon('symbol-method'),
              {
                command: `${EXTENSION_ID}.list.gotoLine`,
                title: line.text,
                arguments: [file.resourceUri, index],
              },
            );
          }

          return routeNode;
        },
      );

      // Set the children of the file to the line nodes
      file.setChildren(
        lineNodes.filter((child) => child !== undefined) as NodeModel[],
      );
    }

    // Filter the files to only include those with children
    const routeNodes = allFiles.filter(
      (file) => file.children && file.children.length !== 0,
    );

    // Return the route nodes, or undefined if none exist
    return routeNodes.length > 0 ? routeNodes : undefined;
  }
}
