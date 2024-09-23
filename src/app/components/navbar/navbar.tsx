import { XIcon } from "../icons/x";
import Link from "next/link";
import NavLink from "./navbar-link";
import NavPerfil from "./navbar-perfil";
import DataUser from "@/app/utils/supabase/user";
import PostButton from "./post-button";

export default async function NavBar() {
  const data = await DataUser();
  const userName = data.user?.user_metadata.user_name;
  const userAvatar = data.user?.user_metadata.avatar_url

  return (
    <nav className="min-w-[8%] w-[8%] xl:w-[30%] h-screen fixed flex flex-col items-center xl:items-end justify-between xl:px-8 bg-black">
      <div className="flex flex-col w-full flex-1 items-center xl:items-stretch xl:w-72 gap-6">
        <Link
          href={"/"}
          className="h-20 w-20 flex items-center justify-center rounded-full hover:bg-white/5 transition"
        >
          <XIcon width={10} height={10} />
        </Link>
        {data.user ? <NavLink perfil={userName} /> : null}
        <PostButton userAvatar={userAvatar} />
      </div>

      <div className="relative">
        {data.user ? <NavPerfil data={data} /> : null}
      </div>
    </nav>
  );
}
