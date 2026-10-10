(()=>{
 const studioAction=()=>document.querySelector('#openStudio').click();document.querySelector('#footerStudio').onclick=studioAction;
 const takes=[['A loan creates a matching bank deposit.','money-india'],['Attention is a way to route information, not a guarantee of truth.','transformers'],['Energy, power, and location are three different constraints.','grid']];let take=0;
 const showTake=delta=>{take=(take+delta+takes.length)%takes.length;document.querySelector('#takeawayText').textContent=takes[take][0];document.querySelector('#takeawayLink').href='?id='+takes[take][1];if(window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.fromTo('#takeawayText',{opacity:0,y:8},{opacity:1,y:0,duration:.35});};
 document.querySelector('#takeawayNext').onclick=()=>showTake(1);document.querySelector('#takeawayPrev').onclick=()=>showTake(-1);document.querySelector('#takeawayLink').onclick=e=>{e.preventDefault();openReader(takes[take][1]);};
 if(!window.gsap||!window.ScrollTrigger)return;gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
  const hero=document.querySelector('.intro'), heroScroll={trigger:hero,start:'top top',end:'bottom top',scrub:.65,invalidateOnRefresh:true};
  gsap.to('.hero-stars',{y:'150vh',ease:'none',scrollTrigger:{...heroScroll}});
  gsap.to('.hero-sky',{y:'95vh',scale:1.025,ease:'none',scrollTrigger:{...heroScroll}});
  gsap.to('.hero-glow',{y:'62vh',ease:'none',scrollTrigger:{...heroScroll}});
  gsap.to('.hero-ridge-mid',{y:'34vh',scale:1.035,ease:'none',scrollTrigger:{...heroScroll}});
  gsap.to('.hero-depth-card',{y:'14vh',ease:'none',scrollTrigger:{...heroScroll}});
  gsap.to('.hero-foreground',{y:'-52vh',scale:1.055,ease:'none',scrollTrigger:{...heroScroll}});
  const p=document.querySelector('.reveal-copy');p.innerHTML=p.textContent.trim().split(/\s+/).map(w=>'<span>'+w+'</span>').join(' ');
  gsap.fromTo('.reveal-copy span',{opacity:.16},{opacity:1,stagger:.13,ease:'none',scrollTrigger:{trigger:p,start:'top 82%',end:'bottom 45%',scrub:1}});

 });
 mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{ScrollTrigger.create({trigger:'.understand-title',start:'top 120px',endTrigger:'.understand-body',end:'bottom 65%',pin:true,pinSpacing:false});});
 let refreshTimer;const refresh=()=>{clearTimeout(refreshTimer);refreshTimer=setTimeout(()=>ScrollTrigger.refresh(),180);};const mo=new MutationObserver(refresh);mo.observe(document.querySelector('#grid'),{childList:true});mo.observe(document.querySelector('#catalog'),{childList:true});document.fonts.ready.then(refresh);window.addEventListener('load',refresh);
})();
