import React, { PropTypes } from 'react';
import i18n from '../i18n/en';

function animationClass(toggled) {
  let className = 'stopwatch_second stopwatch_second--animate';
  return className += toggled ? '0' : '1';
}

const StopwatchIcon = props => (
  <div className='stopwatch'>
    <div className='stopwatch_top'></div>
    <div className='stopwatch_right'></div>
    <div className='stopwatch_arc'>
      <div className={animationClass(props.toggled)}></div>
    </div>
  </div>
);

StopwatchIcon.propTypes = {
  toggled: PropTypes.bool,
};

export default StopwatchIcon;
