import { SetStateAction} from "react";
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
  numPanier,
}: produitProps) {
  const handleClickProduit = (produit: any) => {
    setIdProduitSelected(produit.id_produit);
    setProduit(produit);
    setModal(!modal);
  };
  const handleClickPanier = (produit: any) => {
    let detail: any = {
      //let: c'est un variable
      id: produit.id_produit,
      prix: produit.prix,
      quantity: 1,
      nomProduit: produit.nom,
    };
    setDetailCmd([...detailCmd, detail]);
    setTotal(Number(total) + Number(produit.prix));
    //console.log("mdv", mdv);
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

  const décrémenteQuantité = (id_produit: number, prix: number) => {
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

  return (
    <div style={{ overflow: "auto", width: "-webkit-fill-available" }}>
      {title !== "" && <div className="titre">{title}</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          // gap: "30px",
          width: "100%",
          textAlign: "center",
        }}
      >
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
                    fontVariant: "small-caps",
                    marginBottom: "20px",
                  }}
                >
                  {produit.prix}$
                </div>

                {detailCmd?.filter((el: any) => el.id === produit.id_produit)
                  .length === 0 ? (
                  <button
                    className="item-cart-btn "
                    onClick={() => {
                      handleClickPanier(produit);
                    }}
                  >
                    Add To Cart
                  </button>
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
