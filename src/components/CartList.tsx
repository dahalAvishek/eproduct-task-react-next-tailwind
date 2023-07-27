import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { product } from "@/app/page";
import AddRemoveItem from "./AddRemoveItem";
import ProductDetails from "./ProductDetails";

interface Props {
  quantityInCart?: number | undefined;
  handleAddToStorage: () => void;
  handleAdd: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quantity: number | undefined
  ) => void;
  handleSubstract: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quantity: number | undefined
  ) => void;
}

const CartList = ({
  quantityInCart,
  handleAddToStorage,
  handleAdd,
  handleSubstract,
}: Props) => {
  return (
    <div className="bg-slate-300 rounded-md p-2 flex gap-2  shadow-md self-start">
      <Image
        src={product.image[0]}
        width={80}
        alt="product image"
        className=" bg-slate-50 rounded-md"
      />
      <ProductDetails itemsQty={quantityInCart} />
      <div className="flex flex-col justify-between">
        <button className="bg-red-600 w-6 self-end h-6 rounded-full  p-0 text-sm text-white">
          x
        </button>
        <AddRemoveItem
          backgroundColor={"#f8fafc"}
          qty={quantityInCart}
          handleAdd={handleAdd}
          handleSubstract={handleSubstract}
          handleAddToStorage={handleAddToStorage}
        />
      </div>
    </div>
  );
};

export default CartList;
