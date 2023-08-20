import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";



const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Registrar ID", accessor: "registrarId" },
    { label: "Name", accessor: "name" },
    { label: "Age", accessor: "age" },
    { label: "Phone Number", accessor: "phone" },
    { label: "Email", accessor: "email" },
    { label: "Address", accessor: "address" },
    { label: "City", accessor: "city" },
    { label: "Zip Code", accessor: "zipCode" },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead >
          <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.accessor}
                  className="white-text" // Add this custom CSS class
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockDataContacts.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.accessor}>{row[column.accessor]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Contacts;