"use client";

import product_list, { Product } from "@/module/product_module";
import Image from "next/image";
import CartList from "@/components/CartList";
import AddRemoveItem from "@/components/AddRemoveItem";
import ProductDetails from "@/components/ProductDetails";
import PaymentForm, { DetailsSchemaType } from "@/components/PaymentForm";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";

export const product: Product = product_list[0];
export default function Home(): JSX.Element {
  const [addedItems, setAddedItems] = useState<number>(1);
  let myCart: DetailsSchemaType[];
  let myCartData;
  if (typeof window !== "undefined") {
    myCartData = localStorage?.getItem("Shopping cart");
  }
  if (myCartData) {
    myCart = JSON.parse(myCartData);
  }
  const onSubmit: SubmitHandler<DetailsSchemaType> = (data) => {
    myCart.push(data);
    localStorage.setItem("Shopping cart", JSON.stringify(myCart));
  };

  return (
    <main className="min-w-420 flex gap-12 items-center justify-between min-h-screen bg-slate-300">
      <div className="max-w-screen-xl ml-10 w-full px-6 grid md:grid-cols-fullscreen md:py-12 bg-slate-50 rounded-3xl grid-cols-1">
        <div className=" border-yellow-500 border-b-2 border-r-0 md:border-r-2 md:border-b-0 flex justify-center items-center py-12 w-full  mx-auto relative ">
          <Image src={product.image} alt="product image" className="mx-auto" />
          <div className="absolute bottom-2 md:bottom-0 right-8 text-right">
            <ProductDetails addedItems={addedItems} />
            <AddRemoveItem
              backgroundColor={"#cbd5e1"}
              addedItems={addedItems}
              setAddedItems={setAddedItems}
            />
          </div>
        </div>
        <PaymentForm onSubmit={onSubmit} />
      </div>
      <div className="w-96 h-screen bg-slate-50 px-4 py-4">
        <strong>My Cart</strong>
        <CartList addedItems={addedItems} setAddedItems={setAddedItems} />
      </div>
    </main>
  );
}
