'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/server'

export async function emailLogin(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message= No se pudo autenticar')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    full_name: formData.get('name') as string,
    user_name: formData.get('user') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?message= No se pudo autenticar')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function gitHubSignIn() {
  console.log("funca")
  const supabase = createClient()
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectUrl
    }
  })

  if( error) {
    redirect('/login?message= No se pudo autenticar')
  }

  return redirect(data.url)
}