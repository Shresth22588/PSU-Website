/* Section audio: Morning/Evening/Night in the "return to yourself" hero, and the 4 panels of "Your journey".
   - entering a section restarts the animation from the first phase (Morning / Meditation) and plays its clip
   - every clip plays ONCE (no repeat); only one clip is ever audible, the old one is faded out before the next starts
   - leaving the section stops the sound
   - browsers block sound until the first tap/key, so it begins at the first gesture while the section is in view */
(function(){
if(!('IntersectionObserver' in window))return;
var base='assets/audio/',files={morning:'sadhana-morning',evening:'sadhana-evening',night:'sadhana-night',
 meditation:'journey-meditation',retreat:'journey-retreat',mindful:'journey-mindful',food:'journey-food',
 th0:'therapies/abhyangam',th1:'therapies/shirodhara',th2:'therapies/nasya',th3:'therapies/basti-karma',th4:'therapies/udvartana',th5:'therapies/takradhara',th6:'therapies/swedana',th7:'therapies/weight-management',
 am0:'amenities/indoor-pool',am1:'amenities/green-gardens',am2:'amenities/private-therapy-rooms',am3:'amenities/meditation-sadhana',am4:'amenities/ayur-meals',am5:'amenities/quiet-stays',am6:'amenities/sacred-corners',am7:'amenities/personal-guidance',am8:'amenities/retreat-spaces',rm0:'rooms/garden-residence',rm1:'rooms/wellness-villa',rm2:'rooms/retreat-stay',tq0:'guests/guest-1',tq1:'guests/guest-2',tq2:'guests/guest-3',rs0:'rasa/madhura',rs1:'rasa/amla',rs2:'rasa/lavana',rs3:'rasa/katu',rs4:'rasa/tikta',rs5:'rasa/kashaya'};
var RATE=.8,FADEIN=900,FADEOUT=300,LAG=450,GAP=500,tracks={},playing=null,muted=false,active=null,secs=[],pend=null,waiting=false;
/* animations only auto-advance on their own timers when audio is NOT driving them */
window.PSU_audioDriving=function(){return !!(active&&active.drive&&!muted)};
/* lets the hero voice know when some section is currently on screen (so it never talks over it) */
window.PSU_secActive=function(){return !!active};

function get(k){if(tracks[k])return tracks[k];var a=new Audio(base+files[k]+'.mp3?v='+(/^(morning|evening|night)$/.test(k)?10:9));a.preload='auto';a.loop=false;a.setAttribute('playsinline','');
 a.preservesPitch=a.mozPreservesPitch=a.webkitPreservesPitch=true;a._r=/^(th|am|rm|tq|rs)\d|^(morning|evening|night)$/.test(k)?1:RATE;a.defaultPlaybackRate=a._r;a.playbackRate=a._r;a._f=null;a.addEventListener('ended',function(){onEnded(k)});return tracks[k]=a}
function fade(a,to,ms,done){clearInterval(a._f);var t0=performance.now(),v0=a.volume;
 a._f=setInterval(function(){var k=Math.min(1,(performance.now()-t0)/ms);a.volume=v0+(to-v0)*k;if(k>=1){clearInterval(a._f);done&&done()}},30)}
function begin(k){var a=get(k);clearInterval(a._f);a.currentTime=0;a.volume=0;a.playbackRate=a._r;var p=a.play();fade(a,1,FADEIN);return p}
function end(k,ms,cb){var a=get(k);if(a.paused){cb&&cb();return}fade(a,0,ms,function(){a.pause();cb&&cb()})}

var about=document.querySelector('.wm .ws-sadhana'),aboutSec=about&&about.closest('section');
var jz=document.querySelector('.jz'),orbs=jz?[].slice.call(jz.querySelectorAll('.jz-o')):[],JN=['meditation','retreat','mindful','food'];
if(aboutSec)secs.push({el:aboutSec,vis:false,name:function(){return about.getAttribute('data-ph')||'morning'},watch:about,attr:['data-ph'],reset:function(){window.PSU_sadhanaReset&&window.PSU_sadhanaReset()},next:function(){window.PSU_sadhanaNext&&window.PSU_sadhanaNext()},onPlay:function(t){var i=['morning','evening','night'].indexOf(t);if(i>=0&&window.PSU_sadhanaGo)window.PSU_sadhanaGo(i)}});
if(jz&&orbs.length)secs.push({el:jz,vis:false,name:function(){var i=orbs.findIndex(function(o){return o.classList.contains('on')});return JN[i<0?0:i]},watch:jz,attr:['class'],sub:true,next:function(){window.PSU_jzNext&&window.PSU_jzNext()}});

/* ---- Holistic therapies: starts from the first therapy, one short English clip per therapy, cards follow the voice ---- */
var thSec=document.getElementById('therapies'),thMq=thSec&&thSec.querySelector('.w-marq'),thTrk=thMq&&thMq.querySelector('.w-trk');
if(thSec&&thTrk){(function(){
 var TH=[['Abhyangam','Abhyangam is a full-body massage with warm, herbal oil. Slow, rhythmic strokes nourish the skin, ease tired muscles, and calm the mind.'],
  ['Shirodhara','Shirodhara is a steady stream of warm oil, poured gently over the forehead. Traditionally used to calm stress and restlessness, it leaves the mind deeply relaxed.'],
  ['Nasya','Nasya is a traditional head-care therapy. After a light face massage, medicated oil drops are placed gently in the nose, for head and sinus comfort.'],
  ['Basti Karma','Basti Karma is a classical Panchakarma therapy, planned by our doctor. It cleanses the colon, supports digestion, and helps the body feel renewed.'],
  ['Udvartana','Udvartana is a herbal powder massage. Firm, upward strokes gently exfoliate the skin, and leave the body feeling light and refreshed.'],
  ['Takradhara','Takradhara is a gentle flow of medicated buttermilk, poured over the head. Traditionally used for stress and skin balance, it is a soothing, restful therapy.'],
  ['Swedana','Swedana is a gentle herbal steam therapy. Its warmth eases stiffness and muscle tightness, and prepares the body for deeper treatments.'],
  ['Weight management','Our weight management programme is personal to you. It brings together diet plans, Panchakarma, yoga counselling and herbal support, planned around you.']];
 var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,cards=[].slice.call(thTrk.children),N=0;
 cards.forEach(function(c,i){if(!N&&c.classList.contains('w-tc-all'))N=i+1});N=N||9;
 cards.forEach(function(c,i){var t=i%N;if(t<TH.length&&!c.classList.contains('w-tc-all')){c.setAttribute('data-ti',t);var e=document.createElement('span');e.className='th-eq';e.setAttribute('aria-hidden','true');e.innerHTML='<s></s><s></s><s></s>';c.appendChild(e)}});
 var cw=document.createElement('div');cw.className='w-wrap th-capw';cw.innerHTML='<p class="th-cap" aria-live="polite"><b></b><span></span></p>';thMq.parentNode.insertBefore(cw,thMq.nextSibling);
 var cap=cw.querySelector('.th-cap'),capB=cap.querySelector('b'),capS=cap.querySelector('span');
 var cur=0,P=0,on=false,nt=null;
 function X0(){return Math.max(16,innerWidth*.07)}
 function txNow(){try{return new DOMMatrixReadOnly(getComputedStyle(thTrk).transform).m41}catch(e){return 0}}
 function leftOf(p){return cards[p].getBoundingClientRect().left-thTrk.getBoundingClientRect().left} /* position inside the track, same at any transform */
 function tFor(p){return X0()-leftOf(p)}
 function setT(p,anim,dur){var x=tFor(p);thTrk.style.transition=anim?'transform '+dur+'s cubic-bezier(.45,0,.2,1)':'none';thTrk.style.transform='translate3d('+x+'px,0,0)';if(!anim){void thTrk.offsetWidth;thTrk.style.transition=''}P=p}
 function norm(){clearTimeout(nt);if(P>=N&&on&&!rm)setT(P-N,false)}
 function paint(){cards.forEach(function(c){c.classList.toggle('th-on',c.getAttribute('data-ti')==cur)});capB.textContent=TH[cur][0];capS.textContent=TH[cur][1]}
 function place(first){
  if(rm){var c=cards[cur];thMq.scrollTo({left:Math.max(0,c.offsetLeft-24),behavior:'smooth'});return}
  var p,from=txNow();
  if(first){var a=tFor(cur),b=tFor(cur+N);p=Math.abs(a-from)<=Math.abs(b-from)?cur:cur+N}
  else{if(P>=N)norm();p=(cur===0&&P>0)?N:cur}
  var d=Math.min(1.8,Math.max(.9,Math.abs(tFor(p)-(first?from:tFor(P)))/1500));
  setT(p,true,d);clearTimeout(nt);nt=setTimeout(norm,d*1000+150)}
 function setCur(i,quiet){cur=i;thSec.setAttribute('data-cur',i);paint();if(on&&!quiet)place(false)}
 function drive(v){
  if(v===on)return;on=v;
  if(v){thSec.classList.add('th-drive');paint();
   if(rm){place(true);return}
   thTrk.style.transform='translate3d('+txNow()+'px,0,0)';thMq.classList.add('th-drv');void thTrk.offsetWidth;place(true)}
  else{thSec.classList.remove('th-drive');clearTimeout(nt);if(rm)return;
   var tx=txNow(),per=thTrk.scrollWidth/2||1,dur=parseFloat(getComputedStyle(thTrk).animationDuration)||45,pr=(((-tx)%per)+per)%per/per;
   thTrk.style.animationDelay=(-pr*dur)+'s';thTrk.style.transition='';thTrk.style.transform='';thMq.classList.remove('th-drv')}}
 addEventListener('resize',function(){if(on&&!rm)setT(P,false)});
 var sec={el:thSec,vis:false,name:function(){return 'th'+cur},watch:thSec,attr:['data-cur'],
  reset:function(){setCur(0,true)},next:function(){setCur((cur+1)%TH.length)},
  onMute:function(){drive(!!sec.drive&&!muted)}};
 var dv=false;Object.defineProperty(sec,'drive',{get:function(){return dv},set:function(v){dv=!!v;drive(dv&&!muted)}});
 secs.push(sec);paint()})()}

/* ---- Restful spaces (amenity cards): starts from Indoor pool, one short English clip per card, card lights up while it speaks ---- */
var amSec=document.getElementById('amenities'),amGrid=amSec&&amSec.querySelector('.g'),amCards=amGrid?[].slice.call(amGrid.querySelectorAll('.w-am-c')):[];
if(amSec&&amCards.length){(function(){
 var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,cur=0,lastIn=0,on=false;
 amCards.forEach(function(c){var e=document.createElement('span');e.className='th-eq';e.setAttribute('aria-hidden','true');e.innerHTML='<s></s><s></s><s></s>';c.appendChild(e)});
 ['wheel','touchmove','keydown','pointerdown'].forEach(function(t){addEventListener(t,function(){lastIn=Date.now()},{passive:true,capture:true})});
 function paint(){amCards.forEach(function(c,i){c.classList.toggle('am-on',i===cur)})}
 /* bring the speaking card into view, but never fight a person who is scrolling */
 function reveal(){if(!on||Date.now()-lastIn<2500||document.documentElement.classList.contains('w-lock'))return;
  var r=amCards[cur].getBoundingClientRect();
  if(r.top<110||r.bottom>innerHeight-20)scrollTo({top:scrollY+r.top-Math.max(110,(innerHeight-r.height)/2),behavior:rm?'auto':'smooth'})}
 function setCur(i){cur=i;amSec.setAttribute('data-cur',i);paint();reveal()}
 function drive(v){if(v===on)return;on=v;amSec.classList.toggle('am-drive',v);if(v){paint();reveal()}}
 var sec={el:amSec,vis:false,name:function(){return 'am'+cur},watch:amSec,attr:['data-cur'],
  hold:function(){return document.documentElement.classList.contains('w-lock')},
  reset:function(){cur=0;amSec.setAttribute('data-cur',0);paint()},next:function(){setCur((cur+1)%amCards.length)},
  onMute:function(){drive(!!sec.drive&&!muted)}};
 var dv=false;Object.defineProperty(sec,'drive',{get:function(){return dv},set:function(v){dv=!!v;drive(dv&&!muted)}});
 secs.push(sec);paint()})()}

/* ---- Rooms & mindful stays: starts from Garden Residence, one short English clip per card, card lights up while it speaks ---- */
var rmSec=document.getElementById('rooms'),rmCards=rmSec?[].slice.call(rmSec.querySelectorAll('.w-rc')):[];
if(rmSec&&rmCards.length===3){(function(){
 var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,cur=0,lastIn=0,on=false;
 rmCards.forEach(function(c){var e=document.createElement('span');e.className='th-eq';e.setAttribute('aria-hidden','true');e.innerHTML='<s></s><s></s><s></s>';c.appendChild(e)});
 ['wheel','touchmove','keydown','pointerdown'].forEach(function(t){addEventListener(t,function(){lastIn=Date.now()},{passive:true,capture:true})});
 function paint(){rmCards.forEach(function(c,i){c.classList.toggle('rm-on',i===cur)})}
 function reveal(){if(!on||Date.now()-lastIn<2500||document.documentElement.classList.contains('w-lock'))return;
  var r=rmCards[cur].getBoundingClientRect();
  if(r.top<110||r.bottom>innerHeight-20)scrollTo({top:scrollY+r.top-Math.max(110,(innerHeight-r.height)/2),behavior:rm?'auto':'smooth'})}
 function setCur(i){cur=i;rmSec.setAttribute('data-cur',i);paint();reveal()}
 function drive(v){if(v===on)return;on=v;rmSec.classList.toggle('rm-drive',v);if(v){paint();reveal()}}
 var sec={el:rmSec,vis:false,name:function(){return 'rm'+cur},watch:rmSec,attr:['data-cur'],
  hold:function(){return document.documentElement.classList.contains('w-lock')},
  reset:function(){cur=0;rmSec.setAttribute('data-cur',0);paint()},next:function(){setCur((cur+1)%rmCards.length)},
  onMute:function(){drive(!!sec.drive&&!muted)}};
 var dv=false;Object.defineProperty(sec,'drive',{get:function(){return dv},set:function(v){dv=!!v;drive(dv&&!muted)}});
 secs.push(sec);paint()})()}

/* ---- Guest experiences: one short English clip per quote, slider + glow follow the voice ---- */
var tqSec=document.querySelector('.w-testi'),tqBtns=tqSec?[].slice.call(tqSec.querySelectorAll('.h-qc button')):[];
if(tqSec&&tqBtns.length===3){(function(){
 var cur=0,on=false;
 function setCur(i){cur=i;tqSec.setAttribute('data-cur',i);tqBtns[i].click()}
 function drive(v){if(v===on)return;on=v;tqSec.classList.toggle('tq-drive',v)}
 var sec={el:tqSec,vis:false,name:function(){return 'tq'+cur},watch:tqSec,attr:['data-cur'],
  reset:function(){cur=0;tqSec.setAttribute('data-cur',0);tqBtns[0].click()},next:function(){setCur((cur+1)%3)},
  onMute:function(){drive(!!sec.drive&&!muted)}};
 var dv=false;Object.defineProperty(sec,'drive',{get:function(){return dv},set:function(v){dv=!!v;drive(dv&&!muted)}});
 secs.push(sec)})()}

/* ---- Ahara (six rasas): one clip per taste, orbit + card follow the voice; tapping a taste plays its clip ---- */
var rsSec=document.getElementById('food');
if(rsSec){(function(){
 var on=false;
 function drive(v){if(v===on)return;on=v;rsSec.classList.toggle('rs-drive',v)}
 var sec={el:rsSec,vis:false,name:function(){return 'rs'+(window.PSU_rasa?window.PSU_rasa.cur():0)},watch:rsSec,attr:['data-cur'],
  reset:function(){window.PSU_rasa&&window.PSU_rasa.show(0)},
  next:function(){window.PSU_rasa&&window.PSU_rasa.next()},
  onPlay:function(t){var a=tracks[t];if(window.PSU_rasa&&a&&a.duration)window.PSU_rasa.bar(Math.round(a.duration/a._r*1000))},
  onMute:function(){drive(!!sec.drive&&!muted)}};
 var dv=false;Object.defineProperty(sec,'drive',{get:function(){return dv},set:function(v){dv=!!v;drive(dv&&!muted)}});
 secs.push(sec)})()}
if(!secs.length)return;

var btn=document.createElement('button');btn.type='button';btn.className='sa-btn';btn.setAttribute('aria-label','Toggle section sound');
btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path class="sa-sp" d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path class="sa-on" d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/><path class="sa-off" d="M16 9.5l5 5M21 9.5l-5 5"/></svg><span></span>';
/* no on-screen sound icon: sound is always on and starts automatically */
function paintBtn(){btn.classList.toggle('show',!!active);btn.classList.toggle('muted',muted);btn.querySelector('span').textContent=muted?'Sound off':'Sound on'}

function start(t){playing=t;window.PSU_secAudio=true;if(window.PSU_heroStop)window.PSU_heroStop();
 var p=begin(t);var tm_=/^(th|am|rm|tq|rs)(\d)$/.exec(t),NN={th:8,am:9,rm:3,tq:3,rs:6};if(tm_)get(tm_[1]+((+tm_[2]+1)%NN[tm_[1]]));if(p&&p.then)p.then(function(){if(active&&playing===t){active.drive=true;active.onPlay&&active.onPlay(t)}}).catch(function(){if(playing===t){playing=null}})}
/* clip finished -> animation moves on at once, next clip starts after a 2 s gap */
function onEnded(k){if(playing!==k||!active||muted)return;playing=null;waiting=true;active.next&&active.next();clearTimeout(pend);pend=setTimeout(function(){waiting=false;sync()},GAP)}
function sync(){
 var want=(active&&!muted&&!document.hidden&&!(active.hold&&active.hold()))?active.name():null;
 if(want===playing||waiting)return;
 clearTimeout(pend);
 if(playing){var old=playing;playing=null;end(old,FADEOUT);if(want)pend=setTimeout(function(){if(!playing)start(want)},FADEOUT+40)}
 else if(want)start(want);
 paintBtn()}

var io=new IntersectionObserver(function(en){var entered=null;
 en.forEach(function(e){secs.forEach(function(s){if(s.el===e.target){var was=s.vis;s.vis=e.isIntersecting;if(s.vis&&!was)entered=s}})});
 var a=null;secs.forEach(function(s){if(s.vis)a=s});
 if(entered&&entered.reset)entered.reset();
 secs.forEach(function(s){if(!s.vis)s.drive=false});
 if(entered||!a){waiting=false;clearTimeout(pend)}
 active=a;paintBtn();if(!a&&window.PSU_heroCheck)window.PSU_heroCheck();
 /* small delay so the section's own animation has already jumped to its first phase */
 clearTimeout(io._t);io._t=setTimeout(sync,entered?80:0)},{rootMargin:'-40% 0px -40% 0px',threshold:0});
secs.forEach(function(s){io.observe(s.el);
 new MutationObserver(function(){if(!s.vis)return;clearTimeout(s.lt);s.lt=setTimeout(sync,LAG)}).observe(s.watch,{attributes:true,attributeFilter:s.attr,subtree:!!s.sub})});

['pointerdown','touchend','keydown','click'].forEach(function(t){document.addEventListener(t,function(e){if(e.target&&e.target.closest&&e.target.closest('.sa-btn'))return;if(active&&!playing)sync()},true)});
btn.addEventListener('click',function(){muted=!muted;sync();paintBtn();secs.forEach(function(s){s.onMute&&s.onMute()})});
/* as soon as someone is in the section the clip starts: if the browser refused earlier (no tap yet), try again on scroll/touch while the section is on screen */
var _rt=0;['wheel','touchmove','scroll'].forEach(function(t){addEventListener(t,function(){var n=Date.now();if(n-_rt<500)return;_rt=n;if(active&&!playing&&!waiting)sync()},{passive:true,capture:true})});
document.addEventListener('visibilitychange',sync);
new MutationObserver(function(){clearTimeout(io._t2);io._t2=setTimeout(sync,150)}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
})();
