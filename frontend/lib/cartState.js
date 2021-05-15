import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider. We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer.
  // The provider goes in a high level of the application such as _app.js

  const [cartOpen, setCartOpen] = useState(false); // Cart closed by default
  
  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  // Any value which gets passed into the below provider, will be accessible anywhere else in the application as a consumer. To pass multiple things you use an object.
  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}>{children}</LocalStateProvider>
  );
}

// Make a custom hook for accessing the cart local state
function useCart() {
  // useContext is the consumer to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };