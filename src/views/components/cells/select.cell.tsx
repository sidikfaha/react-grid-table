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
  
interface IOption {
    value: string
    label: string
}

  export interface SelectCell extends Cell {
    type: "select";
    text: string;
    options: IOption[];
  }
  
  export class SelectCellTemplate implements CellTemplate<Cell | SelectCell> {
    getCompatibleCell(
      uncertainCell: Uncertain<SelectCell>
    ): Compatible<SelectCell> {
      const text = getCellProperty(uncertainCell, "text", "string");
      const options = getCellProperty(uncertainCell, "options", "object");
      const value = parseFloat(text);
      return { ...uncertainCell, text, value, options };
    }
    render(
      cell: Compatible<SelectCell>,
      isInEditMode: boolean,
      onCellChanged: (cell: Compatible<SelectCell>, commit: boolean) => void
    ): JSX.Element {
      if (!isInEditMode) {
        const value = cell.text.toLocaleLowerCase();
        return (
          <>
            {value === "high" && <span className="py-1 px-3 bg-green-100 rounded-md text-green-900">{ cell.text }</span>}
            {value === "medium" && <span className="py-1 px-3 bg-blue-100 rounded-md text-blue-900">{ cell.text }</span>}
            {value === "low" && <span className="py-1 px-3 bg-red-100 rounded-md text-red-900">{ cell.text }</span>}
          </>
        );
      }
      return (
        <select
          ref={(input) => {
            input && input.focus();
          }}
          defaultValue={cell.text}
          onChange={(e) =>
            onCellChanged(
              this.getCompatibleCell({ ...cell, text: e.currentTarget.options[e.currentTarget.selectedIndex].value }),
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
        >
            {cell.options.map((opt, idx) => <option key={idx} value={opt.value}>{opt.label}</option>)}
        </select>
      );
    }
  
    handleKeyDown(
      cell: Compatible<SelectCell>,
      keyCode: number,
      ctrl: boolean,
      shift: boolean,
      alt: boolean
    ): { cell: Compatible<SelectCell>; enableEditMode: boolean } {
      if (!ctrl && !alt && isAlphaNumericKey(keyCode))
        return { cell, enableEditMode: true };
      return {
        cell,
        enableEditMode:
          keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
      };
    }
  
    update(cell: Compatible<SelectCell>, cellToMerge: UncertainCompatible<SelectCell>): Compatible<SelectCell> {
      return this.getCompatibleCell({ ...cell, text: cellToMerge.text })
  }
  }
  