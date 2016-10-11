import React, { PropTypes } from 'react';
import i18n from '../i18n/en';

const Algo = (props) => (
  <div>
    <label>
      {i18n[props.name]}
      <input
        type='radio'
        checked={props.selectedAlgoName === props.name}
        onChange={props.handleChange}
        value={props.name}
      />
    </label>
    <p className='explanation'>
      <span>
        {i18n[`${props.name}_explanation`]}
        <a href={i18n[`${props.name}_url`]}>
          {i18n[`${props.name}_link`]}
        </a>
      </span>
    </p>
  </div>
);

Algo.propTypes = {
  name: PropTypes.string,
  selectedAlgoName: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Algo;
