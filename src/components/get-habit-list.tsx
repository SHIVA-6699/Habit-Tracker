import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Habit, removeHabit, toggleHabit } from "../store/slice/habit-slice";
const GetHabitList = () => {
  const { habits, loading } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

  function getStreak(habit: Habit) {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const date = currentDate.toISOString().split("T")[0];

      if (habit.completedDates.includes(date)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        {habits.map((habit) => (
          <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
            <Grid container alignItems="center">
              <Grid xs={12} sm={6}>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {habit.frequencey.charAt(0).toUpperCase() +
                    habit.frequencey.slice(1)}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    onClick={() =>
                      dispatch(toggleHabit({ id: habit.id, date: today }))
                    }
                    startIcon={<CheckCircleIcon />}
                  >
                    {habit.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch(removeHabit(habit.id))}
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Current Streak: {getStreak(habit)} days
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(getStreak(habit) / 30) * 100}
                sx={{ mt: 1 }}
              />
            </Box>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default GetHabitList;
