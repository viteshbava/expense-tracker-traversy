import React, { useContext, useState } from "react";

const AddEditContext = React.createContext();

const useAddEditContext = () => {
  return useContext(AddEditContext);
};

const AddEditContextProvider = ({ children }) => {
  const [addingOrEditing, setAddingOrEditing] = useState(null);

  return (
    <AddEditContext.Provider value={{ addingOrEditing, setAddingOrEditing }}>
      {children}
    </AddEditContext.Provider>
  );
};

export default AddEditContextProvider;
export { useAddEditContext };
