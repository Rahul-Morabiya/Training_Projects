import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleTheme } = useAppContext();

  return (
    <div className="card" style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>💧 HydroTask</h2>

      <div>
        <button onClick={() => navigate("/")}>Dashboard</button>
        <button onClick={() => navigate("/stats")}>Stats</button>
        <button onClick={toggleTheme}>🌙</button>
      </div>
    </div>
  );
};

export default Navbar;