(function(){
var sec=document.querySelector('.vz');if(!sec)return;
var tr=sec.querySelector('.vz-track'),svg=tr.querySelector('.vz-svg'),base=svg.querySelector('.base'),prog=svg.querySelector('.prog'),
gr=svg.querySelector('#vzg'),ufo=tr.querySelector('.vz-ufo'),sts=[].slice.call(tr.querySelectorAll('.vz-st'));
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,mq=matchMedia('(max-width:820px)');
var L=0,W=0,sl=[],cur=0,tgt=0,raf=0,ys=[120,60,120,60],fr=[.125,.375,.625,.875];
function build(){
  if(mq.matches)return;
  W=tr.clientWidth;svg.setAttribute('viewBox','0 0 '+W+' 200');
  var xs=fr.map(function(f){return f*W}),pts=[[W*.02,ys[0]]];
  xs.forEach(function(x,i){pts.push([x,ys[i]])});pts.push([W*.98,ys[3]]);
  var d='M'+pts[0][0].toFixed(1)+' '+pts[0][1];
  for(var i=1;i<pts.length;i++){var a=pts[i-1],b=pts[i],m=((a[0]+b[0])/2).toFixed(1);d+=' C'+m+' '+a[1]+' '+m+' '+b[1]+' '+b[0].toFixed(1)+' '+b[1]}
  base.setAttribute('d',d);prog.setAttribute('d',d);
  L=prog.getTotalLength();prog.style.strokeDasharray=L;
  gr.setAttribute('x1',0);gr.setAttribute('x2',W);
  sl=xs.map(function(x){var lo=0,hi=L;for(var k=0;k<22;k++){var mid=(lo+hi)/2;if(prog.getPointAtLength(mid).x<x)lo=mid;else hi=mid}return lo});
}
function target(){
  var r=tr.getBoundingClientRect(),vh=innerHeight;
  if(mq.matches){
    var p=Math.max(0,Math.min(1,(vh*.72-r.top)/r.height));tr.style.setProperty('--vp',p.toFixed(3));
    sts.forEach(function(s){s.classList.toggle('lit',s.getBoundingClientRect().top<vh*.72)});return;
  }
  tgt=Math.max(0,Math.min(1,(vh*.92-r.top)/(vh*.62)));
}
function render(){
  if(mq.matches||!L)return;
  var len=cur*L;prog.style.strokeDashoffset=L-len;
  var p=prog.getPointAtLength(len),q=prog.getPointAtLength(Math.min(L,len+3));
  var ang=Math.max(-14,Math.min(14,Math.atan2(q.y-p.y,q.x-p.x)*57.3*.6));
  ufo.style.transform='translate('+p.x.toFixed(1)+'px,'+p.y.toFixed(1)+'px) rotate('+ang.toFixed(1)+'deg)';
  sts.forEach(function(s,i){s.classList.toggle('lit',len>=sl[i]-2)});
}
function tick(){
  cur+=(tgt-cur)*.09;if(Math.abs(tgt-cur)<.0008)cur=tgt;render();
  raf=(cur!==tgt)?requestAnimationFrame(tick):0;
}
function kick(){target();if(rm){cur=tgt=1;render();return}if(!raf)raf=requestAnimationFrame(tick)}
function all(){build();if(rm&&!mq.matches){cur=tgt=1;render()}else{cur=0;target();render()}kick()}
if(rm)sts.forEach(function(s){s.classList.add('lit')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){tr.classList.add('in');io.disconnect()}})},{threshold:.15});io.observe(tr);
addEventListener('scroll',kick,{passive:true});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(all,150)});
mq.addEventListener&&mq.addEventListener('change',all);
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(all);all();
})();
