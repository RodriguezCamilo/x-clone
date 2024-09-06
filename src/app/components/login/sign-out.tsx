

import { signOut } from "@/app/auth/login/actions"

export default async function SignOut() {
    return (
        <form action={signOut}><button >Desconectar</button></form>
        
    )
}