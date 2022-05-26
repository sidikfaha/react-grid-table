export interface Item {
    id: number,
    bool: string,
    text: string;
    url: string;
    select: ItemSelect;
}

export enum ItemSelect {
    low = 'Low',
    medium = 'Medium',
    high = 'High',
}