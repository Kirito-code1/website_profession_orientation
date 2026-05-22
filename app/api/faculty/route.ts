import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Faculty } from "@/lib/types/faculty";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("faculty")
      .select("*")
      .order("id", { ascending: true });
    
    if (error) {
      console.error("Error fetching faculties:", error);
      return NextResponse.json(
        { error: "Failed to fetch faculties" },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Faculty[]);
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}