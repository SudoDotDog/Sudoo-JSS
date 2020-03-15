/**
 * @author WMXPY
 * @namespace Style
 * @description Collection
 */

import { Styles } from "jss";
import { StyleManager } from "./style";

export class StyleCollection {

    public static create(prefix: string): StyleCollection {

        return new StyleCollection(prefix);
    }

    private readonly _prefix: string;
    private readonly _managers: StyleManager[];

    private constructor(prefix: string) {

        this._prefix = prefix;
        this._managers = [];
    }

    public hydrate(base: Styles, meta: string) {


    }
}
