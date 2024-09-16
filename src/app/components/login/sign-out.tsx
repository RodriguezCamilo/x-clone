import { signOut } from "@/app/auth/login/actions";

export default function SignOut({userName}:{userName:string}) {
  
    function handleSignOut() {
        signOut()
    }

    return (
    <button
      className=" rounded-t-xl px-4 py-3 font-bold  hover:bg-white/5 w-full text-left flex flex-row gap-2"
      role="menuitem"
      onClick={handleSignOut}
    >
      Cerrar la sesion de {userName}
    </button>
  );
}
