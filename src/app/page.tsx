"use client";

import TextInput from "@/components/TextInput";
import product_list, { Product } from "@/module/product_module";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailsSchema = z.object({
  user_name: z
    .string()
    .max(30, { message: "Name must be less than 30 letters" }),
  card_holder: z.string().refine((value) => /^\d+$/.test(value), {
    message: "Age must be number",
  }),
  year: z.coerce
    .number()
    .gt(0, { message: "Provide year between 0-99" })
    .lte(100, { message: "Provide year between 0-99 " }),
  month: z.coerce
    .number()
    .gt(0, { message: "Provide month greater than 0" })
    .lte(12, { message: "Provide month less than or equat to 12" }),
  cvv: z
    .string()
    .transform((value) => value.replace(/\D/gu, ""))
    .refine((value) => value.length === 3, "invalid"),
});

type DetailsSchemaType = z.infer<typeof DetailsSchema>;

const product: Product = product_list[0];
export default function Home(): JSX.Element {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DetailsSchemaType>({ resolver: zodResolver(DetailsSchema) });
  //

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(value.slice(-1));
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    e.target.value = numericInput;
  };

  // const {
  //   field: { ref, ...inputProps },
  // } = useController({
  //   control,
  //   name: "card_holder", // Replace 'myInput' with your actual input name
  //   defaultValue: undefined,
  //   rules: {
  //     maxLength: 16, // Replace '10' with your desired maximum length
  //   },
  // });
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

// export interface Details {
//   user_name: string;
//   card_holder: number | undefined;
//   month: number | undefined;
//   year: number | undefined;
//   cvv: number | undefined;
// }

// export interface DetailsValidity {
//   user_name: Boolean;
//   card_holder: Boolean;
//   year: Boolean;
//   month: Boolean;
//   cvv: Boolean;
//   [key: string]: Boolean;
// }

// interface MaxLength {
//   card_holder: number;
//   cvv: number;
//   [key: string]: number;
// }

// const [details, setDetails] = useState<Details>({
//   user_name: "",
//   card_holder: undefined,
//   month: undefined,
//   year: undefined,
//   cvv: undefined,
// });
// const [detailsValidity, setDetailsValidity] = useState<DetailsValidity>({
//   user_name: false,
//   card_holder: false,
//   year: false,
//   month: false,
//   cvv: false,
// });

// const areAllInputsvalid: (obj: DetailsValidity) => boolean = (
//   obj: DetailsValidity
// ) => {
//   for (const item in obj) {
//     if (!obj[item]) {
//       return false;
//     }
//   }
//   return true;
// };

// const handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void = (
//   e: ChangeEvent<HTMLInputElement>
// ) => {
//   const { name, value } = e.target;
//   const maxLength: MaxLength = {
//     card_holder: 16,
//     year: 2,
//     month: 2,
//     cvv: 3,
//   };
//   const valueString: string = value.toString();
//   name !== "user_name"
//     ? valueString.length <= maxLength[name] &&
//       setDetails({
//         ...details,
//         [name]: value,
//       })
//     : setDetails({
//         ...details,
//         [name]: value,
//       });
//   checkValidity(value, name, detailsValidity, setDetailsValidity);
// };

// const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = (
//   e: FormEvent<HTMLFormElement>
// ) => {
//   e.preventDefault();
//   const userDetails = {
//     name: details.user_name,
//     card_holder: details.card_holder,
//     expiration_date: { month: details.month, year: details.year },
//     cvv: details.cvv,
//   };
//   areAllInputsvalid(detailsValidity)
//     ? console.log("Submitted successfully. Your details are:", userDetails)
//     : console.log(
//         "Can't be submitted. Your details are invalid. Refer details validity below:",
//         detailsValidity
//       );
// };
