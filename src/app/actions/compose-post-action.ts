"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";
import {v4 as uuidv4} from 'uuid'

const supabase = createClient();

export const addPost = async (formData: FormData) => {
  const content = formData.get("content")?.toString().trim();
  const imageFile = formData.get("image") as File | null; 

  if (!content && !imageFile) return;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return;
  }

  let imageUrl = null;


  if (imageFile) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return;
    }

    const { data: imageUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    imageUrl = imageUrlData?.publicUrl || null;
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({
      content,
      user_id: userData.user.id,
      image_url: imageUrl
    });

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
