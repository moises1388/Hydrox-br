/* ═══════════════════════════════════════════════════════════════════
   HYDROX B&R AI  ·  main.js
   Se carga en TODAS las páginas con defer.
   Módulos: header scroll · menú móvil · scroll reveal · formulario
═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. SCROLL HEADER ────────────────────────────────────────────
  const hdr = document.getElementById('header');
  if (hdr) {
    const tick = () => hdr.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  // ── 2. MENÚ MÓVIL ───────────────────────────────────────────────
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.textContent = isOpen ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', isOpen);
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '☰';
      })
    );
  }

  // ── 3. SCROLL REVEAL ────────────────────────────────────────────
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ── 4. FORMULARIO MULTI-PASO ────────────────────────────────────
  const form = document.getElementById('hydrox-form');
  if (!form) return;

  const WEBHOOK = 'https://hook.us2.make.com/z7bc9jug7fqt51x61ku8uyon9vijjovw';

  // ── GESTIÓN DE CLIENTE ──────────────────────────────────────────
  const PLAN_LIMIT = 15;
  const PLAN_WARN  = 12;

  function getUserCode() {
    let code = localStorage.getItem('hx_user_code');
    if (!code) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      code = 'HX-' + Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      localStorage.setItem('hx_user_code', code);
    }
    return code;
  }
  function getSearchCount() { return parseInt(localStorage.getItem('hx_search_count') || '0', 10); }
  function incrementSearchCount() {
    const n = getSearchCount() + 1;
    localStorage.setItem('hx_search_count', n);
    return n;
  }

  const userCode = getUserCode();

  // Mostrar aviso de plan antes del formulario si corresponde
  const planNotice = document.getElementById('plan-notice');
  if (planNotice) {
    const cnt = getSearchCount();
    if (cnt >= PLAN_LIMIT) {
      planNotice.className = 'plan-notice limit';
      planNotice.innerHTML = `🔴 <strong>Alcanzaste el límite de ${PLAN_LIMIT} búsquedas</strong> de tu Plan Básico. <a href="planes.html" class="alert-link">Ver Plan Pro →</a>`;
      planNotice.style.display = 'flex';
    } else if (cnt >= PLAN_WARN) {
      const rem = PLAN_LIMIT - cnt;
      planNotice.className = 'plan-notice warn';
      planNotice.innerHTML = `⚠️ <strong>Te ${rem === 1 ? 'queda 1 búsqueda' : 'quedan ' + rem + ' búsquedas'}</strong> en tu Plan Básico. <a href="planes.html" class="alert-link">Actualizar a Pro →</a>`;
      planNotice.style.display = 'flex';
    }
  }

  // Pre-fill telegram_chat_id if previously used
  const savedChatId = localStorage.getItem('hx_telegram_chat_id');
  if (savedChatId) {
    const chatField = form.querySelector('[name="telegram_chat_id"]');
    if (chatField && !chatField.value) chatField.value = savedChatId;
  }

  const steps   = form.querySelectorAll('.form-step');
  const tabs    = form.querySelectorAll('.form-tab');
  const dots    = form.querySelectorAll('.prog-dot');
  const success = document.getElementById('form-success');
  let current = 0;

  // Navegar entre pasos
  function goTo(n) {
    steps[current].classList.remove('active');
    tabs[current].classList.remove('active');
    tabs[current].classList.add('done');
    dots[current].classList.remove('active');
    current = n;
    steps[current].classList.add('active');
    tabs[current].classList.add('active');
    tabs[current].classList.remove('done');
    dots[current].classList.add('active');
    form.querySelector('.form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Activar primer paso
  if (steps.length) {
    steps[0].classList.add('active');
    tabs[0].classList.add('active');
    dots[0].classList.add('active');
  }

  // Botones siguiente / anterior
  form.querySelectorAll('.btn-next').forEach(btn =>
    btn.addEventListener('click', () => { if (current < steps.length - 1) goTo(current + 1); })
  );
  form.querySelectorAll('.btn-prev').forEach(btn =>
    btn.addEventListener('click', () => { if (current > 0) goTo(current - 1); })
  );

  // Track zona selections in a plain Set — no dependency on :checked
  // (display:none inputs + change event unreliable in Safari/iOS)
  const zonaSet = new Set();

  // Opciones personalizadas (radio)
  form.querySelectorAll('.radio-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const name = opt.querySelector('input').name;
      form.querySelectorAll(`.radio-opt input[name="${name}"]`).forEach(inp =>
        inp.closest('.radio-opt').classList.remove('sel')
      );
      opt.classList.add('sel');
      opt.querySelector('input').checked = true;
    });
  });

  // Opciones personalizadas (checkbox zona)
  form.querySelectorAll('.check-opt').forEach(opt => {
    const input = opt.querySelector('input');
    opt.addEventListener('click', (e) => {
      e.preventDefault(); // evita activación nativa del label
      const val = input.value;
      if (zonaSet.has(val)) {
        zonaSet.delete(val);
        input.checked = false;
        opt.classList.remove('sel');
      } else {
        zonaSet.add(val);
        input.checked = true;
        opt.classList.add('sel');
      }
    });
  });

  // Validación básica por paso
  function validateStep(n) {
    const step = steps[n];
    let ok = true;

    // Campos de texto / email obligatorios
    step.querySelectorAll('[required]').forEach(el => {
      el.style.borderColor = '';
      if (!el.value.trim()) { el.style.borderColor = '#e55'; ok = false; }
    });

    // Grupos de radio/checkbox obligatorios (tipo, modalidad, zona)
    step.querySelectorAll('[data-required]').forEach(group => {
      const isCheckGroup = group.classList.contains('check-group');
      const hasSelection = isCheckGroup
        ? zonaSet.size > 0
        : group.querySelectorAll('input:checked').length > 0;
      group.classList.toggle('group-error', !hasSelection);
      if (!hasSelection) ok = false;
    });

    return ok;
  }

  // Sobreescribir btn-next para validar primero
  form.querySelectorAll('.btn-next').forEach((btn) => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => {
      if (validateStep(current) && current < steps.length - 1) goTo(current + 1);
    });
  });

  // ── ENVÍO AL WEBHOOK DE MAKE.COM ───────────────────────────────
  // IMPORTANTE: se usa application/x-www-form-urlencoded con no-cors.
  // application/json con no-cors se degrada a text/plain y Make.com
  // no puede extraer los campos individuales → todos llegan vacíos.
  // URL-encoded es un "simple request" que no requiere preflight CORS.
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateStep(current)) return;

    // Honeypot anti-spam: campo oculto que solo bots llenan.
    // Si tiene valor, fingimos éxito sin enviar nada a Make.com.
    const honeypot = form.querySelector('#website');
    if (honeypot && honeypot.value.trim()) {
      form.querySelector('.form-card').style.display = 'none';
      if (success) success.style.display = 'block';
      return;
    }

    const submitBtn = form.querySelector('#submit-btn');
    submitBtn.textContent = 'Buscando propiedades…';
    submitBtn.disabled = true;

    // Construir objeto de datos
    const fd   = new FormData(form);
    const data = {};
    fd.forEach((v, k) => { data[k] = v; });

    // Zonas: del Set JS + campo libre (no depende de :checked ni display:none)
    const zonaValues = [...zonaSet];
    const zonaOtra = (form.querySelector('#zona_otra')?.value || '').trim();
    if (zonaOtra) zonaValues.push(zonaOtra);
    data.zona = zonaValues.join(', ');
    delete data.zona_otra; // ya está incluido en data.zona

    // Metadata
    data.fecha_solicitud = new Date().toISOString();
    data.fuente          = 'sitio-web';
    data.tipo_evento     = 'busqueda';
    data.user_code       = userCode;
    data.num_busqueda    = getSearchCount() + 1;
    delete data.website; // descartar campo honeypot

    // Persist telegram_chat_id for reuse across pages
    if (data.telegram_chat_id) localStorage.setItem('hx_telegram_chat_id', data.telegram_chat_id);

    try {
      // URLSearchParams genera application/x-www-form-urlencoded
      // Make.com lo recibe y extrae cada campo correctamente
      const payload = new URLSearchParams(data).toString();

      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload,
        mode: 'no-cors' // Respuesta opaca, pero los datos SÍ llegan a Make.com
      });

      // Actualizar tarjeta de usuario en pantalla de éxito
      const newCount = incrementSearchCount();
      const ucEl    = document.getElementById('display-user-code');
      const fillEl  = document.getElementById('sc-fill');
      const textEl  = document.getElementById('sc-text');
      const alertEl = document.getElementById('plan-alert');
      if (ucEl)   ucEl.textContent = userCode;
      if (fillEl) {
        const pct = Math.min((newCount / PLAN_LIMIT) * 100, 100);
        fillEl.style.width  = pct + '%';
        fillEl.className    = 'sc-fill' + (newCount >= PLAN_LIMIT ? ' sc-limit' : newCount >= PLAN_WARN ? ' sc-warn' : '');
      }
      if (textEl) textEl.textContent = `${newCount} / ${PLAN_LIMIT} búsquedas del Plan Básico`;
      if (alertEl) {
        if (newCount >= PLAN_LIMIT) {
          alertEl.innerHTML   = '🔴 Alcanzaste el límite. <a href="planes.html" class="alert-link">Actualizar plan →</a>';
          alertEl.className   = 'plan-alert limit';
          alertEl.style.display = 'flex';
        } else if (newCount >= PLAN_WARN) {
          const rem = PLAN_LIMIT - newCount;
          alertEl.innerHTML   = `⚠️ Te ${rem === 1 ? 'queda 1 búsqueda' : 'quedan ' + rem + ' búsquedas'}. <a href="planes.html" class="alert-link">Ver Plan Pro →</a>`;
          alertEl.className   = 'plan-alert warn';
          alertEl.style.display = 'flex';
        }
      }

      // Mostrar pantalla de éxito (asumimos éxito porque no-cors no devuelve status)
      form.querySelector('.form-card').style.display = 'none';
      if (success) success.style.display = 'block';

    } catch (err) {
      submitBtn.textContent = 'Error — intenta de nuevo';
      submitBtn.disabled = false;
      console.error('Webhook error:', err);
    }
  });

  // ── CALIFICACIÓN DE RESULTADOS ─────────────────────────────────
  const receivedBtn = document.getElementById('received-btn');
  const ratingSec   = document.getElementById('rating-section');
  if (receivedBtn && ratingSec) {
    receivedBtn.addEventListener('click', () => {
      receivedBtn.style.display = 'none';
      ratingSec.style.display   = 'block';
    });
  }
  const ratingStars = document.querySelectorAll('#stars .star');
  ratingStars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const v = +star.dataset.val;
      ratingStars.forEach(s => s.classList.toggle('lit', +s.dataset.val <= v));
    });
    star.addEventListener('mouseleave', () => {
      const sel = document.querySelector('#stars .star.selected');
      ratingStars.forEach(s => s.classList.toggle('lit', !!sel && +s.dataset.val <= +sel.dataset.val));
    });
    star.addEventListener('click', async () => {
      if (document.querySelector('#stars .star.selected')) return;
      star.classList.add('selected');
      ratingStars.forEach(s => { s.classList.toggle('lit', +s.dataset.val <= +star.dataset.val); s.disabled = true; });
      const p = new URLSearchParams({
        tipo_evento: 'calificacion',
        user_code:   userCode,
        calificacion: star.dataset.val,
        fecha:       new Date().toISOString()
      });
      try { await fetch(WEBHOOK, { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:p.toString(), mode:'no-cors' }); } catch(_) {}
      const thanks = document.getElementById('rating-thanks');
      if (thanks) thanks.style.display = 'block';
    });
  });

}); // fin DOMContentLoaded
