
import { XIcon } from '../icons/x'
import Link from 'next/link'
import NavLink from './navbar-link'
import NavPerfil from './navbar-perfil'
import DataUser from '@/app/utils/supabase/user'


export default async function NavBar() {

    const data = await DataUser()
    const userName = data.user?.user_metadata.user_name || 'defaultUser'

    return (
        <nav className="w-1/3 h-screen fixed flex flex-1 flex-col items-end justify-between px-4 bg-black">
            <div className='flex flex-col w-72 gap-6'>
                <Link href={'/'} className='h-20 w-20 flex items-center justify-center rounded-full hover:bg-white/5 transition'><XIcon width={10} height={10} /></Link>
                {data.user ? <NavLink perfil={userName} /> : null}
            </div>
            <div>
            </div>
            <div className='relative'>
                {data.user ? <NavPerfil data={data} /> : null}
            </div>
        </nav>
    )
} 