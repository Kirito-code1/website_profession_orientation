export interface Question {
  question_id: number;
  question_text: string;
  order: number;
}

export interface Answer {
  answer_id: number;
  question_id: number;
  answer_text: string;
  order: number;
}

export interface QuestionWithAnswers extends Question {
  answers: Answer[];
}
