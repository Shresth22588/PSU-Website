/* PSU live.js – scroll progress, hero word-reveal, petals, marquee, blobs, spotlight/tilt, magnetic buttons, reveals */
(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var page=$('.psu-complete-page');if(!page)return;

  /* scroll progress + header state */
  var bar=document.createElement('div');bar.id='lv-bar';document.body.appendChild(bar);
  function prog(){var h=document.documentElement;var m=h.scrollHeight-innerHeight;bar.style.width=(m>0?h.scrollTop/m*100:0)+'%'}
  addEventListener('scroll',prog,{passive:true});prog();
  if(rm)return;

  /* hero headline: words rise in */
  var t=$('.psu-hero .psu-title');
  if(t&&!t.dataset.lv){
    t.dataset.lv=1;var n=0;
    (function split(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(c){
        if(c.nodeType===3){
          var f=document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function(w){
            if(!w)return;
            if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(' '));return}
            var s=document.createElement('span');s.className='lv-w';
            var i=document.createElement('i');i.textContent=w;i.style.setProperty('--i',n++);s.appendChild(i);f.appendChild(s);
          });
          node.replaceChild(f,c);
        }else if(c.nodeType===1&&c.tagName!=='BR'){split(c)}
      });
    })(t);
  }

  /* hero: floating petals + scroll cue */
  var hero=$('.psu-hero');
  if(hero){
    var box=document.createElement('div');box.className='lv-petals';box.setAttribute('aria-hidden','true');
    var cols=['#e9c9fb','#ffe3a1','#bdeed6','#ffffff'];
    for(var i=0;i<14;i++){
      var s=18+Math.random()*26;
      var p=document.createElementNS('http://www.w3.org/2000/svg','svg');p.setAttribute('viewBox','-20 -40 40 80');
      p.style.cssText='--s:'+s+'px;--x:'+(Math.random()*96)+'%;--d:'+(11+Math.random()*12)+'s;--dl:-'+(Math.random()*20)+'s';
      p.innerHTML='<path d="M0 36C20 12 20-14 0-36C-20-14-20 12 0 36Z" fill="'+cols[i%4]+'"/>';
      box.appendChild(p);
    }
    hero.appendChild(box);
    if($('.psu-hero--compact')==null){var cue=document.createElement('span');cue.className='lv-cue';hero.appendChild(cue)}
  }

  /* home only: marquee strip of experiences */
  if(page.dataset.psuPage==='home'&&hero){
    var words=['Abhyangam','Shirodhara','Meditation','Pancha Tatva','Mindful stays','Herbal therapies','Retreats','Nasya','Garden walks','Inner ease'];
    var mq=document.createElement('div');mq.className='lv-marquee';mq.setAttribute('aria-hidden','true');
    var row='';words.concat(words).forEach(function(w){row+='<span>'+w+'</span>'});
    mq.innerHTML='<div>'+row+'</div>';
    hero.parentNode.insertBefore(mq,hero.nextSibling);
  }

  /* drifting blobs behind sections */
  $$('.psu-section,.about,.psu-journal-home,.stay-section').slice(0,8).forEach(function(s){
    if(s.classList.contains('psu-section--dark'))return;
    var w=document.createElement('div');w.className='lv-blobs';w.innerHTML='<b></b><b></b>';
    s.classList.add('lv-has');s.insertBefore(w,s.firstChild);
  });

  /* scroll reveal with stagger, classes removed afterwards so hover transforms stay normal */
  var sel='.psu-kicker,.psu-h2,.psu-lead,.psu-body>*,.psu-card,.psu-stay-card,.psu-signature-grid article,.psu-article,.psu-journal-grid article,.stay-card,.el,.psu-gx__grid>*,.psu-faq details,.psu-ct__card,.psu-actions,.psu-page section img:not([src*="deco"])';
  var els=$$(sel,$('main')||page).filter(function(e){return !e.closest('[data-reveal],[data-reveal-img],.ease,.psu-hero,.lv-marquee')&&!e.hasAttribute('data-reveal')});
  els.forEach(function(e){
    var sib=e.parentNode?Array.prototype.indexOf.call(e.parentNode.children,e):0;
    e.style.setProperty('--dl',Math.min(sib,6)*.09+'s');e.classList.add('lv-r');
  });
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(!en.isIntersecting)return;
      var e=en.target;io.unobserve(e);e.classList.add('lv-in');
      setTimeout(function(){e.classList.remove('lv-r','lv-in');e.style.removeProperty('--dl')},1700);
    });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e){io.observe(e)});
  setTimeout(function(){els.forEach(function(e){if(e.classList.contains('lv-r')&&!e.classList.contains('lv-in')){var r=e.getBoundingClientRect();if(r.top<innerHeight)e.classList.add('lv-in')}})},2500);

  if(!fine)return;

  /* cursor glow */
  var g=document.createElement('div');g.id='lv-glow';document.body.appendChild(g);
  addEventListener('pointermove',function(e){g.style.opacity=1;g.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'},{passive:true});
  document.addEventListener('pointerleave',function(){g.style.opacity=0});

  /* card spotlight + soft tilt */
  var cardSel='.psu-card,.psu-stay-card,.psu-signature-grid article,.psu-article,.stay-card,.psu-journal-grid article,.el,.psu-ct__card';
  document.addEventListener('pointermove',function(e){
    var c=e.target.closest&&e.target.closest(cardSel);if(!c)return;
    var r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
  },{passive:true});

  /* magnetic buttons */
  $$('.psu-btn:not(.psu-menu-button)').forEach(function(b){
    b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();
      b.style.translate=((e.clientX-r.left-r.width/2)*.2).toFixed(1)+'px '+((e.clientY-r.top-r.height/2)*.3).toFixed(1)+'px'});
    b.addEventListener('pointerleave',function(){b.style.translate=''});
  });

  /* image parallax inside split sections / cards */
  var pim=$$('.psu-split img,.psu-home-gallery img,.psu-retreat-band img,.about__right img').filter(function(i){return !i.closest('.ease')});
  var tick=false;
  function par(){tick=false;pim.forEach(function(im){var r=im.getBoundingClientRect();if(r.bottom<-80||r.top>innerHeight+80)return;
    im.style.translate='0 '+(-(r.top+r.height/2-innerHeight/2)/innerHeight*30).toFixed(1)+'px'})}
  if(pim.length){addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(par)}},{passive:true});par()}
})();
