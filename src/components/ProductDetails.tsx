import { product } from "@/app/page";
import React from "react";

interface Props {
  addedItems: number;
}

const ProductDetails = ({ addedItems }: Props) => {
  return (
    <div className="bottom-2 md:bottom-0 grow">
      <p>
        {product.brand} {product.model}
      </p>
      <strong className="text-sm">${addedItems * product.price}</strong>
    </div>
  );
};

export default ProductDetails;
