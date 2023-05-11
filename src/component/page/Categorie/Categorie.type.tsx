export interface ICategorie {
  id_categorie: string;
  nom_categorie: string;
  image: string;
}

export enum PageEnum {
  list,
}
export interface IProduit {
  id_produit: string;
  id_categorie: string;
  nom: string;
  prix: string;
  image: string;
  repture_de_stock: string;
  description: string;
}
