import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ email: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { email } = await params;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", decodeURIComponent(email))
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}