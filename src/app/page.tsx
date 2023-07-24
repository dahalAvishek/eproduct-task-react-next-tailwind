"use client";

import product_list, { Product } from "@/module/product_module";
import { ChangeEvent } from "react";
import Image from "next/image";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailsSchema = z.object({
  user_name: z
    .string()
    .max(30, { message: "Name must be less than 30 letters" }),
  card_holder: z
    .string()
    .refine((value) => value.length === 16, "Must be 16 digits"),
  year: z.coerce
    .number()
    .gt(0, { message: "Provide year between 0-99" })
    .lt(100, { message: "Provide year between 0-99 " }),
  month: z.coerce
    .number()
    .gt(0, { message: "Provide month greater than 0" })
    .lte(12, { message: "Provide month less than or equat to 12" }),
  cvv: z.string().refine((value) => value.length === 3, "invalid"),
});

type DetailsSchemaType = z.infer<typeof DetailsSchema>;

const product: Product = product_list[0];
export default function Home(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsSchemaType>({ resolver: zodResolver(DetailsSchema) });
  //

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    e.target.value = numericInput;
  };
  const onSubmit: SubmitHandler<DetailsSchemaType> = (data) =>
    console.log(data);

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
          onSubmit={handleSubmit(onSubmit)}
        >
          <strong className="text-2xl">Payment Details</strong>
          <div className=" flex flex-col justify-center gap-4">
            <div>
              <h3 className="text-yellow-500">NAME</h3>
              <input
                type="text"
                placeholder="Your Full Name"
                className="bg-transparent border-b-2 outline-none w-full mt-3 border-gray-300 focus:border-yellow-300 valid:border-yellow-300"
                required
                maxLength={30}
                {...register("user_name")}
              ></input>
              {errors.user_name && (
                <p className="text-xs text-red-600">
                  {errors.user_name.message}
                </p>
              )}
            </div>
            <div>
              <h3 className="text-yellow-500">CARD HOLDER</h3>

              <input
                placeholder="Your Card Number"
                type="text"
                maxLength={16}
                className="bg-transparent border-b-2 outline-none w-full mt-3 border-gray-300 focus:border-yellow-300 valid:border-yellow-300"
                required
                inputMode="numeric"
                {...register("card_holder", {
                  onChange: (e) => handleChange(e),
                })}
              ></input>
              {errors.card_holder && (
                <p className="text-xs text-red-600">
                  {errors.card_holder.message}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <div className="">
                <h3 className="text-yellow-500">EXPIRATION DATE</h3>
                <div className="relative flex gap-4 w-fit">
                  <input
                    placeholder="MM"
                    className="bg-transparent border-b-2 text-center outline-none w-full mt-3 border-gray-300 focus:border-yellow-300 valid:border-yellow-300"
                    required
                    type="number"
                    style={{ width: "32px" }}
                    {...register("month")}
                  ></input>
                  <span className="text-2xl absolute left-8 -bottom-1 mx-1 text-yellow-500">
                    /
                  </span>
                  <input
                    placeholder="YY"
                    className="bg-transparent text-center border-b-2 outline-none w-full mt-3 border-gray-300 focus:border-yellow-300 valid:border-yellow-300"
                    required
                    type="number"
                    style={{ width: "32px" }}
                    {...register("year")}
                  ></input>
                </div>
                {(errors.year || errors.month) && (
                  <p className="text-xs text-red-600">
                    {errors.month?.message} {errors.year?.message}
                  </p>
                )}
              </div>
              <div className="w-16">
                <h3 className="text-yellow-500">CVV</h3>
                <input
                  placeholder="***"
                  className="bg-transparent border-b-2 outline-none w-full mt-3 border-gray-300 focus:border-yellow-300 valid:border-yellow-300"
                  required
                  type="text"
                  maxLength={3}
                  {...register("cvv", {
                    onChange: (e) => handleChange(e),
                  })}
                ></input>
                {errors.cvv && (
                  <p className="text-xs text-red-600">{errors.cvv?.message} </p>
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
