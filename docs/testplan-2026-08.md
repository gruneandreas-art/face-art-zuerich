# Testplan — Arbeitspaket August 2026

Stand: 25. August 2026 · Basis: Commit `19e80eb` (Zustand davor)

Dieser Plan ist für die manuelle Abnahme **nach dem Deploy**. Der Deploy wird nicht
automatisch ausgelöst — er muss in der Netlify-UI gestartet werden:
**Deploys → Trigger deploy → Deploy site**, danach ca. 30–60 Sekunden warten.

Live-URL: https://face-art-zuerich.ch

Jeder Prüfpunkt nennt den verursachenden Commit. Geht etwas schief, lässt sich genau
dieser eine Commit zurücknehmen, ohne die übrigen anzufassen.

---

## a) Commit-Übersicht

| Nr. | Hash | Thema | Geänderte Dateien | Rückgängig |
|---|---|---|---|---|
| 1 | `d3a96e3` | CLAUDE.md auf Netlify-Deployment und Credit-Budget aktualisiert | `CLAUDE.md` | `git revert d3a96e3` |
| 2 | `0ef6afa` | D.1 — erstes Inhaltsbild auf kinderschminken/hochzeiten eager | `kinderschminken.html`, `hochzeiten.html` | `git revert 0ef6afa` |
| 3 | `482af3e` | Rundes Portraitfoto aus der Hero-Sektion von about entfernt | `about.html`, `src/css/main.css` | `git revert 482af3e` |
| 4 | `ef3d3df` | D.3 — Impressum und Datenschutzerklärung | `impressum.html`, `datenschutz.html`, alle 6 bestehenden Seiten (Footer), `src/css/main.css`, `src/js/i18n.js`, `sitemap.xml`, `_redirects`, `scripts/qa.sh` | `git revert ef3d3df` |
| 5 | `1312ada` | D.7 — schlanker JS-Fehlerreporter | alle 8 Seiten (`<head>`), `scripts/qa.sh` | `git revert 1312ada` |
| 6 | `e5e1219` | D.8 — Bildkompression, PNG → JPEG, Bildmasse korrigiert | `index.html`, `hochzeiten.html`, `about.html`, 13 Bilddateien, 1 neue JPEG-Datei | `git revert e5e1219` |
| 7 | *(dieser Commit)* | Testplan | `docs/testplan-2026-08.md` | — |

**Hinweis:** Commit 3 des ursprünglichen Arbeitspakets (D.2, `alt`-Texte und Bildmasse
für `unternehmen.html`) entfällt — die drei Bilder hatten bereits vollständige
`alt`-, `width`- und `height`-Angaben, und die Masse stimmten exakt mit den Dateien
überein. Es gab nichts zu ändern, deshalb wurde kein leerer Commit angelegt.

---

## b) Manuelle Testcheckliste

### Startseite (`/`)

| Prüfen | Erwartet | Commit |
|---|---|---|
| Seite laden, auf das erste grosse Bild achten | Hero-Bild (Schmetterling) ist sofort da, kein sichtbares Nachladen | vorher schon so |
| Schmetterling-Bild genau ansehen | **Nicht verzerrt.** Vorher war das Seitenverhältnis falsch hinterlegt (956×1195 statt 900×1200) — das Bild war leicht gestaucht | `e5e1219` |
| Bildqualität des Schmetterlings | Sauber, keine sichtbaren JPEG-Artefakte. Die Datei ist von 1,75 MB auf 187 KB geschrumpft | `e5e1219` |
| Auf dem Handy laden (Mobilnetz, nicht WLAN) | Spürbar schneller als vorher | `e5e1219` |
| Langsam nach unten scrollen | Alle Galeriebilder laden nach, nichts bleibt grau | vorher schon so |
| Beim Scrollen auf Sprünge achten | Kein Springen des Layouts, wenn ein Bild fertig lädt | `e5e1219` |

### `kinderschminken` und `hochzeiten`

