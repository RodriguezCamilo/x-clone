import { type Database } from "../types/database";

type PostEntity = Database['public']['Tables']['posts']['Row'] 
type UserEntity = Database['public']['Views']['users']['Row'] 

export type Posts = PostEntity & {
    user: UserEntity
}