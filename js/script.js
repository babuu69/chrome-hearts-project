const menuToggle=document.getElementById('menuToggle');
const nav=document.getElementById('mainNav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
const progress=document.getElementById('progress'),backTop=document.getElementById('backTop');
function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';backTop.classList.toggle('show',scrollY>500);}
addEventListener('scroll',onScroll,{passive:true});onScroll();
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit',async e=>{
 e.preventDefault();
 const form=e.currentTarget, data=new FormData(form);
 const message=`CHROME HEARTS — Website enquiry\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nSubject: ${data.get('subject')}\n\n${data.get('message')}`;
 try{await navigator.clipboard.writeText(message);document.getElementById('formStatus').textContent='Your message has been copied. You can now paste it into an email or message. This demo form does not send it automatically.';}
 catch{document.getElementById('formStatus').textContent='Your message is ready, but automatic copying was blocked by your browser. Please select and copy your message details manually.';}
});

// Intro screen: reveal the page after the first paint, with a fallback for reduced motion.
const siteLoader=document.getElementById('siteLoader');
const dismissLoader=()=>siteLoader&&siteLoader.classList.add('done');
if(siteLoader){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){dismissLoader();}else{window.addEventListener('load',()=>setTimeout(dismissLoader,900));setTimeout(dismissLoader,2200);}}

// Product category filters
const filterButtons=[...document.querySelectorAll('.filter-btn')];
const productCards=[...document.querySelectorAll('.product-card')];
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
 filterButtons.forEach(b=>b.classList.toggle('active',b===btn));
 const filter=btn.dataset.filter;
 productCards.forEach(card=>card.classList.toggle('filtered-out',filter!=='all'&&card.dataset.category!==filter));
}));

// Product detail modal
const productModal=document.getElementById('productModal');
const modalImage=document.getElementById('modalImage');
const modalTitle=document.getElementById('modalTitle');
const modalDescription=document.getElementById('modalDescription');
function closeProductModal(){productModal.classList.remove('open');productModal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
productCards.forEach(card=>{
 card.setAttribute('tabindex','0');
 card.setAttribute('role','button');
 card.setAttribute('aria-label','View '+card.querySelector('h3').textContent+' details');
 const open=()=>{
  const image=card.querySelector('.product-visual img');
  modalImage.src=image.src;modalImage.alt=image.alt;
  modalTitle.textContent=card.querySelector('h3').textContent;
  modalDescription.textContent=card.querySelector('.product-copy p').textContent;
  productModal.classList.add('open');productModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
 };
 card.addEventListener('click',e=>{if(!e.target.closest('a,button'))open();});
 card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
});
productModal.querySelectorAll('[data-modal-close]').forEach(el=>el.addEventListener('click',closeProductModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&productModal.classList.contains('open'))closeProductModal();});

// Gentle reveal-on-scroll for editorial blocks
const revealTargets=document.querySelectorAll('.section-intro,.about-grid,.cards,.product-card,.brand-panel,.location-panel,.contact-grid,.campaign-tile,.collab-card,.timeline-row');
revealTargets.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver' in window){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
 }),{threshold:.12});
 revealTargets.forEach(el=>revealObserver.observe(el));
}else{revealTargets.forEach(el=>el.classList.add('visible'));}
