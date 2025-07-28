import { SocketProvider } from "./context/SocketProvider.jsx";
import { SocketDataProvider } from "./context/SocketDataContext.jsx";
import "./App.css";
import Template from "./components/Template";

function App() {
  return (
    <SocketProvider>
      <SocketDataProvider>
        <Template />
      </SocketDataProvider>
    </SocketProvider>
  );
}

export default App;
