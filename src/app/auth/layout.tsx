import {DataUser} from "../utils/supabase/user"
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await DataUser()
  if (user.user) {
    redirect('/')
  }

  return (
    <html lang="es">
      <body className="min-h-screen w-full bg-black">{children}</body>
    </html>
  );
}