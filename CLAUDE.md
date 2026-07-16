# Websiteerstellung

## Tech Stack
- Vanilla HTML5 + CSS3 + JavaScript (ES6+)
- No frameworks — clean, dependency-free code

## Design-Regeln
- Nutze das AskUserQuestion Tool, um den Nutzer über das Websitedesign zu interviewen, damit du die Vorstellungen des Nutzers genau abbilden kannst
- Nutze den frontend-design Skill für alle UI-Entscheidungen
- Nutze UI/UX Pro Max für Design-System-Generierung
- Nutze ggf. 21st.dev für Component-Inspiration (falls vorgegeben)
- Keine generischen AI-Aesthetics
- Bold, distinctive Design-Choices
- Performance-optimiert (Core Web Vitals)

## Code-Konventionen
- CSS: BEM-Namenskonvention für Klassen
- JS: Moderne ES6+ Syntax (const/let, arrow functions, modules)
- Semantisches HTML5 (header, main, section, article, footer)
- Mobile-first responsive Design

## Workflow-Regeln (Pflicht nach jeder Änderung)
- Kleine, atomare Git-Commits — ein Commit pro Thema/Feature
- Nach jedem Commit sofort pushen: `git push origin main`
- Nach jedem Push den Live-Link mitteilen: https://gruneandreas-art.github.io/face-art-zuerich/
- Vor jeder UI/Design-Änderung: `frontend-design` Skill laden + `AskUserQuestion` für Design-Entscheidungen

## QA-Pflicht (nach jeder Änderung zwingend durchführen)

### Grundfunktionalitäten prüfen
Nach jeder Änderung müssen folgende Punkte per Code-Analyse verifiziert werden:
- **WhatsApp**: Kein `btn--whatsapp` in Hero-/CTA-Bereichen; `.wa-float` auf jeder Seite vorhanden
- **i18n-Struktur**: `T.en`, `T.fr`, `T.it` haben jeweils `nav`, `footer` und alle Seiten-Keys direkt auf der obersten Ebene (`T.lang.pagename.key`) — keine falschen Verschachtelungen
- **Script-Reihenfolge**: `i18n.js` muss vor `main.js` eingebunden sein (auf allen Seiten)
- **data-i18n-Vollständigkeit**: Alle Inline-Texte in Hero, Features, CTAs, Preis, Schritte, Footer einer geänderten Seite haben `data-i18n`-Attribute
- **Keine verwaisten DE-Texte**: Kein sichtbares DE-Textelement ohne `data-i18n` in mehrsprachigen Bereichen

### Sprachversionen prüfen
- DE / EN / FR / IT je separat auf Korrektheit der Keys prüfen
- Prüfen ob `resolve(T[lang], key)` für jeden verwendeten `data-i18n`-Key einen Wert zurückgibt
- Falls ein Key in einer Sprache fehlt, gilt das als Fehler — vor dem Commit beheben

### Richtlinien-Abgleich
- BEM-Klassen eingehalten
- Mobile-first (keine festen Pixel-Breiten ohne Breakpoint)
- Kein generischer AI-Text eingefügt
- Keine neuen externen Dependencies eingeführt

### Ausgabe nach jedem QA-Durchlauf
Kurze Bestätigung im Format:
```
QA ✅ — [was geprüft wurde] — alle Grundfunktionen OK
```
oder bei Problemen:
```
QA ❌ — [Fehler] — wird vor dem Commit behoben
```
