import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import { IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";

function AddOrganizationForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable to show whether the add organization form is showing
  const showForm = useSelector(
    (store) => store.conditionalForms?.showOrganizationForm
  );

  return (
    <Box>
      <Dialog
        open={showForm}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.tealAccent[800],
          },
        }}
      >
        <DialogTitle variant="h3" color={colors.primary[500]} mb="5%">
          Add New Organization
          <IconButton
            onClick={() => {
              dispatch({
                type: "SET_SHOW_ADD_ORGANIZATION",
                payload: false,
              });
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
      </Dialog>
    </Box>
  );
}
export default AddOrganizationForm;
