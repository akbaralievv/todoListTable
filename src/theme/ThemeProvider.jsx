import { useState } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from './ThemeContext';

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState('light');

  const defaultValue = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={defaultValue}>{props.children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
