import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Colors } from "constant";
import { Column, useTable } from "react-table";

export interface TableNewProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

const TableStyle = styled.table(
  `
    border-spacing: 0;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tr > th {
      :first-child {
         border-top-left-radius:  10px;
      }
      :last-child {
         border-top-right-radius:  10px;
      }
      font-size: 16px;
      text-align: left;
      z-index: 1;
      top: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      text-transform: capitalize;
      position: sticky;
      background: ${Colors.HOVER}
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      font-size: 16px;
      :last-child {
        border-right: 0;
      }
    }
`
);

export default function Tables<T extends object>(props: TableNewProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({ columns: props.columns, data: props.data });
  return (
    <Box maxH="77vh" minH={"77vh"} overflow="auto">
      <TableStyle {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </TableStyle>
    </Box>
  );
}
