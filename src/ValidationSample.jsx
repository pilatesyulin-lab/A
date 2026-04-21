import React, { Component } from "react";
import "./ValidationSample.css";

class ValidationSample extends Component {
  // 패스워드를 받는 공간의 값이
  // 0000이랑 다르면 -> 결과
  state = {
    password: "",
    clicked: false,
    validated: false, // 초기값은 false
  };

  handleChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  input = React.createRef(); //createRef함수를 통해 input이름에 돔에 접근할 수 있는 변수 생성

  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === "0000",
    });
    this.input.current.focus();
  };

  render() {
    return (
      <div>
        <input
          ref={this.input}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.clicked
              ? this.state.validated
                ? "success"
                : "failure"
              : ""
          }
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;
