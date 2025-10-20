import type { Question } from "../types/quiz.types";

export const loadQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch("./questions.json");
    if (!response.ok) throw new Error("Failed to load questions.json");
    const data: Question[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading questions:", error);
    throw new Error("Failed to load questions");
  }
};
