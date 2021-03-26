import React from 'react';
import { connect } from 'react-redux';

const Home = ({ initialText, changeText }: any) => (
  <div>
    <p>{initialText}</p>
    <button onClick={changeText}>change text!</button>
  </div>
);

const mapStateToProps = ({ initialText }: any) => ({
  initialText,
});

const mapDispatchToProps = (dispatch: any) => ({
  changeText: () => dispatch({ type: 'CHANGE_TEXT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
