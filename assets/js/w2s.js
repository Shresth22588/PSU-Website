/* PSU w2s.js – icon set + interactions for the Work2Share-style design */
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var IC={
lotus:'<path d="M12 21c-4-1-7-4-7-9 3 0 5.500 1.300 7 3.500 1.500-2.200 4-3.500 7-3.500 0 5-3 8-7 9z"/><path d="M12 15C9.500 13 9.500 8 12 3c2.500 5 2.500 10 0 12z"/>',
leaf:'<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 14z"/><path d="M5 19c3-5 6-8 10-10"/>',
flame:'<path d="M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z"/>',
drop:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
wind:'<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h7"/>',
space:'<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
earth:'<path d="M2 19l6-10 4 6 3-4 7 8z"/>',
pool:'<path d="M3 17c2 0 2-1.500 4.500-1.500S10 17 12 17s2-1.500 4.500-1.500S19 17 21 17M3 21c2 0 2-1.500 4.500-1.500S10 21 12 21s2-1.500 4.500-1.500S19 21 21 21"/><path d="M8 13V6a2 2 0 0 1 4 0M16 13V6a2 2 0 0 0-4 0M8 9h8"/>',
meditate:'<circle cx="12" cy="6" r="2.500"/><path d="M12 9v4M7 20c0-3 2-5 5-5s5 2 5 5M4 14c3 0 5-1 8-1s5 1 8 1"/>',
stones:'<ellipse cx="12" cy="18" rx="8" ry="3"/><ellipse cx="12" cy="12.500" rx="6" ry="2.500"/><ellipse cx="12" cy="7.500" rx="4" ry="2"/>',
bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M9 7c0-2 2-2 2-4M15 7c0-2 2-2 2-4"/>',
bed:'<path d="M3 19V6M3 15h18v4M21 15v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11.500" r="1.500"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
phone:'<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/>',
pin:'<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.500"/>',
arrow:'<path d="M3 12h17M14 6l6 6-6 6"/>',
left:'<path d="M20 12H3M10 6l-6 6 6 6"/>',
heart:'<path d="M12 20s-8-5-8-11a4.500 4.500 0 0 1 8-2.500A4.500 4.500 0 0 1 20 9c0 6-8 11-8 11z"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/><path d="M8.500 12l2.500 2.500 4.500-5"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
users:'<circle cx="9" cy="8" r="3.500"/><path d="M2 20c.8-3.500 3.500-5.500 7-5.500s6.200 2 7 5.500M16 4.500a3.500 3.500 0 0 1 0 7M18 14.800c2 .6 3.400 2.300 4 5.200"/>',
quote:'<path d="M9 7c-3 1-5 3.500-5 7v3h6v-6H7c0-2 1-3 3-4zM19 7c-3 1-5 3.500-5 7v3h6v-6h-3c0-2 1-3 3-4z"/>',
play:'<path d="M7 4l13 8-13 8z"/>',
sound:'<path d="M4 9v6h4l5 4V5L8 9zM17 9a4 4 0 0 1 0 6M19.500 6.500a8 8 0 0 1 0 11"/>',
muted:'<path d="M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6"/>',
check:'<path d="M5 12.500l4.500 4.500L19 7"/>',
menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
close:'<path d="M5 5l14 14M19 5L5 19"/>',
sparkle:'<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM19 17l.8 2.200L22 20l-2.200.8L19 23l-.8-2.200L16 20l2.200-.8z"/>',
camera:'<rect x="3" y="7" width="18" height="13" rx="3"/><circle cx="12" cy="13.500" r="3.500"/><path d="M8 7l1.500-3h5L16 7"/>',
instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.500" cy="6.500" r=".8"/>',
facebook:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.500c0-.3.200-.5.500-.5z"/>',
stethoscope:'<path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>'
};
window.PSU_IC=IC;
$$('[data-ic]').forEach(function(e){var k=e.getAttribute('data-ic');if(!IC[k])return;
 e.outerHTML='<svg class="w-ic '+(e.className||'')+'" viewBox="0 0 24 24" aria-hidden="true">'+IC[k]+'</svg>'});

/* marquee: repeat content so the loop never shows a gap */
$$('[data-dup]').forEach(function(t){var b=t.innerHTML,w=t.scrollWidth,m=w>100?Math.min(6,Math.max(1,Math.ceil(innerWidth*1.1/w))):2,u='';for(var i=0;i<m;i++)u+=b;t.innerHTML=u+u});
/* progress bar + header */
if(!$('#lv-bar')){var bar=document.createElement('div');bar.id='w-bar';document.body.appendChild(bar);
 var pg=function(){var h=document.documentElement,m=h.scrollHeight-innerHeight;bar.style.width=(m>0?h.scrollTop/m*100:0)+'%'};addEventListener('scroll',pg,{passive:true});pg()}
