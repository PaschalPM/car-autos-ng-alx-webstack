import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import { supportColor } from "../../../libs/utils";
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
        return "primary.main";
      case "Login":
        return "primary.light";
      case "Update":
        return "dodgerblue";
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
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <SubHeader sx={{alignSelf:'flex-start'}}>Recent Activities</SubHeader>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "70vh", overflow: "auto" }}
        >
          <Table {...getTableProps()} sx={{width:'100%'}}>
            <TableHead sx={{ background: "primary.main" }}>
              {headerGroups.map((headerGroup, idx) => (
                <TableRow {...headerGroup.getHeaderGroupProps()} key={idx}>
                  {headerGroup.headers.map((header, idx) => (
                    <TableCell {...header.getHeaderProps({key: idx})}>
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
                    sx={{ background: `${idx % 2 ? supportColor : ""}` }}
                    {...row.getRowProps()}
                    key={idx}
                  >
                    {row.cells.map((cell, idx) => {
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
