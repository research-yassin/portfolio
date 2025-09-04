import { loadJSON, html } from '../app.js';
export const title = 'Projects';

export async function view(){
  return html`
  <section class="section container">
    <h2>Projects</h2>
    <div class="searchbar">
      <input id="q" placeholder="Search by title, sponsor/client, tag..." />
      <select id="category">
        <option value="">All categories</option>
        <option value="research">Research</option>
        <option value="industrial">Industrial</option>
        <option value="graduate">Graduate</option>
      </select>
      <button id="export" class="btn">Export CSV</button>
    </div>
    <table class="table" id="tbl">
      <thead>
        <tr><th>Title</th><th>Sponsor/Client</th><th>Period</th><th>Location</th><th>Role/Amount</th><th>Tags</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>`;
}

export function afterRender(){
  const q = document.getElementById('q');
  const cat = document.getElementById('category');
  const tbody = document.querySelector('#tbl tbody');
  const exportBtn = document.getElementById('export');
  let flat = [];

  fetch('./data/projects.json').then(r => r.json()).then(json => {
    flat = ['research','industrial','graduate']
      .flatMap(k => (json[k] || []).map(p => ({ ...p, __category: k })));
    render();
  });

  function sponsorOrClient(p){ return p.sponsor || p.client || ''; }
  function roleAmount(p){
    const parts = [p.role, p.amount].filter(Boolean);
    return parts.join(' · ');
  }

  function render(){
    const needle = (q.value || '').toLowerCase();
    const sel = cat.value;
    const list = flat
      .filter(p => !sel || p.__category === sel)
      .filter(p => JSON.stringify(p).toLowerCase().includes(needle));

    const rows = list.map(p => `<tr>
      <td>${p.title || ''}</td>
      <td>${sponsorOrClient(p)}</td>
      <td>${p.period || ''}</td>
      <td>${p.location || ''}</td>
      <td>${roleAmount(p)}</td>
      <td>${(p.tags || []).join(', ')}</td>
    </tr>`).join('');

    tbody.innerHTML = rows || '<tr><td colspan="6" class="small">No matches</td></tr>';
  }

  q.addEventListener('input', render);
  cat.addEventListener('change', render);

  exportBtn.addEventListener('click', () => {
    const header = ['Title','Category','Sponsor/Client','Period','Location','Role','Amount','Tags'];
    const lines = [header.join(',')].concat(
      flat.map(p => [
        `"${(p.title||'').replace(/"/g,'""')}"`,
        p.__category,
        `"${(sponsorOrClient(p)||'').replace(/"/g,'""')}"`,
        `"${(p.period||'').replace(/"/g,'""')}"`,
        `"${(p.location||'').replace(/"/g,'""')}"`,
        `"${(p.role||'').replace(/"/g,'""')}"`,
        `"${(p.amount||'').replace(/"/g,'""')}"`,
        `"${(p.tags||[]).join('; ').replace(/"/g,'""')}"`,
      ].join(','))
    );
    const blob = new Blob([lines.join('\n')], {type:'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'projects.csv';
    a.click();
  });
}
