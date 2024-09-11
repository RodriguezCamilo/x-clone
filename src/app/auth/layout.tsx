import DataUser from "../utils/supabase/user"
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await DataUser()
  if (user.user) {
    redirect('/')
  }

  return (
    <div className="absolute w-screen h-screen flex flex-col bg-black items-center justify-center z-50">
      {children}
    </div>
  );
}