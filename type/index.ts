type Option = {
  label: string;
  value: string;
};

type Question = {
  id: number;
  question: string;
  choice: Option[];
  relationAnswer: string;
};
type Answer = {
  id: number;
  value: string;
  relationAnswer: string;
};
type QuestionData = Question[];
