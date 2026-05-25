import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Faculty } from "@/lib/types/faculty";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const town = searchParams.get("town");
    const university = searchParams.get("university");

    let query = supabase.from("faculty").select("*");

    if (id) {
      query = query.eq("id", id);
    }
    if (name) {
      query = query.ilike("faculty_name", `%${decodeURIComponent(name)}%`);
    }
    if (town) {
      query = query.ilike("town", `%${decodeURIComponent(town)}%`);
    }
    if (university) {
      query = query.ilike("university", `%${decodeURIComponent(university)}%`);
    }

    const { data, error } = await query.order("id", { ascending: true });

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