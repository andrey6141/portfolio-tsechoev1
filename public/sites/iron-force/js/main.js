const API='/api';
const money=n=>new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:0}).format(Number(n)||0);
async function api(url,options={}){const r=await fetch(API+url,{...options,headers:{'Content-Type':'application/json','X-Requested-With':'XMLHttpRequest',...(options.headers||{})}});const data=await r.json().catch(()=>({error:'Ошибка ответа сервера'}));if(!r.ok)throw new Error(data.error||'Ошибка запроса');return data;}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
 document.querySelectorAll('[data-inquiry-form]').forEach(form=>form.addEventListener('submit',async e=>{
  e.preventDefault();const btn=form.querySelector('[type=submit]'),status=form.querySelector('.form-status');if(!form.reportValidity())return;
  btn.disabled=true;status.textContent='Отправляем…';const payload=Object.fromEntries(new FormData(form).entries());
  try{const result=await api('/inquiries',{method:'POST',body:JSON.stringify(payload)});status.textContent=result.message;status.className='form-status success';form.reset();}
  catch(err){status.textContent=err.message;status.className='form-status error';}finally{btn.disabled=false;}
 }));
 const loader=document.getElementById('loader');if(loader)setTimeout(()=>loader.classList.add('done'),700);
 const hero=document.getElementById('heroVisual');if(hero&&matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hero.style.setProperty('--mx',x*12+'px');hero.style.setProperty('--my',y*10+'px');});}
 document.querySelectorAll('.hotspot').forEach(b=>b.addEventListener('click',()=>{const [title,desc]=b.dataset.part.split('|');const box=document.getElementById('partInfo');if(box)box.innerHTML=`<b>${title.toUpperCase()}</b><p>${desc}</p>`;document.querySelectorAll('.hotspot').forEach(x=>x.classList.toggle('selected',x===b));}));
});