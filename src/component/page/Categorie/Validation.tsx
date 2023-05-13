import { SetStateAction } from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { GrLocation } from "react-icons/gr";

import { Button, Card, CardText, CardTitle, Col, Input } from "reactstrap";
import Swal from "sweetalert2";

type valideProps = {
  detailCommande: any;
  date: string;
  setIsValidePanier: React.Dispatch<SetStateAction<boolean>>;
  setDate: React.Dispatch<SetStateAction<string>>;
  idDetailCommandeSelected: number;
  date_cmd: string;
  total: number;
  setTotal: React.Dispatch<SetStateAction<number>>;
  setAdresse: React.Dispatch<SetStateAction<string>>;
  adresse: string;

  setIdDetailCommandeSelected: (value: SetStateAction<number>) => void;
  setDetailCmd: React.Dispatch<any>;
  detailCmd: any;
};
export default function Valider({
  setIsValidePanier,
  setAdresse,
  setDate,
  date_cmd,
  total,
  setTotal,
  adresse,
  setDetailCmd,
  detailCmd,
}: valideProps) {
  const idClient = localStorage.getItem("id_client");

  async function detailCmds(idCmd: any, ligneCmd: any) {
    fetch(`${process.env.REACT_APP_API_URL}/detail_commandes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date_detail_cmd: date_cmd,
        id_commandes: idCmd,
        designation: ligneCmd.nomProduit,
        quantité: ligneCmd.quantity,
        prix: ligneCmd.prix,
        id_client: idClient,
      }),
    })
      .then((response) => {})
      .catch((error: any) => {
        console.error("There was an error!", error.message);
      });
  }
  async function MaCommande() {
    fetch(`${process.env.REACT_APP_API_URL}/commandes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date_cmd: date_cmd,
        totalcommande: total,
        id_client: idClient,
        etat_commande: "3",
        mdv: mdv,
        adresse: adresse,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire("Commande!", "success");
        } else {
        }

        response.json().then((result) => {
          const idCmd = result.id_commandes;
          // eslint-disable-next-line array-callback-return
          detailCmd.map((element: any) => {
            detailCmds(idCmd, element);
          });
        });
      })
      .catch((error: any) => {
        console.error("There was an error!", error.message);
      });
  }

  //getItem:Cette méthode est utilisée pour obtenir un élément de localStorage à l'aide de la clé
  const mdv = localStorage.getItem("ModeVente");

  console.log("mdv", mdv);

  return (
    <div>
      <Button
        className="btnValider"
        style={{ marginTop: "15px", marginLeft: "5px" }}
        onClick={() => {
          setIsValidePanier(false);
        }}
      >
        {" "}
        Back
      </Button>

      <Col style={{ marginLeft: "300px", width: "100%", marginTop: "-45px" }}>
        <Card body>
          <CardTitle tag="h5">
            <FaClipboardList /> Votre Commande Chez Dabbek
          </CardTitle>

          <CardText tag="h5" style={{ marginTop: "8px" }}>
            <div className="d-flex justify-content-between">
              {/* pour l'affichage de mot selon modeVente  */}
              {mdv === "livraison" && <div>Livraison</div>}
              {mdv === "emporter" && <div>A Emporter</div>}
              {mdv === "sur place" && <div>Sur Place </div>}
            </div>
            <div>
              <Input
                id="exampleDate"
                name="date"
                placeholder="date placeholder"
                type="date"
                onChange={(e: any) => {
                  setDate(e.target.value);
                }}
                style={{ marginTop: "8px" }}
              />
            </div>{" "}
          </CardText>

          <CardTitle tag="h5">
            <MdOutlinePayment /> Moyens de paiement
          </CardTitle>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            style={{ marginTop: "8px" }}
          >
            <option>Choisissez un moyen de paiement</option>
            <option>Espèces</option>
            <option>Carte Bancaire</option>
            <option>Transfert d'argent</option>
          </Input>

          {mdv === "livraison" && (
            <div>
              <CardTitle tag="h5">
                <GrLocation /> Adresse
              </CardTitle>
              <Input
                id="exampleAdresse"
                name="adresse"
                placeholder="Adresse"
                type="text"
                onChange={(e: any) => {
                  setAdresse(e.target.value);
                }}
                style={{ marginTop: "8px" }}
              />
            </div>
          )}

          <CardTitle tag="h5" style={{ marginTop: "10px" }}>
            Total:{total}
          </CardTitle>

          <Button
            className="btnValider"
            onClick={() => {
              setIsValidePanier(false);
              setTotal(0);
              setDetailCmd([]);
              MaCommande();
            }}
            style={{ marginTop: "15px" }}
          >
            Ma commande
          </Button>
        </Card>
      </Col>
    </div>
  );
}
