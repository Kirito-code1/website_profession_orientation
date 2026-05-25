import { supabase } from "@/lib/supabase";

export async function addSavedFaculty(UserID: number, FacultyID: number) {
  const { data: faculty, error: facultyError } = await supabase
    .from("faculty")
    .select("id")
    .eq("id", FacultyID)
    .single();

  if (facultyError || !faculty) {
    return {
      success: false,
      message: "Faculty does not exist",
    };
  }

  const { data: existing } = await supabase
    .from("saved_faculties")
    .select("id")
    .eq("user_id", UserID)
    .eq("faculty_id", FacultyID)
    .single();

  if (existing) {
    return {
      success: false,
      message: "Already saved",
    };
  }

  const { data, error } = await supabase
    .from("saved_faculties")
    .insert([
      {
        user_id: UserID,
        faculty_id: FacultyID,
      },
    ])
    .select()
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    data,
  };
}


export async function removeSavedFaculty(UserID: number, FacultyID: number) {
  const { data: existing } = await supabase
    .from("saved_faculties")
    .select("id")
    .eq("user_id", UserID)
    .eq("faculty_id", FacultyID)
    .single();

  if (!existing) {
    return {
      success: false,
      message: "Saved faculty not found",
    };
  }

  const { error } = await supabase
    .from("saved_faculties")
    .delete()
    .eq("user_id", UserID)
    .eq("faculty_id", FacultyID);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Faculty removed from saved",
  };
}

export async function removeSavedProffession(UserID: number, ProffessionID: number) {
  const { data: existing } = await supabase
    .from("saved_proffession")
    .select("id")
    .eq("user_id", UserID)
    .eq("faculty_id", ProffessionID)
    .single();

  if (!existing) {
    return {
      success: false,
      message: "Saved profession not found",
    };
  }

  const { error } = await supabase
    .from("saved_proffession")
    .delete()
    .eq("user_id", UserID)
    .eq("faculty_id", ProffessionID);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Profession removed from saved",
  };
}


export async function clearAllSavedFaculties(UserID: number) {
  const { error } = await supabase
    .from("saved_faculties")
    .delete()
    .eq("user_id", UserID);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "All saved faculties cleared",
  };
}

export async function clearAllSavedProffessions(UserID: number) {
  const { error } = await supabase
    .from("saved_proffession")
    .delete()
    .eq("user_id", UserID);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "All saved professions cleared",
  };
}
export async function addSavedProffession(UserID:number,ProffessionID: number,) {
  const { data: proffession, error: proffessionError } = await supabase
    .from("proffesion")
    .select("id")
    .eq("id", ProffessionID)
    .single();

      if (proffessionError || !proffession) {
    return {
      success: false,
      message: "Proffession does not exist",
    };
  }
  const { data: existing } = await supabase
    .from("saved_proffession")
    .select("id")
    .eq("user_id", UserID)
    .eq("faculty_id", ProffessionID)
    .single();

      if (existing) {
    return {
      success: false,
      message: "Already saved",
    };
  }
   const { data, error } = await supabase
    .from("saved_proffession")
    .insert([
      {
        user_id: UserID,
        faculty_id: ProffessionID,
      },
    ])
    .select()
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    data,
  };
}