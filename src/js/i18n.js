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
        msf_text:'At the 48th Chlausmärt Dübendorf (29 Nov 2025) I took part with festive designs and painted reindeer, ice queens and many other wonderful Christmas motifs onto the children\'s faces. The entire proceeds of the day went to Doctors Without Borders. A big thank you for the lively participation and support. Together we simply achieve more — which is why I\'ll be there again this year to collect donations. Feel free to drop by!',
        msf_cta:'Read the event story →',
        testimonials_label:'What customers say', testimonials_title:'Reviews — Face Painting Zurich', testimonials_subtitle:'Real experiences from parents, couples and event organisers.',
        price_label:'Transparent & Fair', price_per_hour:'/ hour', price_text:'Plus travel costs of CHF 1/km from 8600 Dübendorf / Zurich. No-obligation enquiry — reply usually within 24h.', price_cta:'Request a quote',
        nl_badge:'Stay in the loop', nl_title:'Never miss an', nl_title_em:'event again.',
        nl_subtitle_1:'Choose what interests you — Isa writes to you directly.', nl_subtitle_2:'No spam, unsubscribe anytime.',
        nl_opt_events:'Events & Appearances', nl_opt_offers:'Personal Offers', nl_submit:'Subscribe now', nl_privacy:'No spam. Unsubscribe with one click at any time.',
        nl_success_title:'Thank you, you\'re in!', nl_success_text:'Isa is delighted — you\'ll receive the first updates in your inbox soon.',
        contact_label:'Contact', contact_title:'I look forward to hearing from you!', contact_cta_form:'Form',
        form_first:'First name', form_last:'Last name', form_email:'Email', form_message:'Message',
        form_phone:'Phone / WhatsApp', form_optional:'(optional)',
        form_method:'Preferred contact method', form_method_wa:'Via WhatsApp', form_method_tel:'Phone', form_method_mail:'Email',
        form_ph_first:'Maria', form_ph_last:'Miller', form_ph_email:'maria@example.com', form_ph_message:'Hello Isa, I\'m planning a birthday party on …',
        form_submit:'Send', form_confirm:'Thank you — I\'ll usually get back to you within 24 hours.'
      },
      kinderschminken: {
        hero_eyebrow:'For children & adults',
        hero_title:'Face Painting.', hero_title_em:'Magical moments.',
        hero_subtitle:'Unicorns, superheroes, tigers — every design unique. Professional face painting in Zurich from CHF 145/h, right at your event.',
        hero_cta:'Book birthday party',
        f1_label:'Every design unique', f1_title:'Face Painting — Magical and Cool!',
        f1_text1:'The perfect highlight for your next children\'s or family event. Whether a birthday party, wedding, summer fête or any other occasion — as a professional speed painter, I paint every design live at your event.',
        f1_text2:'I need very little space (approx. 2×2 m), bring everything myself and am ready to go in no time. The perfect highlight for young and old!',
        f2_label:'Flexible & individual', f2_title:'Every design one of a kind.',
        f2_text1:'With or without a theme — every design is painted super fast and tailored to your wishes and occasion. Before I visit you at your event, we plan the right selection of designs together. You decide entirely individually where the focus should be.',
        f2_text2:'Can\'t decide? No problem at all! I\'m happy to put together a "Best Of" selection for you and surprise you!',
        f3_label:'Larger events', f3_title:'Face Painting XXL – perfect for big events',
        f3_text1:'Planning a larger event and want to offer your little guests a special highlight? I\'m happy to advise you personally and without fuss on whether support from additional professional face painters makes sense for your event. Just send a no-obligation enquiry!',
        f3_text2:'Thanks to my many years of experience in event management, I not only paint faces but also support you with advice throughout the planning. If your occasion needs extra help on site, I draw on my network of experienced, professional colleagues who can easily be booked through me.',
        f3_text3:'That way you get everything from a single source, smooth organisation and a magical experience for your little guests – even at large events.',
        f4_label:'Princesses & dreamers', f4_title:'The perfect design for every child',
        f4_text1:'From the delicate unicorn crown to the sparkling butterfly — for every child there\'s a design that makes their eyes light up.',
        f4_cta:'Enquire now',
        price_label:'Pricing', price_title:'Face painting prices — Zurich & Dübendorf',
        price_subtitle:'Approx. 6–8 children per hour — bookable from 1 hour, no hidden costs.',
        price_unit:'per hour', price_note:'+ CHF 1/km travel costs from 8600 Dübendorf / Zurich · Approx. 6–8 children per hour',
        booking_label:'How it works', booking_title:'It\'s this easy',
        step1_title:'Get in touch', step1_text:'Send me an email or call, and tell me the date, theme, location and number of guests or children.',
        step2_title:'No-obligation offer', step2_text:'You\'ll receive a no-obligation offer within 24h with price and all details.',
        step3_title:'Details confirmed', step3_text:'After booking, Isa will get in touch personally — by phone or a short message.',
        step4_title:'Designs in advance (optional)', step4_text:'If you\'d like, I\'ll send you a selection of possible designs in advance.',
        setup_label:'Professional setup', setup_title:'Everything included — ready to go',
        setup_text1:'Isa brings everything needed on the day — colours, table, chair and materials. After around 10 minutes of setup, it\'s time to get started, whether in Zurich, Dübendorf or the surrounding area.',
        setup_text2:'The compact setup adapts flexibly to any location — even a change of venue during the event is no problem.',
        material_title:'Vegan & safe', material_text:'Only high-quality colours are used, which are completely safe — and vegan. No animal products, no animal testing.',
        ben_label:'Why Face Art Zürich', ben_title:'What speaks for Face Art Zürich'
      },
      hochzeiten: {
        hero_eyebrow:'Your most beautiful day',
        hero_title:'Weddings.', hero_title_em:'Face Art for your big day.',
        hero_subtitle:'Elegant face art and body art for your wedding day in Zurich — an experience that delights guests and looks stunning in photos.',
        hero_cta:'Secure wedding date',
        f1_label:'A highlight for all guests', f1_title:'Face Art & face painting at your Zurich wedding',
        f1_text1:'Face art at a wedding is more than just a detail — it\'s an experience. Guests of all ages come by, laugh and marvel together.',
        f1_text2:'From delicate flowers to elegant patterns to playful designs — Isa adapts every design to your wedding theme.',
        f2_label:'Romantic & individual', f2_title:'Wedding face art designed individually',
        f2_text1:'Whether romantic roses, delicate vines or fine gold leaf — each design is painted individually and harmonises with your wedding theme.',
        f2_text2:'Isa coordinates with you in advance so that everything matches the colours and atmosphere of your special day.',
        f3_label:'Memories that last', f3_title:'Moments that stay',
        f3_text1:'Beautiful moments deserve beautiful photos. The painted faces become real eye-catchers in your wedding pictures — a detail that makes you smile years later.',
        f4_label:'Body art & more', f4_title:'Not just faces',
        f4_text1:'Body art on shoulder, arm or décolleté — an elegant and unique highlight that will amaze at your special day.',
        f4_cta:'Secure wedding date',
        price_label:'Pricing', price_title:'Transparent & Fair',
        price_subtitle:'Including individual design consultation and coordination with your colour scheme. Book popular summer dates early.',
        price_unit:'per hour', price_note:'+ CHF 1/km travel costs from 8600 Dübendorf / Zurich · Recommended: 2–3 months in advance',
        booking_label:'How it works', booking_title:'It\'s this easy',
        step1_title:'Get in touch', step1_text:'Write to me with your date, venue and wishes for the wedding theme.',
        step2_title:'Personal offer', step2_text:'You\'ll receive a transparent offer with price, duration and everything included — within 24h.',
        step3_title:'Design coordination', step3_text:'We discuss designs and colour schemes so everything perfectly matches your wedding style.',
        step4_title:'Your special day', step4_text:'Isa arrives on time, sets up discreetly and ensures glowing faces — visible in every photo.',
        booking_cta:'Secure wedding date',
        ben_label:'What makes face art special', ben_title:'Why guests love it',
        ben1_title:'For young and old', ben2_title:'Perfect for photos', ben3_title:'Conversation starter', ben4_title:'Vegan & skin-friendly',
        setup_label:'Stress-free organised', setup_title:'Isa brings everything'
      },
      unternehmen: {
        hero_eyebrow:'Kids Experience Activation',
        hero_title:'Families at your booth.', hero_title_em:'Parents in conversation.',
        hero_subtitle:'Compact experience modules for trade fairs and events — that delight children and free up parents for your consultations.',
        hero_cta:'Request trade fair offer',
        prob_label:'The problem at family trade fairs', prob_title:'Children get restless.', prob_title_em:'Parents rush on.',
        prob_subtitle:'Families with children leave most booths after less than 3 minutes. Face art reverses this: children stay, parents relax — and your team finally has time for real conversations.',
        fme_label:'The mechanism behind it', fme_title:'The Family Magnet Effect',
        fme_subtitle:'Face painting creates attention. Children come. Families stay. Parents have a clear head.',
        stat1_label:'longer dwell time at the booth', stat2_label:'are enough at the booth', stat3_label:'infrastructure needed',
        proof_label:'Proof in action', proof_title:'Isa at the booth — live and unstaged',
        f1_label:'Visitor engagement', f1_title:'Families stay. Parents buy.',
        f1_text:'Children at the booth create instant attention — and a relaxed atmosphere where real conversations happen. Isa handles the kids\' experience, your team handles the consulting.',
        f2_label:'Brand identity', f2_title:'Your brand on every face',
        f2_text:'Company colours, logos or event designs are integrated directly into the face painting. Every painted child is a living brand experience — and a social media moment that keeps your booth visible beyond the trade fair day.',
        material_title:'Minimum booking: 2 hours', material_text:'For trade fair assignments I recommend at least 2 hours — offer within 24h on request.',
        ref_label:'Reference 2025', ref_title:'Flug & Zug Festival, Dübendorf',
        ref_text:'At the Flug & Zug Festival 2025 at Dübendorf Airfield, Isa was in action for several hours. Children formed a queue — the booth became the meeting point of the event. Parents stayed, conversations happened.',
        ref_f1:'Venue: Dübendorf Airfield', ref_f2:'Duration: All day', ref_f3:'Designs: Event-specific',
        ben_label:'For exhibitors & stand builders', ben_title:'What your booth gains',
        ben1_title:'Longer dwell time', ben1_text:'Families with children stay up to three times longer at the booth — more time for your team to have real conversations.',
        ben2_title:'Brand on every face', ben2_text:'Company colours and logos integrated directly into the design — every child carries your branding across the trade fair and onto social media.',
        ben3_title:'No infrastructure effort', ben3_text:'No power, no water, no lead time — Isa is set up in 10 minutes and fits into any booth.',
        price_label:'Pricing', price_title:'Transparent costs',
        price_subtitle:'No-obligation offer on request — Isa responds within 24h with price, duration and all details.',
        price_unit:'per hour', price_note:'+ CHF 1/km travel costs from 8600 Dübendorf / Zurich · Minimum booking: 2 hours',
        booking_label:'Booking process', booking_title:'Booked in 4 steps',
        step1_title:'Send enquiry', step1_text:'Date, location, event size — a short message is enough.',
        step2_title:'Offer within 24h', step2_text:'Isa sends a complete offer with price and contract documents.',
        step3_title:'Detail coordination', step3_text:'Design wishes, brand colours, schedule — personally by phone or message.',
        step4_title:'Isa arrives — ready for action', step4_text:'Setup in 10 minutes, full focus on your event.',
        cta_label:'Enquire now', cta_title:'Ready for your next', cta_title_em:'trade fair appearance?',
        cta_subtitle:'Briefly describe your event — Isa will get back to you within 24h with a no-obligation offer.',
        cta_btn:'Request trade fair offer', cta_wa:'Write on WhatsApp',
        cta_note:'Also available for: Christmas party, summer festival, anniversary & brand activation',
        booking_cta:'Request trade fair offer'
      },
      about: {
        hero_eyebrow:'About me',
        hero_title:'Hello!', hero_title_em:'I\'m Isa.',
        hero_subtitle:'With creativity, passion and plenty of event experience, I\'ll fit right into your next occasion — whether corporate or private. Together we\'ll make it unforgettable.',
        about_eyebrow:'Face Art Zürich', about_title:'My passion is my profession',
        about_text1:'Hello! I\'m Isa, the artist behind Face Art Zürich. I\'m a professional speed painter.',
        about_text2:'With professional paint, I create all kinds of designs on face and body in no time at events, for young and old alike — a wonderful highlight to watch and join in for the whole family.',
        about_cta:'Get in touch', about_wa:'WhatsApp',
        val_label:'What defines me', val_title:'Values & promise',
        ben1_title:'Passion', ben2_title:'Reliability', ben3_title:'Personal service',
        ben4_title:'Quality', ben5_title:'Mobility', ben6_title:'Hygiene standards',
        ref_label:'Appearances & Portfolio', ref_title:'Where I could be found',
        ref_subtitle:'A selection from Isa\'s appearances — from atmospheric Christmas markets to large city festivals to birthday parties.'
      },
      kontakt: {
        hero_eyebrow:'Non-binding & quick',
        hero_title:'Write to me -', hero_title_em:'Reply within 24h.',
        hero_subtitle:'I look forward to your enquiry and will get back to you as soon as possible!',
        info_label:'Contact',
        form_title:'Send enquiry',
        form_first:'First name', form_last:'Last name', form_email:'Email', form_message:'Message',
        form_phone:'Phone / WhatsApp', form_optional:'(optional)',
        form_method:'Preferred contact method', form_method_wa:'Via WhatsApp', form_method_tel:'Phone', form_method_mail:'Email',
        form_ph_first:'Maria', form_ph_last:'Miller', form_ph_email:'maria@example.com', form_ph_message:'Hello Isa, I\'m planning a birthday party on …',
        form_submit:'Send', form_confirm:'Thank you — I\'ll usually get back to you within 24 hours.',
        wa_label:'WhatsApp — fastest', wa_hint:'Reply usually within 24h — directly from Isa.',
        wa_btn:'+41 (0)76 439 4928', map_label:'Find me here'
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
        msf_text:'Au 48e Chlausmärt de Dübendorf (29.11.2025), j\'ai pu participer avec des motifs de Noël et j\'ai peint aux enfants des rennes, des reines des neiges et bien d\'autres jolis motifs de Noël sur le visage. La totalité des recettes de la journée a été reversée à Médecins Sans Frontières. Un grand merci pour la participation enthousiaste et le soutien. Ensemble, on va tout simplement plus loin — c\'est pourquoi je serai à nouveau présente cette année pour récolter des dons. Passez donc nous voir !',
        msf_cta:'Lire l\'histoire de l\'événement →',
        testimonials_label:'Ce que disent les clients', testimonials_title:'Avis — Maquillage enfants Zurich', testimonials_subtitle:'Expériences réelles de parents, mariés et organisateurs d\'événements.',
        price_label:'Transparent & équitable', price_per_hour:'/ heure', price_text:'Plus frais de déplacement de CHF 1/km depuis 8600 Dübendorf / Zurich. Demande sans engagement — réponse généralement dans les 24h.', price_cta:'Demander un devis',
        nl_badge:'Restez informé', nl_title:'Ne ratez plus aucun', nl_title_em:'événement.',
        nl_subtitle_1:'Choisissez ce qui vous intéresse — Isa vous écrit directement.', nl_subtitle_2:'Pas de spam, désinscription à tout moment.',
        nl_opt_events:'Événements & Apparitions', nl_opt_offers:'Offres personnelles', nl_submit:'S\'inscrire maintenant', nl_privacy:'Pas de spam. Désabonnement en un clic à tout moment.',
        nl_success_title:'Merci, vous êtes inscrit !', nl_success_text:'Isa est ravie — vous recevrez bientôt les premières actualités dans votre boîte mail.',
        contact_label:'Contact', contact_title:'Je me réjouis de votre message !', contact_cta_form:'Formulaire',
        form_first:'Prénom', form_last:'Nom', form_email:'E-mail', form_message:'Message',
        form_phone:'Téléphone / WhatsApp', form_optional:'(facultatif)',
        form_method:'Moyen de contact préféré', form_method_wa:'Par WhatsApp', form_method_tel:'Téléphone', form_method_mail:'E-mail',
        form_ph_first:'Marie', form_ph_last:'Dupont', form_ph_email:'marie@exemple.fr', form_ph_message:'Bonjour Isa, je planifie un anniversaire le …',
        form_submit:'Envoyer', form_confirm:'Merci — je vous répondrai généralement dans les 24 heures.'
      },
      kinderschminken: {
        hero_eyebrow:'Pour enfants & adultes',
        hero_title:'Maquillage enfants.', hero_title_em:'Des moments magiques.',
        hero_subtitle:'Licornes, super-héros, tigres — chaque motif est unique. Maquillage enfants professionnel à Zurich à partir de CHF 145/h, directement à votre événement.',
        hero_cta:'Réserver l\'anniversaire',
        f1_label:'Chaque motif unique', f1_title:'Maquillage enfants — magique et cool !',
        f1_text1:'Le highlight parfait pour votre prochain événement pour enfants ou en famille. Anniversaire, mariage, fête d\'été ou toute autre occasion — en tant que speed painter professionnelle, je peins tous les motifs en direct lors de votre événement.',
        f1_text2:'Je n\'ai besoin que de peu de place (env. 2×2 m), j\'apporte tout moi-même et je suis prête en un rien de temps. Le highlight parfait pour petits et grands !',
        f2_label:'Flexible & individuel', f2_title:'Chaque motif est unique.',
        f2_text1:'Avec ou sans thème — tous les motifs sont peints super rapidement et s\'adaptent à vos envies et à vos occasions. Avant de vous rejoindre à votre événement, nous planifions ensemble la bonne sélection de motifs. Vous décidez tout à fait librement où mettre l\'accent.',
        f2_text2:'Vous n\'arrivez pas à choisir ? Aucun problème ! Je vous compose volontiers une sélection « Best Of » et vous surprends !',
        f3_label:'Grands événements', f3_title:'Maquillage enfants XXL – parfait pour les grands événements',
        f3_text1:'Vous organisez un grand événement et souhaitez offrir un moment fort à vos petits invités ? Je vous conseille volontiers, personnellement et simplement, pour savoir si le renfort d\'autres maquilleuses professionnelles est judicieux pour votre événement. Faites simplement une demande sans engagement !',
        f3_text2:'Grâce à ma longue expérience dans l\'organisation d\'événements, je ne me contente pas de maquiller : je vous accompagne aussi de mes conseils tout au long de la planification. Si votre occasion nécessite un renfort sur place, je fais appel à mon réseau de collègues expérimentées et professionnelles, faciles à réserver via moi.',
        f3_text3:'Ainsi, vous avez tout d\'une seule main, une organisation sans accroc et une expérience magique pour vos petits invités – même lors de grandes manifestations.',
        f4_label:'Princesses & rêveurs', f4_title:'Le motif parfait pour chaque enfant',
        f4_text1:'De la délicate couronne de licorne au papillon scintillant — pour chaque enfant, il y a un motif qui fait briller ses yeux.',
        f4_cta:'Faire une demande',
        price_label:'Tarifs', price_title:'Tarifs maquillage enfants — Zurich & Dübendorf',
        price_subtitle:'Env. 6–8 enfants par heure — réservable à partir d\'1 heure, sans frais cachés.',
        price_unit:'par heure', price_note:'+ CHF 1/km de frais de déplacement depuis 8600 Dübendorf / Zurich · Env. 6–8 enfants par heure',
        booking_label:'Comment ça marche', booking_title:'Si simple !',
        step1_title:'Prendre contact', step1_text:'Envoyez-moi un e-mail ou appelez-moi en indiquant la date, le thème, le lieu et le nombre d\'invités ou d\'enfants.',
        step2_title:'Devis sans engagement', step2_text:'Vous recevrez un devis sans engagement dans les 24h avec le prix et tous les détails.',
        step3_title:'Confirmation des détails', step3_text:'Après la réservation, Isa vous contacte personnellement — par téléphone ou message.',
        step4_title:'Motifs à l\'avance (optionnel)', step4_text:'Si vous le souhaitez, je vous envoie à l\'avance une sélection de motifs possibles.',
        setup_label:'Setup professionnel', setup_title:'Tout inclus — prêt à démarrer',
        setup_text1:'Isa apporte tout le nécessaire — couleurs, table, chaise et matériaux. Après environ 10 minutes de mise en place, c\'est parti, que ce soit à Zurich, Dübendorf ou dans toute la région.',
        setup_text2:'Le setup compact s\'adapte à n\'importe quel lieu — même un changement d\'endroit pendant la fête n\'est pas un problème.',
        material_title:'Vegan & sûr', material_text:'Seules des couleurs de haute qualité sont utilisées, absolument sûres — et véganes. Pas de produits animaux, pas de tests sur animaux.',
        ben_label:'Pourquoi Face Art Zürich', ben_title:'Ce qui parle pour Face Art Zürich'
      },
      hochzeiten: {
        hero_eyebrow:'Votre plus beau jour',
        hero_title:'Mariages.', hero_title_em:'Face Art pour votre grand jour.',
        hero_subtitle:'Face art et body art élégants pour votre mariage à Zurich — une expérience qui ravit les invités et qui est magnifique sur les photos.',
        hero_cta:'Réserver la date de mariage',
        f1_label:'Un highlight pour tous les invités', f1_title:'Face Art & maquillage à votre mariage zurichois',
        f1_text1:'Le face art lors d\'un mariage est bien plus qu\'un simple détail — c\'est une expérience. Des invités de tous âges s\'approchent, rient et s\'émerveillent ensemble.',
        f1_text2:'Des fleurs délicates aux motifs élégants en passant par des designs ludiques — Isa adapte chaque motif à votre thème de mariage.',
        f2_label:'Romantique & individuel', f2_title:'Face art de mariage personnalisé',
        f2_text1:'Roses romantiques, rinceaux délicats ou feuilles d\'or fines — chaque motif est peint individuellement et s\'harmonise avec votre thème de mariage.',
        f2_text2:'Isa s\'accorde avec vous à l\'avance pour que tout corresponde aux couleurs et à l\'atmosphère de votre grand jour.',
        f3_label:'Des souvenirs qui durent', f3_title:'Des moments qui restent',
        f3_text1:'Les beaux moments méritent de belles photos. Les visages peints deviennent de vrais attraits sur vos photos de mariage — un détail qui fait sourire des années après.',
        f4_label:'Body art & plus', f4_title:'Pas seulement les visages',
        f4_text1:'Body art sur l\'épaule, le bras ou le décolleté — un highlight élégant et unique qui éblouira lors de votre grand jour.',
        f4_cta:'Réserver la date de mariage',
        price_label:'Tarifs', price_title:'Transparent & équitable',
        price_subtitle:'Comprend la consultation individuelle sur les motifs et la coordination avec votre palette de couleurs. Réservez tôt les dates d\'été populaires.',
        price_unit:'par heure', price_note:'+ CHF 1/km de frais de déplacement depuis 8600 Dübendorf / Zurich · Recommandé : 2–3 mois à l\'avance',
        booking_label:'Comment ça marche', booking_title:'Si simple !',
        step1_title:'Prendre contact', step1_text:'Écrivez-moi votre date, le lieu et vos souhaits pour le thème du mariage.',
        step2_title:'Offre personnelle', step2_text:'Vous recevrez une offre transparente avec le prix, la durée et tout ce qui est inclus — dans les 24h.',
        step3_title:'Coordination des designs', step3_text:'Nous discutons des motifs et des couleurs pour que tout corresponde parfaitement à votre style de mariage.',
        step4_title:'Votre grand jour', step4_text:'Isa arrive à l\'heure, s\'installe discrètement et assure des visages rayonnants — visibles sur chaque photo.',
        booking_cta:'Réserver la date de mariage',
        ben_label:'Ce qui rend le face art spécial', ben_title:'Pourquoi les invités adorent',
        ben1_title:'Pour petits et grands', ben2_title:'Parfait pour les photos', ben3_title:'Brise-glace', ben4_title:'Vegan & adapté à la peau',
        setup_label:'Organisé sans stress', setup_title:'Isa apporte tout'
      },
      unternehmen: {
        hero_eyebrow:'Kids Experience Activation',
        hero_title:'Des familles à votre stand.', hero_title_em:'Des parents en conversation.',
        hero_subtitle:'Des modules d\'expérience compacts pour les foires et événements — qui ravissent les enfants et libèrent les parents pour vos consultations.',
        hero_cta:'Demander une offre salon',
        prob_label:'Le problème dans les salons familiaux', prob_title:'Les enfants s\'agitent.', prob_title_em:'Les parents s\'en vont.',
        prob_subtitle:'Les familles avec enfants quittent la plupart des stands en moins de 3 minutes. Le face art renverse cela : les enfants restent, les parents se détendent — et votre équipe a enfin le temps pour de vraies conversations.',
        fme_label:'Le mécanisme derrière', fme_title:'Le Family Magnet Effect',
        fme_subtitle:'Le maquillage crée de l\'attention. Les enfants arrivent. Les familles restent. Les parents ont l\'esprit libre.',
        stat1_label:'plus de temps passé au stand', stat2_label:'suffisent au stand', stat3_label:'infrastructure nécessaire',
        proof_label:'Preuve en action', proof_title:'Isa au stand — en direct et sans mise en scène',
        f1_label:'Engagement des visiteurs', f1_title:'Les familles restent. Les parents achètent.',
        f1_text:'Les enfants au stand créent une attention immédiate — et une atmosphère détendue où de vraies conversations se créent. Isa s\'occupe de l\'expérience des enfants, votre équipe s\'occupe du conseil.',
        f2_label:'Identité de marque', f2_title:'Votre marque sur chaque visage',
        f2_text:'Les couleurs de l\'entreprise, logos ou motifs d\'événement sont directement intégrés dans le maquillage. Chaque enfant maquillé est une expérience de marque vivante — et un moment sur les réseaux sociaux qui rend votre stand visible bien au-delà de la journée de salon.',
        material_title:'Réservation minimum : 2 heures', material_text:'Pour les missions en salon, je recommande au moins 2 heures — offre dans les 24h sur demande.',
        ref_label:'Référence 2025', ref_title:'Festival Flug & Zug, Dübendorf',
        ref_text:'Au Festival Flug & Zug 2025 à l\'aérodrome de Dübendorf, Isa est intervenue pendant plusieurs heures. Les enfants faisaient la queue — le stand est devenu le point de rencontre de l\'événement. Les parents sont restés, des conversations ont eu lieu.',
        ref_f1:'Lieu : Aérodrome de Dübendorf', ref_f2:'Durée : Toute la journée', ref_f3:'Motifs : Designs spécifiques à l\'événement',
        ben_label:'Pour exposants & constructeurs de stands', ben_title:'Ce que votre stand y gagne',
        ben1_title:'Plus de temps de visite', ben1_text:'Les familles avec enfants restent jusqu\'à trois fois plus longtemps au stand — plus de temps pour votre équipe pour mener de vraies conversations.',
        ben2_title:'Marque sur chaque visage', ben2_text:'Couleurs d\'entreprise et logos directement intégrés dans le motif — chaque enfant porte votre branding dans tout le salon et sur les réseaux sociaux.',
        ben3_title:'Aucun effort d\'infrastructure', ben3_text:'Pas d\'électricité, pas d\'eau, pas de délai — Isa est installée en 10 minutes et s\'adapte à n\'importe quel stand.',
        price_label:'Tarifs', price_title:'Coûts transparents',
        price_subtitle:'Offre sans engagement sur demande — Isa répond dans les 24h avec prix, durée et tous les détails.',
        price_unit:'par heure', price_note:'+ CHF 1/km de frais de déplacement depuis 8600 Dübendorf / Zurich · Réservation minimum : 2 heures',
        booking_label:'Processus de réservation', booking_title:'Réservé en 4 étapes',
        step1_title:'Envoyer une demande', step1_text:'Date, lieu, taille de l\'événement — un court message suffit.',
        step2_title:'Offre dans les 24h', step2_text:'Isa envoie une offre complète avec prix et documents contractuels.',
        step3_title:'Coordination des détails', step3_text:'Souhaits de motifs, couleurs de marque, planning — personnellement par téléphone ou message.',
        step4_title:'Isa arrive — prête à l\'action', step4_text:'Installation en 10 minutes, concentration totale sur votre événement.',
        cta_label:'Demander maintenant', cta_title:'Prêt pour votre prochaine', cta_title_em:'salon ?',
        cta_subtitle:'Décrivez brièvement votre événement — Isa vous répondra dans les 24h avec une offre sans engagement.',
        cta_btn:'Demander une offre salon', cta_wa:'Écrire sur WhatsApp',
        cta_note:'Également disponible pour : fête de Noël, fête d\'été, anniversaire & activation de marque',
        booking_cta:'Demander une offre salon'
      },
      about: {
        hero_eyebrow:'À propos',
        hero_title:'Bonjour !', hero_title_em:'Je suis Isa.',
        hero_subtitle:'Avec créativité, passion et une solide expérience événementielle, je m\'intègre parfaitement à votre prochain événement — qu\'il soit professionnel ou privé. Ensemble, rendons-le inoubliable.',
        about_eyebrow:'Face Art Zürich', about_title:'Ma passion est mon métier',
        about_text1:'Bonjour ! Je suis Isa, l\'artiste derrière Face Art Zürich. Je suis une speed painter professionnelle.',
        about_text2:'Avec du maquillage professionnel, je crée en un rien de temps toutes sortes de motifs sur le visage et le corps lors d\'événements, pour petits et grands — un magnifique moment à regarder et à partager pour toute la famille.',
        about_cta:'Prendre contact', about_wa:'WhatsApp',
        val_label:'Ce qui me définit', val_title:'Valeurs & promesses',
        ben1_title:'Passion', ben2_title:'Fiabilité', ben3_title:'Service personnel',
        ben4_title:'Qualité', ben5_title:'Mobilité', ben6_title:'Standards d\'hygiène',
        ref_label:'Apparitions & Portfolio', ref_title:'Où j\'ai participé',
        ref_subtitle:'Une sélection d\'apparitions d\'Isa — de marchés de Noël chaleureux à de grands festivals urbains en passant par des fêtes d\'anniversaire.'
      },
      kontakt: {
        hero_eyebrow:'Sans engagement & rapide',
        hero_title:'Écrivez-moi -', hero_title_em:'Réponse dans les 24h.',
        hero_subtitle:'Je me réjouis de votre demande et je vous réponds dans les meilleurs délais !',
        info_label:'Contact',
        form_title:'Envoyer une demande',
        form_first:'Prénom', form_last:'Nom', form_email:'E-mail', form_message:'Message',
        form_phone:'Téléphone / WhatsApp', form_optional:'(facultatif)',
        form_method:'Moyen de contact préféré', form_method_wa:'Par WhatsApp', form_method_tel:'Téléphone', form_method_mail:'E-mail',
        form_ph_first:'Marie', form_ph_last:'Dupont', form_ph_email:'marie@exemple.fr', form_ph_message:'Bonjour Isa, je planifie un anniversaire le …',
        form_submit:'Envoyer', form_confirm:'Merci — je vous répondrai généralement dans les 24 heures.',
        wa_label:'WhatsApp — le plus rapide', wa_hint:'Réponse en général dans les 24h — directement d\'Isa.',
        wa_btn:'+41 (0)76 439 4928', map_label:'Où me trouver'
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
        msf_text:'Al 48° Chlausmärt di Dübendorf (29.11.2025) ho potuto partecipare con motivi natalizi e ho dipinto ai bambini renne, regine delle nevi e molti altri bellissimi motivi natalizi sul viso. L\'intero ricavato della giornata è stato devoluto a Medici Senza Frontiere. Un grande grazie per la vivace partecipazione e il sostegno. Insieme ci si muove semplicemente di più — per questo anche quest\'anno sarò di nuovo presente a raccogliere donazioni. Venite a trovarci!',
        msf_cta:'Leggi la storia dell\'evento →',
        testimonials_label:'Cosa dicono i clienti', testimonials_title:'Recensioni — Truccabimbi Zurigo', testimonials_subtitle:'Esperienze reali di genitori, sposi e organizzatori di eventi.',
        price_label:'Trasparente & Equo', price_per_hour:'/ ora', price_text:'Più spese di viaggio di CHF 1/km da 8600 Dübendorf / Zurigo. Richiesta senza impegno — risposta di solito entro 24h.', price_cta:'Richiedi un preventivo',
        nl_badge:'Resta aggiornato', nl_title:'Non perdere più nessun', nl_title_em:'evento.',
        nl_subtitle_1:'Scegli cosa ti interessa — Isa ti scrive direttamente.', nl_subtitle_2:'Niente spam, cancellazione in qualsiasi momento.',
        nl_opt_events:'Eventi & Apparizioni', nl_opt_offers:'Offerte personali', nl_submit:'Iscriviti ora', nl_privacy:'Niente spam. Cancellazione con un clic in qualsiasi momento.',
        nl_success_title:'Grazie, sei dentro!', nl_success_text:'Isa è felice — riceverai presto i primi aggiornamenti nella tua casella di posta.',
        contact_label:'Contatto', contact_title:'Non vedo l\'ora di sentirti!', contact_cta_form:'Modulo',
        form_first:'Nome', form_last:'Cognome', form_email:'E-mail', form_message:'Messaggio',
        form_phone:'Telefono / WhatsApp', form_optional:'(facoltativo)',
        form_method:'Canale di contatto preferito', form_method_wa:'Via WhatsApp', form_method_tel:'Telefono', form_method_mail:'E-mail',
        form_ph_first:'Maria', form_ph_last:'Rossi', form_ph_email:'maria@esempio.it', form_ph_message:'Ciao Isa, sto pianificando una festa di compleanno il …',
        form_submit:'Invia', form_confirm:'Grazie — di solito rispondo entro 24 ore.'
      },
      kinderschminken: {
        hero_eyebrow:'Per bambini & adulti',
        hero_title:'Truccabimbi.', hero_title_em:'Momenti magici.',
        hero_subtitle:'Unicorni, supereroi, tigri — ogni motivo è unico. Truccabimbi professionale a Zurigo da CHF 145/h, direttamente al vostro evento.',
        hero_cta:'Prenota il compleanno',
        f1_label:'Ogni motivo unico', f1_title:'Truccabimbi — magico e cool!',
        f1_text1:'Il tocco perfetto per il vostro prossimo evento per bambini o in famiglia. Che sia una festa di compleanno, un matrimonio, una festa estiva o altre occasioni — come speed painter professionista dipingo tutti i motivi dal vivo al vostro evento.',
        f1_text2:'Mi basta poco spazio (ca. 2×2 m), porto tutto con me e sono pronta in pochissimo tempo. Il tocco perfetto per grandi e piccoli!',
        f2_label:'Flessibile & individuale', f2_title:'Ogni motivo è unico.',
        f2_text1:'Con o senza tema — tutti i motivi sono dipinti super velocemente e si adattano ai vostri desideri e alle occasioni. Prima di raggiungervi al vostro evento, pianifichiamo insieme la giusta selezione di motivi. Decidete voi in modo del tutto individuale dove mettere l\'accento.',
        f2_text2:'Non riuscite a decidere? Nessun problema! Volentieri preparo per voi una selezione «Best Of» e vi sorprendo!',
        f3_label:'Grandi eventi', f3_title:'Truccabimbi XXL – perfetto per i grandi eventi',
        f3_text1:'State organizzando un evento più grande e volete offrire ai vostri piccoli ospiti un momento speciale? Vi consiglio volentieri, di persona e senza complicazioni, se sia utile il supporto di altre truccatrici professioniste per il vostro evento. Richiedete semplicemente senza impegno!',
        f3_text2:'Grazie alla mia lunga esperienza nell\'organizzazione di eventi, non mi occupo solo del trucco, ma vi affianco anche con consigli nella pianificazione. Se il vostro evento necessita di supporto aggiuntivo sul posto, mi avvalgo della mia rete di colleghe esperte e professioniste, prenotabili facilmente tramite me.',
        f3_text3:'Così avete tutto da un unico interlocutore, un\'organizzazione impeccabile e un\'esperienza magica per i vostri piccoli ospiti – anche in occasione di grandi eventi.',
        f4_label:'Principesse & sognatori', f4_title:'Il motivo perfetto per ogni bambino',
        f4_text1:'Dalla delicata corona di unicorno alla farfalla scintillante — per ogni bambino c\'è un motivo che fa brillare i suoi occhi.',
        f4_cta:'Richiedi ora',
        price_label:'Prezzi', price_title:'Prezzi truccabimbi — Zurigo & Dübendorf',
        price_subtitle:'Ca. 6–8 bambini all\'ora — prenotabile da 1 ora, nessun costo nascosto.',
        price_unit:'all\'ora', price_note:'+ CHF 1/km costi di viaggio da 8600 Dübendorf / Zurigo · Ca. 6–8 bambini all\'ora',
        booking_label:'Come funziona', booking_title:'È così semplice',
        step1_title:'Contattateci', step1_text:'Scrivetemi un\'e-mail o chiamate, e ditemi data, tema, luogo e numero di ospiti o bambini.',
        step2_title:'Offerta senza impegno', step2_text:'Riceverete un\'offerta senza impegno entro 24h con il prezzo e tutti i dettagli.',
        step3_title:'Dettagli confermati', step3_text:'Dopo la prenotazione, Isa si metterà in contatto personalmente — per telefono o con un breve messaggio.',
        step4_title:'Motivi in anticipo (opzionale)', step4_text:'Se volete, vi invierò in anticipo una selezione di motivi possibili.',
        setup_label:'Setup professionale', setup_title:'Tutto incluso — pronto a partire',
        setup_text1:'Isa porta tutto il necessario — colori, tavolo, sedia e materiali. Dopo circa 10 minuti di allestimento, si può iniziare, a Zurigo, Dübendorf o in tutta la regione.',
        setup_text2:'Il setup compatto si adatta a qualsiasi luogo — anche un cambio di posto durante la festa non è un problema.',
        material_title:'Vegano & sicuro', material_text:'Si utilizzano solo colori di alta qualità, assolutamente sicuri — e vegani. Nessun prodotto animale, nessun test su animali.',
        ben_label:'Perché Face Art Zürich', ben_title:'Cosa parla per Face Art Zürich'
      },
      hochzeiten: {
        hero_eyebrow:'Il vostro giorno più bello',
        hero_title:'Matrimoni.', hero_title_em:'Face Art per il vostro grande giorno.',
        hero_subtitle:'Face art e body art eleganti per il vostro matrimonio a Zurigo — un\'esperienza che delizia gli ospiti e che risulta splendida nelle foto.',
        hero_cta:'Blocca la data del matrimonio',
        f1_label:'Un highlight per tutti gli ospiti', f1_title:'Face Art & trucco al vostro matrimonio zurighese',
        f1_text1:'Il face art a un matrimonio è molto più di un semplice dettaglio — è un\'esperienza. Ospiti di tutte le età si avvicinano, ridono e si meravigliano insieme.',
        f1_text2:'Da delicati fiori a motivi eleganti a design giocosi — Isa adatta ogni motivo al vostro tema matrimoniale.',
        f2_label:'Romantico & individuale', f2_title:'Face art matrimoniale progettato individualmente',
        f2_text1:'Rose romantiche, viticci delicati o sottili foglie d\'oro — ogni motivo viene dipinto individualmente e si armonizza con il vostro tema matrimoniale.',
        f2_text2:'Isa si coordina con voi in anticipo per assicurarsi che tutto corrisponda ai colori e all\'atmosfera del vostro grande giorno.',
        f3_label:'Ricordi che durano', f3_title:'Momenti che restano',
        f3_text1:'I bei momenti meritano belle foto. I visi dipinti diventano vere attrazioni nelle vostre foto di matrimonio — un dettaglio che fa sorridere ancora anni dopo.',
        f4_label:'Body art & altro', f4_title:'Non solo i visi',
        f4_text1:'Body art su spalla, braccio o décolleté — un highlight elegante e unico che lascerà tutti a bocca aperta nel vostro grande giorno.',
        f4_cta:'Blocca la data del matrimonio',
        price_label:'Prezzi', price_title:'Trasparente & equo',
        price_subtitle:'Include consulenza individuale sui motivi e coordinamento con la vostra palette colori. Prenotate presto le date estive popolari.',
        price_unit:'all\'ora', price_note:'+ CHF 1/km costi di viaggio da 8600 Dübendorf / Zurigo · Raccomandato: 2–3 mesi in anticipo',
        booking_label:'Come funziona', booking_title:'È così semplice',
        step1_title:'Contattateci', step1_text:'Scrivetemi la data, il luogo e i vostri desideri per il tema del matrimonio.',
        step2_title:'Offerta personale', step2_text:'Riceverete un\'offerta trasparente con prezzo, durata e tutto incluso — entro 24h.',
        step3_title:'Coordinamento design', step3_text:'Discutiamo i motivi e i colori in modo che tutto corrisponda perfettamente al vostro stile matrimoniale.',
        step4_title:'Il vostro grande giorno', step4_text:'Isa arriva puntuale, si installa discretamente e assicura visi raggianti — visibili in ogni foto.',
        booking_cta:'Blocca la data del matrimonio',
        ben_label:'Cosa rende speciale il face art', ben_title:'Perché gli ospiti lo amano',
        ben1_title:'Per grandi e piccoli', ben2_title:'Perfetto per le foto', ben3_title:'Rompighiaccio', ben4_title:'Vegano & adatto alla pelle',
        setup_label:'Organizzato senza stress', setup_title:'Isa porta tutto'
      },
      unternehmen: {
        hero_eyebrow:'Kids Experience Activation',
        hero_title:'Famiglie al vostro stand.', hero_title_em:'Genitori in conversazione.',
        hero_subtitle:'Moduli di esperienza compatti per fiere ed eventi — che entusiasmano i bambini e liberano i genitori per le vostre consulenze.',
        hero_cta:'Richiedere offerta fiera',
        prob_label:'Il problema alle fiere di famiglia', prob_title:'I bambini si agitano.', prob_title_em:'I genitori se ne vanno.',
        prob_subtitle:'Le famiglie con bambini lasciano la maggior parte degli stand in meno di 3 minuti. Il face art ribalta questo: i bambini restano, i genitori si rilassano — e il vostro team ha finalmente tempo per vere conversazioni.',
        fme_label:'Il meccanismo dietro', fme_title:'Il Family Magnet Effect',
        fme_subtitle:'Il trucco crea attenzione. I bambini arrivano. Le famiglie restano. I genitori hanno la mente libera.',
        stat1_label:'più tempo trascorso allo stand', stat2_label:'bastano allo stand', stat3_label:'infrastruttura necessaria',
        proof_label:'Prova in azione', proof_title:'Isa allo stand — dal vivo e spontaneo',
        f1_label:'Coinvolgimento dei visitatori', f1_title:'Le famiglie restano. I genitori comprano.',
        f1_text:'I bambini allo stand creano attenzione immediata — e un\'atmosfera rilassata in cui nascono vere conversazioni. Isa gestisce l\'esperienza dei bambini, il vostro team gestisce la consulenza.',
        f2_label:'Identità di marca', f2_title:'Il vostro brand su ogni viso',
        f2_text:'Colori aziendali, loghi o motivi evento vengono integrati direttamente nel trucco. Ogni bambino truccato è una vera esperienza di marca — e un momento sui social media che mantiene il vostro stand visibile ben oltre la giornata di fiera.',
        material_title:'Prenotazione minima: 2 ore', material_text:'Per gli impieghi in fiera raccomando almeno 2 ore — offerta entro 24h su richiesta.',
        ref_label:'Riferimento 2025', ref_title:'Festival Flug & Zug, Dübendorf',
        ref_text:'Al Festival Flug & Zug 2025 all\'aeroporto di Dübendorf, Isa è stata in servizio per diverse ore. I bambini facevano la fila — lo stand è diventato il punto di incontro dell\'evento. I genitori sono rimasti, le conversazioni sono nate.',
        ref_f1:'Luogo: Aeroporto di Dübendorf', ref_f2:'Durata: Tutto il giorno', ref_f3:'Motivi: Design specifici per l\'evento',
        ben_label:'Per espositori & allestitori', ben_title:'Cosa guadagna il vostro stand',
        ben1_title:'Maggiore tempo di permanenza', ben1_text:'Le famiglie con bambini rimangono fino a tre volte più a lungo allo stand — più tempo per il vostro team per avere vere conversazioni.',
        ben2_title:'Brand su ogni viso', ben2_text:'Colori aziendali e loghi direttamente integrati nel motivo — ogni bambino porta il vostro branding in tutta la fiera e sui social media.',
        ben3_title:'Nessuno sforzo infrastrutturale', ben3_text:'Nessuna corrente, nessuna acqua, nessun tempo di preparazione — Isa è allestita in 10 minuti e si adatta a qualsiasi stand.',
        price_label:'Prezzi', price_title:'Costi trasparenti',
        price_subtitle:'Offerta senza impegno su richiesta — Isa risponde entro 24h con prezzo, durata e tutti i dettagli.',
        price_unit:'all\'ora', price_note:'+ CHF 1/km costi di viaggio da 8600 Dübendorf / Zurigo · Prenotazione minima: 2 ore',
        booking_label:'Processo di prenotazione', booking_title:'Prenotato in 4 passi',
        step1_title:'Inviare richiesta', step1_text:'Data, luogo, dimensione dell\'evento — un breve messaggio è sufficiente.',
        step2_title:'Offerta entro 24h', step2_text:'Isa invia un\'offerta completa con prezzo e documenti contrattuali.',
        step3_title:'Coordinamento dettagli', step3_text:'Desideri di motivi, colori del brand, programma — personalmente per telefono o messaggio.',
        step4_title:'Isa arriva — pronta all\'azione', step4_text:'Allestimento in 10 minuti, piena concentrazione sul vostro evento.',
        cta_label:'Richiedete ora', cta_title:'Pronti per la vostra prossima', cta_title_em:'fiera?',
        cta_subtitle:'Descrivi brevemente il tuo evento — Isa ti ricontatterà entro 24h con un\'offerta senza impegno.',
        cta_btn:'Richiedere offerta fiera', cta_wa:'Scrivere su WhatsApp',
        cta_note:'Disponibile anche per: festa di Natale, festa estiva, anniversario & attivazione del brand',
        booking_cta:'Richiedere offerta fiera'
      },
      about: {
        hero_eyebrow:'Chi sono',
        hero_title:'Ciao!', hero_title_em:'Sono Isa.',
        hero_subtitle:'Con creatività, passione e tanta esperienza negli eventi, mi inserisco perfettamente anche nel vostro prossimo evento — che sia aziendale o privato. Insieme lo renderemo indimenticabile.',
        about_eyebrow:'Face Art Zürich', about_title:'La mia passione è il mio lavoro',
        about_text1:'Ciao! Sono Isa, l\'artista dietro Face Art Zürich. Sono una speed painter professionista.',
        about_text2:'Con colori professionali realizzo in pochissimo tempo ogni tipo di motivo su viso e corpo agli eventi, per grandi e piccoli — un meraviglioso momento da guardare e a cui partecipare per tutta la famiglia.',
        about_cta:'Prendere contatto', about_wa:'WhatsApp',
        val_label:'Cosa mi contraddistingue', val_title:'Valori & promesse',
        ben1_title:'Passione', ben2_title:'Affidabilità', ben3_title:'Servizio personale',
        ben4_title:'Qualità', ben5_title:'Mobilità', ben6_title:'Standard igienici',
        ref_label:'Apparizioni & Portfolio', ref_title:'Dove sono stata',
        ref_subtitle:'Una selezione delle apparizioni di Isa — da atmosferici mercatini di Natale a grandi festival urbani a feste di compleanno.'
      },
      kontakt: {
        hero_eyebrow:'Senza impegno & veloce',
        hero_title:'Scrivetemi -', hero_title_em:'Risposta entro 24h.',
        hero_subtitle:'Non vedo l\'ora della vostra richiesta e vi rispondo il prima possibile!',
        info_label:'Contatto',
        form_title:'Invia richiesta',
        form_first:'Nome', form_last:'Cognome', form_email:'E-mail', form_message:'Messaggio',
        form_phone:'Telefono / WhatsApp', form_optional:'(facoltativo)',
        form_method:'Canale di contatto preferito', form_method_wa:'Via WhatsApp', form_method_tel:'Telefono', form_method_mail:'E-mail',
        form_ph_first:'Maria', form_ph_last:'Rossi', form_ph_email:'maria@esempio.it', form_ph_message:'Ciao Isa, sto pianificando una festa di compleanno il …',
        form_submit:'Invia', form_confirm:'Grazie — di solito rispondo entro 24 ore.',
        wa_label:'WhatsApp — il più veloce', wa_hint:'Risposta di solito entro 24h — direttamente da Isa.',
        wa_btn:'+41 (0)76 439 4928', map_label:'Dove trovarmi'
      }
    }
  };

  /* ── UI-Meldungen (Formular-Status, nicht im DOM) ─────── */
  const UI = {
    de: {
      sending:'Wird gesendet…',
      phone_required:'Für WhatsApp oder Telefon braucht Isa eure Telefonnummer.',
      send_error:'Fehler beim Senden — bitte versuche es erneut.',
      no_connection:'Keine Verbindung — bitte versuche es erneut.',
      nl_choose_option:'Bitte mindestens eine Option auswählen.',
      nl_invalid_email:'Bitte eine gültige E-Mail-Adresse eingeben.',
      nl_submit:'Jetzt anmelden',
      nl_send_error:'Fehler beim Senden. Bitte versuche es erneut.',
      nl_no_connection:'Keine Verbindung. Bitte versuche es erneut.'
    },
    en: {
      sending:'Sending…',
      phone_required:'For WhatsApp or phone contact, please add your phone number.',
      send_error:'Error while sending — please try again.',
      no_connection:'No connection — please try again.',
      nl_choose_option:'Please select at least one option.',
      nl_invalid_email:'Please enter a valid email address.',
      nl_submit:'Subscribe now',
      nl_send_error:'Error while sending. Please try again.',
      nl_no_connection:'No connection. Please try again.'
    },
    fr: {
      sending:'Envoi en cours…',
      phone_required:'Pour un contact par WhatsApp ou téléphone, merci d\'indiquer votre numéro.',
      send_error:'Erreur lors de l\'envoi — veuillez réessayer.',
      no_connection:'Pas de connexion — veuillez réessayer.',
      nl_choose_option:'Veuillez sélectionner au moins une option.',
      nl_invalid_email:'Veuillez saisir une adresse e-mail valide.',
      nl_submit:'S\'inscrire',
      nl_send_error:'Erreur lors de l\'envoi. Veuillez réessayer.',
      nl_no_connection:'Pas de connexion. Veuillez réessayer.'
    },
    it: {
      sending:'Invio in corso…',
      phone_required:'Per essere ricontattati via WhatsApp o telefono, indicate il vostro numero.',
      send_error:'Errore durante l\'invio — riprova.',
      no_connection:'Nessuna connessione — riprova.',
      nl_choose_option:'Seleziona almeno un\'opzione.',
      nl_invalid_email:'Inserisci un indirizzo e-mail valido.',
      nl_submit:'Iscriviti ora',
      nl_send_error:'Errore durante l\'invio. Riprova.',
      nl_no_connection:'Nessuna connessione. Riprova.'
    }
  };

  const msg = key => (UI[current] && UI[current][key]) || UI.de[key] || key;

  /* ── Engine ───────────────────────────────────────────── */
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

  const setLang = lang => {
    if (!SUPPORTED.includes(lang) || lang === current) return;
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyAll(lang, lang === 'de' ? {} : T[lang]);
  };

  const init = () => {
    const lang = detect();
    current = lang;
    if (lang !== 'de') applyAll(lang, T[lang]);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('lang-btn--active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  };

  return { init, lang: () => current, msg };
})();

document.addEventListener('DOMContentLoaded', I18n.init);
