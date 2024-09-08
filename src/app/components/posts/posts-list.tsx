
import { PostCard } from "@/app/components/posts/post-card";
import { type Posts } from "../../types/posts";

export default function PostsList({ posts } : { posts: Posts[] | null }) {
    if (!posts) return <div>Loading...</div>
    return (
        <>
            {
                posts.map(post => {
                    const {
                        id, 
                        user,
                        content,
                        likes_count,
                        created_at
                    } = post
                    const {
                        user_name: userName,
                        name: fullName,
                        avatar_url: avatarUrl
                    } = user
                    return (
                        <PostCard key={id} id={id} userName={userName??"Unknown"} fullName={fullName??"Unknown"} avatarUrl={avatarUrl??"Unknown"} content={content} likesCount = {likes_count ?? 0} createdAt = {created_at} />
                    )
                })
            }
        </>
    )

}