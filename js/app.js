// Shared utilities
export async function loadJSON(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error('Failed to load '+url);
  return await res.json();
}

export function html(strings, ...vals){
  return strings.map((s, i) => s + (vals[i] ?? '')).join('');
}

export function escapeHTML(str=''){
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]));
}
