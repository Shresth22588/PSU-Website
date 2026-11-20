/* Inner pages: scroll progress, leaves, reveal-on-scroll, gentle hero parallax */
(function(){
  'use strict';
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* scroll progress */
  var bar=document.createElement('div');bar.className='ip-progress';bar.setAttribute('aria-hidden','true');
  document.body.appendChild(bar);
  var tick=false;
  function upd(){
    var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
    bar.style.transform='scaleX('+(max>0?Math.min(1,scrollY/max):0)+')';
    var img=document.querySelector('.psu-hero-media img');
    if(img&&!reduce&&scrollY<900){img.style.translate='0 '+(scrollY*.12)+'px'}
    tick=false;
  }
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
  upd();

  if(reduce)return;

  /* falling leaves in hero */
  var hero=document.querySelector('.psu-hero');
  if(hero){
    var wrap=document.createElement('div');wrap.className='ip-leaves';wrap.setAttribute('aria-hidden','true');
    for(var i=0;i<10;i++){
      var l=document.createElement('i');
      l.style.cssText='--x:'+(Math.random()*96).toFixed(1)+'%;--s:'+(9+Math.random()*10).toFixed(0)+'px;--d:'+
        (14+Math.random()*12).toFixed(1)+'s;--delay:-'+(Math.random()*20).toFixed(1)+'s;--dx:'+((Math.random()*160)-80).toFixed(0)+'px';
      wrap.appendChild(l);
    }
    hero.appendChild(wrap);
  }

  /* reveal on scroll */
  if(!('IntersectionObserver' in window))return;
  var sel='main section:not(.psu-hero) .cg-head,main section:not(.psu-hero) .psu-section-head,'+
    'main .cg-pillar,main .rs-card,main .psu-card,main .stay-card,main .psu-stay-card,main .psu-article,'+
    'main .psu-journal-grid article,main .psu-ct__card,main .psu-testimonial-card,main .psu-faq details,'+
    'main .psu-gallery figure,main [class*="gallery"] figure,main .cg-band,main .psu-cta,main .psu-retreat-band';
  var els=[].slice.call(document.querySelectorAll(sel));
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('ip-in');io.unobserve(e.target)}});
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(el,idx){
    if(el.getBoundingClientRect().top<innerHeight*.9&&el.getBoundingClientRect().top>-50&&false)return;
    var sib=el.parentElement?[].indexOf.call(el.parentElement.children,el):0;
    el.style.setProperty('--rd',(Math.min(sib,6)*0.08).toFixed(2)+'s');
    el.classList.add('ip-rv');io.observe(el);
  });
})();
