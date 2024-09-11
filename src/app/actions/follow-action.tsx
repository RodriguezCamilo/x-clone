'use server'

import { createClient } from "@/app/utils/supabase/server";

export async function fetchFollowStatus( user_id : string) {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  const { data: followData } = await supabase
    .from("follows")
    .select("*")
    .eq("user_id", user?.user?.id)
    .eq("follows", user_id)
    .single();

  return followData;
}

export async function handleFollow( user_id: string) {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  const { data: follow } = await supabase
    .from("follows")
    .select("*")
    .eq("user_id", user?.user?.id)
    .eq("follows", user_id)
    .single();

  if (follow) {
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("user_id", user?.user?.id)
      .eq("follows", user_id);
    if (error) {
      console.error("Error al quitar el follow:", error);
      return true;
    } else {
      return false;
    }
  } else {
    const { error } = await supabase
      .from("follows")
      .insert({ user_id: user.user?.id, follows: user_id });
    if (error) {
      console.error("Error al dar follow:", error);
      return false;
    } else {
      return true;
    }
  }
}
