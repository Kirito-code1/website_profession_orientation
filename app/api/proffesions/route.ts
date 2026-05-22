import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    const { data,error } = await supabase 
    .from("proffesions")
    .select('profession_name, proffesion_description, category')
    .order('category', { ascending: true })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
}
export async function getProfessionsByCategory(categoryName:string) {
  const { data, error } = await supabase
    .from("proffesions")
    .select('profession_name, proffesion_description, category')
    .eq('category', categoryName)

  if (error) {
    console.error(error)
    return []
  }

  return data
}
export async function getProfessionsByName(ProffesionName:string) {
    const { data,error } = await supabase
    .from("proffesions")
        .select('profession_name, proffesion_description, category')
    .eq('profession_name', ProffesionName)

    if (error) {
        console.error(error)
        return []
    }
    return data
}
export async function getProfessionsByID(ProffesionID:number) {
    const { data,error } = await supabase
    .from("proffesions")
        .select('profession_id, proffesion_description, profession_name, category')
    .eq('profession_id', ProffesionID)

        if (error) {
        console.error(error)
        return []
    }
    return data
}
export async function createProffesion(ProffesionName:string,categoryName:string,ProffesionDescription:string) {
const { data,error } = await supabase 
.from("proffesions")
.insert([
    {
        category: categoryName,
        proffesion_description: ProffesionDescription,
        profession_name: ProffesionName,
        
    }
])
}
export async function updateProfession(id:number, updatedFields:string) {
  const { data, error } = await supabase
    .from('profession') 
    .update(updatedFields) 
    .eq('id', id)          
    .select()

  if (error) {
    console.error('Ошибка обновления:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
export async function deleteProfession(id:string) {
  const { error } = await supabase
    .from('profession')
    .delete()
    .eq('id', id) 

  if (error) {
    console.error('Ошибка удаления:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}