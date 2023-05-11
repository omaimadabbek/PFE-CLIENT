import { useRoutes } from "react-router-dom";
import ModeVente from "./component/page/Categorie/ModeVente";
import Home from "./component/page/Categorie/Home";
import PriseCommande from "./component/page/Categorie/PriseCommande";






export default function Router() {
  return useRoutes([
    {
      
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/ModeVente",
          element: <ModeVente />,
        },
        {
          path: "/PriseCommande",
          element: <PriseCommande />,
        },
      ],
    },
  ]);
}
