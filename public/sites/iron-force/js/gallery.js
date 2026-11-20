document.addEventListener('DOMContentLoaded',()=>{
 const tiles=[...document.querySelectorAll('[data-gallery]')],box=document.getElementById('lightbox');
 if(box&&tiles.length){const imgs=tiles.map(t=>({src:t.querySelector('img').src,alt:t.querySelector('img').alt}));let i=0;const lightboxClose=box.querySelector('.lightbox-close'),lightboxPrev=box.querySelector('.lightbox-prev'),lightboxNext=box.querySelector('.lightbox-next');
 const show=()=>{lightboxImage.src=imgs[i].src;lightboxImage.alt=imgs[i].alt;lightboxCaption.textContent=`${i+1} / ${imgs[i].alt}`};
 const open=n=>{i=n;show();box.hidden=false;document.body.style.overflow='hidden';lightboxClose.focus()};
 const close=()=>{box.hidden=true;document.body.style.overflow=''};
 const move=d=>{i=(i+d+imgs.length)%imgs.length;show()};
 tiles.forEach(t=>t.onclick=()=>open(+t.dataset.gallery));lightboxClose.onclick=close;lightboxPrev.onclick=()=>move(-1);lightboxNext.onclick=()=>move(1);
 document.addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)});
 }
 const reviews=[['Алексей К.','Демонстрационный клиент · 2026','«Подбор техники и организация поставки — пример того, как должен быть устроен рабочий процесс».'],['Мария С.','Демонстрационный клиент · 2026','«Важно, когда решение подбирают под реальную задачу площадки».'],['Игорь П.','Демонстрационный клиент · 2026','«Понятная коммуникация помогает держать проект в графике».']];let n=0;
 const render=()=>{if(!document.getElementById('reviewText'))return;reviewName.textContent=reviews[n][0];reviewCompany.textContent=reviews[n][1];reviewText.textContent=reviews[n][2]};
 reviewPrev?.addEventListener('click',()=>{n=(n+2)%3;render()});reviewNext?.addEventListener('click',()=>{n=(n+1)%3;render()});
});