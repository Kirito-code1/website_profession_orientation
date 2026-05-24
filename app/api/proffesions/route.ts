import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("proffesions")
    .select("profession_id, profession_name, proffesion_description, category")
    .order("category", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { categoryName, professionName, professionDescription } = body;

  const { data, error } = await supabase
    .from("proffesions")
    .insert([
      {
        category: categoryName,
        proffesion_description: professionDescription,
        profession_name: professionName,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}