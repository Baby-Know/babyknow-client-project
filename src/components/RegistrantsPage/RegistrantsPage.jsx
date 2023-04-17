import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/material";
import NewRegistrants from "./NewRegistrants/NewRegistrants";
import Students from "./Students/Students";
import Teachers from "./Teachers/Teachers";
import TeachersTable from "./Teachers/TeachersTable";

function RegistrantsPage() {
  const user = useSelector((store) => store.user);
  const [showPage, setShowPage] = useState("newRegistrants");
  return (
    <Box
      className="container"
      sx={{
        "& .page-links": {
          cursor: "pointer",
        },
      }}
    >
      {showPage === "newRegistrants" ? (
        <h1>New Registrants</h1>
      ) : showPage === "students" ? (
        <h1>Students</h1>
      ) : showPage === "teachers" ? (
        <h1>Teachers</h1>
      ) : (
        <></>
      )}
      <Box display="inline-flex" justifyContent={"space-between"} width="20vw">
        {" "}
        <h3 onClick={() => setShowPage("teachers")} className="page-links">
          Teachers
        </h3>
        <h3 onClick={() => setShowPage("students")} className="page-links">
          Students
        </h3>
        <h3
          onClick={() => setShowPage("newRegistrants")}
          className="page-links"
        >
          New Registrants
        </h3>
      </Box>
      {showPage === "newRegistrants" ? (
        <NewRegistrants />
      ) : showPage === "students" ? (
        <Students />
      ) : showPage === "teachers" ? (
        <TeachersTable />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default RegistrantsPage;
