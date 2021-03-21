import { useState } from "react";

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  
  
  // This function gets passed to the onChange hander in CreateProduct.js
  function handleChange(e) {
    let { value, name, type } = e.target;
    // To convert the input string back to a number type
    if (type === 'number') {
      value = parseInt(value);
    }
    // If the input is a file (for file upload), it requires an array of files
    if (type === 'file') {
      value[0] = e.target.files;
    }
    setInputs({  // An object of multiple pieces of state
      // copy the existing state
      ...inputs,
      // Update the piece of state, made dynamic depending on the input field.
      [name]: value,
    });
  }

    // To reset the form to the initial state
    function resetForm() {
      setInputs(initial);
    }
  
    // To clear out all the inputs from the form
    function clearForm() {
      // Object.entries creates an array of arrays. First array is of the object items and each array item contains an array with the first item being the property and the second being the value. Object.fromEntries converts the array back to an object.
      const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']));
      // Above, destructuring the key and value of each array item and setting them to the key and an empty value
      setInputs(blankState);
    }

  // Return the things we want to surface from this custom hook
  return {
      inputs,
      handleChange,
      resetForm,
      clearForm
  }
}