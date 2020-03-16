/**
 * @author WMXPY
 * @namespace Style
 * @description Collection
 */

import { SheetsRegistry, Styles } from "jss";
import { StyleManager } from "./style";

export class StyleCollection {

    public static create(prefix: string): StyleCollection {

        return new StyleCollection(prefix);
    }

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

        const content: string = this.renderSting();
        this.resetAttachment();

        return `<style id="${id}">${content}</style>`;
    }

    public resetAttachment(): this {

        this._attached = [];
        return this;
    }
}
