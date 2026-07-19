#!/usr/bin/env bash
# Deterministische QA-Checks für Face Art Zürich (kein node nötig; macOS).
# Nutzung: bash scripts/qa.sh
set -u
cd "$(dirname "$0")/.." || exit 1

fail=0
pages=(index kinderschminken hochzeiten unternehmen about kontakt)

echo "== WhatsApp =="
for p in "${pages[@]}"; do
  if [ "$(grep -c 'wa-float' "$p.html")" -ge 1 ]; then echo "  ✓ $p: .wa-float"; else echo "  ✗ $p: .wa-float FEHLT"; fail=1; fi
done
if [ "$(grep -rl 'btn--whatsapp' ./*.html 2>/dev/null | wc -l | tr -d ' ')" = 0 ]; then
  echo "  ✓ kein btn--whatsapp"; else echo "  ✗ btn--whatsapp gefunden"; fail=1; fi

echo "== Script-Reihenfolge (i18n.js vor main.js) =="
for p in "${pages[@]}"; do
  i=$(grep -n 'i18n.js' "$p.html" | head -1 | cut -d: -f1)
  m=$(grep -n 'js/main.js' "$p.html" | head -1 | cut -d: -f1)
  if [ -n "$i" ] && [ -n "$m" ] && [ "$i" -lt "$m" ]; then echo "  ✓ $p"; else echo "  ✗ $p: i18n.js nicht vor main.js"; fail=1; fi
done

echo "== JSON-LD parst =="
if ! python3 - <<'PY'
import re, json, glob, sys
bad = 0
for f in sorted(glob.glob("*.html")):
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

echo "== JS-Syntax (JavaScriptCore, kein node) =="
for jf in src/js/i18n.js src/js/main.js; do
  out=$(osascript -l JavaScript "$jf" 2>&1)
  if echo "$out" | grep -qi 'SyntaxError'; then echo "  ✗ $jf: SyntaxError"; fail=1; else echo "  ✓ $jf"; fi
done

echo ""
if [ "$fail" = 0 ]; then echo "QA ✅ — alle Grundfunktionen OK"; else echo "QA ❌ — siehe ✗ oben"; fi
exit "$fail"
