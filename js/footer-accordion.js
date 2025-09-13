
function initAccordions(root = document) {
   root.querySelectorAll('.accordion-footer').forEach(acc => {
     const btn = acc.querySelector('.accordion-toggle');
     const icon = acc.querySelector('.accordion-icon');
     const content = acc.querySelector('.accordion-content');
 
     if (!btn || !content) return;
 
     acc.classList.remove('active');
     btn.setAttribute('aria-expanded', 'false');
     content.style.display = 'none';
     if (icon) icon.innerHTML = '&#9660;'; // ▼
   });
 }
 
 // คลิกที่ไหนก็ได้ แต่จะทำงานเฉพาะเมื่อกดปุ่มของ accordion
 document.addEventListener('click', (e) => {
   const toggle = e.target.closest('.accordion-toggle');
   if (!toggle) return;
 
   const acc = toggle.closest('.accordion-footer');
   const content = acc?.querySelector('.accordion-content');
   const icon = acc?.querySelector('.accordion-icon');
   if (!acc || !content) return;
 
   const open = acc.classList.toggle('active');
   toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
   content.style.display = open ? 'block' : 'none';
   if (icon) icon.innerHTML = open ? '&#9650;' : '&#9660;'; // ▲ / ▼
 });
 
 // init ครั้งแรก
 document.addEventListener('DOMContentLoaded', () => initAccordions());
 
 // ถ้ามีการ include หน้า (เช่น link.js ใส่ HTML เพิ่ม) ให้ init ใหม่อัตโนมัติ
 new MutationObserver((muts) => {
   for (const m of muts) {
     m.addedNodes.forEach(node => {
       if (!(node instanceof HTMLElement)) return;
       // ถ้าเพิ่มทั้ง accordion หรือแค่เนื้อหาข้างใน
       if (node.matches('.accordion-footer')) initAccordions(node);
       else if (node.querySelector?.('.accordion-footer')) initAccordions(node);
     });
   }
 }).observe(document.body, { childList: true, subtree: true });
 