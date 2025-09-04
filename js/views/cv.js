import { loadJSON, html } from '../app.js';
export const title = 'CV';
export async function view(){
  const profile = await loadJSON('./data/profile.json');
  return html`
  <section class="section container">
    <h2>Curriculum Vitae</h2>
    <div class="cv">
      <p><strong>${profile.name}</strong> — ${profile.title}</p>
      <p class="small">${profile.affiliation} · ${profile.location} · <a class="inline" href="mailto:${profile.email}">${profile.email}</a></p>
      <hr style="border:1px solid var(--border);margin:1rem 0"/>
      <p>${profile.bio}</p>
      <div class="actions" style="margin-top:1rem">
        <a class="btn" href="${profile.cv_url}" download>Download PDF</a>
        <button class="btn" onclick="window.print()">Print</button>
      </div>
    </div>
  </section>`;
}
