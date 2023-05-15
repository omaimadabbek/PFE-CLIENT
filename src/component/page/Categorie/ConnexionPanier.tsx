/* eslint-disable jsx-a11y/anchor-is-valid */
import { SetStateAction, useEffect, useState } from "react";
import "./Home.style.css";
import "./login.style.css";
import CloseIcon from "@mui/icons-material/Close";

import { FaShoppingCart } from "react-icons/fa";
import {
  Col,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Swal from "sweetalert2";

type connexionProps = {
  numPanier: number;
  nom_client: string;
  prenom_client: string;
  setTotal: React.Dispatch<SetStateAction<number>>;
  email: string;
  mot_de_passe: string;
  setMdp: React.Dispatch<React.SetStateAction<string>>;
  setNomClient: React.Dispatch<React.SetStateAction<string>>;
  setPrenomClient: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setAdresse: React.Dispatch<React.SetStateAction<string>>;
  adresse: string;
  num_telephone: number;
  setNum: React.Dispatch<SetStateAction<number>>;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  isDeConnected: boolean;
  setIsDeConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsValidePanier: React.Dispatch<SetStateAction<boolean>>;
  setDetailCmd: React.Dispatch<any>;
};
export default function Connexion({
  numPanier,
  setDetailCmd,
  setTotal,
  setIsValidePanier,
  nom_client,
  prenom_client,
  email,
  mot_de_passe,
  adresse,
  setAdresse,
  setNomClient,
  setPrenomClient,
  setEmail,
  setMdp,
  num_telephone,
  setNum,
  isConnected,
  setIsConnected,
  isDeConnected,
  setIsDeConnected,
}: connexionProps) {
  const [inscrire, setInscrire] = useState(false);

  const [, setIdentifier] = useState(false);
  const [modal, setModal] = useState(false);

  async function Connexion() {
    fetch(`${process.env.REACT_APP_API_URL}/client`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_client: nom_client,
        prenom_client: prenom_client,
        email: email,
        mot_de_passe: mot_de_passe,
        adresse: adresse,
        num_telephone: num_telephone,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire("Nouveau Client!", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Un champ vide",
          });
        }

        response.json();
      })
      .catch((error: any) => {
        console.error("There was an error!", error.message);
      });
    setModal(!modal);
  }
  //***fonction get*/
  //***ajouter condtion pour faire sweetalert2*/
  function register() {
    fetch(`${process.env.REACT_APP_API_URL}/client/${email}/${mot_de_passe}`)
      .then((res) => res.json())
      .then((result) => {
        let data = result;
        if (result.length === 1) {
          //***Enregistre les données dans localStorage*/
          //***setItem:Cette méthode est utilisée pour ajouter une clé et une valeur à localStorage*/
          localStorage.setItem("User", JSON.stringify(data[0]));
          localStorage.setItem("id_client", JSON.stringify(data[0].id_client));

          //***getItem:Cette méthode est utilisée pour obtenir un élément de localStorage à l'aide de la clé*/
          let newObject: any = window.localStorage.getItem("User");
          //***lire les données de localStorage*/
          console.log("JSON", JSON.parse(newObject));
          //***fermer popup*/
          setModal(false);
        } else {
          //***pass ou email incorrect donc affiche swalalerte d'une erreur*/
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vérifier votre compte!!",
          });
        }
      });
  }
  //***fonction pour suuprimer les données de localStorage*/
  function deconnecter() {
    localStorage.removeItem("User");
    //***fermer popup*/
    setModal(false);
  }

  const cnx = () => {
    setIdentifier(false);
    setModal(!modal);
  };

  //***mettre les données de User dans l'initialisation de var nameUser*/
  let nameUser: any = localStorage.getItem("User");
  useEffect(() => {}, [isConnected, isDeConnected]);
  return (
    <div
      style={{
        gridArea: "connexion / connexion / connexion / connexion",
        marginBottom: "3px",
        marginLeft: "auto",
        backgroundPosition: " top 25% right 0",
        textAlign: "center",
        width: "-webkit-fill-available;",
      }}
    >
      <div
        style={{
          display: "flex",
          marginRight: "20px",
          justifyContent: "center",
        }}
      >
        <button
          className="buttonCnx"
          onClick={() => {
            cnx();
            console.log(nameUser);
          }}
          //***condition pour changer couleur de boutton*/
          style={{
            background:
              nameUser !== null && Object.keys(nameUser).length > 0
                ? "green"
                : "black",
          }}
        >
          {/*condition pour pour vérifier est-ce-que dans keys il y'a des données ou non */}
          {nameUser !== null && Object.keys(nameUser).length > 0
            ? "Compte connecté"
            : "Connexion"}
        </button>
        <Modal isOpen={modal} cnx={cnx}>
          {!inscrire ? (
            nameUser !== null && Object.keys(nameUser).length > 0 ? (
              <>
                <ModalHeader cnx={cnx}>
                  Compte connecté{" "}
                  <span
                    style={{ marginLeft: "277px", cursor: "pointer" }}
                    onClick={cnx}
                  >
                    <CloseIcon />
                  </span>
                </ModalHeader>
                <ModalBody>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                      Email:
                    </Label>
                    <Col sm={10}>
                      <div className="mb-3" style={{ marginTop: "8px" }}>
                        {nameUser !== null ? JSON.parse(nameUser).email : ""}
                      </div>
                    </Col>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btnConnecter"
                    onClick={() => {
                      deconnecter();
                      setTotal(0);
                      setDetailCmd([]);
                      setIsDeConnected(!isDeConnected);
                      setIsValidePanier(false);
                    }}
                  >
                    {nameUser !== null && Object.keys(nameUser).length > 0
                      ? "Se déconnecter"
                      : "Se connecter"}
                  </button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader cnx={cnx}>
                  Connexion{" "}
                  <span
                    style={{ marginLeft: "335px", cursor: "pointer" }}
                    onClick={cnx}
                  >
                    <CloseIcon />
                  </span>
                </ModalHeader>
                <ModalBody>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                      Email:
                    </Label>
                    <Col sm={10}>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="Username"
                          aria-describedby="emailHelp"
                          placeholder=""
                          onChange={(e: any) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" sm={2}>
                      Password:
                    </Label>
                    <Col sm={10}>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder=""
                          onChange={(e: any) => {
                            setMdp(e.target.value);
                          }}
                        />
                      </div>
                    </Col>
                  </FormGroup>

                  <div
                    style={{ textAlign: "center" }}
                    onClick={() => {
                      setInscrire(true);
                    }}
                  >
                    Vous n'avez pas de compte ? <a href="#">s'inscrire</a>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    className="btnConnecter"
                    onClick={() => {
                      register();
                      setIsConnected(!isConnected);
                    }}
                  >
                    Se connecter
                  </button>
                </ModalFooter>
              </>
            )
          ) : (
            <>
              <ModalHeader>
                Inscription{" "}
                <span
                  style={{ marginLeft: "335px", cursor: "pointer" }}
                  onClick={cnx}
                >
                  <CloseIcon />
                </span>
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Email:
                  </Label>
                  <Col sm={10}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="Username"
                        aria-describedby="emailHelp"
                        placeholder=""
                        onChange={(e: any) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>
                    Password:
                  </Label>
                  <Col sm={10}>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder=""
                        onChange={(e: any) => {
                          setMdp(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleNom" sm={2}>
                    Nom
                  </Label>
                  <Col sm={10}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="Nom"
                        placeholder=""
                        onChange={(e: any) => {
                          setNomClient(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleNom" sm={2}>
                    Prenom
                  </Label>
                  <Col sm={10}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="Prenom"
                        placeholder=""
                        onChange={(e: any) => {
                          setPrenomClient(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleAdresse" sm={2}>
                    Adresse:
                  </Label>
                  <Col sm={10}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="Adresse"
                        placeholder=""
                        onChange={(e: any) => {
                          setAdresse(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleNumero" sm={2}>
                    Numero:
                  </Label>
                  <Col sm={10}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="Numero"
                        placeholder=""
                        onChange={(e: any) => {
                          setNum(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </FormGroup>
                <div
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    setInscrire(false);
                  }}
                >
                  Avez-vous un compte ? <a href="#">s'identifier</a>
                </div>
              </ModalBody>

              <ModalFooter>
                <button
                  className="btnInscrire"
                  onClick={() => {
                    Connexion();
                  }}
                >
                  S'inscrire
                </button>
              </ModalFooter>
            </>
          )}
        </Modal>

        <div style={{ fontSize: "25px" }}>
          <FaShoppingCart />
          <span
            className="cart span"
            style={{
              backgroundColor: "red",
              color: "white",
              border: "0",
              borderRadius: "50px",
              marginLeft: "5px",
            }}
          >
            {numPanier}
          </span>
        </div>
      </div>
    </div>
  );
}
