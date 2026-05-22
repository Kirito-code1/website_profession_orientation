import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Получаем все вопросы, отсортированные по порядку
    const { data: questions, error: questionsError } = await supabase
      .from("question")
      .select("*")
      .order("order", { ascending: true });

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      return NextResponse.json(
        { error: "Failed to fetch questions" },
        { status: 500 }
      );
    }

    // Для каждого вопроса получаем варианты ответов
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const { data: answers, error: answersError } = await supabase
          .from("answer")
          .select("*")
          .eq("question_id", question.id)
          .order("order", { ascending: true });

        if (answersError) {
          console.error(
            `Error fetching answers for question ${question.id}:`,
            answersError
          );
          return { ...question, answers: [] };
        }

        return { ...question, answers };
      })
    );

    return NextResponse.json(questionsWithAnswers);
  } catch (error) {
    console.error("Error in /api/test GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
