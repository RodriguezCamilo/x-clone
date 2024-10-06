"use server";

import { createClient } from "../utils/supabase/server";
import {DataUser} from "../utils/supabase/user";

export async function handleEdit(
  formData: FormData,
  userID: string,
  userName: string
) {
  const supabase = createClient();
  const dataUser = await DataUser();

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const website = formData.get("website") as string;

  if (dataUser.user?.id != userID) return;

  const { data, error } = await supabase
    .from("users")
    .update({ name, bio, location, website })
    .eq("id", userID)
    .select();
  if (error) {
    console.log(error);
  }
}

export async function handleEditAvatarUrl(avatarUrl: string, userID: string) {
  const supabase = createClient();
  const dataUser = await DataUser();

  if (dataUser.user?.id !== userID) return;

  const { data, error } = await supabase
    .from("users")
    .update({ avatar_url: avatarUrl })
    .eq("id", userID);

  if (error) {
    console.log("Error al actualizar la URL del avatar:", error);
  }
}

export async function handleEditBannerUrl(bannerUrl: string, userID: string) {
  const supabase = createClient();
  const dataUser = await DataUser();

  if (dataUser.user?.id !== userID) return;

  const { data, error } = await supabase
    .from("users")
    .update({ banner_url: bannerUrl })
    .eq("id", userID);

  if (error) {
    console.log("Error al actualizar la URL del banner:", error);
  }
}
