#!/usr/bin/env bash
# Deterministische QA-Checks für Face Art Zürich (kein node nötig; macOS).
# Nutzung: bash scripts/qa.sh
set -u
cd "$(dirname "$0")/.." || exit 1

fail=0
de_pages=(index kinderschminken hochzeiten unternehmen about kontakt impressum datenschutz)
en_pages=(en/index en/kinderschminken en/hochzeiten en/unternehmen en/about en/kontakt)
pages=("${de_pages[@]}" "${en_pages[@]}")

echo "== WhatsApp =="
for p in "${pages[@]}"; do
  if [ "$(grep -c 'wa-float' "$p.html")" -ge 1 ]; then echo "  ✓ $p: .wa-float"; else echo "  ✗ $p: .wa-float FEHLT"; fail=1; fi
done
if [ "$(grep -rl 'btn--whatsapp' ./*.html ./en/*.html 2>/dev/null | wc -l | tr -d ' ')" = 0 ]; then
  echo "  ✓ kein btn--whatsapp"; else echo "  ✗ btn--whatsapp gefunden"; fail=1; fi

echo "== Script-Reihenfolge (i18n.js vor main.js) =="
# Bewusst auf das echte <script src="…">-Tag gematcht, nicht auf beliebige
# Vorkommen der Dateinamen — sonst zaehlen auch Kommentartexte als Treffer.
# Die EN-Seiten nutzen ../-Pfade, daher .* vor js/.
for p in "${pages[@]}"; do
  i=$(grep -n '<script src=".*js/i18n.js"' "$p.html" | head -1 | cut -d: -f1)
  m=$(grep -n '<script src=".*js/main.js"' "$p.html" | head -1 | cut -d: -f1)
  if [ -n "$i" ] && [ -n "$m" ] && [ "$i" -lt "$m" ]; then echo "  ✓ $p"; else echo "  ✗ $p: i18n.js nicht vor main.js"; fail=1; fi
done

echo "== Basissprache (data-base-lang) =="
for p in "${de_pages[@]}"; do
  if grep -q '<html lang="de" data-base-lang="de">' "$p.html"; then echo "  ✓ $p: de"; else echo "  ✗ $p: html-Element ohne lang=de/data-base-lang=de"; fail=1; fi
done
for p in "${en_pages[@]}"; do
  if grep -q '<html lang="en" data-base-lang="en">' "$p.html"; then echo "  ✓ $p: en"; else echo "  ✗ $p: html-Element ohne lang=en/data-base-lang=en"; fail=1; fi
done

echo "== EN-Seiten: keine root-absoluten Pfade =="
# /src/... setzt voraus, dass die Site auf der Domainwurzel liegt. Im
# GitHub-Pages-Unterverzeichnis zeigt das ins Leere — daher ../src/...
for p in "${en_pages[@]}"; do
  if grep -qE '(src|href|srcset)="/[^/]' "$p.html"; then
    echo "  ✗ $p: root-absoluter Pfad"; fail=1
  elif grep -qE '(src|href|srcset)="src/' "$p.html"; then
    echo "  ✗ $p: Pfad ohne ../ (bricht unter /en/)"; fail=1
  else echo "  ✓ $p"; fi
done

echo "== hreflang wechselseitig =="
if ! python3 - <<'PY'
import re, sys
SITE = "https://face-art-zuerich.ch"
PAIRS = ["", "kinderschminken", "hochzeiten", "unternehmen", "kontakt", "about"]
DE_ONLY = ["impressum", "datenschutz"]
bad = 0
for slug in PAIRS:
    want = {("de-CH", SITE + "/" + slug),
            ("en", SITE + "/en/" + slug),
            ("x-default", SITE + "/" + slug)}
    for f in ((slug or "index") + ".html", "en/" + (slug or "index") + ".html"):
        got = set(re.findall(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">',
                             open(f, encoding="utf-8").read()))
        if got != want:
            print(f"  ✗ {f}: unvollstaendig oder falsch"); bad = 1
        else:
            print(f"  ✓ {f}")
for slug in DE_ONLY:
    f = slug + ".html"
    if "hreflang=" in open(f, encoding="utf-8").read():
        print(f"  ✗ {f}: hreflang auf einsprachiger Seite"); bad = 1
    else:
        print(f"  ✓ {f}: kein hreflang (einsprachig)")
sys.exit(bad)
PY
then fail=1; fi

echo "== JSON-LD parst =="
if ! python3 - <<'PY'
import re, json, glob, sys
bad = 0
for f in sorted(glob.glob("*.html")) + sorted(glob.glob("en/*.html")):
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>',
                        open(f, encoding="utf-8").read(), re.S):
        try:
            json.loads(b)
        except Exception as e:
            print(f"  ✗ {f}: {e}"); bad = 1
if not bad:
    print("  ✓ alle JSON-LD-Blöcke valide")
sys.exit(bad)
PY
then fail=1; fi

echo "== areaServed identisch =="
if ! python3 - <<'PY'
import re, json, sys
TARGET = ["Zürich","Dübendorf","Wallisellen","Opfikon","Kloten","Regensdorf",
          "Volketswil","Uster","Wetzikon","Küsnacht","Rapperswil","Winterthur"]
def walk(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if k == "areaServed": yield v
            yield from walk(v)
    elif isinstance(o, list):
        for x in o: yield from walk(x)
bad = 0
for base in ("", "en/"):
    for p in ("index", "kinderschminken", "hochzeiten", "unternehmen", "kontakt"):
        f = base + p + ".html"
        found = []
        for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>',
                            open(f, encoding="utf-8").read(), re.S):
            found += list(walk(json.loads(b)))
        names = [c["name"] for c in found[0]] if len(found) == 1 and isinstance(found[0], list) else None
        if names != TARGET:
            print(f"  ✗ {f}: {names}"); bad = 1
        else:
            print(f"  ✓ {f}")
sys.exit(bad)
PY
then fail=1; fi

echo "== JS-Syntax (JavaScriptCore, kein node) =="
for jf in src/js/i18n.js src/js/main.js; do
  out=$(osascript -l JavaScript "$jf" 2>&1)
  if echo "$out" | grep -qi 'SyntaxError'; then echo "  ✗ $jf: SyntaxError"; fail=1; else echo "  ✓ $jf"; fi
done

echo "== JS-Syntax Inline-Fehlerreporter (<head>) =="
tmpdir="$(mktemp -d)"
tmpjs="$tmpdir/reporter.js"
for p in "${pages[@]}"; do
  sed -n '/^  <script>$/,/^  <\/script>$/p' "$p.html" | sed '1d;$d' > "$tmpjs"
  if [ ! -s "$tmpjs" ]; then
    echo "  ✗ $p: kein Inline-Fehlerreporter gefunden"; fail=1; continue
  fi
  out=$(osascript -l JavaScript "$tmpjs" 2>&1)
  if echo "$out" | grep -qi 'SyntaxError'; then echo "  ✗ $p: SyntaxError im Inline-Reporter"; fail=1; else echo "  ✓ $p"; fi
done
rm -rf "$tmpdir"

echo ""
if [ "$fail" = 0 ]; then echo "QA ✅ — alle Grundfunktionen OK"; else echo "QA ❌ — siehe ✗ oben"; fi
exit "$fail"
