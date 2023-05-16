import "./Home.style.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToModeVente = () => {
    //***Fonction  navigate to /ModeVente*/
    navigate("/ModeVente");
  };
  return (
    <div className="container">
      <img src="Home.jpg" className="Image-item" alt="Responsive image" />
      <div className="carousel-caption">
        <img
          src="cmd.png"
          alt=""
          className=""
          style={{ width: "34%", height: "10%" }}
          onClick={navigateToModeVente}
        />
      </div>
    </div>
  );
};
export default Home;
