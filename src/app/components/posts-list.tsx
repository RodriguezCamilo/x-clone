import { PostCard } from "@/app/components/post-card";
import { type Posts } from "../types/posts";

export default function PostsList({ posts } : { posts: Posts[] | null }) {
    return (
        <>
            {
                posts?.map(post => {
                    const {
                        id, 
                        user,
                        content
                    } = post
                    const {
                        user_name: userName,
                        name: fullName,
                        avatar_url: avatarUrl
                    } = user
                    return (
                        <PostCard key={id} userName={userName??"Unknown"} fullName={fullName??"Unknown"} avatarUrl={avatarUrl??"Unknown"} content={content} />
                    )
                })
            }
        </>
    )

}