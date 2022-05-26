import {
  Column,
  Row,
  DefaultCellTypes,
  CellChange,
  TextCell,
} from "@silevis/reactgrid";
import {
  HeaderIconCell,
  HeaderIconCellTemplate,
} from "../views/components/cells/header.cell";
import { Item, ItemSelect } from "./interfaces/item.interface";
import {
  SwitchCell,
  SwichCellTemplate,
} from "../views/components/cells/switch.cell";
import {
  AddCell,
  AddCellCellTemplate,
} from "../views/components/cells/add.cell";
import {
  UrlCell,
  UrlCellTemplate,
} from "../views/components/cells/url.cell";
import {
  SelectCell,
  SelectCellTemplate,
} from "../views/components/cells/select.cell";
import { FiToggleLeft } from "react-icons/fi";
import { RiText } from "react-icons/ri";
import { IoLinkOutline } from "react-icons/io5";
import { HiOutlineTag } from "react-icons/hi";

export const getColumns = (): Column[] => [
  { columnId: "selected", width: 70, resizable: true, reorderable: true },
  { columnId: "bool", width: 150, resizable: true, reorderable: true },
  { columnId: "text", width: 180, resizable: true, reorderable: true },
  { columnId: "url", width: 200, resizable: true, reorderable: true },
  { columnId: "select", width: 200, resizable: true, reorderable: true },
];

const headerRow: Row<DefaultCellTypes | HeaderIconCell> = {
  rowId: "header",
  height: 45,
  cells: [
    { type: "header", text: "" },
    { type: "headerIcon", text: "Boolean", icon: <FiToggleLeft size={24} /> },
    { type: "headerIcon", text: "Text", icon: <RiText size={24} /> },
    { type: "headerIcon", text: "Url", icon: <IoLinkOutline size={24} /> },
    {
      type: "headerIcon",
      text: "Single Select",
      icon: <HiOutlineTag size={24} />,
    },
  ],
};

export const getRows = (
  items: Item[]
): Row<DefaultCellTypes | HeaderIconCell | SwitchCell | AddCell | UrlCell | SelectCell>[] => [
  headerRow,
  ...items.map<Row<AddCell | SwitchCell | DefaultCellTypes | UrlCell | SelectCell>>((item, idx) => ({
    rowId: item.id,
    height: 45,
    cells: [
      { type: "text",  text: item.id.toString(), nonEditable: true, className: "grid-id-column" },
      { type: "switch", text: item.bool, className: "cell-center" },
      { type: "text", text: item.text },
      { type: "url", text: item.url },
      {
        type: "select",
        options: [
          {
            label: ItemSelect.high,
            value: ItemSelect.high,
          },
          {
            label: ItemSelect.medium,
            value: ItemSelect.medium,
          },
          {
            label: ItemSelect.low,
            value: ItemSelect.low,
          },
        ],
        text: item.select,
      },
    ],
  })),
];

export const cellTemplates = {
  switch: new SwichCellTemplate(),
  headerIcon: new HeaderIconCellTemplate(),
  add: new AddCellCellTemplate(),
  url: new UrlCellTemplate(),
  select: new SelectCellTemplate(),
};

export const applyChanges = (
  changes: CellChange<SwitchCell | TextCell | DefaultCellTypes>[],
  oldItems: Item[]
): Item[] => {
  changes.forEach((change) => {
    const item = oldItems.find((i) => i.id + 1 === change.rowId as number + 1);
    const fieldName = change.columnId;
    const newCell = change.newCell as SwitchCell | TextCell;
    // console.log(newCell.text, item.id, change.rowId);
    
    item[fieldName] = newCell.text;
  });
  return [...oldItems];
};
