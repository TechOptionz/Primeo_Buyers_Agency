import glob
import re
import os

slots = {}
with open('lib/slots.ts', encoding='utf-8') as f:
    for line in f:
        m = re.search(r"([A-Z0-9_]+):\s*'([^']+)'", line)
        if m:
            slots[m.group(1)] = m.group(2)

print(f"Loaded {len(slots)} slots from lib/slots.ts\n")

files = glob.glob('app/**/*.tsx', recursive=True) + glob.glob('components/**/*.tsx', recursive=True)
all_slots_used = []
missing_files = []
unhandled_placeholders = []

for filepath in files:
    with open(filepath, encoding='utf-8') as f:
        content = f.read()

    # Slot calls
    slot_matches = re.findall(r'<Slot\s+id=[\"\'{]([^\s\"\'}]+)[\"\'}]', content)
    for s in slot_matches:
        all_slots_used.append((filepath, s))
        if s not in slots:
            unhandled_placeholders.append((filepath, f"Slot id={s} NOT IN slots.ts"))
        else:
            path = slots[s].lstrip('/')
            if not os.path.exists(os.path.join('public', path)):
                missing_files.append((filepath, s, slots[s]))

    # ImageSlot calls
    img_slots = re.findall(r'<ImageSlot\b([^>]*)/?>', content)
    for attrs in img_slots:
        has_src = 'src=' in attrs or 'src={' in attrs
        ph_match = re.search(r'placeholder=([\"\'{][^\"\'}>]+[\"\'}])', attrs)
        ph_val = ph_match.group(1) if ph_match else 'None'
        if not has_src:
            unhandled_placeholders.append((filepath, f"ImageSlot WITHOUT src (placeholder={ph_val})"))

print("=== UNHANDLED PLACEHOLDERS (No src or Slot ID not found) ===")
for f, msg in unhandled_placeholders:
    print(f"  {f}: {msg}")

print("\n=== MISSING IMAGE FILES REFERENCED ===")
for item in missing_files:
    print(f"  {item}")

if not missing_files:
    print("  None! All referenced image files exist on disk.")
