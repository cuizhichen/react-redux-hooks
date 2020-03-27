const initialState = {
  name: "",
  todoList: [
    { id: 1, value: "🍚" },
    { id: 2, value: "🍓" },
    { id: 3, value: "🐔" }
  ]
};

let todoId = 3;

export type StoreState = typeof initialState;

type Action =
  | {
      type: "edit_name";
      value: string;
    }
  | {
      type: "add_todoList";
      value: string;
    }
  | {
      type: "todoList_remove_item";
      value: number;
    };

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "edit_name":
      return {
        ...state,
        name: action.value
      };

    case "add_todoList":
      return {
        ...state,
        todoList: [{ id: ++todoId, value: action.value }, ...state.todoList]
      };

    case "todoList_remove_item":
      return {
        ...state,
        todoList: state.todoList.filter(item => item.id !== action.value)
      };

    default:
      return state;
  }
};
