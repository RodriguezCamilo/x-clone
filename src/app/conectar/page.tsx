import { createClient } from "../utils/supabase/server";
import { IconArrowLeft, IconUser, IconLoader2 } from "@tabler/icons-react";
import Link from "next/link";
import FollowButton from "../components/follows/follow-button";
import { fetchFollowStatus } from "../actions/follow-action";
import { Suspense } from "react";

export default async function Conectar() {
  const supabase = createClient();

  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, name, user_name, avatar_url, created_at")
    .limit(20);

  const followStatuses = await Promise.all(
    users?.map(async (user) => ({
      ...user,
      isFollowing: await fetchFollowStatus(user.id),
    })) || []
  );

  return (
    <section className="text-left flex flex-col h-auto w-full bg-black pt-2 border border-t-0 border-zinc-700">
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full p-4">
            <IconLoader2 className="animate-spin" />
          </div>
        }
      >
        <div className="flex flex-row gap-4 px-4 pb-1 border border-x-0 border-t-0 border-zinc-700">
          <Link
            className="rounded-full size-8 hover:bg-zinc-700 transition flex items-center justify-center"
            href={"/"}
          >
            <IconArrowLeft />
          </Link>
          <h2 className="font-bold text-xl">Conectar</h2>
        </div>
        <div>
          {followStatuses.map((user) => (
            <div
              key={user.id}
              className="flex flex-row justify-between w-full hover:bg-white/5 relative p-4"
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
      </Suspense>
    </section>
  );
}
