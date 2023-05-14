import { useNavigate } from "react-router-dom";
import "./Home.style.css";

const ModeVente = () => {
  const navigate = useNavigate();
  const navigateToPriseCommande = (type: string) => {
    // Fonction  navigate to PriseCommande
    //setItem:Cette méthode est utilisée pour ajouter une clé et une valeur à localStorage
    localStorage.setItem("ModeVente", type);
    navigate("/PriseCommande");
  };
  return (
    <div className="container">
      <div>
        <div className="p-2 bd-highlight">
          <img
            style={{
              height: "135px",

              width: "159px",
              marginBottom: "-133px",
              marginLeft: "565px",
             
            }}
            src="dkk.png"
            alt=""
          />
        </div>
        <div className="d-flex justify-content-center text">
          Choisissez Votre Mode De Vente :
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-sm  d-flex justify-content-center">
          <div
            className="d-flex flex-column bd-highlight mb-3"
            onClick={() => {
              //chaque modeVente on appel la fonction avec type de ModeVente
              navigateToPriseCommande("livraison");
            }}
          >
            <div className="p-2 bd-highlight">
              <img
                style={{
                  height: "170px",

                  width: "188px",
                  marginBottom: "5px",
                  marginLeft: "50px",
                  cursor: "pointer",
                }}
                src="livrAISON.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-sm  d-flex justify-content-center">
          <div className="d-flex flex-column bd-highlight mb-3">
            <div
              className="p-2 bd-highlight"
              onClick={() => {
                navigateToPriseCommande("emporter");
              }}
            >
              <img
                style={{
                  height: "170px",
                  width: "188px",
                  marginBottom: "5px",
                  marginLeft: "50px",
                  cursor: "pointer",
                }}
                src="AEMPOrter.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-sm  d-flex justify-content-center">
          <div
            className="d-flex flex-column bd-highlight mb-3"
            onClick={() => {
              navigateToPriseCommande("sur place");
            }}
          >
            <div className="p-2 bd-highlight">
              <img
                style={{
                  height: "170px",
                  width: "188px",
                  marginBottom: "5px",
                  marginLeft: "50px",
                  cursor: "pointer",
                }}
                src="PLACE.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModeVente;
