/* Ambient stars, shooting stars and the looping video for the hero. Scroll depth itself is handled by GSAP in motion.js. */
(()=>{
 const field=document.getElementById('heroField'),button=document.getElementById('pauseField');if(!field)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let seed=74129,paused=reduced.matches;
 const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 const frag=document.createDocumentFragment();
 // Stars sit in the visible sky band: the field extends above the hero for parallax. Every 8th star is a bright one.
 for(let i=0;i<70;i++){const bright=i%8===0,star=document.createElement('i');star.className='hero-star';star.style.cssText=`left:${(random()*100).toFixed(2)}%;top:${(26+random()*52).toFixed(2)}%;--s:${((bright?2:.8)+random()*(bright?1.4:1.6)).toFixed(2)}px;--o:${((bright?.75:.35)+random()*(bright?.25:.5)).toFixed(2)};--dur:${(1.8+random()*3.8).toFixed(2)}s;--delay:${(-random()*4).toFixed(2)}s`;frag.appendChild(star)}
 [['60%','14%','6.8s','1.6s'],['70%','62%','8.7s','4.1s'],['64%','36%','10.4s','6.3s']].forEach(([top,left,dur,delay])=>{const s=document.createElement('i');s.className='hero-shooter';s.style.cssText=`--top:${top};--left:${left};--dur:${dur};--delay:${delay}`;frag.appendChild(s)});
 field.appendChild(frag);
 const scene=field.closest('.hero-scene'),video=document.querySelector('.hero-vid'),hero=document.querySelector('.intro'),notes=document.querySelector('.hero-notes');let inView=true;
 function sync(){notes[paused?'pauseAnimations':'unpauseAnimations']();if(video){paused||!inView?video.pause():video.play().catch(()=>{})}field.querySelectorAll('*').forEach(el=>el.style.animationPlayState=paused?'paused':'running');if(button){button.textContent=paused?'Play motion':'Pause motion';button.setAttribute('aria-label',paused?'Play ambient hero motion':'Pause ambient hero motion');button.setAttribute('aria-pressed',String(paused))}}
 if(button)button.onclick=()=>{paused=!paused;sync()};reduced.addEventListener('change',e=>{paused=e.matches;sync()});sync();
 // The clip only plays while the hero is on screen.
 new IntersectionObserver(([e])=>{inView=e.isIntersecting;sync()}).observe(hero);
 // Pointer parallax: stage, glow and stars shift by different amounts for depth.
 // Eased by hand: a CSS transition on translate would also lag the scroll-driven drift.
 let tx=0,ty=0,cx=0,cy=0,raf=0;const ease=()=>{cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;scene.style.setProperty('--px',cx.toFixed(1)+'px');scene.style.setProperty('--py',cy.toFixed(1)+'px');raf=Math.abs(tx-cx)+Math.abs(ty-cy)>.1?requestAnimationFrame(ease):0};
 if(matchMedia('(hover:hover)').matches)hero.addEventListener('pointermove',e=>{if(paused)return;tx=(.5-e.clientX/innerWidth)*20;ty=(.5-e.clientY/innerHeight)*12;raf||(raf=requestAnimationFrame(ease))});
})();
