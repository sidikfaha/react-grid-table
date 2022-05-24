import { ReactGrid, Column, Row, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import React from "react";
import { Person } from "../core/interfaces/person.interface";
import { HeaderIconCell, HeaderIconCellTemplate } from "./components/header.cell";
import { HiArchive } from "react-icons/hi";

const getPeople = (): Person[] => [
  { ok: false, name: "Thomas", surname: "Goldman" },
  { ok: false, name: "Susie", surname: "Quattro" },
  { ok: false, name: "", surname: "" }
];

const getColumns = (): Column[] => [
  { columnId: "ok", width: 150 },
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 }
];

const headerRow: Row<DefaultCellTypes | HeaderIconCell> = {
  rowId: "header",
  cells: [
    { type: "checkbox", checked: false },
    { type: "headerIcon", text: "Name", icon: <HiArchive /> },
    { type: "headerIcon", text: "Surname", icon: <HiArchive /> }
  ]
};

const getRows = (people: Person[]): Row<DefaultCellTypes | HeaderIconCell>[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "checkbox", checked: person.ok },
      { type: "text", text: person.name, nonEditable: true },
      { type: "text", text: person.surname }
    ]
  }))
];

export default function App() {
  const [people] = React.useState<Person[]>(getPeople());

  const rows = getRows(people);
  const columns = getColumns();

  return <ReactGrid
    customCellTemplates={{ headerIcon: new HeaderIconCellTemplate() }}
    rows={rows}
    columns={columns}
  />;
}
