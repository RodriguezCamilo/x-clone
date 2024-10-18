"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/server";

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return "Usuario o contraseña incorrectos.";
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const user = (formData.get("user") as string).trim();
  const email = (formData.get("email") as string).trim();
  const password = (formData.get("password") as string).trim();
  const name = (formData.get("name") as string).trim();

  if (!user || !email || !password || !name) {
    return { error: "Todos los campos son obligatorios." };
  }

  if (/\s/.test(user)) {
    return {
      error: "El nombre de usuario no puede contener espacios en blanco.",
    };
  }

  const { data: existingUser, error: queryError } = await supabase
    .from("users")
    .select("user_name")
    .eq("user_name", user)
    .maybeSingle();

  if (queryError) {
    console.error("Error al verificar el nombre de usuario:", queryError);
    return { error: "Hubo un error al verificar el nombre de usuario." };
  }

  if (existingUser) return { error: "El nombre de usuario ya está en uso." };

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        full_name: name,
        user_name: user,
      },
    },
  });

  if (signUpError) {
    console.error("Error al registrar el usuario:", signUpError);
    return { error: `Error: ${signUpError.message}` };
  }

  revalidatePath("/", "layout");
  redirect("/");

  return { success: "Registro exitoso." };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function gitHubSignIn() {
  const supabase = createClient();
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    redirect("/login?message= No se pudo autenticar");
  }

  return redirect(data.url);
}
