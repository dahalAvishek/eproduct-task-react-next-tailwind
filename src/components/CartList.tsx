import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { product } from "@/app/page";
import AddRemoveItem from "./AddRemoveItem";
import ProductDetails from "./ProductDetails";

interface Props {
  addedItems: number;
  setAddedItems: Dispatch<SetStateAction<number>>;
}

const CartList = ({ addedItems, setAddedItems }: Props) => {
  return (
    <div className="bg-slate-300 rounded-md p-2 flex gap-2 justify-between shadow-md">
      <Image
        src={product.image}
        width={80}
        alt="product image"
        className=" bg-slate-50 rounded-md"
      />
      <ProductDetails addedItems={addedItems} />
      <div className="flex flex-col justify-between">
        <button className="bg-red-600 w-6 self-end h-6 rounded-full  p-0 text-sm text-white">
          x
        </button>
        <AddRemoveItem
          background={"white"}
          addedItems={addedItems}
          setAddedItems={setAddedItems}
        />
      </div>
    </div>
  );
};

export default CartList;
