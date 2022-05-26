import { Cell, CellTemplate, Compatible, getCellProperty, Uncertain } from "@silevis/reactgrid"
import React from "react"

export interface HeaderIconCell extends Cell {
    type: 'headerIcon',
    text: string,
    icon?: React.ReactNode,
}

export class HeaderIconCellTemplate implements CellTemplate<Cell | HeaderIconCell> {
    isFocusable = (cell: Compatible<HeaderIconCell>): boolean => false;

    getCompatibleCell(uncertainCell: Uncertain<HeaderIconCell>): Compatible<HeaderIconCell> {
        const text = getCellProperty(uncertainCell, "text", "string");
        const icon = getCellProperty(uncertainCell, "icon", "object");
        const value = parseFloat(text);
        return { ...uncertainCell, text, value, icon };
    }
    render(cell: Compatible<HeaderIconCell>) {
        return (
            <div className="flex gap-3 items-center grid-header">
                <div>
                    {cell.icon}
                </div>
                <div>
                    {cell.text}
                </div>
            </div>
        )
    }
}