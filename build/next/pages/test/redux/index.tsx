import React from "react";
import store from "../../../redux";
import { Provider } from "react-redux";
import Child from './child'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        this is a Provider
        <Child />
      </Provider>
    );
  }
}

export default App;
