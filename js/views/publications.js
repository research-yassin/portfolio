import { loadJSON, html } from '../app.js';
export const title = 'Publications';
export async function view(){
  const pubs = await loadJSON('./data/publications.json');
  return html`
  <section class="section container">
    <h2>Publications</h2>
    <div class="searchbar">
      <input id="q" placeholder="Search by title, venue, year, author..." />
      <select id="type"><option value="">All types</option><option>Journal</option><option>Conference</option><option>Preprint</option></select>
      <button id="export" class="btn">Export BibTeX</button>
    </div>
    <table class="table" id="tbl">
      <thead><tr><th>Authors</th><th>Year</th><th>Title</th><th>Venue</th><th>Type</th></tr></thead>
      <tbody></tbody>
    </table>
  </section>`;
}
export function afterRender(){
  const q = document.getElementById('q');
  const type = document.getElementById('type');
  const tbody = document.querySelector('#tbl tbody');
  const exportBtn = document.getElementById('export');
  let data = [];
  fetch('./data/publications.json').then(r=>r.json()).then(json => { data = json; render(); });
  function render(){
    const needle = (q.value||'').toLowerCase();
    const t = (type.value||'').toLowerCase();
    const rows = data
      .filter(p => JSON.stringify(p).toLowerCase().includes(needle))
      .filter(p => !t || (p.type||'').toLowerCase().includes(t))
      .map(p => `<tr>
          <td>${p.authors}</td>
          <td>${p.year}</td>
          <td><strong>${p.title}</strong>${p.doi?` — <a class="inline" href="https://doi.org/${p.doi}" target="_blank">doi:${p.doi}</a>`:''}</td>
          <td>${p.venue}</td>
          <td>${p.type||''}</td>
        </tr>`).join('');
    tbody.innerHTML = rows || '<tr><td colspan="5" class="small">No matches</td></tr>';
  }
  q.addEventListener('input', render);
  type.addEventListener('change', render);
  exportBtn.addEventListener('click', () => {
    const bib = data.map((p,i)=>`@article{yassin${(p.year||'').replace(/\D/g,'')||'xxxx'}_${i},
  title={${p.title}},
  author={${p.authors}},
  journal={${p.venue}},
  year={${p.year}}${p.doi?`,\n  doi={${p.doi}}`:''}
}`).join('\n\n');
    const blob = new Blob([bib], {type:'text/plain'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'publications.bib'; a.click();
  });
}