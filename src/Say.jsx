import React, { useState } from "react";

const Say = () => {
  // message = "";
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("black");
  //첫번째 변경할 변수명. 두번째 값을 변경할때의 함수명
  //암묵적인 룰로 첫번째 변수의 set을 붙인다
  const onClickEnter = () => setMessage("Hello~");
  const onClickLeave = () => setMessage("~bye bye");

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>
      <button style={{ color: "red" }} onClick={() => setColor("red")}>
        red
      </button>
      <button style={{ color: "green" }} onClick={() => setColor("green")}>
        green
      </button>
      <button style={{ color: "blue" }} onClick={() => setColor("blue")}>
        blue
      </button>
    </div>
  );
};

export default Say;
