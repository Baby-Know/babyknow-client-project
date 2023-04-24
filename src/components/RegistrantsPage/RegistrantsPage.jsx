import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/material";
import NewRegistrants from "./NewRegistrants/NewRegistrants";
import Students from "./Students/Students";
import Teachers from "./Teachers/Teachers";

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
      <div style={{margin: 'auto', width: '40vw', textAlign:'center'}}>
        {showPage === "newRegistrants" ? (
          <h1>New Registrants</h1>
        ) : showPage === "students" ? (
          <h1>Students</h1>
        ) : showPage === "teachers" ? (
          <h1>Teachers</h1>
        ) : (
          <></>
        )}
      </div>

      <Box display="flex" justifyContent="space-around" width="40vw" margin='auto'>
        {" "}
        <h3 onClick={() => setShowPage("teachers")} style={{ cursor: 'pointer'}} className={showPage === 'teachers' ? 'underline' : ''}>
          Teachers
        </h3>
        <h3 onClick={() => setShowPage("students")} style={{ cursor: 'pointer'}} className={showPage === 'students' ? 'underline' : ''} >
          Students
        </h3>
        <h3 onClick={() => setShowPage("newRegistrants")} style={{ cursor: 'pointer'}} className={showPage === 'newRegistrants' ? 'underline' : ''}>
          New Registrants
        </h3>
      </Box>
      {showPage === "newRegistrants" ? (
        <NewRegistrants />
      ) : showPage === "students" ? (
        <Students />
      ) : showPage === "teachers" ? (
        <Teachers />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default RegistrantsPage;
