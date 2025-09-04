import { loadJSON, html } from '../app.js';
export const title = 'Teaching';

export async function view(){
  return html`
  <section class="section container">
    <h2>Teaching</h2>
    <div class="searchbar">
      <input id="q" placeholder="Search course, code, institution, role..." />
      <select id="institution"><option value="">All institutions</option></select>
      <select id="level">
        <option value="">All levels</option>
        <option>Undergraduate</option>
        <option>Graduate</option>
        <option>Professional</option>
      </select>
      <button id="export" class="btn">Export CSV</button>
    </div>
    <table class="table" id="tbl">
      <thead>
        <tr><th>Course</th><th>Codes</th><th>Institution</th><th>Level</th><th>Role</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>`;
}

export function afterRender(){
  const q = document.getElementById('q');
  const institutionSel = document.getElementById('institution');
  const levelSel = document.getElementById('level');
  const tbody = document.querySelector('#tbl tbody');
  const exportBtn = document.getElementById('export');
  let data = [];

  fetch('./data/teaching.json').then(r => r.json()).then(json => {
    data = json;
    // Populate institutions
    const insts = [...new Set(data.map(x => x.institution).filter(Boolean))].sort();
    insts.forEach(i => {
      const opt = document.createElement('option');
      opt.value = i; opt.textContent = i;
      institutionSel.appendChild(opt);
    });
    render();
  });

  function render(){
    const needle = (q.value || '').toLowerCase();
    const instFilter = institutionSel.value;
    const levelFilter = levelSel.value;

    const rows = data
      .filter(x => !instFilter || x.institution === instFilter)
      .filter(x => !levelFilter || (x.level || '').toLowerCase() === levelFilter.toLowerCase())
      .filter(x => JSON.stringify(x).toLowerCase().includes(needle))
      .map(x => `<tr>
        <td>${x.course || ''}</td>
        <td>${Array.isArray(x.codes) ? x.codes.join(', ') : (x.codes || '')}</td>
        <td>${x.institution || ''}</td>
        <td>${x.level || ''}</td>
        <td>${x.role || ''}</td>
      </tr>`).join('');
    tbody.innerHTML = rows || '<tr><td colspan="5" class="small">No matches</td></tr>';
  }

  q.addEventListener('input', render);
  institutionSel.addEventListener('change', render);
  levelSel.addEventListener('change', render);

  exportBtn.addEventListener('click', () => {
    const header = ['Course','Codes','Institution','Level','Role'];
    const lines = [header.join(',')].concat(
      data.map(x => [
        `"${(x.course||'').replace(/"/g,'""')}"`,
        `"${(Array.isArray(x.codes)?x.codes.join('; '):(x.codes||'')).replace(/"/g,'""')}"`,
        `"${(x.institution||'').replace(/"/g,'""')}"`,
        `"${(x.level||'').replace(/"/g,'""')}"`,
        `"${(x.role||'').replace(/"/g,'""')}"`,
      ].join(','))
    );
    const blob = new Blob([lines.join('\n')], {type:'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'teaching.csv';
    a.click();
  });
}
