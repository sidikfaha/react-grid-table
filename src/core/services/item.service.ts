import { Item, ItemSelect } from "../interfaces/item.interface";

export class ItemService {
  static items: Item[] = [
    {
      id: 1,
      bool: 'yes',
      text: "John Doe",
      url: "https://google.com",
      select: ItemSelect.high,
    },
    {
      id: 2,
      bool: 'no',
      text: "John Doe",
      url: "https://google.com",
      select: ItemSelect.high,
    },
    {
      id: 3,
      bool: 'yes',
      text: "John Doe",
      url: "https://google.com",
      select: ItemSelect.high,
    },
    {
      id: 4,
      bool: 'yes',
      text: "John Doe",
      url: "https://google.com",
      select: ItemSelect.high,
    },
    {
      id: 5,
      bool: 'yes',
      text: "John Doe",
      url: "https://google.com",
      select: ItemSelect.high,
    },
    {
      id: 6,
      bool: 'yes',
      text: "John Doe",
      url: "https://google.com",
      select: ItemSelect.high,
    },
  ];

  static getAll() {
    return this.items;
  }
}
