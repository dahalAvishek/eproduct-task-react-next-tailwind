import { ChangeEvent } from "react";

interface Props {
  name: string;
  value: string | number | undefined;
  placeHolder: string;
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputWidth?: string;
  min?: number;
  max?: number;
}

const TextInput = ({
  name,
  value,
  placeHolder,
  handleTextChange,
  inputWidth,
  min,
  max,
}: Props) => {
  let inputType;
  switch (name) {
    case "user_name":
      inputType = "text";
      break;
    case "cvv":
      inputType = "password";
      break;
    case "card_holder":
      inputType = "number";
      break;
    case "month":
      inputType = "number";
      break;
    case "year":
      inputType = "number";
      break;
  }
  // const inputType = name === "user_name" ? "text" : "number";
  return (
    <input
      name={name}
      type={inputType}
      value={value}
      placeholder={placeHolder}
      min={min}
      max={max}
      onChange={(e) => handleTextChange(e)}
      className="bg-transparent border-b-2 outline-none w-full mt-3 border-gray-300 focus:border-yellow-300"
      required
      style={{ width: inputWidth }}
    ></input>
  );
};

export default TextInput;
