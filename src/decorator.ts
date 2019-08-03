/**
 * @author WMXPY
 * @namespace JSS
 * @description Decorator
 */

import { CSSProperties } from "react";

export type JSSStyle = Record<string, CSSProperties | {
    [key: string]: any;
}>;

export const mergeClasses = (...classes: Array<string | null | undefined>): string | undefined => {

    const clazz: string = classes.filter((name: string | null | undefined) => Boolean(name)).join(' ');

    if (clazz) {
        return clazz;
    }
    return;
};

export const assertIfTrue = (condition: any, name: string): string | undefined => {

    if (Boolean(condition)) {
        return name;
    }

    return;
};

export const assertIfFalse = (condition: any, name: string): string | undefined => {

    return assertIfTrue(!Boolean(condition), name);
};

export const assertIfTri = (condition: any, ifTrue: string, ifFalse: string): string => {

    if (Boolean(condition)) {

        return ifTrue;
    }

    return ifFalse;
};

export const combineStyle = (style: CSSProperties, propsStyle?: CSSProperties): CSSProperties => {

    if (propsStyle) {
        return {
            ...style,
            ...propsStyle,
        };
    }
    return style;
};
