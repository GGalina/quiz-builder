import React, { useEffect, useState } from "react";
import { getQuizzes, deleteQuiz } from "../services/api";
import { Link } from "react-router-dom";
import { FrontendQuiz } from "../types";

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<FrontendQuiz[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const res = await getQuizzes();
      setQuizzes(res.data);
    } catch (err) {
      console.error("Failed to fetch quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Quizzes</h1>
        <Link
          to="/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 hover:text-white no-underline"
        >
          Create New Quiz
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center mt-8 text-gray-500">Loading quizzes...</div>
      ) : quizzes.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">
          No quizzes available. Create one!
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {quizzes.map((q) => (
            <li
              key={q.id}
              className="flex justify-between items-center border p-3 rounded hover:shadow transition-shadow"
            >
              <Link
                to={`/quizzes/${q.id}`}
                className="font-semibold text-blue-600 hover:underline flex-1"
              >
                {q.title}
              </Link>

              <span className="text-gray-700 mx-4 w-32 text-center">
                {q.numQuestions} questions
              </span>

              <button
                onClick={() => handleDelete(q.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
