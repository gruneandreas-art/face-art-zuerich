const I18n = (() => {
  const SUPPORTED = ['de', 'en', 'fr', 'it'];
  const STORAGE_KEY = 'faz_lang';
  let current = 'de';
  const cache = new Map();
  const tCache = {};

  const detect = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'de').split('-')[0].toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'de';
  };

  const resolve = (obj, dotKey) =>
    dotKey.split('.').reduce((o, k) => o?.[k], obj);

  const applyAll = (lang, t) => {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (!cache.has(key)) cache.set(key, el.textContent);
      const val = lang === 'de' ? cache.get(key) : resolve(t, key);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      const cacheKey = 'html:' + key;
      if (!cache.has(cacheKey)) cache.set(cacheKey, el.innerHTML);
      const val = lang === 'de' ? cache.get(cacheKey) : resolve(t, key);
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const cacheKey = 'ph:' + key;
      if (!cache.has(cacheKey)) cache.set(cacheKey, el.placeholder);
      const val = lang === 'de' ? cache.get(cacheKey) : resolve(t, key);
      if (val != null) el.placeholder = val;
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('lang-btn--active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  };

  const load = async lang => {
    if (tCache[lang]) return tCache[lang];
    try {
      const res = await fetch(`src/i18n/${lang}.json`);
      tCache[lang] = await res.json();
    } catch {
      tCache[lang] = {};
    }
    return tCache[lang];
  };

  const setLang = async lang => {
    if (!SUPPORTED.includes(lang) || lang === current) return;
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    const t = lang === 'de' ? {} : await load(lang);
    applyAll(lang, t);
  };

  const init = async () => {
    const lang = detect();
    current = lang;
    if (lang !== 'de') {
      const t = await load(lang);
      applyAll(lang, t);
    }
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('lang-btn--active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', I18n.init);
