"use server";

import { redirect } from "next/navigation";
import PostsList from "@/app/components/posts/posts-list";
import { ComposePost } from "./components/posts/compose-post";
import { createClient } from "@/app/utils/supabase/server";
import DataUser from "./utils/supabase/user";
import { Suspense } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import NavBar from "./components/navbar/navbar";
import SideBar from "./components/sidebar/sidebar";
import TopBar from "./components/navbar/topbar";

export default async function Home() {
  const supabase = createClient();

  const data = await DataUser();

  if (data.user == null || !data.user) {
    redirect("/auth/login");
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "*, user:users(name, user_name, avatar_url), likes_count, created_at, repost, repost_count, response_to"
    )
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <body className="min-h-screen w-full flex flex-col-reverse md:flex-row text-white bg-black">
      <section className="flex fixed backdrop-blur-lg top-0 md:hidden w-full h-16 items-center p-4 z-30 border border-x-0 border-t-0 border-zinc-700">
        <TopBar />
      </section>
      <header className="z-30 md:w-[8%] md:min-w-[8%] xl:min-w-[30%]">
        <NavBar />
      </header>
      <main className="bg-black flex w-full max-w-full mt-16 md:mt-0">
        <section className="flex grow xl:grow-0 h-full mx-[1px] w-full flex-col items-center pt-4 border border-y-0 border-zinc-700">
          <div className="hidden md:flex w-full">
            <ComposePost avatarUrl={data?.user?.user_metadata.avatar_url} />
          </div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full p-4">
                <IconLoader2 className="animate-spin" />
              </div>
            }
          >
            <PostsList posts={posts} />
            <div className="flex justify-center items-center w-full p-4">
              <IconLoader2 className="animate-spin" />
            </div>
          </Suspense>
        </section>
        <div className="bg-black hidden lg:flex w-full">
          <SideBar />
        </div>
      </main>
    </body>
  );
}
