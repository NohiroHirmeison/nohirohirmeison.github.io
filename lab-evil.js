alert('[PoC] External script executed via hash');
document.body.insertAdjacentHTML(
  'afterbegin',
  '<div style="background:#000;color:#0f0;padding:6px">PoC loaded</div>'
);
