"use server";

import { createClient } from "@/app/utils/supabase/server";
import { DataUser } from "../utils/supabase/user";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId: string) => {
  const supabase = createClient();
  const user = await DataUser();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .order("created_at", { ascending: false })
    .single();

  if (error) return { posts: [], error };

  if (user.user?.id == posts.user_id) {
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) return error;
    revalidatePath("/");
  }
};
