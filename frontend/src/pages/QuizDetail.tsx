import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getQuiz } from "../services/api";
import { QuizDetailData } from "../types";

const QuizDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<QuizDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = useCallback(async () => {
    try {
      if (!id) return;
      const quizId = Number(id);
      const res = await getQuiz(quizId);
      const data: QuizDetailData = res.data;

      // Parse checkbox options if stored as string
      data.questions = data.questions.map((q) => {
        if (q.type === "checkbox" && typeof q.options === "string") {
          return { ...q, options: JSON.parse(q.options) };
        }
        return q;
      });

      setQuiz(data);
    } catch (err) {
      console.error("Failed to fetch quiz:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  if (loading)
    return (
      <div className="text-center mt-8 text-gray-500">Loading quiz...</div>
    );
  if (!quiz)
    return <div className="text-center mt-8 text-red-500">Quiz not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <Link
          to="/quizzes"
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 hover:text-white no-underline"
        >
          Back to Main
        </Link>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-6">
        {quiz.questions.map((q, idx) => (
          <div
            key={q.id}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-2">
              {idx + 1}. {q.text}{" "}
              <span className="text-gray-500 text-sm">({q.type})</span>
            </h2>

            {/* Input question */}
            {q.type === "input" && (
              <input
                type="text"
                value={q.answer || ""}
                readOnly
                className="border p-2 rounded w-full bg-gray-100 text-gray-700"
              />
            )}

            {/* Boolean question */}
            {q.type === "boolean" && (
              <div className="flex gap-6 items-center mt-1">
                <label className="flex items-center gap-1">
                  <input type="radio" checked={q.answer === "true"} readOnly />
                  True
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" checked={q.answer === "false"} readOnly />
                  False
                </label>
              </div>
            )}

            {/* Checkbox question */}
            {q.type === "checkbox" && q.options && (
              <ul className="list-disc ml-5 flex flex-col gap-1 mt-1">
                {q.options.map((opt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input type="checkbox" checked={opt.correct} readOnly />
                    <span>{opt.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDetail;
