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

    private constructor(prefix: string) {

        this._prefix = prefix;
        this._managers = new Map();
    }

    public hydrate(meta: string, base: Styles): StyleManager {

        const manager: StyleManager = StyleManager.create(base, meta, this._prefix);
        this._managers.set(meta, manager);

        return manager;
    }

    public renderSting(): string {

        const reg: SheetsRegistry = new SheetsRegistry();
        for (const key of this._managers.keys()) {
            const manager: StyleManager = this._managers.get(key) as StyleManager;
            reg.add(manager.sheet());
        }

        return reg.toString();
    }
}
