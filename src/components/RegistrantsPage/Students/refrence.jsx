import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Select, MenuItem, Input, Checkbox } from "@mui/material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    editable: false,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "options",
    headerName: "Options",
    width: 200,
    renderCell: (params) => {
      const [selectedOptions, setSelectedOptions] = useState([]);
      const options = ["Option 1", "Option 2", "Option 3"];

      const handleChange = (event) => {
        setSelectedOptions(event.target.value);
      };

      return (
        <Select
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions.indexOf(option) > -1} />
              {option}
            </MenuItem>
          ))}
        </Select>
      );
    },
  },
];

const rows = [
  { id: 1, name: "John Doe", options: ["Option 1"] },
  { id: 2, name: "Jane Doe", options: ["Option 2"] },
  { id: 3, name: "Bob Smith", options: ["Option 1", "Option 2"] },
  { id: 4, name: "Alice Johnson", options: ["Option 3"] },
];

export default function App() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
