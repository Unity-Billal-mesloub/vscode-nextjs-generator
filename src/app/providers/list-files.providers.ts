import {
  Event,
  EventEmitter,
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
} from 'vscode';

import { ListFilesController } from '../controllers';
import { singularize, titleize } from '../helpers';
import { NodeModel } from '../models';

/**
 * The ListFilesProvider class
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
export class ListFilesProvider implements TreeDataProvider<NodeModel> {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  /**
   * The onDidChangeTreeData event emitter.
   * @type {EventEmitter<NodeModel | undefined | null | void>}
   * @private
   */
  private _onDidChangeTreeData: EventEmitter<
    NodeModel | undefined | null | void
  >;

  /**
   * The onDidChangeTreeData event.
   * @type {Event<NodeModel | undefined | null | void>}
   * @public
   */
  readonly onDidChangeTreeData: Event<NodeModel | undefined | null | void>;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ListFilesProvider class
   *
   * @constructor
   * @public
   * @param {ListFilesController} controller - The list of files controller
   */
  constructor(readonly controller: ListFilesController) {
    this._onDidChangeTreeData = new EventEmitter<
      NodeModel | undefined | null | void
    >();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
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

    return this.getListFiles();
  }

  /**
   * Refreshes the tree data.
   *
   * @function refresh
   * @public
   */
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  // Private methods
  /**
   * Gets the list of file type nodes with their children.
   * @private
   * @returns {Promise<NodeModel[] | undefined>} List of file type nodes or undefined if none exist.
   */
  private async getListFiles(): Promise<NodeModel[] | undefined> {
    const files = await ListFilesController.getFiles();

    if (!files) {
      return;
    }

    // Use descriptive variable names for clarity
    const fileTypeNodes: NodeModel[] = [];

    const fileTypes = ListFilesController.config.watch;

    for (const fileType of fileTypes) {
      const filesOfType = files.filter((file) =>
        file.label.toString().includes(`${singularize(fileType)}`),
      );

      if (filesOfType.length !== 0) {
        const typeNode = new NodeModel(
          `${fileType}: ${filesOfType.length}`,
          new ThemeIcon('folder-opened'),
          undefined,
          undefined,
          fileType,
          filesOfType,
        );

        fileTypeNodes.push(typeNode);
      }
    }

    if (fileTypeNodes.length === 0) {
      return;
    }

    return fileTypeNodes;
  }
}
