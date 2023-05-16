import { useNavigate } from "react-router-dom";
import "./Home.style.css";

const ModeVente = () => {
  const navigate = useNavigate();
  const navigateToPriseCommande = (type: string) => {
    //***Fonction  navigate to PriseCommande*/
    //***setItem:Cette méthode est utilisée pour ajouter une clé et une valeur à localStorage*/
    localStorage.setItem("ModeVente", type);
    navigate("/PriseCommande");
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center my-3 ">
        <img
          style={{
            height: "135px",
            width: "159px",
          }}
          src="dkk.png"
          alt="Responsive image"
        />
      </div>

      <div>
        <div className="d-flex justify-content-center my-3 ">
          <h5> Choisissez Votre Mode De Vente :</h5>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-sm  d-flex justify-content-center">
          <div
            className="d-flex flex-column bd-highlight mb-3"
            onClick={() => {
              //***chaque modeVente on appel la fonction avec type de ModeVente*/

              navigateToPriseCommande("livraison");
            }}
          >
            <div className="p-2 bd-highlight">
              <img
                style={{
                  height: "165%",
                  width: "100%",
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
                  height: "165%",
                  width: "100%",
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
                  height: "165%",
                  width: "100%",
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
