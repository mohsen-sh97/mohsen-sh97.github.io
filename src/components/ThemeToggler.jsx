import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

function ThemeToggler(props) {
  const { onClick } = props;
  const handleOnChange = (darkMode) => {
    darkMode.toggle();
    onClick();
  };

  return (
    <AppContext.Consumer>
      {(values) => (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4, marginLeft: 8 }}>
          <Switch
            onChange={() => handleOnChange(values.darkMode)}
            checked={values.darkMode.value}
            checkedIcon={(
              <span style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: 15,
              }}
              >
                🌙
              </span>
            )}
            uncheckedIcon={(
              <span style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: 15,
              }}
              >
                ☀️
              </span>
            )}
            onColor="#2c3e50"
            offColor="#f39c12"
            onHandleColor="#ffffff"
            offHandleColor="#ffffff"
            handleDiameter={22}
            height={28}
            width={56}
            aria-label="Toggle dark mode"
          />
        </div>
      )}
    </AppContext.Consumer>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};
ThemeToggler.defaultProps = {
  onClick: () => {},
};

export default ThemeToggler;
