// Steam 实时数据 - 首页面板
(async function() {
  function $id(s) { return document.getElementById(s); }
  
  async function load() {
    try {
      const [p, i] = await Promise.all([
        fetch('/api/steam/players').then(r => r.json()),
        fetch('/api/steam/info').then(r => r.json())
      ]);
      var pc = $id('steam-count');  if (pc) pc.textContent = String(p.players || '0');
      var sr = $id('steam-review'); if (sr) sr.textContent = (i.recommendations || 0) + ' 条';
      var sp = $id('steam-price');  if (sp) sp.textContent = i.price || '即将推出';
    } catch(e) {
      var pc = $id('steam-count'); if (pc) pc.textContent = 'API 未部署';
    }
  }
  
  // 等 DOM 就绪
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { load(); setInterval(load, 60000); });
  } else {
    load();
    setInterval(load, 60000);
  }
})();
