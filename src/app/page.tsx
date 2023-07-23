"use client";

import TextInput from "@/components/TextInput";
import product_list, { Product } from "@/module/product_module";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import checkValidity from "@/utils/checkValidity";

export interface Details {
  user_name: string;
  card_holder: number | undefined;
  month: number | undefined;
  year: number | undefined;
  cvv: number | undefined;
}

export interface DetailsValidity {
  user_name: Boolean;
  card_holder: Boolean;
  year: Boolean;
  month: Boolean;
  cvv: Boolean;
  [key: string]: Boolean;
}

interface MaxLength {
  card_holder: number;
  cvv: number;
  [key: string]: number;
}

const product: Product = product_list[0];
export default function Home(): JSX.Element {
  const [details, setDetails] = useState<Details>({
    user_name: "",
    card_holder: undefined,
    month: undefined,
    year: undefined,
    cvv: undefined,
  });
  const [detailsValidity, setDetailsValidity] = useState<DetailsValidity>({
    user_name: false,
    card_holder: false,
    year: false,
    month: false,
    cvv: false,
  });

  const areAllInputsvalid = (obj: DetailsValidity) => {
    for (const item in obj) {
      if (!obj[item]) {
        return false;
      }
    }
    return true;
  };

  const handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const maxLength: MaxLength = {
      card_holder: 16,
      year: 2,
      month: 2,
      cvv: 3,
    };
    const valueString = value.toString();
    name !== "user_name"
      ? valueString.length <= maxLength[name] &&
        setDetails({
          ...details,
          [name]: value,
        })
      : setDetails({
          ...details,
          [name]: value,
        });
    checkValidity(value, name, detailsValidity, setDetailsValidity);
  };

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const userDetails = {
      name: details.user_name,
      card_holder: details.card_holder,
      expiration_date: { month: details.month, year: details.year },
      cvv: details.cvv,
    };
    areAllInputsvalid(detailsValidity)
      ? console.log("Submitted successfully. Your details are:", userDetails)
      : console.log(
          "Can't be submitted. Your details are invalid. Refer details validity below:",
          detailsValidity
        );
  };

  return (
    <main className="min-w-420 flex items-center justify-center min-h-screen px-4 bg-slate-300">
      <div className="max-w-screen-xl w-full px-6 grid md:grid-cols-fullscreen md:py-12 bg-slate-50 rounded-3xl grid-cols-1">
        <div className=" border-yellow-500 border-b-2 border-r-0 md:border-r-2 md:border-b-0 flex justify-center items-center py-12 w-full  mx-auto relative ">
          <Image src={product.image} alt="product image" className="mx-auto" />
          <div className="absolute bottom-2 md:bottom-0 right-8 text-right">
            <p>
              {product.brand} {product.model}
            </p>
            <strong className="text-sm">{product.price}</strong>
          </div>
        </div>
        <form
          className="px-8 md:px-12 py-12 flex flex-col gap-8 w-full md:w-96"
          onSubmit={(e) => handleSubmit(e)}
        >
          <strong className="text-2xl">Payment Details</strong>
          <div className=" flex flex-col justify-center gap-4">
            <div>
              <h3 className="text-yellow-500">NAME</h3>
              <TextInput
                name="user_name"
                value={details.user_name}
                placeHolder="Your Full Name"
                handleTextChange={handleTextChange}
              />
              {details.user_name.length !== 0 && !detailsValidity.user_name && (
                <p className="text-xs text-red-600">invalid input</p>
              )}
            </div>
            <div>
              <h3 className="text-yellow-500">CARD HOLDER</h3>
              <TextInput
                name="card_holder"
                value={details.card_holder}
                placeHolder="Your Card Number"
                handleTextChange={handleTextChange}
              />
              {details.card_holder !== undefined &&
                !detailsValidity.card_holder && (
                  <p className="text-xs text-red-600">invalid input</p>
                )}
            </div>

            <div className="flex justify-between">
              <div className="">
                <h3 className="text-yellow-500">EXPIRATION FATE</h3>
                <div className="relative flex gap-4 w-fit">
                  <TextInput
                    name="month"
                    value={details.month}
                    placeHolder="MM"
                    handleTextChange={handleTextChange}
                    inputWidth="32px"
                  />
                  <span className="text-2xl absolute left-8 -bottom-1 mx-1 text-yellow-500">
                    /
                  </span>
                  <TextInput
                    name="year"
                    value={details.year}
                    placeHolder="YY"
                    handleTextChange={handleTextChange}
                    inputWidth="32px"
                  />
                </div>
                {(details.month !== undefined || details.year !== undefined) &&
                  (!detailsValidity.month || !detailsValidity.year) && (
                    <p className="text-xs text-red-600">invalid input</p>
                  )}
              </div>
              <div>
                <h3 className="text-yellow-500">CVV</h3>
                <TextInput
                  name="cvv"
                  value={details.cvv}
                  placeHolder="***"
                  handleTextChange={handleTextChange}
                  inputWidth="67px"
                />
                {details.cvv !== undefined && !detailsValidity.cvv && (
                  <p className="text-xs text-red-600">invalid input</p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 py-2 w-64 self-center text-white rounded-md hover:shadow-xl"
          >
            BUY NOW
          </button>
        </form>
      </div>
    </main>
  );
}
