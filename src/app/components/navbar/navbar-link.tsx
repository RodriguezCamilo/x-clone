'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { IconHome, IconHomeFilled, IconUser, IconUserFilled, IconMail, IconMailFilled } from '@tabler/icons-react'


export default function NavLink({ perfil }: any) {

  const pathname = usePathname()

  const links = [
    {
      name: 'Inicio',
      href: '/',
      icon: IconHome,
      filledIcon: IconHomeFilled
    },
    {
      name: 'Perfil',
      href: `/perfil/${perfil}`,
      icon: IconUser,
      filledIcon: IconUserFilled
    },
    {
      name: 'Mensajes',
      href: '/mensajes',
      icon: IconMail,
      filledIcon: IconMailFilled
    }

  ]
  return (
    <>
      {links.map((link) => {
        const LinkIcon = pathname === link.href ? link.filledIcon : link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex p-4 h-12 w-full items-center text-xl gap-4 rounded-full hover:bg-white/5 transition`}>
            <LinkIcon />
            <p>{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
