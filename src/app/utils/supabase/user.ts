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

export async function TableUser(u : string) {

  const supabase = createClient();

  const { data: user } = await supabase
    .from("users")
    .select("id, avatar_url, user_name, name, created_at, bio, website, location, banner_url")
    .eq("id", u)
    .single();

  return user
}
