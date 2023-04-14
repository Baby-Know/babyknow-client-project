import { useEffect } from "react";
import { useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Teachers() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const teachersData = useSelector((store) => store.teacherReducer);

  //Fetch teacher data on page load
  useEffect(() => {
    dispatch({ type: "FETCH_TEACHERS" });
  }, []);
  return (
    <Box
      sx={{
        "& .MuiButton-sizeMedium": {
          backgroundColor: colors.darkTealAccent[400],
          color: "white",
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.darkTealAccent[600],
          color: "white",
        },
      }}
    >
      {teachersData?.map((teacher, i) => {
        return (
          <Box key={i}>
            <Accordion id="accordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "large",
                      marginLeft: 1,
                    }}
                  >
                    {teacher.teacherFirstName} {teacher.teacherLastName}
                  </Typography>

                  <Typography sx={{ fontSize: "large", marginLeft: 1 }}>
                    {teacher.className}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                {teacher.students.map((student, i) => {
                  return (
                    <Typography key={i} sx={{ fontSize: "medium" }}>
                      {student.firstName} {student.lastName}
                    </Typography>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
      <button onClick={() => console.log(teachersData)}>c</button>
    </Box>
  );
}

export default Teachers;
