/**
 * lab-evil.js
 * Client-side Resource Manipulation detector
 * Authorized security testing only
 */

(function () {
  console.log('[WSTG-CLNT-06] script loaded');

  // 1. Tampilkan banner visual (proof non-intrusive)
  try {
    const banner = document.createElement('div');
    banner.id = 'wstg-clnt-06-proof';
    banner.innerText = 'WSTG-CLNT-06: External JS Loaded';
    Object.assign(banner.style, {
      position: 'fixed',
      bottom: '12px',
      right: '12px',
      background: '#111',
      color: '#0f0',
      padding: '8px 12px',
      fontSize: '12px',
      fontFamily: 'monospace',
      borderRadius: '6px',
      zIndex: 999999
    });
    document.body.appendChild(banner);
  } catch (e) {
    console.warn('[WSTG-CLNT-06] banner failed', e);
  }

  // 2. Log hash processing
  try {
    console.log('[hash]', location.hash);
  } catch (e) {}

  // 3. Detect dangerous DOM sinks
  const sinks = [
    'innerHTML',
    'outerHTML',
    'document.write',
    'insertAdjacentHTML'
  ];

  sinks.forEach(sink => {
    try {
      const orig = Element.prototype[sink];
      if (!orig) return;

      Element.prototype[sink] = function () {
        console.warn('[DOM SINK]', sink, arguments);
        debugger;
        return orig.apply(this, arguments);
      };
    } catch (e) {}
  });

  // 4. Detect resource assignment
  ['src', 'href'].forEach(attr => {
    const orig = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (k, v) {
      if (k === attr && typeof v === 'string') {
        console.warn('[RESOURCE SINK]', k, v);
        debugger;
      }
      return orig.call(this, k, v);
    };
  });

  // 5. Hash change listener
  window.addEventListener('hashchange', function () {
    console.log('[hashchange detected]', location.hash);
  });

})();
