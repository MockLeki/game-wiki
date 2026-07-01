from UnityPy import Environment
from UnityPy.classes import MonoBehaviour, GameObject, MonoScript, TextAsset
from pathlib import Path
import json

game_dir = Path(r"C:\Users\12243\Documents\firerush\firerush_Data")

env = Environment()
for f in game_dir.glob("*"):
    if f.is_file() and f.stat().st_size > 100:
        try:
            env.load_file(str(f))
        except:
            pass

# Build a script class name lookup from MonoScript objects
script_map = {}
for obj in env.objects:
    try:
        data = obj.read()
        if isinstance(data, MonoScript):
            if data.m_ClassName and data.m_AssemblyName:
                script_map[obj.path_id] = (data.m_ClassName, data.m_AssemblyName)
    except:
        pass

print(f"MonoScripts: {len(script_map)}")

# Find MonoBehaviours and match them to class names
mb_count = 0
interesting = []

for obj in env.objects:
    try:
        data = obj.read()
        if isinstance(data, MonoBehaviour):
            mb_count += 1
            # Get the class from m_Script
            script = data.m_Script
            script_pid = None
            if hasattr(script, 'path_id'):
                script_pid = script.path_id
            
            cls_name = "Unknown"
            if script_pid in script_map:
                cls_name, assembly = script_map[script_pid]
            
            # Check if interesting
            if any(kw in cls_name.lower() for kw in ['affix', 'modifier', 'talent', 'stat', 'buff', 'equip', 'item', 'skill', 'ability', 'attribute', 'game', 'player', 'localize']):
                interesting.append((data.m_Name, cls_name, obj.path_id, script_pid))
    except:
        pass

print(f"MonoBehaviours: {mb_count}")
print(f"\nInteresting MonoBehaviours:")
for name, cls, pid, spid in sorted(interesting, key=lambda x: x[1]):
    print(f"  {name} -> {cls}")
