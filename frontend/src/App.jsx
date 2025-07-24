import { SocketProvider } from './context/SocketProvider.jsx'
import './App.css'
import Template from './components/Template'

function App() {

  return (
    <SocketProvider>
      <Template></Template>
    </SocketProvider>
  )
}

export default App
