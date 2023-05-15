import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import "./Home.style.css";
import { Table } from "reactstrap";
import { SetStateAction, useEffect } from "react";
import Swal from "sweetalert2";

type pannierProps = {
  detailCmd: any;
  setDetailCmd: React.Dispatch<any>;
  setIsValidePanier: React.Dispatch<SetStateAction<boolean>>;
  updateQuantity: boolean;
  setUpdateQuantity: React.Dispatch<SetStateAction<boolean>>;
  total: number;
  setTotal: React.Dispatch<SetStateAction<number>>;
  isConnected: boolean;
  isDeConnected: boolean;
};
export default function Pannier({
  detailCmd,
  setDetailCmd,
  setIsValidePanier,
  setUpdateQuantity,
  updateQuantity,
  setTotal,
  total,
  isConnected,
  isDeConnected,
}: pannierProps) {
  console.log("detailCmd", detailCmd);

  const décrémenteQuantité = (id_produit: number, prix: number) => {
    
    //* findIndex: renvoie l'index du premier élément du tableau qui satisfait une condition*/

    const indexProduit = detailCmd.findIndex((el: any) => el.id === id_produit);
    if (detailCmd[indexProduit].quantity === 1) {
      detailCmd.splice(indexProduit, 1);
    } else {
      detailCmd[indexProduit].quantity = detailCmd[indexProduit].quantity - 1;
    }
    console.log("detailCmd", detailCmd);
    setDetailCmd(detailCmd);
    setUpdateQuantity(!updateQuantity);
    setTotal(Number(total) - Number(prix));
  };

  const incrémenteQuantité = (id_produit: number, prix: number) => {
    const indexProduit = detailCmd.findIndex((el: any) => el.id === id_produit);

    detailCmd[indexProduit].quantity = detailCmd[indexProduit].quantity + 1;
    console.log("indx", indexProduit);
    console.log("detailCmd", detailCmd);
    setDetailCmd(detailCmd);
    setUpdateQuantity(!updateQuantity);
    setTotal(Number(total) + Number(prix));
  };

  const mdv = localStorage.getItem("ModeVente");
  console.log("mdv", mdv);

  useEffect(() => {}, [updateQuantity]);
  return (
    <div className="cardPanier" style={{ width: "30rem" }}>
      <div
        style={{
          width: "-webkit-fill-available",
          marginLeft: "5px",
        }}
      >
        {/*condition pour véerifier que le champ panier vide ou non*/}
        {detailCmd.length === 0 ? (
          <div className="vide">votre panier est vide </div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
                <th>prix</th>
              </tr>
            </thead>
            <tbody>
              {/* */}
              {detailCmd?.map((produit: any) => {
                return (
                  <tr>
                    <th scope="row">
                      <div style={{ fontFamily: "cursive" }}>
                        {" "}
                        {produit.nomProduit}
                      </div>
                    </th>

                    <td className="align-middle">
                      <div>
                        <div className="d-flex align-items-center flex-column">
                          <div className="d-flex align-items-center justify-content-center">
                            <div
                              onClick={() =>
                                décrémenteQuantité(produit.id, produit.prix)
                              }
                              className="icon"
                            >
                              {" "}
                              <IoIosRemoveCircleOutline />
                            </div>

                            {produit.quantity}

                            <div
                              style={{}}
                              onClick={() => {
                                incrémenteQuantité(produit.id, produit.prix);
                              }}
                              className="icon"
                            >
                              <IoIosAddCircleOutline />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div>
                        <p
                          className="mb-0"
                          style={{ fontWeight: "500", marginTop: "-9px" }}
                        >
                          {produit.prix}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <p>Total : {total} $</p>

            <button
              id="confirm-command"
              className="buttonPanierQ"
              onClick={() => {
                //***getItem:Cette méthode est utilisée pour obtenir un élément de localStorage à l'aide de la clé*/

                if (localStorage.getItem("User") === null) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Vérifier votre compte!!",
                    footer: '<a href="">Quitter</a>',
                  });
                } else {
                  setIsValidePanier(true);
                }
              }}
            >
              Valider
            </button>
          </Table>
        )}
      </div>
    </div>
  );
}
