import React from "react";

const MyComponent = ({ name, children, addr, age }) => {
  return (
    <div>
      {name}의 첫 컴포넌트
      <br />
      children 값은 {children}
      <br />
      공부는 {addr}에서 하고 있습니다.
      <br />
      나이는 {age}입니다.
    </div>
  );
};
export default MyComponent;
