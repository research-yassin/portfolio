import { loadJSON, html } from '../app.js';
export const title = 'Home';
export async function view(){
  const profile = await loadJSON('./data/profile.json');
  return html`
  <section class="hero container">
    <div>
      <h1>${profile.name}</h1>
      <p>${profile.title} · ${profile.affiliation}</p>
      <p class="small">${profile.bio}</p>
      <div class="actions">
        <a class="btn primary" href="#/projects">View Projects</a>
        <a class="btn" href="#/publications">Browse Publications</a>
        <a class="btn" href="${profile.cv_url}" download>Download CV</a>
      </div>
      <div class="filterbar">
        ${profile.social.map(s => `<a class="chip" target="_blank" href="${s.url}">${s.label}</a>`).join('')}
      </div>
    </div>
    <div>
      <div class="card">
        <h3>At a glance</h3>
        <ul class="small">
          <li>Research: SHM with FBGs and AI crack detection</li>
          <li>Sustainable materials: PTF‑concrete</li>
          <li>Teaching: Steel, Statics, Strength, Analysis</li>
        </ul>
      </div>
    </div>
  </section>
  `;
}
