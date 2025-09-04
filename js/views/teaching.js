import { loadJSON, html } from '../app.js';
export const title = 'Teaching';
export async function view(){
  const items = await loadJSON('./data/teaching.json');
  return html`
  <section class="section container">
    <h2>Teaching</h2>
    <div class="card-grid">
      ${items.map(x=>`
        <article class="card">
          <h3>${x.course}</h3>
          <p class="small">${x.level}</p>
          <p>${x.role}</p>
        </article>`).join('')}
    </div>
  </section>`;
}