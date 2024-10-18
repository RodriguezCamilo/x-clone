"use server";

import { createClient } from "./server";

export async function DataUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return { user: null, error };
  }
  return { user: data.user, error: null };
}

export async function TableUser(u : string | null | undefined) {

  const supabase = createClient();

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", u)
    .single();

  return user
}
