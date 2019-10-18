import React from "react";
import { connect } from "react-redux";
import { setCountNumber } from '../../../redux/actions'

class Child extends React.Component {
  public props: any;
  render() {
    const { num, setCountNumber } = this.props
    return (
      <div>
        <p>num: {num.number}</p>
        <button onClick={() => setCountNumber(num.number + 1)}>++</button>
      </div>
    );
  }
}
function mapState(state) {
  return {
    num: state.countNumberReducer
  }
}

export default connect(mapState, { setCountNumber })(Child);
