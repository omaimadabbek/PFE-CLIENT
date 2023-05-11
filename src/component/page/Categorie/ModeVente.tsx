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
    <div>
      <h3
        style={{
          textAlign: "center",
          marginTop: "130px",
          fontFamily: "bold",
          textDecoration: "underline",
        }}
      >
        {" "}
        Choisissez Votre Mode De Vente :
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "30px",
          width: "100%",
        }}
      >
        <div
          className="d-flex justify-content-between"
          style={{
            marginLeft: "-30px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          <div
            className="cardModeVente"
            onClick={() => {
              //chaque modeVente on appel la fonction avec type de ModeVente
              navigateToPriseCommande("livraison");
            }}
          >
            <img
              style={{
                height: "170px",

                width: "188px",
                marginBottom: "5px",
                marginLeft: "50px",
              }}
              src="livraison.jpg"
              alt=""
            />
            <div
              style={{
                textAlign: "center",
                fontFamily: "bold",
              }}
            >
              Livraison
            </div>
          </div>
          <div
            className="cardModeVente"
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
              }}
              src="emporter.png"
              alt=""
            />

            <div
              style={{
                textAlign: "center",
                fontFamily: "bold",
              }}
            >
              A Emporter
            </div>
          </div>
          <div
            className="cardModeVente"
            onClick={() => {
              navigateToPriseCommande("sur place");
            }}
          >
            <img
              style={{
                height: "170px",
                width: "188px",
                marginBottom: "5px",
                marginLeft: "50px",
              }}
              src="surPlace3.jpg"
              alt=""
            />

            <div
              style={{
                textAlign: "center",
                fontFamily: "bold",
              }}
            >
              Sur Place
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModeVente;
