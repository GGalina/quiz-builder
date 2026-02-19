import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { QuizFormValues, QuestionFormInput } from "../types";
import { createQuiz } from "../services/api";
import { QuestionField } from "./QuestionField";

export const QuizForm: React.FC = () => {
  const methods = useForm<QuizFormValues>({
    defaultValues: { title: "", questions: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "questions",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: QuizFormValues) => {
    try {
      const payload = {
        title: data.title,
        questions: data.questions.map((q: QuestionFormInput) => {
          if (q.type === "checkbox") {
            return {
              text: q.question,
              type: q.type,
              options: q.options.map((opt) => ({
                text: opt.text,
                correct: opt.correct,
              })),
              answer: null, // backend expects null
            };
          } else {
            // Input or Boolean
            return {
              text: q.question,
              type: q.type,
              options: null,
              answer: q.answer || "",
            };
          }
        }),
      };

      await createQuiz(payload);
      navigate("/quizzes");
    } catch (err) {
      console.error("Failed to create quiz:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-xl mx-auto mt-8"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Create New Quiz</h1>

        <input
          {...methods.register("title", { required: "Quiz title is required" })}
          placeholder="Quiz Title"
          className="border p-2 rounded w-full"
        />

        {fields.map((field, index) => (
          <QuestionField
            key={field.id}
            index={index}
            remove={() => remove(index)}
          />
        ))}

        <div className="flex justify-between mt-4">
          <Link
            to="/"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 hover:text-white no-underline"
          >
            Back to Main
          </Link>

          <button
            type="button"
            onClick={() =>
              append({
                type: "checkbox",
                question: "",
                options: [
                  { text: "", correct: false },
                  { text: "", correct: false },
                  { text: "", correct: false },
                  { text: "", correct: false },
                ],
                answer: "",
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Question
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
