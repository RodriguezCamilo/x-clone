import { XIcon } from "../icons/x";
import Link from "next/link";
import NavLink from "./navbar-link";
import NavPerfil from "./navbar-perfil";
import { DataUser, TableUser } from "@/app/utils/supabase/user";
import PostButton from "./post-button";

export default async function NavBar() {
  const data = await DataUser();

  let user

  if (data.user != null) {
    user = await TableUser(data.user.id);
  }


  const userName = user?.user_name;
  const userAvatar = user?.avatar_url;

  return (
    <nav className="w-full border md:border-0 border-x-0 border-zinc-700 bottom-0 md:min-w-[8%] md:w-[8%] xl:w-[30%] h-16 md:h-screen fixed flex flex-row md:flex-col items-center xl:items-end justify-evenly md:justify-between xl:px-8 bg-black">
      <div className="flex flex-row md:flex-col w-full flex-1 items-center xl:items-stretch xl:w-72 justify-evenly md:justify-normal md:gap-6">
        <Link
          href={"/"}
          className="h-20 w-20 hidden md:flex items-center justify-center rounded-full hover:bg-white/5 transition"
        >
          <XIcon width={10} height={10} />
        </Link>
        {data.user ? <NavLink perfil={userName} /> : null}
        <PostButton userAvatar={userAvatar} />
      </div>

      <div className="relative hidden md:flex">
        {data.user ? <NavPerfil user={user} /> : null}
      </div>
    </nav>
  );
}
