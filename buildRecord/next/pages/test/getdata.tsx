import React from "react";

class App extends React.Component {
  render() {
    const msg: string = "this is a ts test";
    return <div>{msg}</div>;
  }
}
App.displayName = "test";
export default App;
