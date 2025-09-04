export const title = 'Contact';
export async function view(){
  return `<section class="section container">
    <h2>Contact</h2>
    <div class="card">
      <p class="small">For quick questions, email is best.</p>
      <form id="contactForm" class="row" style="flex-wrap:wrap;gap:.7rem">
        <input name="name" placeholder="Your name" required style="flex:1 1 260px"/>
        <input name="email" type="email" placeholder="Your email" required style="flex:1 1 260px"/>
        <input name="subject" placeholder="Subject" style="flex:1 1 100%"/>
        <textarea name="message" placeholder="Message" rows="5" style="flex:1 1 100%"></textarea>
        <button class="btn primary" type="submit">Send</button>
      </form>
      <p class="small">Demo form. Connect Formspree/EmailJS to enable sending.</p>
    </div>
  </section>`;
}
export function afterRender(){
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Thanks! Hook up Formspree or EmailJS to send emails.'); });
}