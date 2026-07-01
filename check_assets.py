from UnityPy import Environment
from pathlib import Path
from collections import Counter

game_dir = Path(r"C:\Users\12243\Documents\firerush\firerush_Data")

env = Environment()
for f in game_dir.glob("*"):
    if f.is_file() and f.stat().st_size > 100:
        try:
            env.load_file(str(f))
            print(f"Loaded: {f.name} ({f.stat().st_size} bytes)")
        except Exception as e:
            print(f"Failed: {f.name}: {e}")

print(f"\nTotal objects: {len(env.objects)}")

# Count types
types = Counter()
for obj in env.objects:
    try:
        data = obj.read()
        types[type(data).__name__] += 1
    except:
        types['ERROR'] += 1

print("\nObject types:")
for t, c in types.most_common():
    print(f"  {t}: {c}")

# Show some example names for key types
print("\nExample objects:")
for obj in env.objects[:10]:
    try:
        data = obj.read()
        print(f"  {type(data).__name__}: {data.m_Name if hasattr(data,'m_Name') else 'N/A'}")
    except:
        pass
