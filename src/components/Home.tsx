import React from "react";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import animation from "../assets/animations/rightpoint_animation.json";

const options = {
  loop: false,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Home = ({ initialText, changeText }: any) => (
  <div>
    <div style={{ width: "600px" }}>
      <Lottie options={options} />
    </div>
    <p>{initialText}</p>
    <button onClick={changeText}>change text!</button>
  </div>
);

const mapStateToProps = ({ initialText }: any) => ({
  initialText,
});

const mapDispatchToProps = (dispatch: any) => ({
  changeText: () => dispatch({ type: "CHANGE_TEXT" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