| Prüfen | Erwartet | Commit |
|---|---|---|
| Seite laden, direkt unter den Hero-Text schauen | Das erste Galeriebild ist sofort da und lädt nicht erst beim Scrollen | `0ef6afa` |
| Weiter scrollen | Die übrigen Bilder laden erst beim Scrollen (unverändert) | `0ef6afa` |
| Bildqualität nach der Kompression | Auf beiden Seiten unverändert gut | `e5e1219` |
| Auf Bildproportionen achten (hochzeiten) | Drei Bilder hatten veraltete Masse hinterlegt, jetzt korrekt — nichts wirkt gestaucht | `e5e1219` |

> **Hinweis zum Erwartungswert:** Die Hero-Sektionen dieser beiden Seiten enthalten
> gar kein Bild — der Hintergrund ist ein reiner CSS-Farbverlauf. Betroffen ist das
> erste Inhaltsbild direkt unterhalb des Heros.

### `unternehmen`

| Prüfen | Erwartet | Commit |
|---|---|---|
| Die drei Bilder im Abschnitt „Beweis in Aktion" | Korrekte Proportionen, kein Layout-Sprung beim Laden | war bereits korrekt |

### `about`

| Prüfen | Erwartet | Commit |
|---|---|---|
| Hero-Sektion oben | Das kleine **runde Portrait ist weg** | `482af3e` |
| Weiter unten im Abschnitt „Über mich" | Das **grosse Portrait ist unverändert da** | `482af3e` |
| Auf dem Handy prüfen | Hero sieht ohne das runde Bild sauber aus, kein Loch im Layout | `482af3e` |
| Bilder im unteren Bereich | Zwei Bilder hatten stark veraltete Masse (z. B. 5120×3840 statt 1600×1200), jetzt korrekt | `e5e1219` |

### Footer — auf **allen 8 Seiten**

| Prüfen | Erwartet | Commit |
|---|---|---|
| Ganz nach unten scrollen | Unter der Copyright-Zeile stehen „Impressum" und „Datenschutz" | `ef3d3df` |
| Optischer Eindruck | Dezent, gleiche Grösse wie die übrigen Footer-Angaben, nicht aufdringlich | `ef3d3df` |
| Beide Links anklicken | Führen auf die jeweilige Seite | `ef3d3df` |
| Sprache auf EN umschalten, Footer ansehen | „Legal notice" / „Privacy policy" | `ef3d3df` |
| Sprache auf FR umschalten | „Mentions légales" / „Politique de confidentialité" | `ef3d3df` |
| Sprache auf IT umschalten | „Note legali" / „Informativa sulla privacy" | `ef3d3df` |

### Impressum und Datenschutz

| Prüfen | Erwartet | Commit |
|---|---|---|
| `/impressum` und `/datenschutz` aufrufen | Seiten laden, Design passt zum Rest der Site | `ef3d3df` |
| Clean URL testen | `/impressum` funktioniert **ohne** `.html` | `ef3d3df` |
| `/impressum.html` aufrufen | Leitet per 301 auf `/impressum` um | `ef3d3df` |
| Navigation oben ansehen | **Unverändert** — kein neuer Menüpunkt | `ef3d3df` |
| WhatsApp-Button | Auf beiden Seiten unten rechts vorhanden | `ef3d3df` |
| Sprache umschalten | Kopf und Footer werden übersetzt, der **Fliesstext bleibt Deutsch**; der Hinweis „Diese Seite liegt nur auf Deutsch vor." ist sichtbar | `ef3d3df` |
| **Alle `[[BITTE PRÜFEN]]`-Stellen durchgehen** | Siehe Liste unter „Offene Punkte" — diese Angaben müssen vor dem Live-Gang ersetzt werden | `ef3d3df` |
| Auf dem Handy prüfen | Text gut lesbar, Zeilenlänge angenehm | `ef3d3df` |

### Kontaktformular

| Prüfen | Erwartet | Commit |
|---|---|---|
| Testanfrage an sich selbst absenden | Erfolgsmeldung erscheint | Regression zu `1312ada` |
| Postfach prüfen | E-Mail kommt an | Regression zu `1312ada` |
| Sprache auf EN umschalten, dann absenden | Formular funktioniert weiterhin, Statusmeldungen auf Englisch | Regression zu `1312ada` |
| Newsletter-Anmeldung testen | Funktioniert unverändert | Regression zu `1312ada` |

