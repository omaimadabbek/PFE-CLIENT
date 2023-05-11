import { Button } from "reactstrap";
import { ICategorie } from "./Categorie.type";
import "./CategorieListe.style.css";

type Props = {
  list: ICategorie[];
  setCategorieSelected: React.Dispatch<any>;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: boolean;
};
export const catCategorieList: ICategorie[] = [];
const CategorieList = (props: Props) => {
  const {
    list,
    setCategorieSelected,
    setUpdateData,
    updateData,
  } = props;

  return (
    <div>
      <article className="list-header">
        <h3>Liste de Categorie</h3>
      </article>

      {list.map((categorie: any, index: number) => {
        return (
          <tr key={categorie.id_categorie}>
            <td>{`${categorie.nom_categorie}`}</td>
            <td>
              <img src={categorie.image} alt="" style={{ maxWidth: "80px" }} />
            </td>
          </tr>
        );
      })}
    </div>
  );
};

export default CategorieList;
