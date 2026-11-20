/* Hero: cycles Morning -> Evening -> Night sadhana (sky, tag, icons, chips). Click a pill to jump. */
(function(){
var hero=document.querySelector('.ws-sadhana'),arch=hero&&hero.querySelector('.w-arch'),stage=hero&&hero.querySelector('.w-stage');if(!arch||!stage)return;
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,CY=8500;
var I={
sun:'<svg class="ai ai-sun" viewBox="0 0 24 24" aria-hidden="true"><g class="r"><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/></g><circle class="fl" cx="12" cy="12" r="4.6"/></svg>',
sunset:'<svg class="ai ai-sunset" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 18.5h19M7 22h10" opacity=".7"/><g class="s"><path class="fl" d="M6.5 18.5a5.5 5.5 0 0 1 11 0z"/><path class="p" d="M12 7.5v2.2M4.2 11.2l1.6 1.4M19.8 11.2l-1.6 1.4"/></g></svg>',
moon:'<svg class="ai ai-moon" viewBox="0 0 24 24" aria-hidden="true"><path class="m" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path class="t" d="M19 2.5v3M17.5 4h3"/><path class="t t2" d="M4 3v2M3 4h2" /></svg>',
diya:'<svg class="ai ai-diya" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 15c0 3 3.5 5 8.5 5s8.5-2 8.5-5z"/><path class="f" d="M12 3c2.6 2.8 3.2 5 1.8 7.2-.6 1-1.6 1.6-1.8 1.6s-1.2-.6-1.8-1.6C9.2 8 9.4 5.8 12 3z"/></svg>',
candle:'<svg class="ai ai-candle" viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="12" width="7" height="9" rx="1.5"/><path d="M12 10.5v1.5M6 21.5h12"/><path class="f" d="M12 2.5c1.8 2 2.2 3.6 1.2 5.2-.4.6-1 1-1.2 1s-.8-.4-1.2-1C9.8 6.1 10.2 4.5 12 2.5z"/></svg>',
bell:'<svg class="ai ai-bell" viewBox="0 0 24 24" aria-hidden="true"><g class="b"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M12 3v2M10 21a2 2 0 0 0 4 0"/></g></svg>',
wind:'<svg class="ai ai-wind" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h10a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h7"/></svg>',
om:'<svg class="ai ai-om" viewBox="0 0 24 24" aria-hidden="true"><text x="12" y="19">ॐ</text></svg>',
stars:'<svg class="ai ai-stars" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5Q12 12 19 12Q12 12 12 19Q12 12 5 12Q12 12 12 5z"/><path d="M5 2Q5 5 8 5Q5 5 5 8Q5 5 2 5Q5 5 5 2z"/><path d="M19 15.5Q19 18 21.5 18Q19 18 19 20.5Q19 18 16.5 18Q19 18 19 15.5z"/></svg>'};
var P={
morning:{n:'Morning',l:'Morning sadhana',i:'sun',c:[['Sun salutation','sun'],['Pranayama','wind'],['Sunrise mantra','om']]},
evening:{n:'Evening',l:'Evening sadhana',i:'sunset',c:[['Aarti & diya','diya'],['Mantra & bell','bell'],['Sunset stillness','sunset']]},
night:{n:'Night',l:'Night sadhana',i:'moon',c:[['Yoga nidra','moon'],['Trataka candle gaze','candle'],['Silent stargazing','stars']]}},K=['morning','evening','night'];
var R=Math.random,cloud='<i class="sk-cl c1"></i><i class="sk-cl c2"></i><i class="sk-cl c3"></i>',bird='<i class="sk-bd b%"><svg viewBox="0 0 20 9"><path d="M0 5Q5 0 10 5Q15 0 20 5"/></svg></i>',st='',ff='';
for(var i=0;i<24;i++)st+='<s style="left:'+(R()*100|0)+'%;top:'+(R()*72|0)+'%;--z:'+(1.5+R()*2.2).toFixed(1)+'px;--d:'+(2+R()*3).toFixed(1)+'s;--dl:-'+(R()*4).toFixed(1)+'s"></s>';
for(i=0;i<6;i++)ff+='<b style="left:'+(8+R()*84|0)+'%;--b:'+(6+R()*30|0)+'%;--d:'+(8+R()*7|0)+'s;--dl:-'+(R()*9|0)+'s"></b>';
var sky=document.createElement('div');sky.className='sk';sky.setAttribute('aria-hidden','true');
sky.innerHTML='<div class="sk-l sk-m"><i class="sk-rays"></i><i class="sk-sun"></i>'+cloud+bird.replace('%',1)+bird.replace('%',2)+bird.replace('%',3)+'</div>'+
'<div class="sk-l sk-e"><i class="sk-sun"></i>'+cloud+bird.replace('%',1)+bird.replace('%',2)+'</div>'+
'<div class="sk-l sk-n"><div class="sk-st">'+st+'</div><svg class="sk-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><i class="sk-sh"></i><div class="sk-ff">'+ff+'</div></div>'+
'<i class="sk-dy l"><i></i></i><i class="sk-dy r"><i></i></i><div class="sk-vg"></div>';
arch.insertBefore(sky,arch.firstChild);
var tag=arch.querySelector('.sd-tag');if(tag)tag.innerHTML='<span class="tg-ic"></span><b></b>';
var ch=document.createElement('div');ch.className='ph-chips';stage.appendChild(ch);
var cur=-1,timer;
function chips(k){ch.innerHTML=P[k].c.map(function(c,j){return '<div class="ph-chip p'+(j+1)+'"><div class="ph-in" style="--s:'+(j*.18+.05)+'s"><span class="pi">'+I[c[1]]+'</span>'+c[0]+'</div></div>'}).join('')}
function go(n,user){if(n===cur)return;var first=cur<0,k=K[n];cur=n;hero.setAttribute('data-ph',k);
if(tag){var b=tag.querySelector('b');tag.querySelector('.tg-ic').innerHTML=I[P[k].i];b.textContent=P[k].l;b.classList.remove('sw');void b.offsetWidth;b.classList.add('sw')}
if(first)chips(k);else{ch.classList.add('out');setTimeout(function(){chips(k);ch.classList.remove('out')},350)}}
function tick(){clearTimeout(timer);if(rm)return;timer=setTimeout(function(){if(document.hidden||(window.PSU_audioDriving&&window.PSU_audioDriving())){tick();return}go((cur+1)%3);tick()},CY)}
go(0);tick();
/* restart from Morning when the section is entered */
window.PSU_sadhanaReset=function(){cur=-1;go(0);tick()};
window.PSU_sadhanaNext=function(){go((cur+1)%3);tick()};
/* the clip that starts always has its own animation on screen: morning clip = morning, evening = evening, night = night */
window.PSU_sadhanaGo=function(i){go(i);tick()};
})();
