"use server";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  IconArrowLeft,
  IconCalendar,
  IconUser,
  IconLoader2,
} from "@tabler/icons-react";
import Link from "next/link";
import { formattedMonthYear } from "@/app/utils/format-date";
import DataUser from "@/app/utils/supabase/user";
import PostsList from "@/app/components/posts/posts-list";
import { fetchFollowStatus } from "../../actions/follow-action";
import FollowButton from "@/app/components/follows/follow-button";
import { Suspense } from "react";
import EditButton from "@/app/components/perfil/edit-button";
import NavBar from "@/app/components/navbar/navbar";
import SideBar from "@/app/components/sidebar/sidebar";

interface PerfilPageProps {
  params: {
    id: string;
  };
}

export default async function PerfilPage({ params }: PerfilPageProps) {
  const { id } = params;
  const supabase = createClient();

  const LogedUser = await DataUser();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, name, user_name, avatar_url, created_at, bio")
    .eq("user_name", id)
    .single();

  if (userError) {
    redirect("/");
  }
  console.log(user.avatar_url)
  const userId = user.id;

  const userCreatedAt = formattedMonthYear(user.created_at);

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(
      "*, user:users(name, user_name, avatar_url), likes_count, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const manyPosts = posts?.length;

  const isFollowing = await fetchFollowStatus(user.id);

  return (
    <body className="min-h-screen w-full flex flex-col-reverse md:flex-row text-white bg-black">
      <header className="z-30 md:w-[8%] md:min-w-[8%] xl:min-w-[30%]">
        <NavBar />
      </header>
      <main className="bg-black flex w-full">
        <section className="text-left max-w-[700px] flex flex-col h-auto w-full bg-black pt-2 border border-t-0 border-zinc-700">
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full p-4">
                <IconLoader2 className="animate-spin" />
              </div>
            }
          >
            <div className="flex flex-row gap-4 px-4 pb-1">
              <Link
                className="rounded-full size-8 hover:bg-zinc-700 transition flex items-center justify-center"
                href={"/"}
              >
                <IconArrowLeft />
              </Link>
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">{user.name}</h2>
                <p className="font-light text-sm text-white/50">
                  {manyPosts} posts
                </p>
              </div>
            </div>
            <div className="bg-zinc-600 h-52 w-full relative">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  className="rounded-full size-32 absolute bottom-[-31%] left-4 border-4 border-black"
                ></img>
              ) : (
                <IconUser className="rounded-full size-32 absolute bottom-[-31%] left-4 border-4 border-black bg-zinc-700" />
              )}
            </div>
            <div className="flex flex-row justify-end items-center w-full p-4">
              {LogedUser.user?.id == user.id ? (
                <EditButton user={user} />
              ) : (
                <FollowButton user_id={userId} follow_status={isFollowing} />
              )}
            </div>
            <div className="flex flex-col px-4">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <h3 className="text-white/50 text-sm">@{user.user_name}</h3>
            </div>
            <div className="p-4">
              {user.bio ? (
                <p>{user.bio}</p>
              ) : (
                <p className="text-white/50">
                  Este usuario no ha proporcionado informacion.
                </p>
              )}
            </div>
            <div className="flex flex-row p-4 text-white/50 gap-1">
              <IconCalendar className="size-5" />
              <p>Se unió en {userCreatedAt}</p>
            </div>
            <div className="grid grid-cols-3 w-full border border-x-0 border-t-0 border-zinc-700">
              <button className="py-4 font-semibold hover:bg-white/5 transition">
                Posts
              </button>
              <button className="py-4 text-white/50 hover:bg-white/5 transition">
                Respuestas
              </button>
              <button className="py-4 text-white/50 hover:bg-white/5 transition">
                Fotos y videos
              </button>
            </div>
          </Suspense>
          <section className="px-[1px] md:px-0">
            <Suspense
              fallback={
                <div className="flex justify-center items-center w-full">
                  <IconLoader2 className="animate-spin" />
                </div>
              }
            >
              <PostsList posts={posts} />
            </Suspense>
          </section>
        </section>
        <div className="bg-black hidden lg:block w-full">
          <SideBar />
        </div>
      </main>
    </body>
  );
}
