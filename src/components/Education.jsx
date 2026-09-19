import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import 'react-chrono/dist/style.css';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import { ThemeContext } from 'styled-components';
import AppContext from '../AppContext';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { darkMode } = useContext(AppContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setMode('VERTICAL');
        setWidth('90vw');
      } else if (w < 1024) {
        setMode('VERTICAL_ALTERNATING');
        setWidth('80vw');
      } else {
        setMode('VERTICAL_ALTERNATING');
        setWidth('60vw');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade triggerOnce>
          <div
            className="section-content-container"
            style={{ width, margin: '0 auto', padding: '0 1rem' }}
          >
            <Chrono
              hideControls
              disableToolbar
              allowDynamicUpdate
              useReadMore={false}
              items={data.education}
              cardHeight={200}
              mode={mode}
              darkMode={darkMode.value}
              theme={{
                primary: theme.accentColor,
                secondary: theme.accentColor,
                cardBgColor: theme.chronoTheme.cardBgColor,
                cardForeColor: theme.chronoTheme.cardForeColor,
                titleColor: theme.chronoTheme.titleColor,
                titleColorActive: theme.accentColor,
              }}
            >
              <div className="chrono-icons">
                {data.education.map((education) => (education.icon ? (
                  <img
                    key={education.icon.src}
                    src={education.icon.src.startsWith('/') || education.icon.src.startsWith('http') ? education.icon.src : `/${education.icon.src}`}
                    alt={education.icon.alt}
                  />
                ) : null))}
              </div>
            </Chrono>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;

