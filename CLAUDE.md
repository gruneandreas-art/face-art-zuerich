# Projektüberblick
Statische, mehrsprachige Website für **Face Art Zürich** (Kinderschminken & Face Art von Isa, Dübendorf/Zürich). 6 Seiten: `index`, `kinderschminken`, `hochzeiten`, `unternehmen`, `about`, `kontakt`. Sprachen DE/EN/FR/IT.
Maßgebliche Live-URL (Produktionsdomain, über Netlify): https://face-art-zuerich.ch/
GitHub-Pages-Spiegel (immer aktuell zu `main`): https://gruneandreas-art.github.io/face-art-zuerich/

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
- Logik in `src/js/i18n.js` (`I18n`-Modul). Übersetzungen unter `T.en` / `T.fr` / `T.it`, je mit `nav`, `footer` und pro Seite `T.<lang>.<seite>.<key>` — **keine falsche Verschachtelung**. DE ist Default und bleibt im HTML (DOM-Cache), kein `T.de`.
- Sichtbare Texte in mehrsprachigen Bereichen brauchen `data-i18n` / `data-i18n-html` / `data-i18n-placeholder`; kein verwaister DE-Text ohne Attribut.
- JS-generierte Statustexte (Formular) über `I18n.msg('key')` + `UI`-Map in `i18n.js` — nicht hartcodieren. Interne E-Mail-Felder (`_subject`, `labelMap`) bleiben DE.
- `i18n.js` **vor** `main.js` einbinden (alle Seiten).
- Neuer `data-i18n`-Key ⇒ Wert in **allen** Sprachen (EN/FR/IT) ergänzen; DE aus dem HTML.

# Design, UX und Accessibility
- Eigenständiges, hochwertiges Design (Modern & Elegant; Mint `#68A9A0` + Creme `#FAFAF8`; Cormorant Garamond / Inter). Keine generischen AI-Ästhetiken.
- Vor **echten Designentscheidungen** (Layout, neue Komponenten, visuelle Sprache): `frontend-design`-Skill nutzen (falls verfügbar); bei offenen Gestaltungsfragen per `AskUserQuestion` rückfragen. Reine Bug-/Performance-/Textänderungen brauchen das nicht.
- Accessibility: aussagekräftige `alt`-Texte, Fokusierbarkeit, `aria` wo sinnvoll, ausreichende Kontraste.
- **WhatsApp:** einziger Einstieg ist der Floating-Button `.wa-float` (auf jeder Seite). **Kein** `btn--whatsapp` und keine zusätzlichen Inline-WhatsApp-CTAs in Hero/CTA.

# Arbeitsablauf
- Kleine, **atomare Commits** — ein Thema pro Commit, Messages auf Deutsch im bestehenden Stil.
- Nach jedem abgeschlossenen, geprüften Arbeitspaket: `git push origin main`, danach Live-URL mitteilen.
- Deutsch antworten und dokumentieren, sofern nicht anders gewünscht.
- Reale Repo-Fakten und verfügbare Tools zuerst prüfen; nichts erfinden (Dateien, Befehle, Skills, Ergebnisse).

# Verifikation und QA
- Nach jeder Änderung: `bash scripts/qa.sh`. Prüft `.wa-float` auf allen 6 Seiten, kein `btn--whatsapp`, `i18n.js` vor `main.js`, JSON-LD-Parsing (`python3`), JS-Syntax von `i18n.js`/`main.js`.
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

# Security und Privacy
- Keine Secrets/Tokens/Passwörter in getrackte Dateien. Kein PAT in der Git-Remote-URL — Credential-Helper oder SSH bevorzugen.
- Lokale/persönliche Daten, lokale URLs, Testdaten, Zugangsdaten nur in `CLAUDE.local.md` oder `.claude/settings.local.json` — beide via `.gitignore` geschützt und **nie committen**.
- Kein Tracking/Analytics/Fingerprinting einführen.
- Formulareingaben nie ungeprüft ins DOM schreiben.

# Git, Release und GitHub Pages
- Branch `main`, Remote `origin`. Zwei parallele Deployments aus `main`:
  - **GitHub Pages** (direkt aus `main`, kein `.github/`, keine Actions, kein Build) — Spiegel, baut nach Push ~1 Min neu.
  - **Netlify** (verbunden mit diesem Repo) — beliefert die Produktionsdomain `face-art-zuerich.ch`. Autobuild kann pausiert sein (Details/aktueller Stand in `CLAUDE.local.md`) — vor „Live aktualisiert"-Aussagen auf `face-art-zuerich.ch` immer separat verifizieren, nicht vom Pages-Spiegel ableiten.
- `_redirects` im Repo-Root steuert Netlify-seitige Redirects (z. B. `.html` → clean URL).

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
