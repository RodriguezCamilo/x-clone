import Link from "next/link"
import {IconUser} from '@tabler/icons-react'
import {NavPerfilProps} from './types'

export default function NavPerfil({ data }: NavPerfilProps) {

    const userName = data.user?.user_metadata.user_name || 'defaultUser'
    const name = data.user?.user_metadata.full_name || 'defaultUser'
    const avatarUrl = data.user?.user_metadata.avatar_url

  return (
    <Link href={`/perfil/${userName}`} className='h-10 px-4 py-8 flex flex-row items-center justify-center rounded-full hover:bg-white/5 transition gap-2'>
      {avatarUrl? <img src={avatarUrl} className="rounded-full size-10" alt="" /> : <div className='rounded-full bg-zinc-500/50 size-10 flex items-center justify-center'><IconUser /></div>}
        <div className="flex flex-col">
            <h3 className="font-bold ">{name}</h3>
            <p className="font-light text-white/50">@{userName}</p>
        </div>
    </Link>
  )
}
