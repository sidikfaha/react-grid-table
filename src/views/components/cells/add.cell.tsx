import {
  Cell,
  CellTemplate,
  Compatible,
  getCellProperty,
  Uncertain,
} from "@silevis/reactgrid";
import { MdAddCircleOutline } from "react-icons/md";

export interface AddCell extends Cell {
  type: "add";
  text: string;
  onClick: () => void;
}

export class AddCellCellTemplate implements CellTemplate<Cell | AddCell> {
  isFocusable = (cell: Compatible<AddCell>): boolean => false;

  getCompatibleCell(uncertainCell: Uncertain<AddCell>): Compatible<AddCell> {
    const text = getCellProperty(uncertainCell, "text", "string");
    const onClick = getCellProperty(uncertainCell, "onClick", "function");
    const value = parseFloat(text);
    return { ...uncertainCell, text, value, onClick };
  }
  render(cell: Compatible<AddCell>): JSX.Element {
    return <MdAddCircleOutline onClick={cell.onClick} size={32} />;
  }
}
