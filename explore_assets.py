from UnityPy import Environment
from UnityPy.classes import TextAsset
from pathlib import Path

game_dir = Path(r"C:\Users\12243\Documents\firerush\firerush_Data")

# Load all asset files
env = Environment()
for f in game_dir.glob("*"):
    if f.is_file() and f.suffix.lower() in ['.assets', ''] and f.stat().st_size > 1000:
        try:
            env.load_file(str(f))
            print(f"Loaded: {f.name} ({f.stat().st_size} bytes)")
        except Exception as e:
            print(f"Failed: {f.name}: {e}")

# Find all TextAssets
print(f"\nTotal objects: {len(env.objects)}")
text_assets = []
for obj in env.objects:
    try:
        data = obj.read()
        if isinstance(data, TextAsset):
            text_assets.append((obj.path_id, data.m_Name, len(data.m_Script) if data.m_Script else 0))
    except:
        pass

print(f"\nFound {len(text_assets)} TextAssets:")
for pid, name, size in sorted(text_assets, key=lambda x: x[1].lower()):
    print(f"  {name} (path_id={pid}, size={size})")
