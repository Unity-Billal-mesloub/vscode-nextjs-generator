import pLimit from 'p-limit';
import {
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  workspace,
} from 'vscode';

import { EXTENSION_ID } from '../configs';
import { ListFilesController } from '../controllers';
import { NodeModel } from '../models';
import { TreeRefreshBase } from './tree-refresh-base';

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
  /**
   * The cached nodes.
   * @type {NodeModel[] | undefined}
   * @private
   * @memberof ListComponentsProvider
   * @example
   * this._cachedNodes = undefined;
   */
  private _cachedNodes: NodeModel[] | undefined = undefined;

  /**
   * The cache promise.
   * @type {Promise<NodeModel[] | undefined> | undefined}
   * @private
   * @memberof ListComponentsProvider
   * @example
   * this._cachePromise = undefined;
   */
  private _cachePromise: Promise<NodeModel[] | undefined> | undefined =
    undefined;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ListComponentsProvider class
   *
   * @constructor
   * @public
   * @memberof ListComponentsProvider
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

    if (this._cachedNodes) {
      return this._cachedNodes;
    }

    if (this._cachePromise) {
      return this._cachePromise;
    }

    this._cachePromise = this.getListComponents().then((nodes) => {
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
   * @memberof ListComponentsProvider
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
   * Returns the list of component nodes with their children.
   * @private
   * @returns {Promise<NodeModel[] | undefined>} List of component nodes or undefined if none exist.
   */
  private async getListComponents(): Promise<NodeModel[] | undefined> {
    const allFiles = await ListFilesController.getFiles();

    if (!allFiles) {
      return [];
    }

    const componentRegex = /<\/?([A-Z][A-Za-z0-9_]*)\b/;
    const limit = pLimit(2);

    await Promise.all(
      allFiles.map((file) =>
        limit(async () => {
          if (!file.resourceUri) {
            file.setChildren([]);
            return;
          }

          try {
            const document = await workspace.openTextDocument(
              file.resourceUri.fsPath,
            );
            const children: NodeModel[] = [];

            for (let i = 0; i < document.lineCount; i++) {
              const text = document.lineAt(i).text;
              const match = componentRegex.exec(text);
              if (match) {
                const componentName = match[1]?.trim() || '';

                if (componentName) {
                  children.push(
                    new NodeModel(
                      componentName,
                      new ThemeIcon('symbol-method'),
                      {
                        command: `${EXTENSION_ID}.list.gotoLine`,
                        title: componentName,
                        arguments: [file.resourceUri, i],
                      },
                    ),
                  );
                }
              }
            }

            file.setChildren(children);
          } catch (err) {
            console.error(
              `Error reading file ${file.resourceUri?.fsPath}:`,
              err instanceof Error ? err.message : String(err),
            );

            file.setChildren([]);
          }
        }),
      ),
    );

    return allFiles.filter((file) => file.children?.length! > 0);
  }
}
