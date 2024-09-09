
export interface NavPerfilProps {
  data: {
    user?: {
      user_metadata: {
        user_name?: string;
        full_name?: string;
        avatar_url?: string;
      }
    } | null
  }
}

export interface NavLinkProps {
  perfil: string;
}
