export interface Question {
  id: number;
  text: string;
  order: number;
}

export interface Answer {
  id: number;
  question_id: number;
  text: string;
  order: number;
}

export interface QuestionWithAnswers extends Question {
  answers: Answer[];
}
