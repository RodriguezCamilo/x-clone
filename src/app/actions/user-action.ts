"use server";

import { createClient } from "@/app/utils/supabase/server";

const supabase = createClient();

export const getUser = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error obteniendo usuario:", error);
    return [];
  }
  return data;
};
