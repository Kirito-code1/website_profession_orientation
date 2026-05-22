import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("users")
    .select('name,email')
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
  return NextResponse.json(data);
}

export async function getUserByName(UserName: string) {
  const { data, error } = await supabase
    .from("proffesions")
    .select('name,email')
    .eq("name", UserName);

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}