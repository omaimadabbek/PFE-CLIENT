import { SetStateAction } from "react";
import "./Home.style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay, Virtual } from "swiper";
import "swiper/swiper-bundle.css";
import "./style.css";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

type categorieProps = {
  categorieList: any;
  idCategorieSelected: number;
  setIdCategorieSelected: (value: SetStateAction<number>) => void;
  setTitle: (value: SetStateAction<string>) => void;
};
export default function ListCategorie({
  categorieList,
  idCategorieSelected,
  setTitle,
  setIdCategorieSelected,
}: categorieProps) {
  const handleClickCategorie = (categorie: any) => {
    setIdCategorieSelected(categorie.id_categorie);
    setTitle(categorie.nom_categorie);
  };

  return (
    <Swiper direction="vertical" slidesPerView={3} className="ListCategorie">
      {categorieList?.map((categorie: any, index: number) => (
        <SwiperSlide key={categorie.id_categories}>
          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
              boxShadow:
                idCategorieSelected === categorie.id_categorie
                  ? "10px 5px 5px red"
                  : "0 10px 10px rgb(0 0 0/10%)",
            }}
            onClick={(e) => {
              handleClickCategorie(categorie);
            }}
          >
            <img
              alt=""
              src={categorie.image}
              style={{
                height: "80px",
                maxWidth: "180px",
                marginBottom: "10px",
              }}
            />
            <div
              style={{
                height: "5vh",
                textAlign: "center",
                padding: "1px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {categorie.nom_categorie}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
