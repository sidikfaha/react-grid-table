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

export interface UrlCell extends Cell {
  type: "url";
  text: string;
}

export class UrlCellTemplate implements CellTemplate<Cell | UrlCell> {
  getCompatibleCell(uncertainCell: Uncertain<UrlCell>): Compatible<UrlCell> {
    const text = getCellProperty(uncertainCell, "text", "string");
    const value = parseFloat(text);
    return { ...uncertainCell, text, value };
  }

  render(
    cell: Compatible<UrlCell>,
    isInEditMode: boolean,
    onCellChanged: (cell: Compatible<UrlCell>, commit: boolean) => void
  ): JSX.Element {
    if (!isInEditMode) {
      return (
        <>
          <a href={cell.text} target="_blank" className="text-primary underline" rel="noreferrer" >
            {cell.text}
          </a>
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
    cell: Compatible<UrlCell>,
    keyCode: number,
    ctrl: boolean,
    shift: boolean,
    alt: boolean
  ): { cell: Compatible<UrlCell>; enableEditMode: boolean } {
    if (!ctrl && !alt && isAlphaNumericKey(keyCode))
      return { cell, enableEditMode: true };
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    };
  }

  update(
    cell: Compatible<UrlCell>,
    cellToMerge: UncertainCompatible<UrlCell>
  ): Compatible<UrlCell> {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
  }
}
