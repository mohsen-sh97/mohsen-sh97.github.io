import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

// Pre-declare lazy components OUTSIDE the component function
// so they are not re-created on every render (fixes "No routes matched" warning)
const About = React.lazy(() => import('./components/About.jsx'));
const Skills = React.lazy(() => import('./components/Skills.jsx'));
const Education = React.lazy(() => import('./components/Education.jsx'));
const Experience = React.lazy(() => import('./components/Experience.jsx'));
const Projects = React.lazy(() => import('./components/Projects.jsx'));

const componentMap = {
  About,
  Skills,
  Education,
  Experience,
  Projects,
};

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  // Don't render Routes until route data is loaded — avoids "No routes matched" warning
  if (!data) return <FallbackSpinner />;

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {data.sections.map((route) => {
              const SectionComponent = componentMap[route.component];
              if (!SectionComponent) return null;
              return (
                <Route
                  key={route.headerTitle}
                  path={route.path}
                  element={<SectionComponent header={route.headerTitle} />}
                />
              );
            })}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
