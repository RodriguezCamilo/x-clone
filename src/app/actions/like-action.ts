'use server'


import { createClient } from '@/app/utils/supabase/server'

export async function handleLike({ post_id }: any) {

    const supabase = createClient()

    const { data: user } = await supabase.auth.getUser()

    const { data: like } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', post_id)
        .eq('user_id', user?.user?.id)
        .single();
    if (like) {
        // Si ya dio like, eliminar el like
        const { error } = await supabase
            .from('likes')
            .delete()
            .eq('post_id', post_id)
            .eq('user_id', user?.user?.id);

        if (error) {
            console.error('Error al quitar el like:', error);
            return true
        } else {
            return false
        }
    } else {
        // Si no ha dado like, insertar el like
        const { error } = await supabase
            .from('likes')
            .insert({ post_id: post_id, user_id: user?.user?.id });

        if (error) {
            console.error('Error al dar like:', error);
            return false
        } else {
            return true
        }
    }

}


export async function fetchLikeStatus({ post_id }: any) {

    const supabase = createClient()

    const { data: user } = await supabase.auth.getUser()

    const { data: likeData } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', post_id)
        .eq('user_id', user?.user?.id)
        .single();

    return likeData
}