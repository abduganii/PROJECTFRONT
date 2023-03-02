import { createContext } from "react";

const GlobalContext = createContext({
    token: false,
    isAdmin: false,
    userId: false,

});

export default GlobalContext;