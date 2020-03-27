// redux 简单实现
export type Reducer<S = any | undefined, A = any> = (state: S, action: A) => S;

export type Store<S = any | undefined, A = any> = {
  getState: () => S;
  dispatch: (action: A) => void;
  subscribe: (cb: (prevState: S, curState: S) => void) => () => void;
};

export function createStore<S = any | undefined, A = any>(
  reducer: Reducer<S, A>
): Store<S, A> {
  // 利用闭包管理 state
  let state: S = reducer(undefined!, {} as A);
  let subscribers: ((prevState: S, state: S) => void)[] = [];

  return {
    // getState 获取到最新的 state
    getState: () => state,
    // dispatch 触发 reducer，通过 reducer 返回最新的状态并触发 subscribe
    dispatch: (action: A) => {
      const newState = reducer(state, action);
      subscribers.forEach(cb => cb(state, newState));
      state = newState;
    },
    // 用于监听 state 的改变
    subscribe: (cb: (prevState: S, curState: S) => void) => {
      subscribers.push(cb);

      return () => {
        subscribers = subscribers.filter(c => c !== cb);
      };
    }
  };
}
