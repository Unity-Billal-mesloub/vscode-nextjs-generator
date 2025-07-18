import { Event, EventEmitter } from 'vscode';

/**
 * Base class to encapsulate refresh event logic for TreeDataProvider-based providers.
 */
export abstract class TreeRefreshBase<T> {
  /**
   * The onDidChangeTreeData event emitter.
   * @private
   */
  private _onDidChangeTreeData: EventEmitter<T | undefined | null | void>;

  /**
   * The onDidChangeTreeData event.
   * @public
   */
  readonly onDidChangeTreeData: Event<T | undefined | null | void>;

  /**
   * Constructor for the TreeRefreshBase class.
   * Initializes the event emitter and sets up the onDidChangeTreeData event.
   */
  constructor() {
    this._onDidChangeTreeData = new EventEmitter<T | undefined | null | void>();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  /**
   * Disposes the event emitter.
   */
  dispose(): void {
    this._onDidChangeTreeData.dispose();
  }

  /**
   * Refreshes the tree data by firing the event.
   */
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
