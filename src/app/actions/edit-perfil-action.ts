"use server";

import { createClient } from "../utils/supabase/server";
import DataUser from "../utils/supabase/user";

export async function handleEdit(
  formData: FormData,
  userID: string,
  userName: string
) {
  const supabase = createClient();
  const dataUser = await DataUser();

  console.log(userName)

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;

  if (dataUser.user?.id != userID) return;

  const { data, error } = await supabase
    .from("users")
    .update({ name, bio, location })
    .eq("id", userID)
    .select();
  if (error) {
    console.log(error);
  } 
}
