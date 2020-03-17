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

        const instance: Register = this.getInstance();
        instance.setOptions(options);
        instance.setup();
        instance.initial();

        return instance;
    }

    public static setup(): Register {

        const instance: Register = this.getInstance();
        instance.setup();

        return instance;
    }

    public static getInstance(): Register {

        if (this._instance) {
            return this._instance;
        }

        this._instance = new Register();
        this._instance.removeServerSideStyles();

        return this._instance;
    }

    private static _instance: Register;

    private _setupDone: boolean;
    private _initialDone: boolean;

    private _options: RegisterOptions;

    private constructor() {

        this._setupDone = false;
        this._initialDone = false;
    }

    public setOptions(options: RegisterOptions): this {

        this._options = options;
        return this;
    }

    public setup(): this {

        if (this._setupDone) {
            return this;
        }

        jss.setup(jssPresetDefault());
        this._setupDone = true;
        return this;
    }

    public initial(): this {

        if (this._initialDone) {
            return this;
        }

        this.removeServerSideStyles();
        this._initialDone = true;
        return this;
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
