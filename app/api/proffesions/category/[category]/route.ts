import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ category: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { category } = await params;

  const { data, error } = await supabase
    .from("proffesions")
    .select("profession_id, profession_name, proffesion_description, category")
    .eq("category", decodeURIComponent(category));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
