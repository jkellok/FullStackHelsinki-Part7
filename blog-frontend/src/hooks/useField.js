import { useState } from "react";

export const useField = (props) => {
  const [value, setValue] = useState("");

  const type = props;

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};
