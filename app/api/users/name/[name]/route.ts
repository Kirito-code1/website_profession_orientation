import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ name: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { name } = await params;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("name", `%${decodeURIComponent(name)}%`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}