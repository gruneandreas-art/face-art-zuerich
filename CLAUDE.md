# Projektüberblick
Statische, mehrsprachige Website für **Face Art Zürich** (Kinderschminken & Face Art von Isa, Dübendorf/Zürich). 14 Seiten: 6 deutsche im Root (`index`, `kinderschminken`, `hochzeiten`, `unternehmen`, `about`, `kontakt`), dieselben 6 englisch unter `/en/`, dazu `impressum` und `datenschutz` (nur Deutsch). Sprachen DE/EN statisch, FR/IT clientseitig.
Maßgebliche Live-URL: https://face-art-zuerich.ch (Netlify, Custom Domain via Infomaniak)

# Technischer Stack
- Vanilla **HTML5 + CSS3 + JavaScript (ES6+)**. Kein Build, kein Framework, keine Paketverwaltung (keine `package.json`).
- Struktur: HTML im Repo-Root · `src/css/main.css` · `src/js/main.js` · `src/js/i18n.js` · Bilder in `src/images/`.
- Einzige externe Laufzeit-Abhängigkeit: **Google Fonts** (`fonts.googleapis.com`, per `preload`). Bewusst akzeptiert — keine weiteren CDNs/Widgets/Tracking hinzufügen.
- Formulare: **Formspree** (`myklqzbr`, öffentliche Form-ID). Kein eigenes Backend.

# Architektur und Konventionen
- Semantisches HTML5 (`header/nav/main/section/article/footer`), genau **ein `<h1>` pro Seite**, saubere Überschriftenhierarchie.
- CSS: **BEM** + CSS-Custom-Properties-Designsystem in `main.css` (`--sp-*`, `--font-*`, `--text` …). Bestehende Variablen/Muster wiederverwenden, kein Parallel-System.
- JS: moderne ES6+-Syntax, bestehende Muster aus `main.js`/`i18n.js` fortführen (IIFE-Struktur).
- Mobile-first responsive; keine festen Pixelbreiten ohne Breakpoint.
- Nur ändern, was die Aufgabe erfordert. Keine ungefragten Refactorings/Dependency-Änderungen. Ungenutzten Code nur im Aufgaben-Scope entfernen.

# i18n und Inhalte
- Logik in `src/js/i18n.js` (`I18n`-Modul). Übersetzungen unter `T.en` / `T.fr` / `T.it`, je mit `nav`, `footer` und pro Seite `T.<lang>.<seite>.<key>` — **keine falsche Verschachtelung**. Die Basissprache einer Seite steht im HTML (DOM-Cache) und wird über `data-base-lang` am `<html>`-Element deklariert; kein `T.de`.
- Sichtbare Texte in mehrsprachigen Bereichen brauchen `data-i18n` / `data-i18n-html` / `data-i18n-placeholder`; kein verwaister DE-Text ohne Attribut.
- JS-generierte Statustexte (Formular) über `I18n.msg('key')` + `UI`-Map in `i18n.js` — nicht hartcodieren. Interne E-Mail-Felder (`_subject`, `labelMap`) bleiben DE.
- `i18n.js` **vor** `main.js` einbinden (alle Seiten).
- Neuer `data-i18n`-Key ⇒ Wert in **allen** Sprachen (EN/FR/IT) ergänzen; DE aus dem HTML.
- **Ausnahme von der `data-i18n`-Pflicht:** reine Eigennamenlisten (z. B. die Ortsnamen im Einzugsgebiet auf `kontakt.html`) bleiben ohne Attribut — sie lauten in keiner Sprache anders.

# Zweisprachige Struktur DE/EN
- DE liegt im Root, EN unter `/en/`. Beide sind **statische, vollständige HTML-Dateien**.
- **Jede inhaltliche Änderung muss in beiden Versionen erfolgen.** Es gibt kein Build-System,
  das das erzwingt. Ein Commit, der nur eine Sprache anfasst, ist unvollständig — ausser die
  Änderung ist ausdrücklich sprachspezifisch.
- FR und IT bleiben clientseitig über `i18n.js`, ohne eigene URLs und ohne SEO-Anspruch.
- Die Basissprache einer Seite steht in `data-base-lang` am `<html>`-Element. `i18n.js` liest
  dieses Attribut; „DE ist immer Default" gilt nicht mehr.
