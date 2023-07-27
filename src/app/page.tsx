"use client";

import product_list, { Product } from "@/module/product_module";
import CartList from "@/components/CartList";
import AddRemoveItem from "@/components/AddRemoveItem";
import ProductDetails from "@/components/ProductDetails";
import PaymentForm, { DetailsSchemaType } from "@/components/PaymentForm";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import SwiperSlider from "@/components/SwiperSlider";
import { checkout } from "./checkout";

export interface LineItem {
  price: string;
  quantity: number;
}

export const product: Product = product_list[0];
export default function Home(): JSX.Element {
  const [addedItems, setAddedItems] = useState<number>(1);
  const [quantityInCart, setQuantityInCart] = useState<number | undefined>(
    addedItems
  );
  const [myCartList, setMyCartList] = useState<any>(1);
  const [loadMyCart, setLoadMyCart] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<DetailsSchemaType> = (data) => {
    data.quantity = addedItems;
    localStorage.setItem("Shopping cart", JSON.stringify(data));

    setLoadMyCart(true);
    setQuantityInCart(addedItems);
    console.log("subitted", data);
  };

  let cartArray: DetailsSchemaType;

  useEffect(() => {
    if (window) {
      setMyCartList(localStorage.getItem("Shopping cart"));
    }
  }, []);

  let myQuantity: number | undefined = undefined;
  if (myCartList) {
    cartArray = JSON.parse(myCartList);
    myQuantity = cartArray.quantity;
  }

  const handleAddToStorage = () => {
    quantityInCart && (cartArray.quantity = quantityInCart);

    localStorage.setItem("Shopping cart", JSON.stringify(cartArray));
  };

  const handleAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quantity: number | undefined
  ) => {
    quantity && (quantity = quantity + 1);
    !loadMyCart
      ? setAddedItems && setAddedItems((prevAddedItems) => prevAddedItems + 1)
      : setQuantityInCart &&
        setQuantityInCart(
          (prevQuantityInCart) => prevQuantityInCart && prevQuantityInCart + 1
        );
  };
  const handleSubstract = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quantity: number | undefined
  ) => {
    quantity && quantity !== 0 && (quantity = quantity - 1);
    !loadMyCart
      ? setAddedItems && setAddedItems((prevAddedItems) => prevAddedItems - 1)
      : setQuantityInCart &&
        setQuantityInCart(
          (prevQuantityInCart) => prevQuantityInCart && prevQuantityInCart - 1
        );
  };

  return (
    <main className="min-w-420 flex gap-12 items-center justify-between min-h-screen bg-slate-300">
      <div className="max-w-screen-xl ml-10 w-full px-6 grid md:grid-cols-fullscreen md:py-12 bg-slate-50 rounded-3xl grid-cols-1">
        <div className=" border-yellow-500 border-b-2 border-r-0 md:border-r-2 md:border-b-0 flex justify-center items-center py-12 w-full  mx-auto relative ">
          <SwiperSlider product={product} />

          <div className="absolute bottom-2 md:bottom-0 right-8 text-right">
            <ProductDetails itemsQty={addedItems} />
            <AddRemoveItem
              backgroundColor={"#cbd5e1"}
              qty={addedItems}
              handleAdd={handleAdd}
              handleSubstract={handleSubstract}
            />
          </div>
        </div>
        <PaymentForm onSubmit={onSubmit} />
      </div>
      <div className="w-96 h-screen bg-slate-50 px-4 py-4 flex flex-col justify-between">
        <strong>My Cart</strong>
        <div className="flex grow">
          {loadMyCart && (
            <CartList
              quantityInCart={quantityInCart}
              handleAddToStorage={handleAddToStorage}
              handleAdd={handleAdd}
              handleSubstract={handleSubstract}
            />
          )}
        </div>
        <button
          onClick={() => {
            quantityInCart &&
              checkout({
                lineItems: [
                  {
                    price: "price_1NYRjADD0LGE9Eqn09mCnX4z",
                    quantity: quantityInCart,
                  },
                ],
              });
          }}
          className="bg-yellow-500 py-2 w-64 self-center text-white rounded-md hover:shadow-xl"
        >
          BUY NOW
        </button>
      </div>
    </main>
  );
}
