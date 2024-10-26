"use client";

import Link from "next/link";
import CommentButton from "./comment-button";
import { IconUser } from "@tabler/icons-react";
import LikeButton from "../like/like";
import RepostDropdown from "../repost/repost";
import { RepostCard } from "./repost-card";
import { PostCardProps } from "@/app/types/post-card";
import { responseTo } from "../../actions/response-to";
import { useEffect, useState } from "react";
import { formattedDate, formattedDateMobile } from "@/app/utils/format-date";
import OptionsDropdown from "./options-dropdown";

export function PostCard({
  userId,
  userName,
  avatarUrl,
  fullName,
  content,
  likesCount,
  repost,
  repost_count,
  response_to,
  id,
  likeStatus,
  isReposted,
  loggedUser,
  imageUrl,
  createdAt,
}: PostCardProps) {
  const [resTo, setResTo] = useState<string | null>(null);

  const [formattedCreatedAt, setFormattedCreatedAt] = useState<string>();
  const [formattedCreatedAtMobile, setFormattedCreatedAtMobile] =
    useState<string>();

  const handleDate = () => {
    const formatted = formattedDate(createdAt);
    const formattedMobile = formattedDateMobile(createdAt);

    setFormattedCreatedAt(formatted);
    setFormattedCreatedAtMobile(formattedMobile);
  };

  useEffect(() => {
    const fetchResponseUser = async () => {
      if (response_to != undefined && response_to != null) {
        const resTop = await responseTo(response_to);
        if (resTop) {
          setResTo(resTop.user_name);
        }
      }
    };

    fetchResponseUser();
    handleDate();
  }, [response_to]);

  return (
    <article className="text-left flex flex-row w-full p-4 pb-2 border-b-2 border-zinc-700 gap-2 bg-gray/0 transition hover:bg-zinc-300/5 cursor-pointer relative">
      <Link
        className="absolute inset-0 z-0 "
        aria-hidden="true"
        href={`/posts/${id}`}
        prefetch={true}
      ></Link>
      <Link
        href={`/perfil/${userName}`}
        prefetch={true}
        className="flex flex-row z-10"
      >
        {avatarUrl != "Unknown" ? (
          <div className="rounded-full size-10 flex items-center justify-center">
            <img
              src={avatarUrl}
              className="object-cover rounded-full size-10"
              alt="Foto de perfil del usuario del post."
            />
          </div>
        ) : (
          <div className="rounded-full bg-zinc-500/50 size-10 flex items-center justify-center">
            <IconUser />
          </div>
        )}
      </Link>
      <div className="flex flex-col w-full">
        <main className="flex flex-col w-full">
          <div className="flex flex-row gap-1 md:gap-2 relative">
            <Link
              href={`/perfil/${userName}`}
              className="font-bold hover:underline z-10 overflow-hidden whitespace-nowrap max-w-28  md:max-w-full"
            >
              {fullName}
            </Link>
            <Link
              href={`/perfil/${userName}`}
              className="font-extralight text-white/50 z-10 overflow-hidden whitespace-nowrap max-w-28 md:max-w-full"
            >
              @{userName}
            </Link>
            <p className="text-white/50">·</p>
            <p className="font-light text-white/50 hidden md:inline whitespace-nowrap">
              {formattedCreatedAt}
            </p>
            <p className="font-light text-white/50 md:hidden whitespace-nowrap">
              {formattedCreatedAtMobile}
            </p>
            <div className="absolute right-0">
              <OptionsDropdown postId={id} userId={userId} userAvatar={avatarUrl} />
            </div>
          </div>
          {resTo != null && (
            <div className="z-10 flex flex-row gap-1 font-extralight text-white/50">
              <p>En respuesta a</p>
              <Link
                href={`/posts/${response_to}`}
                className="text-sky-500 hover:underline"
              >
                @{resTo}
              </Link>
            </div>
          )}
          <p>{content}</p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Imagen del post"
              className="w-full rounded-2xl my-2"
            ></img>
          )}
          {repost && <RepostCard repost={repost} />}
        </main>
        <footer className="flex flex-row w-full justify-between px-4 md:px-0 md:justify-start items-center md:gap-24 pt-2">
          {loggedUser && loggedUser.id !== "null" && (
            <>
              <CommentButton post_id={id} userAvatar={loggedUser?.avatar_url} />
              <RepostDropdown
                post_id={id}
                repost_count={repost_count}
                is_reposted={isReposted}
                userAvatar={loggedUser?.avatar_url}
              />
              <LikeButton
                likes_count={likesCount}
                post_id={id}
                like_status={likeStatus}
              />
            </>
          )}
        </footer>
      </div>
    </article>
  );
}
