import axios from "axios";
import { FrontendQuiz } from "../types";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE,
});

export const getQuizzes = () => api.get<FrontendQuiz[]>("/quizzes");
export const getQuiz = (id: number) => api.get(`/quizzes/${id}`);
export const createQuiz = <T>(data: T) => api.post("/quizzes", data);
export const deleteQuiz = (id: number) => api.delete(`/quizzes/${id}`);
