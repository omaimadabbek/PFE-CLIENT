import { SetStateAction } from "react";
import classnames from "classnames";
import "./Home.style.css";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { IProduit } from "./Categorie.type";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

type produitProps = {
  setTotal: React.Dispatch<SetStateAction<number>>;
  total: number;
  title: string;
  produitList: IProduit[];
  idCategorieSelected: number;
  detailCmd: any;
  setIdProduitSelected: React.Dispatch<SetStateAction<number>>;
  setProduit: React.Dispatch<SetStateAction<string>>;
  setModal: React.Dispatch<SetStateAction<boolean>>;
  modal: boolean;
  setDetailCmd: React.Dispatch<any>;
  numPanier: number;
  updateQuantity: boolean;
  setUpdateQuantity: React.Dispatch<SetStateAction<boolean>>;
};

export default function ProduitList({
  title,
  produitList,
  detailCmd,
  idCategorieSelected,
  updateQuantity,
  setIdProduitSelected,
  setProduit,
  setUpdateQuantity,
  setModal,
  modal,
  setDetailCmd,
  setTotal,
  total,
}: produitProps) {
  const handleClickProduit = (produit: any) => {
    setIdProduitSelected(produit.id_produit);
    setProduit(produit);
    setModal(!modal);
  };
  const handleClickPanier = (produit: any) => {
    let detail: any = {
      id: produit.id_produit,
      prix: produit.prix,
      quantity: 1,
      nomProduit: produit.nom,
    };
    setDetailCmd([...detailCmd, detail]);
    setTotal(Number(total) + Number(produit.prix));
  };
  const incrémenteQuantité = (id_produit: number, prix: number) => {
    const indexProduit = detailCmd.findIndex((el: any) => el.id === id_produit);
    detailCmd[indexProduit].quantity = detailCmd[indexProduit].quantity + 1;
    setDetailCmd(detailCmd);
    setUpdateQuantity(!updateQuantity);
    setTotal(Number(total) + Number(prix));
  };

  const décrémenteQuantité = (id_produit: number, prix: number) => {
    const indexProduit = detailCmd.findIndex((el: any) => el.id === id_produit);
    if (detailCmd[indexProduit].quantity === 1) {
      detailCmd.splice(indexProduit, 1);
    } else {
      detailCmd[indexProduit].quantity = detailCmd[indexProduit].quantity - 1;
    }
    setDetailCmd(detailCmd);
    setUpdateQuantity(!updateQuantity);
    setTotal(Number(total) - Number(prix));
  };

  return (
    <div style={{ overflow: "auto", width: "-webkit-fill-available" }}>
      {title !== "" && <div className="titre">{title}</div>}

      <div className="TemplateColumns">
        {produitList
          ?.filter(
            (element: any) =>
              idCategorieSelected === 0 ||
              element.id_categorie === idCategorieSelected
          )
          .map((produit: any) => {
            const newArray = detailCmd.filter(
              (detail: any) => detail.id === produit.id_produit
            );
            const quantity = newArray.length > 0 ? newArray[0].quantity : 0;
            return (
              <div className="cardProduit">
                <div
                  style={{
                    marginLeft: "220px",
                    fontSize: "25px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    handleClickProduit(produit);
                  }}
                >
                  <HiOutlineInformationCircle />
                </div>

                <img
                  style={{
                    height: "170px",
                    width: "188px",
                    marginBottom: "5px",
                  }}
                  src={produit.image}
                  alt=""
                />

                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {produit.nom}
                </div>
                <div
                  className="item-price"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  {produit.prix}€
                </div>
                <div
                  style={{
                    color: produit.repture_de_stock === "off" ? "green" : "red",
                    fontWeight: "bold",
                    marginTop: "-18px",
                  }}
                >
                  {produit.repture_de_stock === "off" ? (
                    <>En stock</>
                  ) : (
                    <>En repture de stock</>
                  )}
                </div>

                {detailCmd?.filter((el: any) => el.id === produit.id_produit)
                  .length === 0 ? (
                  <div style={{ marginTop: "18px" }}>
                    <button
                      className="item-cart-btn"
                      disabled={
                        produit.repture_de_stock === "off" ? false : true
                      }
                      style={{
                        background:
                          produit.repture_de_stock === "off"
                            ?" rgb(200, 142, 254)"
                            : "grey",
                      }}
                      onClick={() => {
                        handleClickPanier(produit);
                      }}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center flex-column">
                    <div className="d-flex align-items-center justify-content-center">
                      <div
                        className="icon"
                        onClick={() =>
                          décrémenteQuantité(produit.id_produit, produit.prix)
                        }
                      >
                        <IoIosRemoveCircleOutline />
                      </div>
                      <span
                        style={{
                          marginLeft: "15px",
                          marginRight: "15px",
                          marginTop: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        {quantity}
                      </span>
                      <div
                        className="icon"
                        onClick={() => {
                          incrémenteQuantité(produit.id_produit, produit.prix);
                        }}
                      >
                        <IoIosAddCircleOutline />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