var hd=$('.w-hd');if(hd){var sc=function(){hd.classList.toggle('s',scrollY>30)};addEventListener('scroll',sc,{passive:true});sc();
 var bg=$('.w-burger'),pl=$('.w-pills');
 if(bg){bg.addEventListener('click',function(){var o=pl.classList.toggle('o');bg.innerHTML='<svg class="w-ic" viewBox="0 0 24 24">'+IC[o?'close':'menu']+'</svg>';bg.setAttribute('aria-expanded',o)});
  $$('a',pl).forEach(function(a){a.addEventListener('click',function(){pl.classList.remove('o')})})}}
var y=$('[data-w-year]');if(y)y.textContent=new Date().getFullYear();

/* hero slides */
var sl=$$('.w-sl'),dots=$$('.w-dots b'),imgs=$$('.w-arch img'),cur=0,tm;
function go(i){cur=i;sl.forEach(function(s,k){s.classList.toggle('on',k===i)});dots.forEach(function(d,k){d.classList.toggle('a',k===i)});imgs.forEach(function(m,k){m.classList.toggle('on',k===i)})}
if(sl.length){go(0);var run=function(){clearInterval(tm);if(!rm)tm=setInterval(function(){go((cur+1)%sl.length)},5200)};run();dots.forEach(function(d,k){d.addEventListener('click',function(){go(k);run()})})}
/* petals */
var hero=$('.w-hero');if(hero&&!rm){var cols=['#e9c9fb','#ffe3a1','#bdeed6'];for(var i=0;i<10;i++){var p=document.createElementNS('http://www.w3.org/2000/svg','svg');p.setAttribute('viewBox','-20 -40 40 80');p.setAttribute('class','w-petal');
 p.style.cssText='--s:'+(18+Math.random()*22)+'px;left:'+(Math.random()*96)+'%;--d:'+(12+Math.random()*12)+'s;--dl:-'+(Math.random()*20)+'s';p.innerHTML='<path d="M0 36C20 12 20-14 0-36C-20-14-20 12 0 36Z" fill="'+cols[i%3]+'"/>';hero.appendChild(p)}}
/* tilt */
var st=$('.w-stage');if(st&&fine&&!rm){st.addEventListener('pointermove',function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,yy=(e.clientY-r.top)/r.height-.5;var a=$('.w-arch');a.style.transform='perspective(900px) rotateY('+x*10+'deg) rotateX('+-yy*10+'deg)'});
 st.addEventListener('pointerleave',function(){$('.w-arch').style.transform=''})}
/* magnetic + spotlight */
if(fine&&!rm){$$('.w-btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.18).toFixed(1)+'px '+((e.clientY-r.top-r.height/2)*.28).toFixed(1)+'px'});b.addEventListener('pointerleave',function(){b.style.translate=''})});
}
/* reveals + counters */
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var e=en.target;io.unobserve(e);e.classList.add('in');
 if(e.hasAttribute('data-n')){var n=+e.getAttribute('data-n'),t0=performance.now();(function f(t){var k=Math.min(1,(t-t0)/1600);e.textContent=Math.round(n*(1-Math.pow(1-k,3)))+(e.getAttribute('data-s')||'');if(k<1)requestAnimationFrame(f)})(t0)}})},{threshold:.15});
