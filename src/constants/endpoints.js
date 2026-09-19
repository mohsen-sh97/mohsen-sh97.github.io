const baseUrl = import.meta.env?.BASE_URL || '/';

const endpoints = {
  navbar: `${baseUrl}profile/navbar.json`,
  routes: `${baseUrl}profile/routes.json`,
  home: `${baseUrl}profile/home.json`,
  social: `${baseUrl}profile/social.json`,
  about: `${baseUrl}profile/about.json`,
  skills: `${baseUrl}profile/skills.json`,
  education: `${baseUrl}profile/education.json`,
  experiences: `${baseUrl}profile/experiences.json`,
  projects: `${baseUrl}profile/projects.json`,
};

export default endpoints;
