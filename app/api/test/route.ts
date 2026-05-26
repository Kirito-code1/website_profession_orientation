import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Получаем все вопросы, отсортированные по порядку
    const { data: questions, error: questionsError } = await supabase
      .from("career_question")
      .select("*")
      .order("order", { ascending: true });

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      return NextResponse.json(
        { error: "Failed to fetch questions" },
        { status: 500 },
      );
    }

    if (!questions || questions.length === 0) {
      return NextResponse.json([]);
    }

    // Для каждого вопроса получаем варианты ответов
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const { data: answers, error: answersError } = await supabase
          .from("career_answer")
          .select("*")
          .eq("question_id", question.question_id)
          .order("order", { ascending: true });

        if (answersError) {
          console.error(
            `Error fetching answers for question ${question.question_id}:`,
            answersError,
          );
          return { ...question, answers: [] };
        }

        return { ...question, answers: answers || [] };
      }),
    );

    return NextResponse.json(questionsWithAnswers);
  } catch (error) {
    console.error("Error in /api/test GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
