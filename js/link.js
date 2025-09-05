document.addEventListener('DOMContentLoaded', async () => {
  const slots = document.querySelectorAll('[data-include]');
  for (const host of slots) {
    const url = host.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      const html = await res.text();

      // แทนที่ทั้งแท็ก <section data-include> ด้วยเนื้อหาไฟล์นั้น
      host.outerHTML = html;
    } catch (err) {
      console.error('Include failed:', url, err);
      host.outerHTML = `<!-- include failed: ${url} -->`;
    }
  }
});
