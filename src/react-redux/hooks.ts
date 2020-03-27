import { useContext, useState, useRef, useEffect } from "react";
import { storeContext } from "./index";

export const useDispatch = () => {
  const store = useContext(storeContext);
  return store.dispatch;
};

export const useSelector = <TState, TSelected>(
  selector: (state: TState) => TSelected
) => {
  const store = useContext(storeContext);
  const [mapState, setMapState] = useState(selector(store.getState()));

  // 使用 ref 存储 selector，避开 useEffect 的依赖更新（Dependency）
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  useEffect(() => {
    const selector = selectorRef.current;
    // 检查是否需要更新组件
    const checkForUpdate = (prevState: TState, state: TState) => {
      const mapPrev = selector(prevState);
      const mapCur = selector(state);

      // 浅比较，所以不推荐在 reducer 中使用深拷贝
      if (mapPrev !== mapCur) {
        setMapState(mapCur);
      }
    };
    // 订阅 store，执行 checkForUpdate
    return store.subscribe(checkForUpdate);
  }, [store]);

  return mapState;
};
