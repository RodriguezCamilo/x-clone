import React from 'react'

function Project() {
  return (
    <div className="flex flex-col w-full border border-zinc-700 rounded-lg p-4">
        <h2 className="text-xl font-bold">Sobre este proyecto</h2>
        <p>Este es un proyecto personal con el cual queria aprender que se necesita para hacer una red social usando X como base, todas las funcionalidades basicas, como usuarios y sesiones, postear, editar post, eliminar post, repostear, likes, comentarios, etc. Ya que no tenia conocimientos sobre NextJs o SQL, decidi meterme en este desafio con estas tecnologias asi el aprendizaje seria el maximo posible.</p>
        <a href="https://github.com/RodriguezCamilo/x-clone" target='_blank' className='hover:underline text-sky-500'>Repositorio en GitHub</a>
    </div>
  )
}

export default Project