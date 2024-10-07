'use server'

import {DataUser, TableUser} from "@/app/utils/supabase/user";
import NavPerfil from "./navbar-perfil";
import Link from "next/link";
import { XIcon } from "../icons/x";

export default async function TopBar() {
  const data = await DataUser();

  const user = await TableUser(data.user?.id)

  return (
    <div className="relative flex md:hidden w-full h-10 text-white ">
      <div className="self-start">{data.user ? <NavPerfil user={user} /> : null}</div>
      <Link
        href={"/"}
        className="h-10 w-10 ml-auto flex items-center justify-center rounded-full hover:bg-white/5 transition"
      >
        <XIcon width={10} height={10} />
      </Link>
    </div>
  );
}
