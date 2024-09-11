import Link from "next/link";
import { IconMessageCircle, IconRepeat } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { formattedDate } from "@/app/utils/format-date";
import LikeButton from "../like/like";
import { fetchLikeStatus } from "@/app/actions/like-action";
import RepostDropdown from "../repost/repost";

export async function PostCard({
  userName,
  avatarUrl,
  fullName,
  content,
  likesCount,
  createdAt,
  id,
}: {
  userName: string;
  avatarUrl: string;
  fullName: string;
  content: string;
  likesCount: number;
  createdAt: string;
  id: string;
}) {
  const formattedCreatedAt = formattedDate(createdAt);
  const LikeStatus = await fetchLikeStatus({ post_id: id });

  return (
    <article className="text-left flex flex-row w-full p-4 pb-2 border-b-2 border-zinc-700 gap-2 bg-gray/0 transition hover:bg-zinc-300/5 cursor-pointer relative">
      <Link
        className="absolute inset-0 -z-10 "
        aria-hidden="true"
        href={`/posts/${id}`}
      ></Link>
      <Link href={`/perfil/${userName}`} className="flex flex-row">
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
              className="font-bold hover:underline"
            >
              {fullName}
            </Link>
            <Link
              href={`/perfil/${userName}`}
              className="font-light text-white/50"
            >
              @{userName}
            </Link>
            <p className="text-white/50">·</p>
            <p className="font-light text-white/50">{formattedCreatedAt}</p>
          </div>
          <p>{content}</p>
        </main>
        <footer className="flex flex-row w-full justify-start items-center gap-24 pt-2">
          <button>
            <IconMessageCircle className="size-5 text-white/50" />
          </button>
          <div>
            <RepostDropdown />
          </div>

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
