export function jsonParse<T>(str: Undefinable<string>, defaultValue: T): T;
export function jsonParse<T>(str: Undefinable<string>, defaultValue?: T): Undefinable<T>;
export function jsonParse<T>(str: Undefinable<string>, defaultValue?: T) {
    const trimStr = str?.trim();
    try {
        const parsedValue = JSON.parse(trimStr ?? '');

        return parsedValue === undefined ? defaultValue : parsedValue;
    } catch (e) {
        return defaultValue;
    }
}
