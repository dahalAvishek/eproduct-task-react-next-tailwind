import { product } from "@/app/page";
import React from "react";

interface Props {
  itemsQty: number | undefined;
}

const ProductDetails = ({ itemsQty }: Props) => {
  return (
    <div className="bottom-2 md:bottom-0 grow">
      <p>
        {product.brand} {product.model}
      </p>
      <strong className="text-sm">
        ${itemsQty && itemsQty * product.price}{" "}
      </strong>
    </div>
  );
};

export default ProductDetails;
