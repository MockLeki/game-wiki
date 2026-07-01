from UnityPy import Environment
from UnityPy.classes import TextAsset, MonoBehaviour
from pathlib import Path

game_dir = Path(r"C:\Users\12243\Documents\firerush\firerush_Data")

env = Environment()
for f in game_dir.glob("*"):
    if f.is_file() and f.stat().st_size > 100:
        try:
            env.load_file(str(f))
        except:
            pass

# List all unique object types
type_counts = {}
affix_related = []

for obj in env.objects:
    try:
        data = obj.read()
        tname = type(data).__name__
        type_counts[tname] = type_counts.get(tname, 0) + 1
        
        # Check for MonoBehaviour with related names
        if isinstance(data, MonoBehaviour):
            if data.m_Name and data.m_Script:
                # Extract the class name from the script reference
                script = data.m_Script
                if hasattr(script, 'm_ClassName'):
                    cls = script.m_ClassName
                    if any(kw in cls.lower() for kw in ['affix', 'modifier', 'talent', 'skill', 'stat', 'buff', 'effect', 'equipment', 'item']):
                        affix_related.append((data.m_Name, cls, obj.path_id))
    except:
        pass

print("Object type counts:")
for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
    print(f"  {t}: {c}")

print(f"\nAffix/Talent-related MonoBehaviours: {len(affix_related)}")
for name, cls, pid in affix_related[:50]:
    print(f"  {name} -> {cls} (path_id={pid})")
