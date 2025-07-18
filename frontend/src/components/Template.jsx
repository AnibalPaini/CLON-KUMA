import React from 'react'
import ListaDispositivos from './ListaDispositivos/ListaDispositivos'

const Template = () => {
  return (
    <main className='bg-gray-700 grid grid-cols-3 h-screen'>
        <ListaDispositivos></ListaDispositivos>
        <div className='col-span-2'>

        </div>
    </main>
  )
}

export default Template