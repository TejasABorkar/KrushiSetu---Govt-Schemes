import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchemePage from "./pages/SchemePage";
import SchemeDetails from "./pages/SchemeDetails";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SchemePage />} />
        <Route path="/scheme/:id" element={<SchemeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;