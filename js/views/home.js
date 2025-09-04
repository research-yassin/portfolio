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
      <ul class="small">
        ${(profile.glance||[]).map(s=>`<li>${s}</li>`).join('')}
      </ul>
      <div class="filterbar" style="margin-top:.8rem">
        ${(profile.social||[]).map(s => `<a class="chip" target="_blank" href="${s.url}">${s.label}</a>`).join('')}
      </div>
    </div>
    <div>
      <div class="card">
        <h3>Contact</h3>
        <p class="small"><a class="inline" href="mailto:${profile.email}">${profile.email}</a> ·
        <p class="small"><a class="inline" href="mailto:${profile.phone1}">${profile.phone1}</a> · ${profile.location1}</p>
        <p class="small"><a class="inline" href="mailto:${profile.phone2}">${profile.phone2}</a> · ${profile.location2}</p>
      </div>
    </div>
  </section>`;
}
