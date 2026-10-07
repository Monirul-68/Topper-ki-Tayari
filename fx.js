// Visual effects only: network background, mouse spotlight, number count-up. No data access.
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const c=document.createElement('canvas');c.id='fx';document.body.prepend(c);const g=c.getContext('2d');
let W,H,P=[];const m={x:-999,y:-999};
const size=()=>{W=c.width=innerWidth;H=c.height=innerHeight;P=Array.from({length:Math.min(80,Math.floor(W*H/18000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))};
size();addEventListener('resize',size);
addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY;const t=e.target.closest?.('.card,.panel,.stat');if(t){const r=t.getBoundingClientRect();t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px')}},{passive:true});
function frame(){g.clearRect(0,0,W,H);
 for(const p of P){if(!RM){p.x+=p.vx;p.y+=p.vy}if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;g.fillStyle='#00f2ffaa';g.fillRect(p.x,p.y,2,2)}
 for(let i=0;i<P.length;i++){for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(d<130){g.strokeStyle=`rgba(139,92,246,${.35*(1-d/130)})`;g.beginPath();g.moveTo(P[i].x,P[i].y);g.lineTo(P[j].x,P[j].y);g.stroke()}}
  const d=Math.hypot(P[i].x-m.x,P[i].y-m.y);if(d<180){g.strokeStyle=`rgba(0,242,255,${.6*(1-d/180)})`;g.beginPath();g.moveTo(P[i].x,P[i].y);g.lineTo(m.x,m.y);g.stroke()}}
 if(!RM&&!document.hidden)requestAnimationFrame(frame)}
frame();document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!RM)frame()});

// Count-up for numbers inside .stat b whenever the app updates them
const count=el=>{const n=+el.textContent;if(RM||el.dataset.busy||!Number.isFinite(n)||el.dataset.v===String(n))return;
 el.dataset.v=n;el.dataset.busy=1;const t0=performance.now();
 (function s(t){const k=Math.min(1,(t-t0)/900);el.textContent=Math.round(n*(1-(1-k)**3));if(k<1)requestAnimationFrame(s);else delete el.dataset.busy})(t0)};
new MutationObserver(ms=>ms.forEach(x=>{const el=x.target.nodeType===3?x.target.parentElement:x.target;if(el?.matches?.('.stat b'))count(el)})).observe(document.body,{childList:true,subtree:true,characterData:true});
