import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  console.log(initialState);

  const reset = () => {
    console.log(initialState);
    setValues(initialState);
  };

  const setNewValues = (values) => {
    setValues(values);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setValues((formValues) => ({
      ...formValues,
      [name]: value,
    }));
  };

  return { values, handleInputChange, reset, setNewValues };
};

export default useForm;
