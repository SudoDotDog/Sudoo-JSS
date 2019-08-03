/**
 * @author WMXPY
 * @namespace Style
 * @description Register
 */

import jss from "jss";
import jssPresetDefault from "jss-preset-default";

export class Register {

    public static register(): void {

        if (!this._instance) {
            this._instance = new Register();

            jss.setup(jssPresetDefault());
        }

        return;
    }

    private static _instance: Register;

    private constructor() { }
}