- Der Sprachumschalter behandelt DE/EN als echte Navigation zwischen den beiden statischen
  Versionen, FR/IT als clientseitigen Texttausch. Die URL gewinnt immer über den in
  `localStorage` gespeicherten Wert. **Keine** automatische Auswertung von `navigator.language`.
- EN-Seiten nutzen **verzeichnisrelative** Pfade (`../src/…`, `../impressum`, Geschwisterseiten
  ohne Präfix). **Keine root-absoluten Pfade** (`/src/…`) — die setzen voraus, dass die Site auf
  der Domainwurzel liegt, und brechen im GitHub-Pages-Unterverzeichnis. `../` trifft in beiden
  Umgebungen. Dasselbe gilt für die deutschen Seiten (`./`, nicht `/`).
- Texte ausserhalb des `data-i18n`-Systems (`alt`, `aria-label`, Galerie-Labels) müssen in den
  `/en/`-Dateien ebenfalls englisch sein.
- hreflang: jede DE-Seite und ihre EN-Entsprechung verweisen wechselseitig aufeinander.
  Neue Seiten brauchen beide Richtungen plus Sitemap-Eintrag.
- Impressum und Datenschutz sind bewusst einsprachig deutsch, ohne hreflang.

# Design, UX und Accessibility
- Eigenständiges, hochwertiges Design (Modern & Elegant; Mint `#68A9A0` + Creme `#FAFAF8`; Cormorant Garamond / Inter). Keine generischen AI-Ästhetiken.
- Vor **echten Designentscheidungen** (Layout, neue Komponenten, visuelle Sprache): `frontend-design`-Skill nutzen (falls verfügbar); bei offenen Gestaltungsfragen per `AskUserQuestion` rückfragen. Reine Bug-/Performance-/Textänderungen brauchen das nicht.
- Accessibility: aussagekräftige `alt`-Texte, Fokusierbarkeit, `aria` wo sinnvoll, ausreichende Kontraste.
- **WhatsApp:** einziger Einstieg ist der Floating-Button `.wa-float` (auf jeder Seite). **Kein** `btn--whatsapp` und keine zusätzlichen Inline-WhatsApp-CTAs in Hero/CTA.

# Arbeitsablauf
- Kleine, **atomare Commits** — ein Thema pro Commit, Messages auf Deutsch im bestehenden Stil.
- Nach jedem abgeschlossenen, geprüften Arbeitspaket: `git push origin main`, danach Live-URL mitteilen — **nicht nach jedem einzelnen Commit**, und der Deploy erfolgt manuell (siehe Abschnitt Netlify).
- Deutsch antworten und dokumentieren, sofern nicht anders gewünscht.
- Reale Repo-Fakten und verfügbare Tools zuerst prüfen; nichts erfinden (Dateien, Befehle, Skills, Ergebnisse).

# Verifikation und QA
- Nach jeder Änderung: `bash scripts/qa.sh`. Prüft `.wa-float` auf allen 14 Seiten, kein `btn--whatsapp`, `i18n.js` vor `main.js`, JSON-LD-Parsing (`python3`), JS-Syntax von `i18n.js`/`main.js`.
- Kein node/npm/lint/test vorhanden — nicht so tun als ob. JS-Syntax nur via `osascript -l JavaScript <datei>` (SyntaxError = Fehler; ReferenceError `document` = Syntax OK).
- Bei i18n-/Inhaltsänderungen zusätzlich manuell: jeder verwendete `data-i18n`-Key hat in EN/FR/IT einen Wert.
- Ausgabe nach QA:
  - `QA ✅ — <geprüft> — alle Grundfunktionen OK`
  - `QA ❌ — <Fehler> — wird vor dem Commit behoben`
- „QA bestanden" / „Live aktualisiert" nur melden, wenn tatsächlich geprüft.

