/**
 * @author WMXPY
 * @namespace Style
 * @description Register
 */

import jss from "jss";
import jssPresetDefault from "jss-preset-default";

export type RegisterOptions = {

    readonly serverSideStyleIds?: string[];
};

export class Register {

    public static register(options: RegisterOptions = {}): Register {

        if (this._instance) {
            return this._instance;
        }

        jss.setup(jssPresetDefault());

        this._instance = new Register(options);
        this._instance.removeServerSideStyles();

        return this._instance;
    }

    public static setup(): void {

        jss.setup(jssPresetDefault());
        return;
    }

    private static _instance: Register;

    private _options: RegisterOptions;

    private constructor(options: RegisterOptions) {

        this._options = options;
    }

    public removeServerSideStyles() {

        if (!this._options.serverSideStyleIds) {
            return;
        }

        for (const id of this._options.serverSideStyleIds) {
            const element: HTMLElement | null = document.getElementById(id);
            if (element) {
                element.remove();
            }
        }
    }
}
