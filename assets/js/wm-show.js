(function(){
var wm=document.querySelector('.wm'),ws=wm&&wm.querySelector('.ws');if(!ws)return;
var cs=[].slice.call(ws.querySelectorAll('.ws-c')),is=[].slice.call(ws.querySelectorAll('.ws-i')),ts=[].slice.call(ws.querySelectorAll('.ws-t')),
colors=['#c79be3','#8fe3bd','#f0b84a'],n=Math.max(cs.length,is.length),cur=0,shown=-1,T=5800,timer,pend=null,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,
st=ws.querySelector('.ws-stack')||document.createElement('div'),r=ws.querySelector('.ws-r');
ws.style.setProperty('--dur',T+'ms');
/* tiles, chips, petals */
var tl=document.createElement('div');tl.className='ws-tiles';tl.setAttribute('aria-hidden','true');
for(var y=0;y<3;y++)for(var x=0;x<4;x++){var t=document.createElement('i');t.style.setProperty('--x',x);t.style.setProperty('--y',y);t.dataset.x=x;t.dataset.y=y;tl.appendChild(t)}
st.appendChild(tl);
var ch=document.createElement('div');ch.className='ws-chips';ch.setAttribute('aria-hidden','true');ch.innerHTML='<span></span><span></span><span></span>';st.appendChild(ch);
var pt=document.createElement('div');pt.className='ws-pt';pt.setAttribute('aria-hidden','true');
var pc=['#f1c6ff','#ffe39a','#b9f0d4','#ffd0c2','#d8c4ff'],ph='';
for(var i=0;i<14;i++)ph+='<s style="--l:'+(Math.random()*100|0)+'%;--w:'+(9+Math.random()*10|0)+'px;--d:'+(9+Math.random()*8|0)+'s;--dl:-'+(Math.random()*14|0)+'s;--pc:'+pc[i%pc.length]+'"></s>';
pt.innerHTML=ph;if(cs.length)r.appendChild(pt);
function swap(k){shown=k;cs.forEach(function(c,i){c.dataset.p=(i-k+n)%n});tl.classList.remove('go')}
function finish(){if(pend!=null){clearTimeout(pend.t);var k=pend.k;pend=null;swap(k)}}
function paint(k){if(!cs[k])return;var im=cs[k].querySelector('img'),W=st.offsetWidth,H=st.offsetHeight,iw=im.naturalWidth||W,ih=im.naturalHeight||H,s=Math.max(W/iw,H/ih),bw=iw*s,bh=ih*s,ox=(W-bw)/2,oy=(H-bh)/2,tw=W/4,th=H/3;
 [].forEach.call(tl.children,function(t){var x=+t.dataset.x,y=+t.dataset.y;t.style.backgroundImage='url("'+(im.currentSrc||im.src)+'")';t.style.backgroundSize=bw+'px '+bh+'px';t.style.backgroundPosition=(ox-x*tw)+'px '+(oy-y*th)+'px'})}
function chips(k){var l=is[k].querySelectorAll('li');[].forEach.call(ch.children,function(s,i){s.textContent=l[i]?l[i].textContent:''});ch.classList.remove('swap');void ch.offsetWidth;ch.classList.add('swap')}
function set(k,first){cur=(k+n)%n;wm.style.setProperty('--c',colors[cur]);
 is.forEach(function(e,i){e.classList.toggle('on',i==cur)});
 ts.forEach(function(t,i){t.classList.remove('on','done');void t.offsetWidth;if(i<cur)t.classList.add('done');if(i==cur)t.classList.add('on')});
 finish();
 if(first||rm){swap(cur);chips(cur);return}
 paint(cur);tl.classList.remove('go');void tl.offsetWidth;tl.classList.add('go');chips(cur);
 pend={k:cur,t:setTimeout(function(){finish()},1700)}}
function go(k){if(k==cur)return;set(k);play()}
cs.forEach(function(c,i){c.addEventListener('click',function(){go(i)})});
st.addEventListener('click',function(){go(cur+1)});
ts.forEach(function(t,i){t.addEventListener('click',function(){go(i)})});
var sx=null;ws.addEventListener('pointerdown',function(e){sx=e.clientX});
addEventListener('pointerup',function(e){if(sx==null)return;var d=e.clientX-sx;sx=null;if(Math.abs(d)>50)go(cur+(d<0?1:-1))});
if(!rm&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 r.addEventListener('mousemove',function(e){var b=r.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;st.style.setProperty('--ry',(x*12).toFixed(1)+'deg');st.style.setProperty('--rx',(-y*9).toFixed(1)+'deg');st.style.setProperty('--mx',x.toFixed(2));st.style.setProperty('--my',y.toFixed(2))});
 r.addEventListener('mouseleave',function(){['--ry','--rx','--mx','--my'].forEach(function(p){st.style.setProperty(p,'0')});st.style.setProperty('--ry','0deg');st.style.setProperty('--rx','0deg')})}
set(0,true);
var vis=true;
function tick(){if(vis&&!document.hidden)set(cur+1)}
/* voice drives the tabs: Private & discreet / Individual attention / Rooted in tradition follow the spoken clip */
window.PSU_wmSet=function(k){if(((k%n)+n)%n!==cur)set(k)};
function play(){clearInterval(timer);if(rm)return;timer=setInterval(tick,T)}
function restartBar(){ts[cur].classList.remove('on');void ts[cur].offsetWidth;ts[cur].classList.add('on')}
if('IntersectionObserver' in window)new IntersectionObserver(function(en){var was=vis;vis=en[0].isIntersecting;if(vis&&!was){restartBar();play()}},{threshold:0}).observe(wm);
document.addEventListener('visibilitychange',function(){if(!document.hidden){restartBar();play()}});
play();
})();
