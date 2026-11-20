/* Journey v3: orbs drive the full-bleed stage; photo opens as a circle from the clicked orb */
(function(){
var root=document.querySelector('.jz'),orbs=root&&[].slice.call(root.querySelectorAll('.jz-o'));if(!root||!orbs.length)return;
var bgs=[].slice.call(root.querySelectorAll('.jz-bg')),pns=[].slice.call(root.querySelectorAll('.jz-pn'));
var T=9000,cur=0,tm=null,inView=false,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function origin(el){var r=root.getBoundingClientRect(),o=el.getBoundingClientRect();return[(o.left+o.width/2-r.left),(o.top+o.height/2-r.top)]}
function go(i,first){var old=cur;cur=(i+orbs.length)%orbs.length;
var p=origin(orbs[cur]),w=root.clientWidth,h=root.clientHeight;
var nb=bgs[cur];nb.style.setProperty('--ox',p[0]+'px');nb.style.setProperty('--oy',p[1]+'px');nb.style.setProperty('--R',Math.hypot(w,h)+'px');
bgs.forEach(function(b){b.classList.remove('prev')});
if(old!==cur){bgs[old].classList.add('prev')}
bgs.forEach(function(b,k){b.classList.toggle('on',k===cur)});
pns.forEach(function(x,k){x.classList.toggle('on',k===cur)});
orbs.forEach(function(o,k){o.classList.toggle('on',k===cur);o.setAttribute('aria-pressed',k===cur)});
root.classList.remove('run');void root.offsetWidth;
if(!rm&&inView){root.style.setProperty('--t',T+'ms');root.classList.add('run')}}
function loop(){clearTimeout(tm);if(rm||!inView)return;tm=setTimeout(function(){if(window.PSU_audioDriving&&window.PSU_audioDriving()){loop();return}go(cur+1);loop()},T)}
window.PSU_jzNext=function(){go(cur+1);loop()};
orbs.forEach(function(o,k){o.addEventListener('click',function(){if(k!==cur)go(k);loop()})});
go(0);
if('IntersectionObserver' in window){new IntersectionObserver(function(en){inView=en[0].isIntersecting;if(inView){go(0);loop()}else{clearTimeout(tm);root.classList.remove('run')}},{rootMargin:'-40% 0px -40% 0px',threshold:0}).observe(root)}else{inView=true;loop()}
})();
