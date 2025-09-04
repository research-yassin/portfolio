export const routes = {
  home: () => import('./views/home.js'),
  projects: () => import('./views/projects.js'),
  publications: () => import('./views/publications.js'),
  teaching: () => import('./views/teaching.js'),
  contact: () => import('./views/contact.js'),
  cv: () => import('./views/cv.js')
};
function parseHash(){ const h = window.location.hash || '#/home'; const [, path] = h.split('/'); return path || 'home'; }
async function render(){
  const path = parseHash();
  const mount = document.getElementById('app');
  if(!routes[path]){ window.location.hash = '#/home'; return; }
  const mod = await routes[path]();
  mount.innerHTML = await mod.view();
  if(mod.afterRender){ mod.afterRender(); }
  document.title = (mod.title ? mod.title + ' — ' : '') + 'Dr. Mohammad Hany Yassin — Portfolio';
}
window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle?.addEventListener('click', () => navList.classList.toggle('open'));
  const darkToggle = document.getElementById('darkToggle');
  const theme = localStorage.getItem('mh-theme') || 'dark';
  if(theme === 'light') document.body.classList.add('light');
  darkToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('mh-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
  render();
});