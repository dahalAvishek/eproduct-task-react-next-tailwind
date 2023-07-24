import React, { Dispatch, SetStateAction } from "react";

export interface Props {
  background?: string;
  addedItems: number;
  setAddedItems: Dispatch<SetStateAction<number>>;
}

const AddRemoveItem = ({ background, addedItems, setAddedItems }: Props) => {
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAddedItems((prevAddedItems) => prevAddedItems + 1);
  };
  const handleSubstract = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    addedItems !== 0 && setAddedItems((prevAddedItems) => prevAddedItems - 1);
  };
  return (
    <div>
      <button
        onClick={(e) => handleSubstract(e)}
        className="bg-slate-50 w-5 h-5 text-sm rounded-sm text-center"
      >
        -
      </button>
      <p className="inline mx-2">{addedItems}</p>
      <button
        onClick={(e) => handleAdd(e)}
        className="bg-slate-50 w-5 h-5 text-sm rounded-sm text-center"
      >
        +
      </button>
    </div>
  );
};

export default AddRemoveItem;
