import { loadJSON, html } from '../app.js';
export const title = 'Projects';
export async function view(){
  const projects = await loadJSON('./data/projects.json');
  return html`
  <section class="section container">
    <h2>Projects</h2>
    <div class="searchbar">
      <input id="q" placeholder="Search projects by title, sponsor, tag..." />
    </div>
    <div id="grid" class="card-grid"></div>
  </section>`;
}
export function afterRender(){
  const grid = document.getElementById('grid');
  const q = document.getElementById('q');
  let data = [];
  fetch('./data/projects.json').then(r=>r.json()).then(json => { data = json; render(); });
  function render(){
    const needle = (q.value||'').toLowerCase();
    grid.innerHTML = data
      .filter(p => JSON.stringify(p).toLowerCase().includes(needle))
      .map(p => `
        <article class="card">
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
          <p class="small">${p.sponsor} · ${p.period}</p>
          <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        </article>
      `).join('');
  }
  q.addEventListener('input', render);
}
