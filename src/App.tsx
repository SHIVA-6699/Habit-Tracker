import { Container, Typography } from "@mui/material";
import AddHabitForm from "./components/add-habit-form";
import GetHabitList from "./components/get-habit-list";
function App() {

  return (
    <>
    <Container maxWidth="md">
      <Typography variant="h2" sx={{textAlign:"center"}} component={"h1"}>Habit Tracker</Typography>
      <AddHabitForm/>
      <GetHabitList/>
    </Container>
    </>
  );
}

export default App
