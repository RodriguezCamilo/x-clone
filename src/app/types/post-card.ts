import { type Users } from "./users";

export interface PostCardProps {
  userId: string;
  userName: string;
  avatarUrl: string;
  fullName: string;
  content: string;
  likesCount: number;
  createdAt: string;
  id: string;
  repost: string | null;
  repost_count: number;
  response_to: any | null;
  likeStatus?: number;
  isReposted?: boolean;
  loggedUser?: Users | null;
  imageUrl?: string | null;
}