### Fehlerreporter

| Prüfen | Erwartet | Commit |
|---|---|---|
| Browser-Konsole öffnen, `throw new Error("test")` ausführen | Genau **eine** Fehlermeldung geht per Formspree raus | `1312ada` |
| Denselben Befehl nochmals ausführen | **Keine** zweite Meldung | `1312ada` |
| Seite neu laden, Befehl erneut ausführen | **Keine** zweite Meldung in derselben Browser-Sitzung | `1312ada` |
| Browser komplett schliessen, neu öffnen, Befehl ausführen | Jetzt kommt wieder eine Meldung (neue Sitzung) | `1312ada` |
| Inhalt der Fehler-E-Mail prüfen | Enthält nur Fehlertext, Datei, Position, Seiten-URL, Browserkennung — **keine** Formular- oder Personendaten | `1312ada` |

> ⚠️ **Wichtig beim Testen:** Jede ausgelöste Testmeldung verbraucht eine der
> 50 Formspree-Einreichungen pro Monat — dasselbe Kontingent wie das Kontaktformular.
> Bitte sparsam testen und danach den Kontingentstand prüfen.

### Mobil — Abschlussrunde

Alle 8 Seiten auf dem Handy durchklicken, besonders:

- `about` — Hero ohne das runde Portrait
- `impressum` und `datenschutz` — neu, noch nie mobil gesehen
- Startseite — Ladezeit im Mobilnetz

---

## c) Offene Punkte

### `[[BITTE PRÜFEN]]`-Stellen in den Rechtstexten

**`impressum.html`:**

1. Vollständiger Name der verantwortlichen Person
2. Rechtsform (z. B. Einzelfirma)
3. Hausnummer zur Glärnischstrasse — im Repo steht nur der Strassenname ohne Nummer
4. Massgebliche E-Mail-Adresse (siehe unten)
5. UID/MWST-Nummer, falls vorhanden — andernfalls den ganzen Abschnitt
   „Handelsregister und Mehrwertsteuer" ersatzlos streichen

**`datenschutz.html`:**

6. Vollständiger Name der verantwortlichen Person
7. Hausnummer zur Glärnischstrasse

### Ergebnis der drei Grep-Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `faceartzuerich` als **Domain** | **Keine Treffer.** Canonicals, OG-Tags, `sitemap.xml` und `robots.txt` zeigen konsistent auf `https://face-art-zuerich.ch/`. Der Absatz „Bekannte Inkonsistenz" war in `CLAUDE.md` bereits nicht mehr vorhanden — es gab nichts zu entfernen. |
| `hero__portrait` | Vorher 4 Treffer (1× `about.html`, 3× `main.css`). Alle entfernt, jetzt 0 Treffer. Die Mobile-Media-Query enthält weiterhin andere Regeln und blieb bestehen. |
| `isa-portrait` | 3 Treffer. `about.html:95` (Hero) wurde entfernt; `about.html` (grosses Portrait im Two-Col-Layout) und `index.html` (`isa-portrait-card.jpg`) sind unverändert. **Die Datei `src/images/isa-portrait.jpg` wurde nicht gelöscht** und wird weiterhin verwendet. |

### Gefundene E-Mail-Adressen im Repo

Im gesamten Repo steht **ausschliesslich `faceartzuerich@yahoo.com`** — an 10 Stellen:
`index.html` (JSON-LD + 2× Footer/Kontakt), `kontakt.html` (JSON-LD + 2×),
`kinderschminken.html`, `hochzeiten.html`, `unternehmen.html`, `about.html`.

**Eine GMX-Adresse kommt im Repo nirgends vor.** Die weiteren Treffer sind reine
Platzhalter in Formularen und Übersetzungen (`deine@email.ch`, `maria@beispiel.ch`,
`maria@example.com`, `marie@exemple.fr`, `maria@esempio.it`).

