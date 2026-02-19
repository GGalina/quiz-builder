import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import QuizList from "./pages/QuizList";
import QuizDetail from "./pages/QuizDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/quizzes" />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
