import { createClient } from "./server"

export default async function DataUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return { user: null, error }
  }
  return { user: data.user, error: null }
}