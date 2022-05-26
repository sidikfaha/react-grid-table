import { ReactGrid, Row, DefaultCellTypes, CellChange } from "@silevis/reactgrid";
import { useEffect, useState } from "react";
import {
  HeaderIconCell,
} from "./components/cells/header.cell";
import { Item, ItemSelect } from "../core/interfaces/item.interface";
import { ItemService } from "../core/services/item.service";
import {
  SwitchCell,
} from "./components/cells/switch.cell";
import {
  AddCell,
} from "./components/cells/add.cell";
import { applyChanges, cellTemplates, getColumns, getRows } from "../core/meta";
import { UrlCell } from "./components/cells/url.cell";
import { SelectCell } from "./components/cells/select.cell";


export default function App() {
  const footer: Row<AddCell | DefaultCellTypes> = {
    rowId: "footer",
    height: 45,
    cells: [
      { type: "add", text: "", onClick: () => addItem() },
      { type: "text", text: "", className: 'bg-green-50' },
      { type: "text", text: "", className: 'bg-green-50' },
      { type: "text", text: "", className: 'bg-green-50' },
      { type: "text", text: "", className: 'bg-green-50' },
    ],
  };
  const [items, setItems] = useState<Item[]>([]);
  const [rows, setRows] = useState<Row<AddCell | DefaultCellTypes | HeaderIconCell | SwitchCell | UrlCell | SelectCell>[]>([
    ...getRows(items),
    footer
  ]);

  useEffect(() => {
    setItems(ItemService.getAll());
  }, []);

  useEffect(() => {
    setRows([
      ...getRows(items),
      footer
    ]);
  }, [items]);

  const addItem = () => {
    const newItem = {
      id: items[items.length -1].id + 1,
      bool: 'yes',
      select: ItemSelect.high,
      text: '',
      url: '',
    } as Item;
    setItems([...items, newItem]);
  }

  const columns = getColumns();

  const handleChanges = (changes: CellChange[]) => { 
    setItems((oldItems) => {
      return applyChanges(changes, oldItems)
    }); 
  }; 

  return (
    <>
      <div>
        <ReactGrid
          customCellTemplates={cellTemplates}
          rows={rows}
          columns={columns}
          enableRangeSelection
          enableFillHandle
          onCellsChanged={handleChanges}
        />
      </div>
    </>
  );
}
