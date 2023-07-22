import { ChangeEvent } from "react";

interface Props {
  name: string;
  value: string | undefined;
  placeHolder: string;
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputWidth?: string;
  handleValidity?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const TextInput = ({
  name,
  value,
  placeHolder,
  handleTextChange,
  inputWidth,
  handleValidity,
}: Props) => {
  return (
    <input
      name={name}
      type="text"
      value={value}
      placeholder={placeHolder}
      onChange={(e) => handleTextChange(e)}
      // onBlur={(e) => handleValidity(e)}
      className="bg-transparent border-b-2 outline-none w-full mt-3 border-yellow-500 hover:shadow-lg"
      required
      style={{ width: inputWidth }}
    ></input>
  );
};

export default TextInput;
