import { StaticImageData } from "next/image";
import productImage from "../../public/product-image.png";

export interface Product {
  brand: string;
  model: string;
  price: string;
  image: StaticImageData;
}

const product_list: Product[] = [
  {
    brand: "JBL",
    model: "90X",
    price: "$100",
    image: productImage,
  },
];

export default product_list;
