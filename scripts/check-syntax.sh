#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

checked=0
failed=0

while IFS= read -r -d '' file; do
  if ! node --input-type=module --check < "$file"; then
    printf 'Syntax check failed: %s\n' "$file" >&2
    failed=$((failed + 1))
  fi
  checked=$((checked + 1))
done < <(find src/app -type f -name '*.js' -print0)

printf 'Syntax checked %s application JavaScript files; %s failed.\n' "$checked" "$failed"
[[ "$checked" -gt 0 && "$failed" -eq 0 ]]
