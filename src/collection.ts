/**
 * @author WMXPY
 * @namespace Style
 * @description Collection
 */

import { SheetsRegistry, Styles } from "jss";
import { StyleManager } from "./style";

export class StyleCollection {

    public static create(prefix: string): StyleCollection {

        const collection: StyleCollection = new StyleCollection(prefix);
        this._collections.set(prefix, collection);

        return collection;
    }

    public static getCollectionMap(): Map<string, StyleCollection> {

        return this._collections;
    }

    public static getCollections(): StyleCollection[] {

        return [...this._collections.values()];
    }

    public static renderCombinedString(): string {

        return this.getCollections()
            .map((collection: StyleCollection) => collection.renderSting())
            .join('');
    }

    public static renderCombinedStyleTagString(id: string): string {

        const content: string = this.renderCombinedString();
        return `<style id="${id}">${content}</style>`;
    }

    public static flushCombinedStyleTagString(id: string): string {

        const collections: StyleCollection[] = this.getCollections();
        const strings: string[] = [];
        for (const collection of collections) {
            const content: string = collection.renderSting();
            collection.resetAttachment();
            strings.push(content);
        }

        return `<style id="${id}">${strings.join('')}</style>`;
    }

    private static readonly _collections: Map<string, StyleCollection> = new Map();

    private readonly _prefix: string;
    private readonly _managers: Map<string, StyleManager>;

    private _attached: string[];

    private constructor(prefix: string) {

        this._prefix = prefix;
        this._attached = [];
        this._managers = new Map();
    }

    public hydrate(meta: string, base: Styles): StyleManager {

        if (this._managers.has(meta)) {
            throw new Error('[Sudoo-JSS] Meta duplicated');
        }

        const manager: StyleManager = StyleManager
            .create(base, meta, this._prefix)
            .setOnAttach(() => {
                this._attached.push(meta);
            });

        this._managers.set(meta, manager);
        return manager;
    }

    public renderSting(): string {

        const reg: SheetsRegistry = new SheetsRegistry();
        for (const key of this._attached) {
            const manager: StyleManager = this._managers.get(key) as StyleManager;
            reg.add(manager.sheet());
        }

        return reg.toString();
    }

    public renderStyleTagSting(id: string): string {

        const content: string = this.renderSting();
        return `<style id="${id}">${content}</style>`;
    }

    public flushStyleTagSting(id: string): string {

        const result: string = this.renderStyleTagSting(id);
        this.resetAttachment();

        return result;
    }

    public resetAttachment(): this {

        this._attached = [];
        return this;
    }
}
