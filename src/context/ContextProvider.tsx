import { createContext, useState } from "react";

export interface ShoppingCartContextInterface {
  name: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
}

export const ShoppingCartContext = createContext<any>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("alvin");
  return (
    <ShoppingCartContext.Provider value={{ name, setName }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ContextProvider;
