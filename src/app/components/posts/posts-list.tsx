"use client";

import { PostCard } from "@/app/components/posts/post-card";
import { type Posts, PostWithExtras } from "../../types/posts";
import { IconLoader2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { fetchMorePosts } from "@/app/actions/post-action";

export default function PostsList({
  posts,
  userAvatar,
}: {
  posts: Posts[] | null;
  userAvatar: string;
}) {
  const [postsData, setPostsData] = useState<PostWithExtras[]>(posts || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (posts) {
      setPostsData(posts);
    }
  }, [posts]);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const { posts: newPosts, error } = await fetchMorePosts(10, page * 10);

    if (error) {
      setHasMore(false);
    } else {
      setPostsData((prevPosts) => {
        const uniquePosts = newPosts.filter(
          (newPost) =>
            !prevPosts.some((existingPost) => existingPost.id === newPost.id)
        );

        if (uniquePosts.length < 10) {
          setHasMore(false);
        }

        return [...prevPosts, ...uniquePosts];
      });

      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 10 &&
        !loading &&
        hasMore
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  if (loading && postsData.length === 0)
    return <IconLoader2 className="animate-spin p-4 text-sky-500" />;

  return (
    <>
      {postsData.map((post) => {
        const {
          id,
          user,
          content,
          likes_count,
          created_at,
          repost,
          repost_count,
          response_to,
          likeStatus,
          isReposted,
          image_url,
        } = post;

        const {
          id: userId,
          user_name: userName,
          name: fullName,
          avatar_url: avatarUrl,
        } = user;

        return (
          <PostCard
            key={id}
            id={id}
            userId={userId}
            userName={userName ?? "Unknown"}
            fullName={fullName ?? "Unknown"}
            avatarUrl={avatarUrl ?? "Unknown"}
            content={content}
            likesCount={likes_count ?? 0}
            createdAt={created_at}
            repost={repost}
            repost_count={repost_count}
            response_to={response_to}
            likeStatus={likeStatus}
            isReposted={isReposted}
            userAvatar={userAvatar}
            imageUrl={image_url}
          />
        );
      })}
    </>
  );
}
