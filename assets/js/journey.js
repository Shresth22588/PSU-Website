/* Journey v2: auto-playing tab list that drives the arch image stage */
(function(){
var list=document.getElementById('jx'),stage=document.getElementById('jx-stage');if(!list||!stage)return;
var lis=[].slice.call(list.children),T=6500,cur=0,tm=null,inView=false,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var sets=['.jx-gl','.jx-gh','.jx-f','.jx-s','.jx-b'].map(function(q){return[].slice.call(stage.querySelectorAll(q))});
var root=list.closest('.jx');
function go(i){var old=cur;cur=(i+lis.length)%lis.length;
lis.forEach(function(l,k){l.classList.toggle('on',k===cur);l.firstChild.setAttribute('aria-expanded',k===cur)});
var f=sets[2];f.forEach(function(el){el.classList.remove('prev')});if(old!==cur)f[old].classList.add('prev');
sets.forEach(function(s){s.forEach(function(el,k){el.classList.toggle('on',k===cur)})});
root.classList.remove('run');void root.offsetWidth;
if(!rm&&inView){root.style.setProperty('--t',T+'ms');root.classList.add('run')}}
function loop(){clearTimeout(tm);if(rm||!inView)return;tm=setTimeout(function(){go(cur+1);loop()},T)}
lis.forEach(function(l,k){var b=l.firstChild;
b.addEventListener('click',function(){go(k);loop()});
b.addEventListener('focus',function(){if(cur!==k){go(k);loop()}})});
go(0);
if('IntersectionObserver' in window){new IntersectionObserver(function(en){inView=en[0].isIntersecting;if(inView){go(cur);loop()}else{clearTimeout(tm);root.classList.remove('run')}},{threshold:.3}).observe(root)}else{inView=true;loop()}
})();
