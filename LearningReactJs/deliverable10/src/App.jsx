import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;