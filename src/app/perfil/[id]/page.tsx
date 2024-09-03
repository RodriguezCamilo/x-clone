
interface PerfilPageProps {
  params: {
    id: string
  }
}

export default function PerfilPage({ params }: PerfilPageProps) {
  const { id } = params

  return (
    <div>
      <h1>Perfil de {id}</h1>
    </div>
  )
}