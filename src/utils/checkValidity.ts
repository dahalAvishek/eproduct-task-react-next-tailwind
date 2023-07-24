import { Dispatch, SetStateAction } from "react";
import { DetailsValidity } from "@/app/page";

const checkValidity: (
  inputValue: string,
  inputName: string,
  detailsValidity: DetailsValidity,
  setDetailsValidity: Dispatch<SetStateAction<DetailsValidity>>
) => void = (
  inputValue: string,
  inputName: string,
  detailsValidity: DetailsValidity,
  setDetailsValidity: Dispatch<SetStateAction<DetailsValidity>>
) => {
  if (inputName === "user_name") {
    setDetailsValidity({
      ...detailsValidity,
      [inputName]: true,
    });
  } else if (inputName === "card_holder") {
    const numberValue = parseInt(inputValue, 10);
    !isNaN(numberValue) && inputValue.length >= 16
      ? setDetailsValidity({
          ...detailsValidity,
          [inputName]: true,
        })
      : setDetailsValidity({
          ...detailsValidity,
          [inputName]: false,
        });
  } else if (inputName === "cvv") {
    const numberValue = parseInt(inputValue, 10);
    !isNaN(numberValue) && inputValue.length >= 3
      ? setDetailsValidity({
          ...detailsValidity,
          [inputName]: true,
        })
      : setDetailsValidity({
          ...detailsValidity,
          [inputName]: false,
        });
  } else if (inputName === "month") {
    const numberValue = parseInt(inputValue, 10);
    !isNaN(numberValue) && numberValue > 0 && numberValue <= 12
      ? setDetailsValidity({
          ...detailsValidity,
          [inputName]: true,
        })
      : setDetailsValidity({
          ...detailsValidity,
          [inputName]: false,
        });
  } else if (inputName === "year") {
    const numberValue = parseInt(inputValue, 10);
    !isNaN(numberValue) && numberValue >= 0 && numberValue <= 99
      ? setDetailsValidity({
          ...detailsValidity,
          [inputName]: true,
        })
      : setDetailsValidity({
          ...detailsValidity,
          [inputName]: false,
        });
  }
};

export default checkValidity;
