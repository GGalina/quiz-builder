import { Request, Response } from "express";
import prisma from "../config/prismaClient";
import { CreateQuiz } from "../types/quiz.types";
import { validateCreateQuiz, validateQuizId } from "../validators/quiz.validator";

// Create a new quiz
export const createQuiz = async ( req: Request<{}, {}, CreateQuiz>, res: Response ) => {
  try {
    const { title, questions } = validateCreateQuiz(req.body);

    // Prepare questions for Prisma
    const formattedQuestions = questions.map((q) => ({
      text: q.text,
      type: q.type,
      options: q.type === "checkbox" ? JSON.stringify(q.options) : null,
    }));

    // Create quiz
    const quiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: formattedQuestions,
        },
      },
      include: { questions: true },
    });
    return res.status(201).json(quiz);
  } catch (err: any) {
    return res.status(400).json({
    error: err.message || "Failed to create quiz",
    });
  }
};

// Return a list of all quizzes with titles and number of questions
export const getQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        questions: {
          select: { id: true },
        },
      },
    });

    const result = quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      numQuestions: quiz.questions.length,
    }));

    return res.json(result);
  } catch {
    return res.status(500).json({
      error: "Failed to fetch quizzes",
    });
  }
};

// Return full details of a quiz including all questions
export const getQuizById = async ( req: Request<{ id: string }>, res: Response ) => {
  try {
    const quizId = validateQuizId(req.params.id);

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    return res.json(quiz);
  } catch (err: any) {
    return res.status(400).json({
      error: err.message || "Invalid quiz ID",
    });
  }
};

// Delete a quiz
export const deleteQuiz = async ( req: Request<{ id: string }>, res: Response ) => {
  try {
    const quizId = validateQuizId(req.params.id);

    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    await prisma.quiz.delete({
      where: { id: quizId },
    });

    return res.json({ message: "Quiz deleted successfully" });
  } catch (err: any) {
    return res.status(400).json({
      error: err.message || "Failed to delete quiz",
    });
  }
};
