import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import { baseColor, thirdColor } from "../../../libs/utils";
import { ACTIVITIES, type RecentActivity } from "../../../libs/faker/log";
import { useTable } from "react-table";
import { useMemo } from "react";
import SubHeader from "../../typography/SubHeader";

type Column<T> = {
  Header: string;
  accessor: keyof T;
};

const COLUMNS: Column<RecentActivity>[] = [
  {
    Header: "Activity Type",
    accessor: "activityType",
  },
  {
    Header: "Activity Details",
    accessor: "activityDetails",
  },
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Timestamp",
    accessor: "timestamp",
  },
];

type ActivityType = "Login" | "Logout" | "Create" | "Update" | "Delete";
const colorByActivity = (activity: ActivityType, columnIdx: number) => {
  if (columnIdx === 0) {
    switch (activity) {
      case "Delete":
        return "red";
      case "Create":
        return "green";
      case "Login":
        return "rgb(85, 145, 85)";
      case "Update":
        return "blue";
      case "Logout":
        return "gray";
      default:
        return "";
    }
  }
  return "";
};
export default function RecentActivities() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => ACTIVITIES, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <Card sx={{ width:"100%" }}>
      <CardContent>
        <SubHeader>Recent Activities</SubHeader>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "70vh", overflow: "auto" }}
        >
          <Table {...getTableProps()}>
            <TableHead sx={{ background: baseColor }}>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      sx={{ color: "#fff" }}
                      {...header.getHeaderProps}
                    >
                      {header.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, idx) => {
                prepareRow(row);
                return (
                  <TableRow
                    sx={{ background: `${!(idx % 2) ? thirdColor : ""}` }}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell, idx) => {
                      console.log(cell.value);
                      return (
                        <TableCell
                          sx={{
                            color: `${colorByActivity(
                              cell.value as ActivityType,
                              idx
                            )}`,
                            fontWeight: `${
                              idx === 0 || idx === 3 ? "700" : ""
                            }`,
                            fontSize: "0.75rem",
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
