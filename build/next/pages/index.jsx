import React from "react";

class App extends React.Component {
  static getInitialProps(ctx) {
    if (ctx.req) {
      console.log('server side')
    } else {
      // 客户端第一次不会执行getInitialProps,在路由跳转回时才会执行
      console.log('client side')
    }
    return {
      url: ctx.req.msg
    };
  }
  render() {
    console.log(this.props.url);
    return (
      <div>
        <style jsx>
          {`
            $hover-bg: #f1f1f1;
            h1 {
              width: 100%;
              height: 200px;
              background: #ccc;
              text-align: center;
              line-height: 200px;
              &:hover {
                color: skyblue;
                background: $hover-bg;
              }
            }
          `}
        </style>
        <h1>点击了解一切</h1>
      </div>
    );
  }
}

export default App;
