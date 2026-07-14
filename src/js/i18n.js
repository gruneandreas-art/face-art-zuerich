const I18n = (() => {
  const SUPPORTED = ['de', 'en', 'fr', 'it'];
  const STORAGE_KEY = 'faz_lang';
  let current = 'de';
  const cache = new Map();

  /* ── Translations ─────────────────────────────────────── */
  const T = {
    en: {
      nav: { start:'Home', kinderschminken:'Face Painting', hochzeiten:'Weddings', unternehmen:'For Companies', ueber:'About me', kontakt:'Contact' },
      footer: { tagline:'Face Painting & Face Art', pages:'Pages', copy:'© 2026 Face Art Zürich — Isa, Dübendorf' },
      index: {
        hero_label:'Zurich & surroundings',
        hero_title:'Face Painting & Face Art in Zurich',
        hero_title_em:'For birthdays, events & weddings',
        hero_subtitle:'Face Painting & Face Art — right to your event',
        hero_cta_contact:'Send enquiry',
        services_label:'My Services',
        services_title:'Face Painting & Face Art for every occasion',
        services_subtitle:'From birthday parties to corporate events — Isa comes directly to you, with colour, creativity and 6–8 designs per hour.',
        card_kinder_title:'Face Painting', card_kinder_text:'Unicorns, superheroes, dragons, fairies — every design unique. For birthdays, private events and more.', card_kinder_link:'Learn more →',
        card_hochzeit_title:'Weddings', card_hochzeit_text:'Elegant designs for the couple and guests — a romantic highlight everyone will talk about for a long time.', card_hochzeit_link:'Learn more →',
        card_corporate_title:'For Companies', card_corporate_text:'Anniversary, summer party, Christmas celebration — face art as a crowd magnet and conversation starter for your event.', card_corporate_link:'Learn more →',
        card_about_title:'About me', card_about_text:'Behind Face Art Zürich is Isa — an artist from Dübendorf who has been transforming children\'s and adults\' faces for years.', card_about_link:'Learn more →',
        msf_label:'Joy with impact', msf_title:'donated to Médecins Sans Frontières',
        msf_text:'At the 48th Chlausmärt Dübendorf, Isa donated the entire proceeds from her stand — CHF 500 — directly to <strong>Médecins Sans Frontières / Doctors Without Borders</strong>. Every child\'s smile, every colourful design: not just a moment of joy, but also a contribution to something greater. Isa is already looking forward to the next Chlausmärt — and plans to donate all proceeds again.',
        msf_cta:'Read the event story →',
        testimonials_label:'What customers say', testimonials_title:'Reviews — Face Painting Zurich', testimonials_subtitle:'Real experiences from parents, couples and event organisers.',
        price_label:'Transparent & Fair', price_per_hour:'/ hour', price_text:'Plus travel costs of CHF 1/km from 8600 Dübendorf / Zurich. No-obligation enquiry — reply usually within 24h.', price_cta:'Request a quote',
        nl_badge:'Stay in the loop', nl_title:'Never miss an', nl_title_em:'event again.',
        nl_subtitle_1:'Choose what interests you — Isa writes to you directly.', nl_subtitle_2:'No spam, unsubscribe anytime.',
        nl_opt_events:'Events & Appearances', nl_opt_offers:'Personal Offers', nl_submit:'Subscribe now', nl_privacy:'No spam. Unsubscribe with one click at any time.',
        nl_success_title:'Thank you, you\'re in!', nl_success_text:'Isa is delighted — you\'ll receive the first updates in your inbox soon.',
        contact_label:'Contact', contact_title:'I look forward to hearing from you!', contact_cta_form:'Form',
        form_first:'First name', form_last:'Last name', form_email:'Email', form_message:'Message',
        form_ph_first:'Maria', form_ph_last:'Miller', form_ph_email:'maria@example.com', form_ph_message:'Hello Isa, I\'m planning a birthday party on …',
        form_submit:'Send', form_confirm:'Thank you — I\'ll usually get back to you within 24 hours.'
      },
      kinderschminken: {
        hero_eyebrow:'For children & adults',
        hero_title:'Face Painting', hero_title_em:'in Zurich.',
        hero_subtitle:'Unicorns, superheroes, tigers — every design unique. Professional face painting in Zurich from CHF 145/h, right at your event.',
        hero_cta:'Book birthday party',
        f1_label:'Each design unique', f1_title:'Professional face painting — for every occasion in Zurich',
        f1_text1:'Every child gets their personal dream design — painted in professional quality with certified, skin-safe colours. From a delicate butterfly to a fierce dragon: Isa brings every child\'s fantasy to life.',
        f1_text2:'Have a party theme? Perfect — Isa matches every design to your theme. No templates, no stencils — everything freehand, individual for your child.',
        f2_label:'Birthday parties', f2_title:'Face painting for children\'s birthday parties in Zurich',
        f2_text1:'Have a party theme? Perfect — Isa tailors every design to your theme.',
        f2_text2:'Around 6–8 children per hour, depending on the design. During the booking we plan together how much time makes sense for your group size.',
        f3_label:'Larger groups', f3_title:'Face painting for events & large groups',
        f3_text1:'Planning a larger event? Isa will clarify on request whether additional support makes sense — direct and straightforward.',
        f3_text2:'The setup takes about 15 minutes. Everything is included: table, chair, professional colours and materials.',
        price_label:'Pricing', price_subtitle:'From CHF 145 / hour — all inclusive, no hidden costs.',
        price_note:'Travel costs: CHF 1/km from 8600 Dübendorf. For events within Zurich city, no travel costs apply.',
        booking_label:'Availability', booking_title:'Book your date now', booking_subtitle:'Date still available — enquire now without obligation, answer within 24h.',
        booking_cta:'Book birthday party',
        step1_title:'Send enquiry', step1_text:'Tell us the date, location and approximate number of children.',
        step2_title:'Receive offer', step2_text:'Isa will send you a transparent offer with price and duration.',
        step3_title:'Confirm details', step3_text:'After booking, Isa will get in touch personally — by phone or short message.',
        step4_title:'Isa comes to you', step4_text:'On the day, Isa arrives, sets up everything and gets started right away.'
      },
      hochzeiten: {
        hero_eyebrow:'Your most beautiful day',
        hero_title:'Weddings.', hero_title_em:'Face Art for your big day.',
        hero_subtitle:'Elegant face art and body art for your wedding day in Zurich — an experience that delights guests and looks stunning in photos.',
        hero_cta:'Secure wedding date',
        f1_label:'A highlight for all guests', f1_title:'Face Art & face painting at your Zurich wedding',
        f1_text1:'Face art at a wedding is more than just a detail — it\'s an experience. Guests of all ages come by, laugh and marvel together.',
        f1_text2:'From delicate flowers to elegant patterns to playful designs — Isa adapts the designs to your wedding theme.',
        f2_label:'Body Art', f2_title:'Body Art for the wedding couple & guests',
        f2_text1:'Floral body art for the bride or elaborate designs for the wedding party — Isa creates a unique visual experience.',
        f2_text2:'Isa is happy to create a design board in advance, tailored to your wedding colours and theme.',
        step1_title:'Send enquiry', step1_text:'Tell us the date, location and approximate number of guests.',
        step2_title:'Receive offer', step2_text:'You\'ll receive a transparent offer with price, duration and everything included — within 24h.',
        step3_title:'Confirm details', step3_text:'After booking, Isa will coordinate personally with you — by phone or short message.',
        step4_title:'Isa comes to you', step4_text:'On the wedding day, Isa arrives on time, sets up discreetly and provides a highlight for your guests.',
        booking_cta:'Secure wedding date'
      },
      unternehmen: {
        hero_eyebrow:'For companies',
        hero_title:'Face Art for', hero_title_em:'your company event.',
        hero_subtitle:'Face painting & face art for corporate events, summer parties and trade fairs in Zurich — a crowd magnet that starts conversations.',
        hero_cta:'Request event quote',
        booking_cta:'Request event quote'
      },
      about: {
        hero_eyebrow:'About me',
        hero_title:'Face Art', hero_title_em:'is my passion.',
        hero_subtitle:'I\'m Isa — face art artist from Dübendorf, Canton Zurich. What started as a hobby is now my profession.',
        cta:'Get in touch'
      },
      kontakt: {
        hero_eyebrow:'Contact',
        hero_title:'Let\'s get', hero_title_em:'in touch.',
        hero_subtitle:'I look forward to your enquiry — and will usually get back to you within 24 hours.',
        form_title:'Send enquiry',
        form_first:'First name', form_last:'Last name', form_email:'Email', form_message:'Message',
        form_ph_first:'Maria', form_ph_last:'Miller', form_ph_email:'maria@example.com', form_ph_message:'Hello Isa, I\'m planning a birthday party on …',
        form_submit:'Send', form_confirm:'Thank you — I\'ll usually get back to you within 24 hours.',
        wa_label:'WhatsApp — fastest',
        wa_hint:'Reply usually within 24h — directly from Isa.',
        wa_btn:'WhatsApp',
        map_label:'Find me here'
      }
    },

    fr: {
      nav: { start:'Accueil', kinderschminken:'Maquillage enfants', hochzeiten:'Mariages', unternehmen:'Pour entreprises', ueber:'À propos', kontakt:'Contact' },
      footer: { tagline:'Maquillage enfants & Face Art', pages:'Pages', copy:'© 2026 Face Art Zürich — Isa, Dübendorf' },
      index: {
        hero_label:'Zurich & environs',
        hero_title:'Maquillage enfants & Face Art à Zurich',
        hero_title_em:'Pour anniversaires, événements & mariages',
        hero_subtitle:'Maquillage enfants & Face Art — directement à votre événement',
        hero_cta_contact:'Envoyer une demande',
        services_label:'Mes services',
        services_title:'Maquillage enfants & Face Art pour chaque occasion',
        services_subtitle:'D\'anniversaires d\'enfants aux événements d\'entreprise — Isa vient directement chez vous, avec couleurs, créativité et 6–8 motifs par heure.',
        card_kinder_title:'Maquillage enfants', card_kinder_text:'Licornes, super-héros, dragons, fées — chaque motif est unique. Pour anniversaires, événements privés et plus.', card_kinder_link:'En savoir plus →',
        card_hochzeit_title:'Mariages', card_hochzeit_text:'Motifs élégants pour les mariés et les invités — un highlight romantique dont tout le monde parlera longtemps.', card_hochzeit_link:'En savoir plus →',
        card_corporate_title:'Pour entreprises', card_corporate_text:'Anniversaire d\'entreprise, fête d\'été, soirée de Noël — le face art comme aimant à public et brise-glace pour votre événement.', card_corporate_link:'En savoir plus →',
        card_about_title:'À propos', card_about_text:'Derrière Face Art Zürich se cache Isa — artiste de Dübendorf qui transforme les visages des enfants et des adultes depuis des années.', card_about_link:'En savoir plus →',
        msf_label:'Joie avec impact', msf_title:'donnés à Médecins Sans Frontières',
        msf_text:'Au 48e Chlausmärt Dübendorf, Isa a fait don de la totalité des recettes de son stand — CHF 500 — directement à <strong>Médecins Sans Frontières</strong>. Chaque sourire d\'enfant, chaque motif coloré : pas seulement un moment de joie, mais aussi une contribution à quelque chose de plus grand. Isa attend déjà avec impatience le prochain Chlausmärt et prévoit de reverser à nouveau tous ses bénéfices.',
        msf_cta:'Lire l\'histoire de l\'événement →',
        testimonials_label:'Ce que disent les clients', testimonials_title:'Avis — Maquillage enfants Zurich', testimonials_subtitle:'Expériences réelles de parents, mariés et organisateurs d\'événements.',
        price_label:'Transparent & équitable', price_per_hour:'/ heure', price_text:'Plus frais de déplacement de CHF 1/km depuis 8600 Dübendorf / Zurich. Demande sans engagement — réponse généralement dans les 24h.', price_cta:'Demander un devis',
        nl_badge:'Restez informé', nl_title:'Ne ratez plus aucun', nl_title_em:'événement.',
        nl_subtitle_1:'Choisissez ce qui vous intéresse — Isa vous écrit directement.', nl_subtitle_2:'Pas de spam, désinscription à tout moment.',
        nl_opt_events:'Événements & Apparitions', nl_opt_offers:'Offres personnelles', nl_submit:'S\'inscrire maintenant', nl_privacy:'Pas de spam. Désabonnement en un clic à tout moment.',
        nl_success_title:'Merci, vous êtes inscrit !', nl_success_text:'Isa est ravie — vous recevrez bientôt les premières actualités dans votre boîte mail.',
        contact_label:'Contact', contact_title:'Je me réjouis de votre message !', contact_cta_form:'Formulaire',
        form_first:'Prénom', form_last:'Nom', form_email:'E-mail', form_message:'Message',
        form_ph_first:'Marie', form_ph_last:'Dupont', form_ph_email:'marie@exemple.fr', form_ph_message:'Bonjour Isa, je planifie un anniversaire le …',
        form_submit:'Envoyer', form_confirm:'Merci — je vous répondrai généralement dans les 24 heures.'
      }
    },

    it: {
      nav: { start:'Home', kinderschminken:'Truccabimbi', hochzeiten:'Matrimoni', unternehmen:'Per aziende', ueber:'Chi sono', kontakt:'Contatto' },
      footer: { tagline:'Truccabimbi & Face Art', pages:'Pagine', copy:'© 2026 Face Art Zürich — Isa, Dübendorf' },
      index: {
        hero_label:'Zurigo & dintorni',
        hero_title:'Truccabimbi & Face Art a Zurigo',
        hero_title_em:'Per compleanni, eventi & matrimoni',
        hero_subtitle:'Truccabimbi & Face Art — direttamente al vostro evento',
        hero_cta_contact:'Invia richiesta',
        services_label:'I miei servizi',
        services_title:'Truccabimbi & Face Art per ogni occasione',
        services_subtitle:'Da feste di compleanno a eventi aziendali — Isa viene direttamente da voi, con colori, creatività e 6–8 motivi all\'ora.',
        card_kinder_title:'Truccabimbi', card_kinder_text:'Unicorni, supereroi, draghi, fate — ogni motivo un\'opera unica. Per compleanni, eventi privati e altro.', card_kinder_link:'Scopri di più →',
        card_hochzeit_title:'Matrimoni', card_hochzeit_text:'Motivi eleganti per gli sposi e gli ospiti — un highlight romantico di cui tutti parleranno a lungo.', card_hochzeit_link:'Scopri di più →',
        card_corporate_title:'Per aziende', card_corporate_text:'Anniversari, feste estive, cene di Natale — il face art come calamita per il pubblico e spunto di conversazione per il vostro evento.', card_corporate_link:'Scopri di più →',
        card_about_title:'Chi sono', card_about_text:'Dietro Face Art Zürich c\'è Isa — artista di Dübendorf che da anni trasforma i volti di bambini e adulti.', card_about_link:'Scopri di più →',
        msf_label:'Gioia con impatto', msf_title:'donati a Médecins Sans Frontières',
        msf_text:'Al 48° Chlausmärt di Dübendorf, Isa ha donato l\'intero ricavato del suo stand — CHF 500 — direttamente a <strong>Médecins Sans Frontières / Medici Senza Frontiere</strong>. Ogni sorriso di bambino, ogni motivo colorato: non solo un momento di gioia, ma anche un contributo a qualcosa di più grande. Isa non vede già l\'ora del prossimo Chlausmärt e prevede di donare nuovamente tutti i proventi.',
        msf_cta:'Leggi la storia dell\'evento →',
        testimonials_label:'Cosa dicono i clienti', testimonials_title:'Recensioni — Truccabimbi Zurigo', testimonials_subtitle:'Esperienze reali di genitori, sposi e organizzatori di eventi.',
        price_label:'Trasparente & Equo', price_per_hour:'/ ora', price_text:'Più spese di viaggio di CHF 1/km da 8600 Dübendorf / Zurigo. Richiesta senza impegno — risposta di solito entro 24h.', price_cta:'Richiedi un preventivo',
        nl_badge:'Resta aggiornato', nl_title:'Non perdere più nessun', nl_title_em:'evento.',
        nl_subtitle_1:'Scegli cosa ti interessa — Isa ti scrive direttamente.', nl_subtitle_2:'Niente spam, cancellazione in qualsiasi momento.',
        nl_opt_events:'Eventi & Apparizioni', nl_opt_offers:'Offerte personali', nl_submit:'Iscriviti ora', nl_privacy:'Niente spam. Cancellazione con un clic in qualsiasi momento.',
        nl_success_title:'Grazie, sei dentro!', nl_success_text:'Isa è felice — riceverai presto i primi aggiornamenti nella tua casella di posta.',
        contact_label:'Contatto', contact_title:'Non vedo l\'ora di sentirti!', contact_cta_form:'Modulo',
        form_first:'Nome', form_last:'Cognome', form_email:'E-mail', form_message:'Messaggio',
        form_ph_first:'Maria', form_ph_last:'Rossi', form_ph_email:'maria@esempio.it', form_ph_message:'Ciao Isa, sto pianificando una festa di compleanno il …',
        form_submit:'Invia', form_confirm:'Grazie — di solito rispondo entro 24 ore.'
      }
    }
  };

  const CODES = { de:'DE', en:'EN', fr:'FR', it:'IT' };

  /* ── Engine ───────────────────────────────────────────── */
  const detect = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'de').split('-')[0].toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'de';
  };

  const resolve = (obj, dotKey) =>
    dotKey.split('.').reduce((o, k) => o?.[k], obj);

  const updateDropdownUI = lang => {
    const codeEl  = document.getElementById('langCurrentCode');
    const trigger = document.getElementById('langTrigger');
    if (codeEl)  codeEl.textContent = CODES[lang] || lang.toUpperCase();
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    document.getElementById('langDropdown')?.classList.remove('lang-dropdown--open');

    document.querySelectorAll('.lang-option').forEach(opt => {
      const active = opt.dataset.lang === lang;
      opt.classList.toggle('lang-option--active', active);
      opt.setAttribute('aria-selected', String(active));
    });
  };

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

    updateDropdownUI(lang);
  };

  const setLang = lang => {
    if (!SUPPORTED.includes(lang) || lang === current) return;
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyAll(lang, lang === 'de' ? {} : T[lang]);
  };

  const initDropdown = () => {
    const dropdown = document.getElementById('langDropdown');
    const trigger  = document.getElementById('langTrigger');
    if (!dropdown || !trigger) return;

    const toggle = () => {
      const open = dropdown.classList.toggle('lang-dropdown--open');
      trigger.setAttribute('aria-expanded', String(open));
    };
    const close = () => {
      dropdown.classList.remove('lang-dropdown--open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    trigger.addEventListener('click', e => { e.stopPropagation(); toggle(); });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => { setLang(opt.dataset.lang); close(); });
    });

    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  };

  const init = () => {
    const lang = detect();
    current = lang;
    if (lang !== 'de') applyAll(lang, T[lang]);
    initDropdown();
    updateDropdownUI(lang);
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', I18n.init);
