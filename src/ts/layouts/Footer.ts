export const initFooter = () => {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('/footer.html');
      const html = await res.text();

      const footer = document.getElementById('footer');
      if (footer) {
        footer.innerHTML = html;
      }
    } catch (err) {
      console.error('Footer load failed:', err);
    }
  });
}