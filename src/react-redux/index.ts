import { createContext } from "react";
import { Store } from "./redux";

export { useSelector, useDispatch } from "./hooks";

export const storeContext = createContext<Store>(null as any);
export const Provider = storeContext.Provider;