# Performance
- Below-the-fold-Bilder: `loading="lazy"`; erstes Hero-Bild eager mit `fetchpriority="high"`.
- Alle `<img>` mit `width`/`height` (kein Layout-Shift).
- Bilder komprimieren: `sips -Z 1600 -s formatOptions 80` (JPEG); Ziel möglichst < 300 KB, nur ersetzen wenn kleiner als Original.
- Fotos ohne Transparenz nicht als PNG. Für WebP portables `cwebp` nutzen (kein brew auf diesem Mac): `<picture><source type="image/webp">` + Original als Fallback; Transparenz mit `webpinfo` prüfen.
- Keine zusätzlichen externen Ressourcen/Fonts/Skripte ohne Freigabe.
- Bandbreite kostet auf Netlify direkt Credits (20 Credits/GB). Bildoptimierung senkt also nicht
  nur die Ladezeit, sondern auch den monatlichen Verbrauch.

# Security und Privacy
- Keine Secrets/Tokens/Passwörter in getrackte Dateien. Kein PAT in der Git-Remote-URL — Credential-Helper oder SSH bevorzugen.
- Lokale/persönliche Daten, lokale URLs, Testdaten, Zugangsdaten nur in `CLAUDE.local.md` oder `.claude/settings.local.json` — beide via `.gitignore` geschützt und **nie committen**.
- Kein Tracking/Analytics/Fingerprinting einführen.
- Formulareingaben nie ungeprüft ins DOM schreiben.

# Git, Release und Netlify
- Branch `main`, Remote `origin`. Deployment = **Netlify**. Kein Build-Schritt, kein `.github/`,
  keine Actions.
- **Automatisches Deployment ist abgeschaltet.** Ein Push auf `main` veröffentlicht nichts.
  Der Deploy wird manuell in der Netlify-UI ausgelöst (Deploys → Trigger deploy → Deploy site).
  Nach einem Push daher **nie** „live aktualisiert" melden, sondern auf den manuellen
  Deploy-Schritt hinweisen.
- **Abrechnung (Netlify Free, Credit-Modell): 300 Credits/Monat.**
  Ein Produktions-Deploy kostet 15 Credits — ca. 20 Deploys/Monat, abzüglich Bandbreite
  (20 Credits/GB) und Web-Requests (2 Credits/10.000). Deploy Previews, Branch-Deploys,
  fehlgeschlagene Deploys und Rollbacks kosten 0 Credits. Bei erschöpftem Kontingent geht die
  Seite bis zum Monatsersten offline — keine Drosselung, keine Kulanzfrist.
- **Push-Strategie:** Netlify baut pro Push, nicht pro Commit. Weiterhin kleine, atomare Commits —
  aber erst nach einem vollständig abgeschlossenen und geprüften Arbeitspaket einmal
  `git push origin main`. Fünf Commits in einem Push = ein Deploy.
- Für Zwischenstände: Feature-Branch nutzen. Branch-Deploys und Previews sind kostenlos.
- Änderungen ohne Auswirkung auf die Live-Site (`CLAUDE.md`, README, Testpläne):
  `[skip netlify]` in die Commit-Message.
- Custom Domain `face-art-zuerich.ch` ist aktiv (A-Record auf Netlify-Loadbalancer, CNAME für
  `www`, DNS bei Infomaniak). E-Mail bleibt bei GMX, von DNS-Änderungen nicht betroffen.
- `_redirects` liegt im Netlify-Format vor und ist massgeblich für Clean URLs.

# Sicherheits- und Scope-Grenzen
- Keine neuen Frameworks/Libraries/Build-Tools/Dependencies ohne dokumentierten Nutzen und Freigabe.
- Keine großflächigen Refactorings, Architekturwechsel oder BEM-Umstellungen ohne Auftrag.
- Nichts löschen/überschreiben, das nicht zur Aufgabe gehört; vor dem Löschen prüfen.
- Bei Unsicherheit: Fakten prüfen, Annahmen markieren, bei entscheidungsrelevanten Punkten nachfragen.

# Projektspezifische Hinweise
- Referenzdokumente: `SEO-Copywriting-Report.md`, `SEO-Copywriting-Report-v2.md`.
- `pages/` und `public/` sind leer/ungenutzt.
- Ungenutzte Bilddateien in `src/images/gallery/` (z. B. `7-einhorn.png`, `8-krone.png`, `IMG_2817.PNG`) sind von keiner Seite referenziert — nur auf ausdrücklichen Wunsch aufräumen.
- Kontakt- und Newsletter-Formular haben einen Honeypot (`_gotcha`).
