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
 * The ListComponentsProvider class
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
export class ListComponentsProvider
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
   * Constructor for the ListComponentsProvider class
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

    return this.getListComponents();
  }

  // Private methods
  /**
   * Returns the list of component nodes with their children.
   * @private
   * @returns {Promise<NodeModel[] | undefined>} List of component nodes or undefined if none exist.
   */
  private async getListComponents(): Promise<NodeModel[] | undefined> {
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

          // Create a node for each line that matches the pattern
          let componentNode: NodeModel | undefined;

          if (line.text.match(/:[\w\s]+procedure/gi)) {
            componentNode = new NodeModel(
              line.text.trim(),
              new ThemeIcon('symbol-method'),
              {
                command: `${EXTENSION_ID}.list.gotoLine`,
                title: line.text,
                arguments: [file.resourceUri, index],
              },
            );
          }

          return componentNode;
        },
      );

      // Set the children of the file to the line nodes
      file.setChildren(
        lineNodes.filter((child) => child !== undefined) as NodeModel[],
      );
    }

    // Filter the files to only include those with children
    const componentNodes = allFiles.filter(
      (file) => file.children && file.children.length !== 0,
    );

    // Return the component nodes, or undefined if none exist
    return componentNodes.length > 0 ? componentNodes : undefined;
  }
}
