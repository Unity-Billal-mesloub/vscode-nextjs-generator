import pLimit from 'p-limit';
import { ProviderResult, ThemeIcon, TreeDataProvider, TreeItem } from 'vscode';

import { ListFilesController } from '../controllers';
import { singularize, titleize } from '../helpers';
import { NodeModel } from '../models';
import { TreeRefreshBase } from './tree-refresh-base';

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
export class ListFilesProvider
  extends TreeRefreshBase<NodeModel>
  implements TreeDataProvider<NodeModel>
{
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties
  /**
   * The cached nodes.
   * @type {NodeModel[] | undefined}
   * @private
   * @memberof ListFilesProvider
   * @example
   * this._cachedNodes = undefined;
   */
  private _cachedNodes: NodeModel[] | undefined = undefined;

  /**
   * The cache promise.
   * @type {Promise<NodeModel[] | undefined> | undefined}
   * @private
   * @memberof ListFilesProvider
   * @example
   * this._cachePromise = undefined;
   */
  private _cachePromise: Promise<NodeModel[] | undefined> | undefined =
    undefined;

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

    if (this._cachedNodes) {
      return this._cachedNodes;
    }

    if (this._cachePromise) {
      return this._cachePromise;
    }

    this._cachePromise = this.getListFiles().then((nodes) => {
      this._cachedNodes = nodes;
      this._cachePromise = undefined;
      return nodes;
    });

    return this._cachePromise;
  }

  /**
   * Refreshes the tree data by firing the event.
   *
   * @function refresh
   * @public
   * @returns {void} - No return value
   */
  refresh(): void {
    this._cachedNodes = undefined;
    this._cachePromise = undefined;
    super.refresh();
  }

  /**
   * Disposes the provider.
   *
   * @function dispose
   * @public
   * @memberof ListFilesProvider
   * @example
   * provider.dispose();
   *
   * @returns {void} - No return value
   */
  dispose(): void {
    super.dispose();
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

    const fileTypes = ListFilesController.config.watch;

    const limit = pLimit(2);

    const groups = await Promise.all(
      fileTypes.map((type) =>
        limit(async () => {
          const suffix = `${singularize(type)}`;

          const children = files.filter((file) =>
            file.label.toString().includes(suffix),
          );

          if (children.length === 0) {
            return;
          }

          return new NodeModel(
            `${titleize(type)}: ${children.length}`,
            new ThemeIcon('folder-opened'),
            undefined,
            undefined,
            type,
            children,
          );
        }),
      ),
    );

    return groups.filter((node): node is NodeModel => node !== undefined);
  }
}
