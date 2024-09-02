import { IconHome, IconUser } from '@tabler/icons-react'
import { XIcon } from '../icons/x'

export function NavBar() {
    return (
        <nav className="w-full flex flex-1 flex-col items-end px-4">
            <div className='flex flex-1 flex-col w-72 gap-6 items-start'>
                <button className='h-10 px-4 py-8 flex items-center justify-center rounded-full hover:bg-white/5 transition'><XIcon /></button>
                <button className='flex p-4 flex-row h-12 items-center text-xl gap-4 rounded-full hover:bg-white/5 transition'> <IconHome className='size-8' /> Inicio</button>
                <button className='flex p-4 flex-row h-12 items-center text-xl gap-4 rounded-full hover:bg-white/5 transition'> <IconUser className='size-8' /> Perfil</button>
            </div>
        </nav>
    )
}