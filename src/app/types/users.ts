import { type Database } from "../types/database";

type UserEntity = Database['public']['Tables']['users']['Row'] 


export type Users = UserEntity