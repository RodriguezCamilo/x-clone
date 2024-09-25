
export interface PostCardProps {
    userName: string;
    avatarUrl: string;
    fullName: string;
    content: string;
    likesCount: number;
    createdAt: string;
    id: string;
    repost: string | null;
    repost_count: number;
    response_to: string | null;
  }