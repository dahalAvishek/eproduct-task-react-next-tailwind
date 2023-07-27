import React, { Dispatch, SetStateAction } from "react";

type BackgorundColor = string;

export interface Props {
  backgroundColor: string | undefined;
  qty: number | undefined;
  handleAddToStorage?: () => void;
  handleAdd: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quantity: number | undefined
  ) => void;
  handleSubstract: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quantity: number | undefined
  ) => void;
}

const AddRemoveItem = ({
  backgroundColor,
  qty,
  handleAdd,
  handleSubstract,
  handleAddToStorage,
}: Props) => {
  return (
    <div>
      <button
        onClick={(e) => handleSubstract(e)}
        className=" w-5 h-5 text-sm rounded-sm text-center"
        style={{ backgroundColor: backgroundColor }}
        onMouseOut={handleAddToStorage}
      >
        -
      </button>
      <p className="inline mx-2">{qty && qty}</p>
      <button
        onClick={(e) => handleAdd(e)}
        className=" w-5 h-5 text-sm rounded-sm text-center"
        style={{ backgroundColor: backgroundColor }}
        onMouseOut={handleAddToStorage}
      >
        +
      </button>
    </div>
  );
};

export default AddRemoveItem;
