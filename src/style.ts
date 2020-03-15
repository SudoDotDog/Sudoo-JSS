/**
 * @author WMXPY
 * @namespace Style
 * @description Style
 */

import jss, { Classes, Styles, StyleSheet } from "jss";

export class StyleManager {

    public static create(base: Styles, meta: string, prefix?: string) {

        return new StyleManager(base, meta, prefix);
    }

    private readonly _base: Styles;
    private readonly _meta: string;

    private _prefix: string;
    private _sheet: StyleSheet<string | number | symbol> | null;

    private _onAttach?: () => void;

    private constructor(base: Styles, meta: string, prefix?: string) {

        this._base = base;
        this._meta = meta;
        this._sheet = null;

        this._prefix = prefix || '';
    }

    public setPrefix(prefix: string): this {

        this._prefix = prefix;
        return this;
    }

    public setOnAttach(onAttach: () => void): this {

        this._onAttach = onAttach;
        return this;
    }

    public use(): Classes {

        const sheet: StyleSheet = this._getAttached();
        if (this._onAttach) {
            this._onAttach();
        }

        return sheet.classes;
    }

    public keyframe(): Classes {

        const sheet: StyleSheet = this._getAttached();
        return sheet.keyframes;
    }

    public sheet(): StyleSheet {

        return this._getAttached();
    }

    private _getAttached(): StyleSheet<string | number | symbol> {

        if (this._sheet) {
            return this._sheet;
        }

        this._sheet = jss.createStyleSheet(this._base, {
            meta: `${this._prefix}${this._meta}`,
        }).attach();

        return this._sheet as StyleSheet<string | number | symbol>;
    }
}
