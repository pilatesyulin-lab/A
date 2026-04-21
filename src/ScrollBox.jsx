import React, { Component } from "react";

class ScrollBox extends Component {
  // scrollTop: 세로스크롤바 위치 0~350
  // scrollHeight : 스크롤이 있는 박스 안의 div 높이 (650)
  // clientHeight : 스크롤이 있는 박스의 높이 (300)
  // 스크롤바를 맨 아래로 내리기 위해선 scrollHeight - clientHeight = 350 하면 된다

  scrollToBottom = () => {
    console.log(this.box);
    const { scrollHeight, clientHeight } = this.box;
    this.box.scrollTop = scrollHeight - clientHeight;
  };

  render() {
    const style = {
      border: "1px solid black",
      height: "300px",
      width: "300px",
      overflow: "auto",
      position: "relative",
    };
    const innerStyle = {
      width: "100%",
      height: "650px",
      background: "linear-gradient(white, black)",
    };
    return (
      <div
        style={style}
        ref={(ref) => {
          this.box = ref;
        }}
      >
        <div style={innerStyle} />
      </div>
    );
  }
}

export default ScrollBox;
