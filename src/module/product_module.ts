import { StaticImageData } from "next/image";
import productImage1 from "../../public/product-image-1.png";
import productImage2 from "../../public/product-image-2.png";

export interface Product {
  brand: string;
  model: string;
  price: number;
  image: StaticImageData[];
}

const product_list: Product[] = [
  {
    brand: "JBL",
    model: "90X",
    price: 100,
    image: [productImage1, productImage2],
  },
];

export default product_list;
