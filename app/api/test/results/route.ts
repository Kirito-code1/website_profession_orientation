import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, answers, score, result_category, result_profession } =
      body;

    if (!user_id || !answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("career_test_results")
      .insert([
        {
          user_id,
          answers,
          score: score ?? null,
          result_category: result_category ?? null,
          result_profession: result_profession ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error saving test result:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in /api/test/results POST:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { error: "user_id is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("career_test_results")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching test results:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/test/results GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