$$('.w-sec .w-wrap>*:not(.g),.w-oc,.w-elc,.w-am-c,.w-rc,.w-sp,.w-fact,.w-vbox,.w-st').forEach(function(e,i){if(e.closest('.w-hero'))return;e.classList.add('w-rv');var sib=[].indexOf.call(e.parentNode.children,e);e.style.setProperty('--dl',Math.min(sib,5)*.08+'s');io.observe(e)});
$$('[data-n]').forEach(function(e){io.observe(e)});
if(rm)$$('[data-n]').forEach(function(e){e.textContent=e.getAttribute('data-n')+(e.getAttribute('data-s')||'')});
/* carousel */
var tr=$('.w-track');if(tr){$$('.w-arrows button').forEach(function(b){b.addEventListener('click',function(){tr.scrollBy({left:(+b.dataset.d)*320,behavior:'smooth'})})})}
/* voice + video (kept from the original site): sound plays when section is in view, unlocks on first tap */
/* SoftLoop: endless audio that never cuts off. Two players overlap, so the end fades into the start (equal-power crossfade). */
function SoftLoop(src,fade,rate,fin){var A=[new Audio(),new Audio()],c=0,on=false,fresh=false,fi=0,tm=null,fd=null,F=fade||2.5,FI=fin||.5,R=rate||1,noop=function(){};
 A.forEach(function(a){a.preload='auto';a.setAttribute('playsinline','');a.src=src;if(R!==1){a.preservesPitch=true;a.mozPreservesPitch=true;a.webkitPreservesPitch=true;a.defaultPlaybackRate=R;a.playbackRate=R}});
 function lv(a,v){a.volume=Math.max(0,Math.min(1,v))}
 function tick(){if(!on)return;var a=A[c],b=A[1-c],d=a.duration,t=a.currentTime;
  if(a.ended||(d&&isFinite(d)&&t>=d-.04)){if(b.paused){b.currentTime=0;lv(b,1);var q=b.play();if(q&&q.catch)q.catch(noop)}a.pause();lv(a,1);c=1-c;return}
  if(d&&isFinite(d)&&d>F*2&&d-t<=F){var k=1-(d-t)/F;if(b.paused){b.currentTime=0;lv(b,0);var p=b.play();if(p&&p.catch)p.catch(noop)}lv(a,Math.cos(k*Math.PI/2));lv(b,Math.sin(k*Math.PI/2));return}
  if(fresh){var v=t/FI;if(v>=1)fresh=false;lv(a,v)}else lv(a,fi?Math.min(1,(performance.now()-fi)/450):1)}
 return{
  play:function(){clearInterval(fd);on=true;fresh=true;fi=0;var a=A[c],o=A[1-c];o.pause();a.currentTime=0;lv(a,0);var p=a.play();
   /* unlock the 2nd player inside the same user gesture (iOS/Safari), silently */
   o.muted=true;var q=o.play();if(q&&q.then)q.then(function(){if(o!==A[c]){o.pause();o.currentTime=0}o.muted=false}).catch(function(){o.muted=false});else o.muted=false;
   clearInterval(tm);tm=setInterval(tick,40);return p},
  /* continue from the exact spot where stop() paused it (no rewind) */
  cont:function(){clearInterval(fd);on=true;fresh=false;fi=performance.now();var a=A[c],o=A[1-c];o.pause();lv(a,0);var p=a.play();clearInterval(tm);tm=setInterval(tick,40);return p},
  stop:function(ms){on=false;clearInterval(tm);clearInterval(fd);ms=ms==null?600:ms;var it=A.filter(function(a){return !a.paused});if(!it.length)return;var t0=performance.now(),v0=it.map(function(a){return a.volume});
   fd=setInterval(function(){var k=(performance.now()-t0)/ms;it.forEach(function(a,i){lv(a,v0[i]*(1-k))});if(k>=1){clearInterval(fd);it.forEach(function(a){a.pause()})}},30)},
  setSrc:function(s){on=false;clearInterval(tm);clearInterval(fd);A.forEach(function(a){a.pause();a.src=s;a.load();lv(a,1)});c=0},
  isPlaying:function(){return on}}}
window.PSU_SoftLoop=SoftLoop;
var evts=['click','touchend','keydown','pointerup','mousedown'];
function whenInView(sec,onIn,onOut){var vis=false;new IntersectionObserver(function(en){vis=en[0].isIntersecting;vis?onIn():onOut()},{threshold:.5}).observe(sec);
 function un(){if(vis)onIn();} evts.forEach(function(t){document.addEventListener(t,un,true)});return function(){return vis}}
$$('.w-vbox').forEach(function(box){var v=$('video',box),mb=$('.w-mute',box);if(!v)return;
 function icon(){if(mb)mb.innerHTML='<svg class="w-ic" viewBox="0 0 24 24">'+IC[v.muted?'muted':'sound']+'</svg>'}
 function muted(){v.muted=true;var p=v.play();if(p&&p.catch)p.catch(function(){});icon()}
 function loud(){if(v.dataset.userMuted)return muted();v.muted=false;v.volume=1;var p=v.play();if(p&&p.catch)p.catch(muted);setTimeout(icon,200)}
 whenInView(box,loud,muted);
 if(mb)mb.addEventListener('click',function(e){e.stopPropagation();if(v.muted){delete v.dataset.userMuted;v.muted=false}else{v.dataset.userMuted=1;v.muted=true}icon()});icon()});
