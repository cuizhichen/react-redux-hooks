import React, { useRef } from "react";
import { useSelector, useDispatch } from "../../react-redux";
import { StoreState } from "../../store/reducer";

const Input = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("EditName List render");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: "edit_name", value: inputRef.current?.value });
        inputRef.current!.value = "";
      }}
    >
      <input type="text" ref={inputRef} placeholder="修改姓名" />
    </form>
  );
};

const Text = () => {
  const name = useSelector<StoreState, StoreState["name"]>(state => state.name);
  console.log("EditName Text render");

  return (
    <>
      <div className="name-label">姓名：</div>
      <div className="name-text">{name || "暂无姓名"}</div>
    </>
  );
};

const Name = () => {
  return (
    <div className="name-section">
      <h3>Edit name</h3>
      <Input />
      <Text />
    </div>
  );
};

export default Name;
