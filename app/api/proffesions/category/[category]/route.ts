import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ categoryName: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { categoryName } = await params;

  const { data, error } = await supabase
    .from("proffesions")
    .select("profession_id, profession_name, proffesion_description, category")
    .eq("category", decodeURIComponent(categoryName));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}