import { DateI } from "@/app/page";
import React, { ChangeEvent } from "react";

interface Props {
  label: string;
  value: DateI | undefined;
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleValidity: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const DateInput = ({
  label,
  value,
  handleTextChange,
  handleValidity,
}: Props) => {
  return (
    <div className="">
      <div className="relative">
        <input
          name="month"
          type="number"
          value={value?.month}
          placeholder="MM"
          onChange={(e) => handleTextChange(e)}
          onBlur={(e) => handleValidity(e)}
          className="bg-transparent inline w-12 border-b-2 my-3 border-yellow-500 hover:shadow-lg"
          required
        ></input>

        {/* <div className=" relative h-6 inline w-0 border-r-2 origin-top-left rotate-45"></div> */}
        <input
          name="year"
          type="number"
          value={value?.year}
          placeholder="YY"
          onChange={(e) => handleTextChange(e)}
          onBlur={(e) => handleValidity(e)}
          className="bg-transparent inline w-12 border-b-2 ml-4 my-3 border-yellow-500 hover:shadow-lg"
          required
        ></input>
      </div>
    </div>
  );
};

export default DateInput;
