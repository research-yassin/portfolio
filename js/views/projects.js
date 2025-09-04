import { loadJSON, html } from '../app.js';
export const title = 'Projects';
export async function view(){
  const data = await loadJSON('./data/projects.json');
  const tabs = [
    {key:'research', label:'Research Projects'},
    {key:'industrial', label:'Industrial Projects'},
    {key:'graduate', label:'Graduate Projects'}
  ];
  const tabBtns = tabs.map(t => `<button class="chip" data-key="${t.key}">${t.label}</button>`).join('');
  return html`
  <section class="section container">
    <h2>Projects</h2>
    <div class="filterbar" id="tabs">${tabBtns}</div>
    <div class="searchbar"><input id="q" placeholder="Search within the selected category..." /></div>
    <div id="grid" class="card-grid"></div>
  </section>`;
}
export function afterRender(){
  const q = document.getElementById('q');
  const grid = document.getElementById('grid');
  const tabsEl = document.getElementById('tabs');
  let allData = {research:[], industrial:[], graduate:[]};
  let active = 'research';
  fetch('./data/projects.json').then(r=>r.json()).then(json => { allData = json; render(); });
  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-key]'); if(!btn) return;
    active = btn.dataset.key;
    [...tabsEl.querySelectorAll('button')].forEach(b => b.classList.remove('primary'));
    btn.classList.add('primary');
    render();
  });
  function card(p){
    const sponsor = p.sponsor || p.client || '';
    const meta = [sponsor, p.period || ''].filter(Boolean).join(' · ');
    const extra = [p.location, p.role, p.amount].filter(Boolean).join(' · ');
    const tags = (p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('');
    return `<article class="card">
      <h3>${p.title||'Untitled'}</h3>
      ${p.summary?`<p>${p.summary}</p>`:''}
      ${meta?`<p class="small">${meta}</p>`:''}
      ${extra?`<p class="small">${extra}</p>`:''}
      <div class="tags">${tags}</div>
    </article>`;
  }
  function render(){
    const list = allData[active] || [];
    const needle = (q.value||'').toLowerCase();
    const filtered = list.filter(p => JSON.stringify(p).toLowerCase().includes(needle));
    grid.innerHTML = filtered.map(card).join('') || `<p class="small">No entries yet.</p>`;
  }
  q.addEventListener('input', render);
  const firstBtn = tabsEl.querySelector('button[data-key="research"]'); firstBtn && firstBtn.classList.add('primary');
}