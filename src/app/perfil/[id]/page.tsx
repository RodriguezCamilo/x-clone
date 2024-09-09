import { createClient } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"

interface PerfilPageProps {
  params: {
    id: string
  }
}


export default async function PerfilPage({ params }: PerfilPageProps) {
  const { id } = params
  const supabase = createClient()

  const { data: user, error } = await supabase
    .from('users') 
    .select('name, user_name, avatar_url')
    .eq('user_name', id)
    .single()

  if(error) {
    redirect('/')
  }

  return (
    <div className="bg-black">
      <h1>Perfil de {id}</h1>
    </div>
  )
}