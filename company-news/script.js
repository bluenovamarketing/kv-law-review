const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.primary-nav');
const updateHeader=()=>header?.classList.toggle('is-sticky',window.scrollY>40);
updateHeader();
window.addEventListener('scroll',updateHeader,{passive:true});
toggle?.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')==='true';
  toggle.setAttribute('aria-expanded',String(!open));
  nav?.classList.toggle('is-open',!open);
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  toggle?.setAttribute('aria-expanded','false');
  nav?.classList.remove('is-open');
}));
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){
  const items=document.querySelectorAll('.reveal');
  items.forEach(item=>item.classList.add('reveal-ready'));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  items.forEach(item=>observer.observe(item));
}
