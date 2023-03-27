import type { SorterOptions, SorterRelevantKeys, SorterCustomKeys } from "./types";

enum Type {
    BASIC = 'basic',
    OBJECT = 'object',
    ARRAY = 'array',
}

function getType(value: any): Type {
    if (Array.isArray(value)) {
        return Type.ARRAY;
    } else if (typeof value !== 'object') {
        return Type.BASIC;
    } else {
        return Type.OBJECT;
    }
}

function getIdentifier(key: string, value: any, relevantKeys: SorterRelevantKeys): string {
    switch (getType(value)) {
        case Type.BASIC:
            return `${key}:${getIdentifierFromBasicType(value)}`;

        case Type.ARRAY:
            return `${key}:${getIdentifierFromArray(key, value, relevantKeys)}`;

        case Type.OBJECT:
            relevantKeys = relevantKeys ?? Reflect.ownKeys(value);
            return `${key}:${getIdentifierFromObject(key, value, relevantKeys)}`;

        default:
            throw new Error(`Unsupported type: ${typeof value}`);
    }
}

function getIdentifierFromBasicType(value: any): string {
    let identifier = '';
    if (value !== undefined) {
        identifier = value.toString();
    }

    return identifier;
}

function getIdentifierFromArray(key: string, value: any[], relevantKeys: SorterRelevantKeys): string {
    return value.map((item) => getIdentifier(key, item, relevantKeys)).join();
}

const getIdentifierFromObject = (key: string, value: Record<string, any>, relevantKeys: SorterRelevantKeys): string => {
    const myRelevantKeys = relevantKeys[key] ?? Object.keys(value);

    return myRelevantKeys.map((item) => getIdentifier(item, value[item], relevantKeys)).join('|');
}

const mySortFunction = (a: any, b: any, key: string, relevantKeys: SorterRelevantKeys): number => {
    const aIdentifier: string = getIdentifier(key, a, relevantKeys);
    const bIdentifier: string = getIdentifier(key, b, relevantKeys);

    return aIdentifier.localeCompare(bIdentifier);
}

function sort(object: any, sorterOptions: SorterOptions, key?: string): any {
    const relevantKeys: SorterRelevantKeys = sorterOptions.relevantKeys ?? [];
    const nonSortKeys: string[] = sorterOptions.nonSortKeys ?? [];
    const customSortKeys: SorterCustomKeys = sorterOptions.nonSortKeys ?? [];

    if (nonSortKeys.includes(key)) {
        return object;
    }

    switch (getType(object)) {
        case Type.BASIC:
            return object;

        case Type.ARRAY:
            return object.map((item) => sort(item, sorterOptions, key)).sort((a, b) => mySortFunction(a, b, key!, relevantKeys));

        case Type.OBJECT:
            const newObject: Record<string, any> = {};
            const sortedKeys = Reflect.ownKeys(object).sort((a, b) =>{
                let aKey = a.toString();
                let bKey = b.toString();

                return customSortKeys[aKey] ?? aKey < customSortKeys[bKey] ?? bKey;
            });
            sortedKeys.forEach((innerKey) => {
            newObject[innerKey.toString()] = sort(object[innerKey.toString()], sorterOptions, innerKey.toString());
            });
            return newObject;

        default:
            throw new Error(`Unsupported type: ${typeof object}`);
    }
}


export {
    sort
}
