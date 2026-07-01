from UnityPy import Environment
from UnityPy.classes import TextAsset, MonoBehaviour
import json
from pathlib import Path

game_dir = Path(r"C:\Users\12243\Documents\firerush\firerush_Data")

env = Environment()
for f in game_dir.glob("*"):
    if f.is_file() and f.stat().st_size > 100:
        try:
            env.load_file(str(f))
        except:
            pass

print(f"Total objects: {len(env.objects)}")

# Find ALL TextAssets with their full text content
output_dir = Path(r"C:\Users\12243\Desktop\game1\.workbuddy\game_assets")
output_dir.mkdir(exist_ok=True)

for obj in env.objects:
    try:
        data = obj.read()
        if isinstance(data, TextAsset) and data.m_Script:
            name = data.m_Name
            text = data.m_Script
            if isinstance(text, bytes):
                text = text.decode('utf-8', errors='replace')
            size = len(text)
            
            # Save content
            safe_name = name.replace('/', '_').replace('\\', '_')
            fpath = output_dir / f"{safe_name}.txt"
            fpath.write_text(text, encoding='utf-8')
            print(f"Saved: {name} ({size} chars)")
    except Exception as e:
        pass

print(f"\nDone. Files saved to {output_dir}")
