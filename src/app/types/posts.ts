import { type Database } from "../types/database";

type PostEntity = Database['public']['Tables']['posts']['Row'] 
type UserEntity = Database['public']['Tables']['users']['Row'] 

export type Posts = PostEntity & {
    user: UserEntity
}

export type Users = UserEntity

export interface PostWithExtras extends Posts {
    resTo?: any; 
    likeStatus?: number; 
    isReposted?: boolean;
    userAvatar?: string; 
    imageUrl?: string;
  }