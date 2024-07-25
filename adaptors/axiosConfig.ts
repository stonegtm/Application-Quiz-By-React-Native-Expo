import { mockAnswer, mockQuestion } from "@/mock/mockData";
import { getRandomData } from "@/util/randomData";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
const axiosInstance = axios.create({
  baseURL: process.env.API_HOST,
  timeout: 1000,
});
const mock = new AxiosMockAdapter(axiosInstance, { delayResponse: 1000 });

const getRandomMockData = () => getRandomData(mockQuestion, 20);

mock.onGet("/question").reply(() => {
  const data = getRandomMockData();
  return [200, data];
});

mock.onPost("/submit-answers").reply((config) => {
  let score = 0;
  const { data } = config;
  const jsonData = JSON.parse(data);
  const totalQuestions = jsonData.length;
  jsonData.forEach((answer: Answer) => {
    const correctAnswer = mockAnswer.find(
      (item) => item.id === answer.relationAnswer
    );
    if (correctAnswer && correctAnswer.answer === answer.value) {
      score += 1;
    }
  });
  const percentageScore = `${score}/${totalQuestions}`;
  return [
    200,
    { message: "Answers submitted successfully!", score: percentageScore },
  ];
});

export default axiosInstance;
