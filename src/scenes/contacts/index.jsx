import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Container,
} from "@mui/material";
import Modal from 'react-modal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Membership from "./membership"; // Make sure you import the Membership component

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { label: "programNo", accessor: "programNo" },
    { label: "UserName", accessor: "UserName" },
    { label: "email", accessor: "email" },
    { label: "Number", accessor: "Number" },
    { label: "Phone Number", accessor: "phone" },
    { label: "Type", accessor: "Type" },
    { label: "ProgramType", accessor: "ProgramType" },
    { label: "Payment", accessor: "Payment" },
    { label: "Provider", accessor: "Provider" },
    { label: "Details", accessor: "details" },
  ];
  // const [activeComponent, setActiveComponent] = useState("program");
  const [emailFilter, setEmailFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  
  const [userNameFilter, setUserNameFilter] = useState("");

  const filteredContacts = mockDataContacts.filter(
    (contact) =>
    (!userNameFilter || contact.UserName.includes(userNameFilter)) &&
      (!emailFilter || contact.email.includes(emailFilter)) &&
      (!paymentFilter || contact.Payment.includes(paymentFilter)) &&
      (!providerFilter || contact.Provider.includes(providerFilter))&&
      (!typeFilter || contact.Type.includes(typeFilter))

  );

  const [activeComponent, setActiveComponent] = useState("contacts"); // Default active component is "contacts"

  // ... (rest of your state and filtering logic)

  const toggleComponent = () => {
    setActiveComponent(activeComponent === "contacts" ? "membership" : "contacts");
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  return (
    <Box  ml='20px'>
    <Container m="20px">
          <Header
        title="Help Desk"
       // subtitle="List of Contacts for Future Reference"
      />
         <Button
          variant={activeComponent === "contacts" ? "contained" : "outlined"}
          onClick={toggleComponent} className="mt-2 mb-2 "
          style={{
            color: activeComponent === "membership" ? "#094e6c" : "#fff",
            backgroundColor: activeComponent === "membership" ? "#fff" : "#094e6c",
          }}
      >
          Program
        </Button>
        <Button
          variant={activeComponent === "membership" ? "contained" : "outlined"}
          onClick={toggleComponent} className="mt-2 mb-2"
          style={{
            color: activeComponent === "contacts" ? "#094e6c" : "#fff",
            backgroundColor: activeComponent === "contacts" ? "#fff" : "#094e6c",
          }}
       >
          Membership
        </Button>

   {activeComponent === "contacts" ? (
   
        <TableContainer component={Paper}>
                <Header
        title="Program Tbale"
       // subtitle="List of Contacts for Future Reference"
      />
               <Box display="flex" justifyContent="space-between"  mb="10px" >
      <Box >
        <FormControl variant="outlined" className="inputs-enter "  >
        <Select
      value={emailFilter}
      onChange={(e) => setEmailFilter(e.target.value)}
      displayEmpty
    >
      <MenuItem value="" >
         Emails
      </MenuItem>
            {/* <MenuItem value="All">All</MenuItem> */}
            {Array.from(
              new Set(mockDataContacts.map((contact) => contact.email))
            ).map((email) => (
              <MenuItem key={email} value={email}>
                {email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        <Box>
        <FormControl variant="outlined" className="inputs-enter ">
          <Select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            displayEmpty
         >
            <MenuItem value="" >
         payment Method
      </MenuItem>
            {/* <MenuItem value="">All</MenuItem> */}
            {Array.from(
              new Set(mockDataContacts.map((contact) => contact.Payment))
            ).map((Payment) => (
              <MenuItem key={Payment} value={Payment}>
                {Payment}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
        <Box>
        <FormControl variant="outlined" className="inputs-enter ">
          <Select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            displayEmpty
         >
            <MenuItem value="" >
         Provider
      </MenuItem>
            {/* <MenuItem value="">All</MenuItem> */}
            {Array.from(
              new Set(mockDataContacts.map((contact) => contact.Provider))
            ).map((Provider) => (
              <MenuItem key={Provider} value={Provider}>
                {Provider}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
        <Box>
        <FormControl variant="outlined" className="inputs-enter ">
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            displayEmpty
         >
            <MenuItem value="" >
         Type
      </MenuItem>
            {/* <MenuItem value="">All</MenuItem> */}
            {Array.from(
              new Set(mockDataContacts.map((contact) => contact.Type))
            ).map((Type) => (
              <MenuItem key={Type} value={Type}>
                {Type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="space-between" mb="10px">
    
        <TextField
          label="Search by Username"
          variant="outlined"
          value={userNameFilter}
          onChange={(e) => setUserNameFilter(e.target.value)}
        />
         </Box>
   
      </Box>
           <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.accessor} className="white-text">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.accessor}>
                  {column.accessor === "details" ? (
                    // Render details column content
                    <ArrowForwardIosIcon
                      variant="outlined"
                      // startIcon={<ArrowForwardIosIcon />}
                      onClick={() => openModal(column)}
                    >
                      Details
                    </ArrowForwardIosIcon>
                  ) : (
                    row[column.accessor]
                  )}
                </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      ) : (
        
        <Membership />
       
      )}

</Container>
      
      {/* Filter Dropdowns */}
 
      {/* <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.accessor} className="white-text">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.accessor}>
                  {column.accessor === "details" ? (
                    // Render details column content
                    <ArrowForwardIosIcon
                      variant="outlined"
                      // startIcon={<ArrowForwardIosIcon />}
                      onClick={() => openModal(column)}
                    >
                      Details
                    </ArrowForwardIosIcon>
                  ) : (
                    row[column.accessor]
                  )}
                </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
      </TableContainer> */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Details Modal"
        className="modal "
        overlayClassName="overlay"
      >
      
          <div className=''>
          

          <img src="details.png" className="img-modal mt-2" alt="" />
          <br /> <br />
          <CloseIcon onClick={closeModal} style={{ cursor: 'pointer' }}  />
          </div>
       
      </Modal>
    </Box>
  );
};

export default Contacts;
