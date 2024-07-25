import axios from "../adaptors/axiosConfig";

export interface Question {
  id: number;
  title: string;
  content: string;
}

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await axios.get<Question[]>("/questions");
  return response.data;
};

export const addQuestion = async (
  question: Omit<Question, "id">
): Promise<Question> => {
  const response = await axios.post<Question>("/questions", question);
  return response.data;
};

export const updateQuestion = async (
  id: number,
  question: Partial<Question>
): Promise<Question> => {
  const response = await axios.put<Question>(`/questions/${id}`, question);
  return response.data;
};

export const deleteQuestion = async (id: number): Promise<void> => {
  await axios.delete(`/questions/${id}`);
};
