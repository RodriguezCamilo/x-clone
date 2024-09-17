"use server";
import Link from "next/link";
import CommentButton from "./comment-button";
import { IconUser } from "@tabler/icons-react";
import { formattedDate } from "@/app/utils/format-date";
import LikeButton from "../like/like";
import { fetchLikeStatus } from "@/app/actions/like-action";
import RepostDropdown from "../repost/repost";
import { RepostCard } from "./repost-card";
import { fetchRepostStatus } from "@/app/actions/repost-action";
import DataUser from "@/app/utils/supabase/user";
import { PostCardProps } from "./types";
import { responseTo } from "@/app/actions/response-to";

export async function PostCard({
  userName,
  avatarUrl,
  fullName,
  content,
  likesCount,
  createdAt,
  repost,
  repost_count,
  response_to,
  id,
}: PostCardProps) {
  const formattedCreatedAt = formattedDate(createdAt);
  const LikeStatus = await fetchLikeStatus({ post_id: id });
  const isReposted = await fetchRepostStatus({ post_id: id });
  const dataUser = await DataUser();
  let resTo = null;
  if (response_to) {
    resTo = await responseTo(response_to);
  }

  return (
    <article className="text-left flex flex-row w-full p-4 pb-2 border-b-2 border-zinc-700 gap-2 bg-gray/0 transition hover:bg-zinc-300/5 cursor-pointer relative">
      <Link
        className="absolute inset-0 z-0 "
        aria-hidden="true"
        href={`/posts/${id}`}
      ></Link>
      <Link href={`/perfil/${userName}`} className="flex flex-row z-10">
        {avatarUrl != "Unknown" ? (
          <img src={avatarUrl} className="rounded-full size-10" alt="" />
        ) : (
          <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
            <IconUser />
          </div>
        )}
      </Link>
      <div className="flex flex-col w-full">
        <main className="flex flex-col w-full">
          <div className="flex flex-row gap-2">
            <Link
              href={`/perfil/${userName}`}
              className="font-bold hover:underline z-10"
            >
              {fullName}
            </Link>
            <Link
              href={`/perfil/${userName}`}
              className="font-extralight text-white/50 z-10"
            >
              @{userName}
            </Link>
            <p className="text-white/50">·</p>
            <p className="font-light text-white/50">{formattedCreatedAt}</p>
          </div>
          {resTo && (
            <div className="z-10 flex flex-row gap-1 font-extralight text-white/50">
              <p>En respuesta a</p>
              <Link
                href={`/perfil/${resTo.user_name}`}
                className=" text-sky-500 hover:underline"
              >
                @{resTo.user_name}
              </Link>
            </div>
          )}
          <p>{content}</p>
          {repost && <RepostCard repost={repost} />}
        </main>
        <footer className="flex flex-row w-full justify-start items-center gap-24 pt-2">
          <CommentButton
            post_id={id}
            userAvatar={dataUser?.user?.user_metadata.avatar_url}
          />

          <RepostDropdown
            post_id={id}
            repost_count={repost_count}
            is_reposted={isReposted}
            userAvatar={dataUser?.user?.user_metadata.avatar_url}
          />

          <LikeButton
            likes_count={likesCount}
            post_id={id}
            like_status={LikeStatus}
          />
        </footer>
      </div>
    </article>
  );
}
