import "./Home.style.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToModeVente = () => {
    // Fonction  navigate to /ModeVente
    navigate("/ModeVente");
  };
  return (
    <div className="container">
      <img src="Home.jpg" alt="Snow" style={{ width: "100%" }} />
      <img
        src="cmd.png"
        alt=""
        style={{
          width: "300px",
          height: "70px",
          cursor: "pointer",
          marginTop: "-92px",
          display: "flex",
          marginLeft: "550px",
        }}
        //appel fonction dans fichier Home.tsx pour faire la liaison entre les pages
        onClick={navigateToModeVente}
      />
    </div>
  );
};
export default Home;
