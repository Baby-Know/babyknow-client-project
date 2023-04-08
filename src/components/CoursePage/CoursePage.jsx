import { useEffect, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddUnitForm from "./AddUnitForm/AddUnitForm";
import AddCohortForm from "./AddCohortForm/AddCohortForm";
import { Card, CardContent, Grid, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CoursePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const units = useSelector((store) => store.unit);


  useEffect(() => {
    dispatch({ type: 'GET_UNITS' })
  }, [])

  const deleteUnit = (id) => {
    dispatch({ 
      type: 'DELETE_UNIT',
      payload: id
     })
  }

  return (
    <div className="container">
      <h1>Course Page!</h1>
      <h2>Welcome, {user.firstName}!</h2>
      <button
        onClick={() => {
          dispatch({
            type: "SET_SHOW_ADD_UNIT",
            payload: true,
          });
        }}
      >
        Add Unit
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "SET_SHOW_ADD_COHORT",
            payload: true,
          });
        }}
      >
        Add Cohort
      </button>
      <AddUnitForm />
      <AddCohortForm />

      <div>
        {units.map((unit, i) => {
          return (
            <div key={i}>
              <Grid
                container
                display="flex"
                direction="column"
                alignItems="center"
                justify="center"
                spacing={3}
              >
                <Grid
                  item m={2}
                  display="flex"
                >
                  <Card sx={{ maxWidth: 320, maxHeight: 1000 }}>
                    <CardContent>
                      <p>{unit.name}</p>
                      <p>{unit.subtitle}</p>
                    </CardContent>
                    <IconButton onClick={() => deleteUnit(unit.id)}><DeleteForeverIcon /></IconButton>
                  </Card>
                </Grid>
              </Grid>

            </div>

          )
        })}

      </div>
      </div>
)
}



// this allows us to use <App /> in index.js
      export default CoursePage;
