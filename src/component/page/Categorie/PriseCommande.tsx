import { useState, useEffect } from "react";
import { ICategorie, IProduit } from "./Categorie.type";
import "./Home.style.css";
import ModalCategorie from "./ModalCategorie";
import Connexion from "./ConnexionPanier";
import Pannier from "./Pannier";
import ListCategorie from "./ListCategorie";

import Valider from "./Validation";
import ProduitList from "./ProduitList";

const Categorie = () => {
  const [date, setDate] = useState("");
  const [categorieList, setCategorieList] = useState([] as ICategorie[]);
  const [produitList, setProduitList] = useState([] as IProduit[]);
  const detailCommande = 0;
  const [idDetailCommandeSelected, setIdDetailCommandeSelected] = useState(0);
  const updateData = false;
  const [idCategorieSelected, setIdCategorieSelected] = useState(0);
  const [idProduitSelected, setIdProduitSelected] = useState(0);
  const [title, setTitle] = useState("");
  const [modal, setModal] = useState(false);
  const [produit, setProduit] = useState("");
  const [detailCmd, setDetailCmd] = useState<any>([]);
  const [updateQuantity, setUpdateQuantity] = useState(false);
  const [isValidePanier, setIsValidePanier] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isDeConnected, setIsDeConnected] = useState(false);
  const [nom_client, setNomClient] = useState("");
  const [prenom_client, setPrenomClient] = useState("");
  const [mot_de_passe, setMdp] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [total, setTotal] = useState(0);
  const [num_telephone, setNum] = useState(0);


  const [date_cmd] = useState("");

  function getCategorie() {
    fetch("http://localhost:5000/categorie")
      .then(async (response) => {
        const data = await response.json();
        setCategorieList(data);
        let result: any = [];
        data.forEach((element: any, produit: any) => {
          result.push({
            value: element.id_categorie,
            label: element.nom_categorie,
          });
        });
        setListeClients(result);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function getProduit() {
    fetch("http://localhost:5000/produits")
      .then(async (response) => {
        const data = await response.json();

        setProduitList(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    getProduit();
  }, [updateData]);

  useEffect(() => {
    getCategorie();
  }, []);
  useEffect(() => { }, [isValidePanier]);

  return (
    <div>
      <div className="grid-home">
        <div
          style={{
            gridArea: "header / header / header / header",
            overflow: "auto-hidden",
            marginBottom: "2px",
          }}
        >
          <img
            src="imgPub.jpg"
            alt=""
            style={{ height: "110px", width: "100%" }}
          ></img>
        </div>
        <Connexion
          setDetailCmd={setDetailCmd}
          setTotal={setTotal}
          setIsValidePanier={setIsValidePanier}
          isDeConnected={isDeConnected}
          setIsDeConnected={setIsDeConnected}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          adresse={adresse}
          setAdresse={setAdresse}
          numPanier={detailCmd.length}
          nom_client={nom_client}
          prenom_client={prenom_client}
          email={email}
          mot_de_passe={mot_de_passe}
          setNomClient={setNomClient}
          setPrenomClient={setPrenomClient}
          setEmail={setEmail}
          setMdp={setMdp}
          num_telephone={num_telephone}
          setNum={setNum}
        />
        {isValidePanier ? (
          <div
            className=" d-flex "
            style={{
              gridArea: "content / content / content / content",
              overflow: "auto hidden",
              marginBottom: "3px",
            }}
          >
            <Valider
              detailCommande={detailCommande}
              idDetailCommandeSelected={idDetailCommandeSelected}
              setIsValidePanier={setIsValidePanier}
              setAdresse={setAdresse}
              setDetailCmd={setDetailCmd}
              setDate={setDate}
              date_cmd={date_cmd}
              total={total}
              setTotal={setTotal}
              adresse={adresse}
            
             
              setIdDetailCommandeSelected={setIdDetailCommandeSelected}
              date={date}
              detailCmd={detailCmd}
            />
          </div>
        ) : (
          <div
            className=" d-flex "
            style={{
              gridArea: "content / content / content / content",
              overflow: "auto hidden",
              marginBottom: "3px",
            }}
          >
            <ListCategorie
              categorieList={categorieList}
              idCategorieSelected={idCategorieSelected}
              setIdCategorieSelected={setIdCategorieSelected}
              setTitle={setTitle}
            />

            <ProduitList
              title={title}
              produitList={produitList}
              idCategorieSelected={idCategorieSelected}
              detailCmd={detailCmd}
              setIdProduitSelected={setIdProduitSelected}
              setProduit={setProduit}
              setModal={setModal}
              modal={modal}
              setDetailCmd={setDetailCmd}
              numPanier={detailCmd.length}
              updateQuantity={updateQuantity}
              setUpdateQuantity={setUpdateQuantity}
              total={total}
              setTotal={setTotal}
            />
            <Pannier
              total={total}
              setTotal={setTotal}
              detailCmd={detailCmd}
              setDetailCmd={setDetailCmd}
              setIsValidePanier={setIsValidePanier}
              setUpdateQuantity={setUpdateQuantity}
              updateQuantity={updateQuantity}
              isConnected={isConnected}
              isDeConnected={isDeConnected}
            />
          </div>
        )}
      </div>

      <div className="footer">
        {" "}
        <h5>&copy; www.Dabbek.in || All Right Reserved</h5>
      </div>
      <ModalCategorie modal={modal} setModal={setModal} produit={produit} />
    </div>
  );
};

export default Categorie;

function setListeClients(result: any) {
  throw new Error("Function not implemented.");
}
