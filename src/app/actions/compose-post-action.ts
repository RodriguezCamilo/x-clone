"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";

const supabase = createClient();

export const addPost = async (formData: FormData) => {
  const content = formData.get("content")?.toString().trim();
  if (!content) return;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return;
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({ content, user_id: userData.user.id });

  if (postError) return console.error(postError);
  revalidatePath("/");
};

export const commentPost = async (formData: FormData, post_id: string) => {
  const content = formData.get("content")?.toString().trim();
  if (!content) return;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return;
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({ content, user_id: userData.user.id, response_to: post_id });
  if (postError) return console.error(postError);
};
