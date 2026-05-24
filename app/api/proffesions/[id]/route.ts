import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("proffesions")
    .select("profession_id, proffesion_description, profession_name, category")
    .eq("profession_id", Number(id))
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "Profession not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: Props) {
  const { id } = await params;
  const updatedFields = await request.json();

  const { data, error } = await supabase
    .from("proffesions")
    .update(updatedFields)
    .eq("profession_id", Number(id))
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("proffesions")
    .delete()
    .eq("profession_id", Number(id))
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}