var el=$('.w-el'),ea=el&&$('.elements-audio',el);
if(ea){var pl2=false,eLoop=SoftLoop(ea.getAttribute('src'),2.5);ea.removeAttribute('src');whenInView(el,function(){if(pl2)return;var p=eLoop.play();if(p&&p.then)p.then(function(){pl2=true}).catch(function(){});else pl2=true},function(){eLoop.stop(800);pl2=false})}
var ha=$('.hero-audio'),hb=$$('.hero-lang__btn');
if(ha){var lang='en',started=false,hLoop=SoftLoop(ha.getAttribute('data-en'),.5,1,.25);ha.removeAttribute('src');
 function sb(){hb.forEach(function(b){var on=b.dataset.lang===lang;b.classList.toggle('is-on',on);b.setAttribute('aria-pressed',on)})}
 var held=false,hv=false,resuming=false;
 function ps(){var p=hLoop.play();if(p&&p.then)p.then(function(){started=true;held=false;rmu()}).catch(function(){});else{started=true;held=false;rmu()}}
 function begin(){if(!started&&!window.PSU_secAudio)ps()}
 window.PSU_heroStop=function(){if(hLoop.isPlaying()){hLoop.stop(500);held=true}started=false};
 /* back in the hero: carry on from where the voice stopped (only when no other section is speaking) */
 function back(){if(!held||!hv||resuming||(window.PSU_secActive&&window.PSU_secActive()))return;resuming=true;
  var p=hLoop.cont(),ok=function(){resuming=false;started=true;held=false;rmu()},no=function(){resuming=false;hLoop.stop(0)};
  if(p&&p.then)p.then(ok).catch(no);else ok()}
 window.PSU_heroCheck=function(){setTimeout(back,380)};
 var hs=$('.w-hero');if(hs&&'IntersectionObserver' in window)new IntersectionObserver(function(en){hv=en[0].isIntersecting;if(hv)window.PSU_heroCheck()},{rootMargin:'-40% 0px -40% 0px',threshold:0}).observe(hs);
 ['pointerdown','touchend','keydown','click'].forEach(function(t){document.addEventListener(t,function(){if(held)back()},true)});
 function rmu(){['pointerdown','mousedown','touchstart','touchend','click','keydown','wheel'].forEach(function(t){document.removeEventListener(t,un2,true)})}
 function un2(e){if(e&&e.target&&e.target.closest&&e.target.closest('.hero-lang__btn'))return;begin()}
 hb.forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();if(b.dataset.lang===lang&&started)return;lang=b.dataset.lang;sb();hLoop.setSrc(ha.getAttribute('data-'+lang));started=false;ps()})});
 ['pointerdown','mousedown','touchstart','touchend','click','keydown','wheel'].forEach(function(t){document.addEventListener(t,un2,true)});sb();begin()}
/* testimonials */
var qs=$$('.w-q blockquote');if(qs.length){var qi=0;qs[0].classList.add('on');setInterval(function(){qs[qi].classList.remove('on');qi=(qi+1)%qs.length;qs[qi].classList.add('on')},5500)}
/* faq single open */
$$('.w-faq details').forEach(function(d){d.addEventListener('toggle',function(){if(d.open)$$('.w-faq details').forEach(function(o){if(o!==d)o.open=false})})});
})();

/* amenity side panel */
(function(){var IC=window.PSU_IC,pd=document.getElementById('w-am-data');if(!pd||!IC)return;var D=JSON.parse(pd.textContent),pn=document.querySelector('.w-pn'),box=pn.querySelector('.w-pn-in'),cur=0,last;
function fill(i){cur=(i+D.length)%D.length;var a=D[cur];
 box.innerHTML='<div class="ph"><img src="'+a.img+'" alt=""></div><div class="b"><span class="w-eyebrow">'+a.tag+'</span><h3>'+a.t+'</h3><p>'+a.d+'</p><ul>'+a.pts.map(function(p,k){return '<li style="--k:'+k+'"><svg class="w-ic" viewBox="0 0 24 24">'+IC.check+'</svg><span>'+p+'</span></li>'}).join('')+'</ul><div class="w-hbtns"><button class="w-btn" type="button" data-psu-open-booking data-close><span>Check availability</span><svg class="w-ic" viewBox="0 0 24 24">'+IC.arrow+'</svg></button>'+(a.link?'<a class="w-btn ghost" href="'+a.link[0]+'"><span>'+a.link[1]+'</span></a>':'')+'</div><div class="nav"><button type="button" data-n="-1">&larr; Prev</button><span>'+(cur+1)+' / '+D.length+'</span><button type="button" data-n="1">Next &rarr;</button></div></div>';pn.querySelector('.w-pn-box').scrollTop=0}
function open(i){fill(i);pn.classList.add('o');pn.setAttribute('aria-hidden','false');document.documentElement.classList.add('w-lock');last=document.activeElement;setTimeout(function(){pn.querySelector('.w-pn-x').focus()},300)}
function close(){pn.classList.remove('o');pn.setAttribute('aria-hidden','true');document.documentElement.classList.remove('w-lock');if(last&&last.focus)last.focus()}
document.addEventListener('click',function(e){var c=e.target.closest('.w-am-c');if(c){open(+c.dataset.i);return}
 var n=e.target.closest('.w-pn [data-n]');if(n){fill(cur+ +n.dataset.n);return}
 if(e.target.closest('.w-pn [data-close]'))close()});
document.addEventListener('keydown',function(e){if(!pn.classList.contains('o'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')fill(cur+1);if(e.key==='ArrowLeft')fill(cur-1)})})();
