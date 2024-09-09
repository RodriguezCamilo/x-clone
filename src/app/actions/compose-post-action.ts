'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/utils/supabase/server'

const supabase = createClient()

export const addPost = async (formData: FormData) => {

    const content = formData.get('content')?.toString().trim()
    if (!content) return

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        console.log(data)
        return
    }

    await supabase.from('posts').insert({ content, user_id: data.user.id })
    revalidatePath('/')

}