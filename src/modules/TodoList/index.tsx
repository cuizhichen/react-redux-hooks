import React, { useRef } from "react";
import { useSelector, useDispatch } from "../../react-redux";
import { StoreState } from "../../store/reducer";

const Input = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("TodoList Input render");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: "add_todoList", value: inputRef.current?.value });
        inputRef.current!.value = "";
      }}
    >
      <input type="text" ref={inputRef} placeholder="记点事情儿吧👋。" />
    </form>
  );
};

const List = () => {
  const list = useSelector<StoreState, StoreState["todoList"]>(
    state => state.todoList
  );
  const dispatch = useDispatch();
  console.log("TodoList List render");

  return (
    <ul>
      {list.map(item => (
        <li
          key={item.id}
          onClick={() => {
            dispatch({ type: "todoList_remove_item", value: item.id });
          }}
        >
          {item.value}
        </li>
      ))}
    </ul>
  );
};

const TodoList = () => {
  return (
    <div className="todo-list-section">
      <h3>TodoList</h3>
      <Input />
      <List />
    </div>
  );
};

export default TodoList;
