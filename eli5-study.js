if (window.self !== window.top) {
  document.body.classList.add('in-frame');
}
const backBtn = document.getElementById('backToLabBtn');
if (backBtn && window.self !== window.top) {
  backBtn.onclick = function(e) {
    e.preventDefault();
    parent.postMessage({ type: 'eli5-close' }, '*');
  };
}

function reportProgress() {
  const doc = document.documentElement;
  const winScroll = document.body.scrollTop || doc.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height > 0 ? Math.min(100, Math.max(0, Math.round((winScroll / height) * 100))) : 0;
  const fill = document.getElementById('readingProgress');
  if (fill) fill.style.width = pct + '%';
  if (parent && parent !== window) {
    parent.postMessage({ type: 'eli5-progress', value: pct }, '*');
  }
}
window.addEventListener('scroll', reportProgress, { passive: true });
window.addEventListener('load', reportProgress);
window.addEventListener('resize', reportProgress);
window.addEventListener('keydown', e => {
  if (!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && ['Escape', 'ArrowLeft', 'ArrowRight'].includes(e.key) && parent && parent !== window) {
    parent.postMessage({ type: 'eli5-key', key: e.key }, '*');
  }
});
reportProgress();
