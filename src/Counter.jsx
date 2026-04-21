import React, { Component } from "react";

class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0,
  };
  render() {
    const { number, fixedNumber } = this.state; //state를 조회할때는 this.state로 조회한다.
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는값 : {fixedNumber}</h2>
        {/* onClick을 통해 버튼이 클릭되었을때 호출되는 함수를 지정 */}
        <button
          onClick={() => {
            //setState업데이트를 하고 난뒤에 다른 특정작업을 진행하고 싶다면
            this.setState({ number: number + 1 }, () => {
              console.log("방금 setState가 호출되었습니다");
              console.log(this.state);
            });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
