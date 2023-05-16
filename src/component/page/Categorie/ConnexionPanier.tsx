/* eslint-disable jsx-a11y/anchor-is-valid */
import { SetStateAction, useEffect, useState } from "react";
import "./Home.style.css";
import "./login.style.css";

import CloseIcon from "@mui/icons-material/Close";

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
  modal2: boolean;
  setModal2: Function;
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
  modal2,
  setModal2,
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
          }}
          //***condition pour changer couleur de boutton*/
          style={{
            background:
              nameUser !== null && Object.keys(nameUser).length > 0
                ? "green"
                : "grey",
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
        {/* marginTop: "4px" */}
        <div
          style={{ fontSize: "25px" }}
          onClick={() => {
            setModal2(!modal2);
          }}
        >
          <span className="left-side">
            <span className="svgbg">
              <svg
                width="26.002"
                height="24.018"
                viewBox="0 0 26.002 24.018"
                color="black"
              >
                <path
                  id="cart"
                  d="M-13732.085,9370.008a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-13732.085,9370.008Zm-14.036,0a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5,1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-13746.121,9370.008Zm3.316-2.509a2.494,2.494,0,0,1-2.053-1.011,4.836,4.836,0,0,1-.908-2.233l-2.5-13.229c0-.007-.11-.569-.124-.646a.018.018,0,0,1-.007-.017c-.087-.422-.324-.9-.618-.991a8.459,8.459,0,0,0-1.625-.117.894.894,0,0,1-.978-.88.913.913,0,0,1,1.022-.884c1.659.014,2.567-.007,3.051.583a6.479,6.479,0,0,1,.763,1.163.625.625,0,0,0,.466.294l20.365,1.971a.363.363,0,0,1,.324.262.325.325,0,0,1,0,.162l-1,7.237a.365.365,0,0,1-.3.328l-17.362,2.937a.038.038,0,0,0-.028.038l.27,1.48a2.784,2.784,0,0,0,.722,1.626.72.72,0,0,0,.518.176h14.83a.873.873,0,0,1,.876.915.889.889,0,0,1-.9.835Z"
                  transform="translate(13751.619 -9347.492)"
                  fill="black"
                ></path>
              </svg>
            </span>
            <span className="cart-products-count">{numPanier}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
