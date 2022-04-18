import {isNaN, isNumber, isString} from 'lodash';

export function isNullable<T>(value: Nullable<T>): value is (null | undefined) {
    return value === null || value === undefined;
}

export function isNotNullable<T>(value: Nullable<T>): value is NonNullable<T> {
    return !isNullable(value);
}

export function isObject<T>(value: Nullable<T>): value is T {
    return (
        isNotNullable(value)
        && !Array.isArray(value)
        && !isNaN(value)
        && typeof value === 'object'
    );
}

export const isEmptyObject = <T>(value: Nullable<T>): boolean => (
    !Object.keys(value ?? {}).length
);

export const isNotEmpty = <T>(value?: Nullable<T>): value is T => {
    if (isString(value)) {
        return !!value?.trim();
    }

    if (Array.isArray(value)) {
        return !!value.length;
    }

    if (isNaN(value)) {
        return false;
    }

    if (isNumber(value)) {
        return true;
    }

    if (isObject(value)) {
        return !isEmptyObject(value);
    }

    return isNotNullable(value);
};

export const isEmpty = (value: unknown) => !isNotEmpty(value);
