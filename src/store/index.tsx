import { createStore } from "../react-redux/redux";
import { reducer } from "./reducer";

export const store = createStore(reducer);
