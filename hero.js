/* Ambient stars for the layered hero. Scroll depth itself is handled by GSAP in motion.js. */
(()=>{
 const field=document.getElementById('heroField'),button=document.getElementById('pauseField');if(!field)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let seed=74129,paused=reduced.matches;
 const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 const frag=document.createDocumentFragment();
 for(let i=0;i<150;i++){const star=document.createElement('i');star.className='hero-star';star.style.cssText=`left:${(random()*100).toFixed(2)}%;top:${(random()*100).toFixed(2)}%;--s:${(.7+random()*1.7).toFixed(2)}px;--o:${(.28+random()*.58).toFixed(2)};--dur:${(1.8+random()*3.8).toFixed(2)}s;--delay:${(-random()*4).toFixed(2)}s`;frag.appendChild(star)}
 [['60%','14%','6.8s','1.6s'],['70%','62%','8.7s','4.1s'],['64%','36%','10.4s','6.3s']].forEach(([top,left,dur,delay])=>{const s=document.createElement('i');s.className='hero-shooter';s.style.cssText=`--top:${top};--left:${left};--dur:${dur};--delay:${delay}`;frag.appendChild(s)});
 field.appendChild(frag);
 function sync(){field.querySelectorAll('*').forEach(el=>el.style.animationPlayState=paused?'paused':'running');if(button){button.textContent=paused?'Play motion':'Pause motion';button.setAttribute('aria-label',paused?'Play ambient hero motion':'Pause ambient hero motion');button.setAttribute('aria-pressed',String(paused))}}
 if(button)button.onclick=()=>{paused=!paused;sync()};reduced.addEventListener('change',e=>{paused=e.matches;sync()});sync();
})();
