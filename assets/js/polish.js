/* PSU polish: pause off-screen work, card tilt */
(function(){
var hero=document.querySelector('.w-hero'),vid=hero&&hero.querySelector('.h-vid'),wm=document.querySelector('.wm');
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function watch(el,cb){if(!el)return;if(!('IntersectionObserver' in window)){cb(true);return}new IntersectionObserver(function(en){cb(en[0].isIntersecting)},{threshold:0,rootMargin:'120px 0px'}).observe(el)}
/* hero: pause video + animations when scrolled past, resume when back */
/* hero boot: let the video start flowing first, then release the decorative animations */
if(hero){var released=false;function release(){if(released)return;released=true;hero.classList.remove('h-boot')}
 function flowing(){hero.classList.add('vid-on');setTimeout(release,1800)}
 if(vid){
  if(rm){hero.classList.add('vid-on');release()}
  else{
   var go=function(){if(vid.paused){var p=vid.play();if(p&&p.catch)p.catch(function(){})}};
   /* start only once enough is buffered to play through, so it never stops to load */
   if(vid.readyState>=4)go();else{vid.addEventListener('canplaythrough',go,{once:true});setTimeout(go,4000)}
   vid.addEventListener('waiting',function(){hero.classList.add('h-boot')});vid.addEventListener('playing',function(){setTimeout(release,1200)});
   var seen=false;vid.addEventListener('timeupdate',function t(){if(!seen&&vid.currentTime>0.4){seen=true;vid.removeEventListener('timeupdate',t);flowing()}});
   setTimeout(function(){if(!seen){hero.classList.add('vid-on');release()}},6000);
  }
 }else release();
}
watch(hero,function(on){hero.classList.toggle('off',!on);if(vid){if(on&&!rm){var p=vid.play();if(p&&p.catch)p.catch(function(){})}else vid.pause()}});
if(vid&&rm)vid.pause();
document.addEventListener('visibilitychange',function(){if(!vid)return;if(document.hidden)vid.pause();else if(!rm&&!hero.classList.contains('off'))vid.play().catch(function(){})});
/* "More than a stay": pause when off-screen, soft 3D tilt on cards */
watch(wm,function(on){wm.classList.toggle('off',!on)});
if(wm&&!rm&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 [].forEach.call(wm.querySelectorAll('.wm-c'),function(c){
  c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.classList.add('tl');c.style.setProperty('--ry',(x*9).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*7).toFixed(2)+'deg')});
  c.addEventListener('pointerleave',function(){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg');setTimeout(function(){c.classList.remove('tl')},200)});
 });
}
})();
