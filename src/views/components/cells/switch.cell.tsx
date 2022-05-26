import {
  Cell,
  CellTemplate,
  Compatible,
  getCellProperty,
  Uncertain,
  isNavigationKey,
  isAlphaNumericKey,
  keyCodes,
  UncertainCompatible,
} from "@silevis/reactgrid";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

export interface SwitchCell extends Cell {
  type: "switch";
  text: string;
}

export class SwichCellTemplate implements CellTemplate<Cell | SwitchCell> {
  getCompatibleCell(
    uncertainCell: Uncertain<SwitchCell>
  ): Compatible<SwitchCell> {
    const text = getCellProperty(uncertainCell, "text", "string");
    const value = parseFloat(text);
    return { ...uncertainCell, text, value };
  }
  render(
    cell: Compatible<SwitchCell>,
    isInEditMode: boolean,
    onCellChanged: (cell: Compatible<SwitchCell>, commit: boolean) => void
  ): JSX.Element {
    if (!isInEditMode) {
      const iconSize = 50;
      return (
        <>
          {cell.text.toLocaleLowerCase() === "yes" ? (
            <MdToggleOn className="text-emerald-400" size={iconSize} />
          ) : (
            <MdToggleOff className="text-gray-800" size={iconSize} />
          )}
        </>
      );
    }
    return (
      <input
        ref={(input) => {
          input && input.focus();
        }}
        defaultValue={cell.text}
        onChange={(e) =>
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            false
          )
        }
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
        }}
      />
    );
  }

  handleKeyDown(
    cell: Compatible<SwitchCell>,
    keyCode: number,
    ctrl: boolean,
    shift: boolean,
    alt: boolean
  ): { cell: Compatible<SwitchCell>; enableEditMode: boolean } {
    if (!ctrl && !alt && isAlphaNumericKey(keyCode))
      return { cell, enableEditMode: true };
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    };
  }

  update(cell: Compatible<SwitchCell>, cellToMerge: UncertainCompatible<SwitchCell>): Compatible<SwitchCell> {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text })
}
}
