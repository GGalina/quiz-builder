import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { QuizFormValues, QuestionFieldProps } from "../types";

export const QuestionField: React.FC<QuestionFieldProps> = ({
  index,
  remove,
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<QuizFormValues>();
  const currentType = watch(`questions.${index}.type`) || "checkbox";

  const {
    fields,
    replace,
    append,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  // Initialize 4 options for checkbox questions if empty
  useEffect(() => {
    if (currentType === "checkbox" && fields.length === 0) {
      replace([
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
      ]);
    }
  }, [currentType, fields, replace]);

  const questionError = errors.questions?.[index];

  return (
    <div className="border p-4 rounded mb-4">
      {/* Question text */}
      <div className="flex justify-between items-center mb-2">
        <input
          {...register(`questions.${index}.question`, {
            required: "Question is required",
          })}
          placeholder="Question text"
          className="border p-2 rounded w-full"
        />
        <button type="button" onClick={remove} className="text-red-500 ml-2">
          Remove
        </button>
      </div>
      {questionError?.question && (
        <span className="text-red-500 text-sm">
          {questionError?.question?.message ?? ""}
        </span>
      )}

      {/* Question type selector */}
      <select
        {...register(`questions.${index}.type`)}
        className="border p-2 rounded mb-2 w-full"
      >
        <option value="input">Input</option>
        <option value="boolean">Boolean</option>
        <option value="checkbox">Checkbox</option>
      </select>

      {/* Boolean question: radio buttons */}
      {currentType === "boolean" && (
        <div className="flex gap-4 mb-2 items-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              {...register(`questions.${index}.answer`, {
                required: "Select True or False",
              })}
              value="true"
            />{" "}
            True
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              {...register(`questions.${index}.answer`, {
                required: "Select True or False",
              })}
              value="false"
            />{" "}
            False
          </label>
          {questionError?.answer && (
            <span className="text-red-500 text-sm">
              {questionError?.answer?.message ?? ""}
            </span>
          )}
        </div>
      )}

      {/* Input question: short text answer */}
      {currentType === "input" && (
        <>
          <input
            {...register(`questions.${index}.answer`, {
              required: "Answer is required",
            })}
            placeholder="Answer text"
            className="border p-2 rounded w-full mb-2"
          />
          {questionError?.answer && (
            <span className="text-red-500 text-sm">
              {questionError?.answer?.message ?? ""}
            </span>
          )}
        </>
      )}

      {/* Checkbox question: multiple choice options */}
      {currentType === "checkbox" && (
        <div>
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-2 mb-1">
              <input
                {...register(`questions.${index}.options.${i}.text`, {
                  required: "Option text is required",
                })}
                placeholder={`Option ${i + 1}`}
                className="border p-2 rounded flex-1"
              />
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  {...register(`questions.${index}.options.${i}.correct`)}
                />
                Correct
              </label>
              <button
                type="button"
                onClick={() => removeOption(i)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          {questionError?.options && (
            <span className="text-red-500 text-sm">
              At least one option is required
            </span>
          )}
          <button
            type="button"
            onClick={() => append({ text: "", correct: false })}
            className="text-blue-500 mt-2"
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
};
