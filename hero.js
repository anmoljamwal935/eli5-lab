/* Ambient data points for the layered hero. Scroll depth itself is handled by GSAP in motion.js. */
(()=>{
 const field=document.getElementById('heroField'),button=document.getElementById('pauseField');if(!field)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let seed=74129,paused=reduced.matches;
 const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 const frag=document.createDocumentFragment();
 // data points on the graph paper: snapped to the 24px grid, a few in the palette
 const cols=Math.ceil(field.clientWidth/24),rows=Math.ceil(field.clientHeight/24),colors=['#f1eee8','#f1eee8','#f1eee8','#ff8059','#76d5c1'];
 for(let i=0;i<70;i++){const star=document.createElement('i');star.className='hero-star';star.style.cssText=`left:${Math.floor(random()*cols)*24}px;top:${Math.floor(random()*rows)*24}px;--c:${colors[Math.floor(random()*colors.length)]};--o:${(.35+random()*.5).toFixed(2)};--dur:${(1.8+random()*3.8).toFixed(2)}s;--delay:${(-random()*4).toFixed(2)}s`;frag.appendChild(star)}
 field.appendChild(frag);
 function sync(){field.querySelectorAll('*').forEach(el=>el.style.animationPlayState=paused?'paused':'running');if(button){button.textContent=paused?'Play motion':'Pause motion';button.setAttribute('aria-label',paused?'Play ambient hero motion':'Pause ambient hero motion');button.setAttribute('aria-pressed',String(paused))}}
 if(button)button.onclick=()=>{paused=!paused;sync()};reduced.addEventListener('change',e=>{paused=e.matches;sync()});sync();
})();