Wie im Arbeitspaket festgelegt wurde **nichts geändert** — die Konsolidierung ist
eine eigene Aufgabe (Audit-Punkt 16). Im Impressum und in der Datenschutzerklärung
steht vorerst die Yahoo-Adresse, mit einem `[[BITTE PRÜFEN]]`-Vermerk.

### Ungenutzte Bilddateien

`src/images/` enthält **103** Bilddateien, davon sind **35 referenziert** und
**68 nicht referenziert** — zusammen **72,6 MB** (deutlich mehr als die im Audit
genannten 21 MB).

Die grössten ungenutzten Dateien:

| Grösse | Datei |
|---|---|
| 8,9 MB | `src/images/gallery/7-einhorn.png` |
| 6,9 MB | `src/images/gallery/8-krone.png` |
| 6,1 MB | `src/images/gallery/Kinder/IMG_2817.PNG` |
| 5,4 MB | `src/images/gallery/Events/Illuster/Kinderschminken illuster Samichlaus.png` |
| 5,4 MB | `src/images/gallery/Events/Illuster/collage.png` |
| 4,3 MB | `src/images/gallery/Events/Pony hof /2025-11-08a Pony Party-1111.jpg` |
| 3,2 MB | `src/images/gallery/Events/Illuster/Stand Samichlaus illuster.jpeg` |
| 2,5 MB | `src/images/gallery/Butterfly.png` |
| 2,1 MB | `src/images/gallery/otj6.png` |
| 2,1 MB | `src/images/gallery/Hochzeit/IMG_2903_edited.png` |
| 2,1 MB | `src/images/gallery/Über mich /IMG_2903_edited.png` |
| 1,75 MB | `src/images/gallery/Start/schmetterling-face-art-kinderschminken-zuerich.png` |
| 1,6 MB | `src/images/gallery/Kopie von Otj 2.png` |

Nur aufgelistet, **nichts gelöscht** — das ist eine eigene Entscheidung.

Zwei Anmerkungen dazu:

- Die letzte Zeile (`…schmetterling….png`) ist **neu** ungenutzt: Sie wurde in
  Commit `e5e1219` durch die JPEG-Variante ersetzt. Die Datei wurde bewusst
  im Repo belassen.
- Ungenutzte Dateien kosten **keine** Netlify-Bandbreite, da sie nie ausgeliefert
  werden. Sie blähen nur das Repo und den Deploy-Upload auf.

### Formspree: zweite Form-ID für Fehlerberichte

**Noch nicht angelegt.** Der Reporter nutzt vorerst die bestehende ID `myklqzbr`,
mit einem `// TODO`-Kommentar im Code auf allen 8 Seiten.

Das ist die empfohlene Änderung: Fehlerberichte und Kundenanfragen teilen sich
sonst dasselbe Kontingent von 50 Einreichungen pro Monat. Die Schutzmassnahmen
(max. eine Meldung pro Browser-Sitzung, Dedup identischer Meldungen) begrenzen das
Risiko, beseitigen es aber nicht — bei vielen Besuchern mit demselben Fehler kann
das Kontingent trotzdem volllaufen und dann **das Kontaktformular blockieren**.

### Bildgewicht vorher/nachher

| Seite | vorher | nachher | mit WebP-Fallback | Delta |
|---|---|---|---|---|
| Startseite | 4,00 MB | 2,39 MB | **2,27 MB** | −1,61 MB |
| kinderschminken | 2,21 MB | 2,19 MB | 2,19 MB | −0,02 MB |
| hochzeiten | 1,09 MB | 1,09 MB | 1,09 MB | ±0 |
| unternehmen | 0,68 MB | 0,68 MB | 0,68 MB | ±0 |
| about | 3,63 MB | 3,62 MB | 3,62 MB | −0,01 MB |
| kontakt | 0 | 0 | 0 | ±0 |
| impressum | 0 | 0 | 0 | ±0 |
| datenschutz | 0 | 0 | 0 | ±0 |
| **Summe** | **11,61 MB** | **9,98 MB** | **9,86 MB** | **−1,63 MB** |

