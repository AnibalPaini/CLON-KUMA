import { useState } from 'react'
import { SocketProvider } from './context/SocketProvider.jsx'
import './App.css'
import Header from './components/Header'
import Template from './components/Template'

function App() {

  return (
    <SocketProvider>
      <Header></Header>
      <Template></Template>
    </SocketProvider>
  )
}

export default App
