/* PERF LAYER — pause off-screen work, throttle pointer effects, lazy-decode images */
(function(){
  'use strict';
  var doc=document.documentElement;
  var raf=window.requestAnimationFrame||function(f){return setTimeout(f,16)};

  /* 1. pause animations + videos of sections that are not visible ------------------ */
  function setupVisibility(){
    if(!('IntersectionObserver' in window))return;
    var targets=document.querySelectorAll('section,footer,header.psu-hero,.w-marq,.psu-hero,[data-stars],.lv-marquee');
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        var t=e.target;
        if(e.isIntersecting){
          t.classList.remove('pf-off');
          t.querySelectorAll('video').forEach(function(v){
            if(v._pfPaused){v._pfPaused=false;var p=v.play();if(p&&p.catch)p.catch(function(){})}
          });
        }else{
          t.classList.add('pf-off');
          t.querySelectorAll('video').forEach(function(v){
            if(!v.paused&&!v.ended){v._pfPaused=true;v.pause()}
          });
        }
      });
    },{rootMargin:'120px 0px 120px 0px',threshold:0});
    targets.forEach(function(t){io.observe(t)});
  }

  /* 2. pause everything when the tab is hidden --------------------------------------- */
  document.addEventListener('visibilitychange',function(){
    doc.classList.toggle('pf-hidden',document.hidden);
  });

  /* 3. one pointer-move per frame (mouse effects were running 100+ times / second) --- */
  var lastFrame=-1,frameId=0;
  function tickFrame(){frameId++;}
  function loop(){tickFrame();raf(loop)}
  var mm=function(e){
    if(e.pointerType==='touch')return;
    if(lastFrame===frameId){e.stopImmediatePropagation();return}
    lastFrame=frameId;
  };
  if(window.matchMedia&&matchMedia('(hover:hover)').matches){
    raf(loop);
    window.addEventListener('pointermove',mm,true);
    window.addEventListener('mousemove',mm,true);
  }

  /* 4. images: decode off the main thread, lazy-load everything below the fold ------ */
  function images(){
    var imgs=document.images,vh=window.innerHeight||800;
    for(var i=0;i<imgs.length;i++){
      var im=imgs[i];
      if(!im.hasAttribute('decoding'))im.decoding='async';
      if(!im.hasAttribute('loading')){
        var r=im.getBoundingClientRect();
        if(r.top>vh*1.5)im.loading='lazy';
      }
    }
  }

  /* 5. big non-hero videos should not preload and should never hold the main thread --- */
  function videos(){
    document.querySelectorAll('video').forEach(function(v){
      v.setAttribute('playsinline','');
      v.disablePictureInPicture=true;
      if(!v.classList.contains('h-vid')&&!v.closest('.w-hero,.psu-hero')&&v.preload==='auto')v.preload='metadata';
    });
  }

  function init(){setupVisibility();images();videos()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('load',function(){setTimeout(images,300)});
})();