**Der Zielwert „Startseite unter 1,2 MB" wurde nicht erreicht** (erreicht: 2,27 MB).

Gründe und was dafür nötig wäre:

- **`cwebp` ist auf diesem Rechner nicht vorhanden.** Weder im `PATH` noch als
  portables Binary auffindbar, obwohl `CLAUDE.local.md` eines erwähnt. Weitere
  WebP-Varianten liessen sich deshalb nicht erzeugen. Das ist der grösste
  ungenutzte Hebel — WebP spart bei diesen Motiven typischerweise 25–35 %.
- **Die JPEGs waren bereits gut komprimiert.** Ein erneuter Durchlauf mit
  Qualität 80 brachte über alle 33 referenzierten JPEGs zusammen nur **29 KB**.
  Bei 20 von 33 Dateien war das Ergebnis grösser als das Original und wurde
  verworfen.
- Um die Startseite unter 1,2 MB zu bringen, bliebe: die längste Kante von 1600
  auf ca. 1200 px reduzieren, oder weniger Bilder oberhalb des Folds zeigen.
  Beides sind sichtbare Qualitäts- bzw. Gestaltungsentscheidungen und wurden
  deshalb nicht eigenmächtig umgesetzt.

### Zwei Abweichungen vom Arbeitspaket (bewusst, zur Kenntnis)

1. **D.2 entfiel.** Die drei Bilder in `unternehmen.html` hatten bereits
   vollständige `alt`-Texte sowie `width`/`height`, die exakt den Dateimassen
   entsprachen (960×834, 1223×1286, 1196×969). Es gab nichts zu tun.
2. **D.1 betrifft kein Hero-Bild.** Die Hero-Sektionen von `kinderschminken.html`
   und `hochzeiten.html` enthalten kein `<img>` — der Hintergrund ist ein reiner
   CSS-Farbverlauf. Geändert wurde daher das erste Inhaltsbild direkt unterhalb
   des Heros, das bei 65 vh Hero-Höhe im Erstviewport sichtbar ist.

Zusätzlich wurden zwei Dinge angepasst, die ausserhalb der reinen Aufgabenliste
lagen, aber direkt durch sie verursacht wurden:

- **`scripts/qa.sh`**: Die Prüfung der Script-Reihenfolge matchte auf beliebige
  Vorkommen von `i18n.js` bzw. `js/main.js` — auch in Kommentaren. Sie matcht
  jetzt auf das echte `<script src="…">`-Tag. Ausserdem prüft `qa.sh` neu die
  Syntax des Inline-Fehlerreporters auf allen 8 Seiten.
- **Falsche `width`/`height`-Angaben**: 8 Bilder trugen veraltete Masse. Bei
  sieben stimmte immerhin das Seitenverhältnis, beim Schmetterling auf der
  Startseite nicht — das Bild wurde verzerrt dargestellt.

---

## d) Monitoring einrichten (kein Code — Handarbeit)

- [ ] **UptimeRobot** (kostenloser Plan), Monitor auf `https://face-art-zuerich.ch`,
      Intervall 5 Minuten, E-Mail-Alarm. Zusätzlich die Zertifikatsüberwachung
      aktivieren. → ca. 15 Minuten Einrichtungszeit.
- [ ] **Zweiter Monitor** auf `https://face-art-zuerich.ch/kontakt` — fängt den Fall
      ab, dass die Startseite lädt, eine Unterseite aber nicht.
- [ ] **Wiederkehrender Kalendereintrag, monatlich:** eine echte Testanfrage über das
      Kontaktformular an sich selbst senden und prüfen, ob die E-Mail ankommt.
      Kostenlos, unelegant, wirksam.
- [ ] **Formspree-Einstellungen prüfen:** im Workflow-Tab kontrollieren, dass die
      Zustellbenachrichtigung auf die richtige Adresse geht — laut früheren Notizen
      lag dort schon einmal das Problem. Ausserdem den aktuellen Kontingentstand
      notieren.
