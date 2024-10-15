import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";
import { IconUser } from "@tabler/icons-react";
import FollowButton from "../follows/follow-button";
import { fetchFollowStatus } from "@/app/actions/follow-action";
import { Users } from "@/app/types/users";

export default async function WhoFollow() {
  const supabase = createClient();

  let { data: users, error: userError } = await supabase.rpc("get_random_user");

  if (userError) {
    console.error(userError);
    return <div>Error al cargar usuarios</div>;
  }

  const followStatuses = await Promise.all(
    users?.map(async (user: Users) => ({
      ...user,
      isFollowing: await fetchFollowStatus(user.id),
    })) || []
  );

  return (
    <div className="flex flex-col w-full border border-zinc-700 rounded-lg">
      <h2 className="text-xl font-bold pt-2 px-4">A quién seguir</h2>
      <div className="flex flex-col py-4 gap-2">
        {followStatuses.map((user) => (
          <div
            key={user.id}
            className="flex flex-row items-center space-x-4 hover:bg-white/5 transition z-0 justify-between relative"
          >
            <Link
              href={`/perfil/${user.user_name}`}
              className="absolute inset-0 z-0"
            ></Link>
            <div className="flex flex-row gap-2 items-center">
              <div className="">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.user_name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
                    <IconUser />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className=" text-white/50 font-light">@{user.user_name}</p>
              </div>
            </div>

            <div className="pr-4 z-10">
              <FollowButton
                user_id={user.id}
                follow_status={user.isFollowing}
              />
            </div>
          </div>
        ))}
      </div>
      <Link
        href={"/conectar"}
        className="w-full hover:bg-white/5 px-4 py-3 text-sky-600"
      >
        Mostrar más
      </Link>
    </div>
  );
}
