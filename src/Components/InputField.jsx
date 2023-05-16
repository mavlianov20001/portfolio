import React from "react";

const InputField = ({ text, handleInput, handleAdd, press }) => {
  return (
    <div className="input_value">
      <input
        value={text}
        onKeyPress={press}
        onChange={(e) => handleInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default InputField;
