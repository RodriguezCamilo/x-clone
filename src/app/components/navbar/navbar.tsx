
import { XIcon } from '../icons/x'
import Link from 'next/link'
import { createClient } from '@/app/utils/supabase/server'
import NavLink from './navbar-link'
import NavPerfil from './navbar-perfil'


export default async function NavBar() {

    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    const userName = data.user?.user_metadata.user_name || 'defaultUser'

    return (
        <nav className="w-1/3 h-screen fixed flex flex-1 flex-col items-end justify-between px-4">
            <div className='flex flex-col w-72 gap-6'>
                <Link href={'/'} className='h-10 px-4 py-8 flex items-center justify-center rounded-full hover:bg-white/5 transition'><XIcon size={'8'} /></Link>
                <NavLink perfil={userName} />
            </div>
            <div>
                <NavPerfil data={data} />
            </div>

        </nav>
    )
}