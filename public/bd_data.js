window.BD_DATA = {
  "enums": {
    "enums": {
      "statType": {
        "0": "力量",
        "1": "敏捷",
        "2": "智力",
        "3": "伤害",
        "4": "暴击几率",
        "5": "暴击伤害",
        "6": "攻击速度",
        "7": "最大生命值",
        "8": "护甲",
        "9": "魔法抗性",
        "10": "移动速度",
        "11": "命中回复生命",
        "12": "击杀回复生命",
        "13": "冷却缩减",
        "14": "最大法力",
        "15": "金币获取",
        "16": "魔法发现",
        "17": "生命药水发现",
        "18": "容量",
        "19": "材料发现",
        "20": "武器伤害",
        "21": "武器速度",
        "22": "闪避",
        "23": "物理伤害",
        "24": "火焰伤害",
        "25": "冰霜伤害",
        "26": "闪电伤害",
        "27": "毒素伤害",
        "28": "奥术伤害",
        "29": "对健康敌人伤害",
        "30": "对受伤敌人伤害",
        "31": "对减速敌人伤害",
        "32": "对精英伤害",
        "33": "普通攻击伤害",
        "34": "强力攻击伤害",
        "35": "击杀回复法力",
        "36": "生命回复",
        "37": "法力消耗降低",
        "38": "药水充能",
        "39": "荆棘",
        "40": "易伤伤害",
        "41": "经验获取",
        "42": "最大生命值%",
        "43": "对眩晕敌人伤害",
        "44": "护甲%",
        "45": "对流血敌人伤害",
        "46": "对中毒敌人伤害",
        "47": "法力回复",
        "48": "荆棘伤害%",
        "49": "毒素伤害减免",
        "50": "宝石槽位",
        "51": "物理伤害减免",
        "52": "火焰伤害减免",
        "53": "冰霜伤害减免",
        "54": "闪电伤害减免",
        "55": "奥术伤害减免",
        "56": "治疗加成",
        "57": "移动速度%",
        "58": "对远程敌人伤害",
        "59": "魔法抗性%",
        "60": "暴击伤害减免",
        "61": "特殊技能伤害",
        "62": "持续伤害",
        "63": "对燃烧敌人伤害",
        "64": "伤害减免",
        "65": "伤害%"
      },
      "modifierType": {
        "0": "Flat固定值",
        "1": "PercentAdd百分比",
        "2": "PercentMult乘法"
      },
      "damageType": {
        "0": "物理",
        "1": "火焰",
        "2": "冰霜",
        "3": "闪电",
        "4": "毒素",
        "5": "奥术"
      },
      "rarity": {
        "0": "普通",
        "1": "非凡",
        "2": "稀有",
        "3": "传说",
        "4": "神圣",
        "5": "套装"
      },
      "slot": {
        "1": "武器",
        "2": "头盔",
        "3": "胸甲",
        "4": "护肩",
        "5": "项链",
        "6": "手套",
        "7": "腰带",
        "8": "护腿",
        "9": "靴子",
        "10": "戒指",
        "11": "背部"
      }
    },
    "formula": {
      "damageEffect": {
        "baseDamage": "基础伤害(long)",
        "attackScaling": "攻击缩放 LeveledFloat(Base+PerLevel)",
        "canCrit": "bool",
        "damageType": "DamageType"
      },
      "statScaledDamageEffect": {
        "scalingStat": "缩放属性(StatType,如力量/智力)",
        "minStatMultiplier": "最小属性倍率",
        "maxStatMultiplier": "最大属性倍率",
        "canCrit": "bool",
        "damageType": "DamageType"
      },
      "statModifier": {
        "stat": "StatType",
        "type": "ModifierType(0=Flat/1=PercentAdd/2=PercentMult)",
        "value": "ObscuredFloat"
      },
      "note": "技能伤害 = BaseDamage + Attack攻击力×AttackScaling(等级值)；属性缩放伤害 = 缩放属性×StatMultiplier；最终再乘暴击/伤害加成/减伤"
    }
  },
  "equipment": [
    {
      "id": "CommonAxe1",
      "name": "樵夫小斧",
      "nameEn": "Woodsman's Hatchet",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 30,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 9,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonBow1",
      "name": "简易木弓",
      "nameEn": "Simple Wooden Bow",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 30,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonMace1",
      "name": "铁刺锤",
      "nameEn": "Iron Spiked Mace",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 160,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 11,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonStaff1",
      "name": "带钩青铜法杖",
      "nameEn": "Hooked Bronze Staff",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 30,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonStaff2",
      "name": "缠皮长棍",
      "nameEn": "Leather-Wrapped Quarterstaff",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 30,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonSword1",
      "name": "铁制武装剑",
      "nameEn": "Iron Arming Sword",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 120,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 3,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UnCommonAxe1",
      "name": "风化战斧",
      "nameEn": "Weathered Battleaxe",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 200,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 9,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBow1",
      "name": "红木猎弓",
      "nameEn": "Redwood Hunting Bow",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 90,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonMace1",
      "name": "锻造战锤",
      "nameEn": "Forged Warhammer",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 160,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 11,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonStaff1",
      "name": "红宝石冠权杖",
      "nameEn": "Rubycrown Scepter",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 90,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonSword1",
      "name": "蛇舌刃",
      "nameEn": "Serpent's Tongue Blade",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 90,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 3,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareAxe1",
      "name": "镀金裂颅斧",
      "nameEn": "Gilded Ripper Axe",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 100,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 9,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareAxe2",
      "name": "黑钢战斧",
      "nameEn": "Blacksteel Battleaxe",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 100,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 9,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBow1",
      "name": "钢刃战弓",
      "nameEn": "Bladed Steel Bow",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 100,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBow2",
      "name": "镀金反曲弓",
      "nameEn": "Gilded Recurve Bow",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 100,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBow3",
      "name": "铁箍猎弓",
      "nameEn": "Ironbraced Hunting Bow",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 100,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareMace1",
      "name": "阳爆权杖锤",
      "nameEn": "Sunburst Scepter Mace",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 160,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 11,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareMace2",
      "name": "镀金战锤",
      "nameEn": "Gilded War Mace",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 160,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 11,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareStaff1",
      "name": "新月法杖",
      "nameEn": "Lunar Crescent Staff",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareStaff2",
      "name": "铁箍战杖",
      "nameEn": "Ironbound Warstaff",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareSword1",
      "name": "黄金弯刀",
      "nameEn": "Golden Falchion",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 3,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareSword2",
      "name": "银牙巨剑",
      "nameEn": "Silverfang Greatsword",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 3,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryAxe1",
      "name": "北方巨人巨斧",
      "nameEn": "Northern Giant's Great Axe",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 600,
      "minDropLevel": 10,
      "maxDropLevel": 0,
      "usableClasses": 9,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3000,
      "effects": [
        "LegendaryAxe1_Freeze",
        "LegendaryAxe1_Damage"
      ]
    },
    {
      "id": "LegendaryBow1",
      "name": "唤雨之弓",
      "nameEn": "Raincaller Bow",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 800,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3038,
      "effects": [
        "LegendaryBow1"
      ]
    },
    {
      "id": "LegendaryBow2",
      "name": "黑鸦反曲弓",
      "nameEn": "Blackcrow Recurve",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 800,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3047,
      "effects": [
        "LegendaryBow2"
      ]
    },
    {
      "id": "LegendaryMace1",
      "name": "地狱风暴之锤",
      "nameEn": "Hellstorm Mace",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 800,
      "minDropLevel": 20,
      "maxDropLevel": 0,
      "usableClasses": 11,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3012,
      "effects": [
        "LegendaryHammer1"
      ]
    },
    {
      "id": "LegendaryStaff1",
      "name": "霜龙法杖",
      "nameEn": "Staff of the Frostwyrm",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 800,
      "minDropLevel": 15,
      "maxDropLevel": 0,
      "usableClasses": 2,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3022,
      "effects": [
        "LegendaryStaff1"
      ]
    },
    {
      "id": "LegendaryStaff2",
      "name": "琥珀骷髅权杖",
      "nameEn": "Amber Skull Staff",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 800,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 11,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3028,
      "effects": [
        "LegendaryStaff2_Immobilized",
        "LegendaryStaff2_Slowed"
      ]
    },
    {
      "id": "LegendarySword1",
      "name": "苦痛锯齿巨剑",
      "nameEn": "Serrated Greatsword of Agony",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 600,
      "minDropLevel": 40,
      "maxDropLevel": 0,
      "usableClasses": 3,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3023,
      "effects": [
        "LegendarySword1"
      ]
    },
    {
      "id": "DivineBow1",
      "name": "紫霄之弓",
      "nameEn": "Violet Skybow",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 4,
      "rarityCn": "神圣",
      "sellPrice": 50000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 1004,
      "blackMistSteamItemDefId": 0,
      "effects": [
        "DivineBow1_ArcaneAOE"
      ]
    },
    {
      "id": "DivineMace1",
      "name": "祖母之锤",
      "nameEn": "The Grandmother",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 4,
      "rarityCn": "神圣",
      "sellPrice": 100000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 11,
      "steamItemDefId": 1006,
      "blackMistSteamItemDefId": 0,
      "effects": [
        "DivineMace1_Crit"
      ]
    },
    {
      "id": "DivineSword1",
      "name": "裂魂之刃",
      "nameEn": "Soulrender",
      "slot": 1,
      "slotCn": "武器",
      "rarity": 4,
      "rarityCn": "神圣",
      "sellPrice": 100000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 3,
      "steamItemDefId": 1007,
      "blackMistSteamItemDefId": 0,
      "effects": [
        "DivineSword1_SoulHarvest",
        "DivineSword1_SoulImpact"
      ]
    },
    {
      "id": "CommonHelm1",
      "name": "流浪者宽边帽",
      "nameEn": "Wanderer's Brimmed Hat",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonHelm2",
      "name": "破旧皮革头巾",
      "nameEn": "Worn Leather Hood",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonHelm3",
      "name": "填充皮革头盔",
      "nameEn": "Padded Leather Coif",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonHelm4",
      "name": "素布软帽",
      "nameEn": "Plain Cloth Coif",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonHelm1",
      "name": "铁鼻盔",
      "nameEn": "Iron Nasal Helm",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonHelm2",
      "name": "钢锅盔",
      "nameEn": "Steel Kettle Helm",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 80,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonHelm3",
      "name": "卫兵头盔",
      "nameEn": "Guardsman's Helm",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 130,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonHelm4",
      "name": "旅者羽饰帽",
      "nameEn": "Feathered Wayfarer's Hat",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 130,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareHelm1",
      "name": "圣战者大头盔",
      "nameEn": "Crusader's Great Helm",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 140,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareHelm2",
      "name": "阳铸战盔",
      "nameEn": "Sunforged Warhelm",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 85,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareHelm3",
      "name": "厄运角盔",
      "nameEn": "Doomhorn Helm",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareHelm4",
      "name": "黑钢头盔",
      "nameEn": "Blacksteel Helm",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareHelm5",
      "name": "琥珀先知头巾",
      "nameEn": "Amber Seer's Turban",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareHelm6",
      "name": "碧玉灵冠",
      "nameEn": "Jade Spirit Circlet",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareHelm7",
      "name": "贤者羽饰帽",
      "nameEn": "Sage's Feathered Hat",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareHelm8",
      "name": "织暮兜帽",
      "nameEn": "Duskweave Cowl",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryHelm1",
      "name": "堕落王冠",
      "nameEn": "Crown of the Fallen King",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 600,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3010,
      "effects": [
        "LegendaryHelm1"
      ]
    },
    {
      "id": "LegendaryHelm2",
      "name": "绯红风暴之兜",
      "nameEn": "Kabuto of the Crimson Tempest",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 600,
      "minDropLevel": 35,
      "maxDropLevel": 0,
      "usableClasses": 1,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3011,
      "effects": [
        "LegendaryHelm2"
      ]
    },
    {
      "id": "LegendaryHelm3",
      "name": "游风之冠",
      "nameEn": "Crown of the Wandering Gale",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 600,
      "minDropLevel": 35,
      "maxDropLevel": 0,
      "usableClasses": 8,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3026,
      "effects": [
        "LegendaryHelm3_Count",
        "LegendaryHelm3_Size",
        "LegendaryHelm3_Lifetime"
      ]
    },
    {
      "id": "LegendaryHelm4",
      "name": "专注头箍",
      "nameEn": "Circlet of Focus",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 65,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3001,
      "effects": [
        "LegendaryHelm4",
        "LegendaryHelm4_ConsumeFocus"
      ]
    },
    {
      "id": "LegendaryHelm5",
      "name": "幻影面具",
      "nameEn": "Phantom Mask",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 40,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3035,
      "effects": [
        "LegendaryHelm5"
      ]
    },
    {
      "id": "DivineHelm1",
      "name": "荣耀角斗士头盔",
      "nameEn": "Glorious Gladiator Helmet",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 4,
      "rarityCn": "神圣",
      "sellPrice": 50000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 1005,
      "blackMistSteamItemDefId": 0,
      "effects": [
        "DivineHelm1_AllStats"
      ]
    },
    {
      "id": "DivineHelm2",
      "name": "不朽者的面容",
      "nameEn": "Visage of the Undying",
      "slot": 2,
      "slotCn": "头盔",
      "rarity": 4,
      "rarityCn": "神圣",
      "sellPrice": 100000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 1001,
      "blackMistSteamItemDefId": 0,
      "effects": [
        "DivineHelm2_DamageReduction"
      ]
    },
    {
      "id": "CommonChestArmor1",
      "name": "农夫短衫",
      "nameEn": "Peasant's Tunic",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonChestArmor2",
      "name": "破旧连帽皮甲",
      "nameEn": "Tattered Hooded Jerkin",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 900,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonChestArmor3",
      "name": "填充袄子",
      "nameEn": "Padded Gambeson",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonChestArmor4",
      "name": "乡野束腰背心",
      "nameEn": "Rustic Belted Vest",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonChestArmor1",
      "name": "铆钉锁甲背心",
      "nameEn": "Riveted Mail Vest",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 90,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonChestArmor2",
      "name": "翠绿连帽外袍",
      "nameEn": "Verdant Hooded Garb",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 150,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonChestArmor3",
      "name": "蓝哨岗袄子",
      "nameEn": "Bluewatch Gambeson",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 95,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonChestArmor4",
      "name": "交叉束带皮背心",
      "nameEn": "Cross-Strapped Leather Vest",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 95,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareChestArmor1",
      "name": "金钉布甲",
      "nameEn": "Goldstud Brigandine",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 160,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareChestArmor2",
      "name": "印章护胸甲",
      "nameEn": "Sigilguard Cuirass",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareChestArmor3",
      "name": "银骑士板甲",
      "nameEn": "Argent Knight's Plate",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 380,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareChestArmor4",
      "name": "鎏金哨卫胸甲",
      "nameEn": "Gilded Sentinel Cuirass",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 380,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareChestArmor5",
      "name": "织曦法衣",
      "nameEn": "Dawnweave Vestments",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 160,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareChestArmor6",
      "name": "贤者冥想服",
      "nameEn": "Sage's Meditation Garb",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareChestArmor7",
      "name": "湛蓝仪式长袍",
      "nameEn": "Azure Ritual Robe",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 380,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareChestArmor8",
      "name": "紫暮长袍",
      "nameEn": "Violet Dusk Robe",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 380,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryChestArmor1",
      "name": "暴怒壁垒",
      "nameEn": "Bulwark of Wrath",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 35,
      "maxDropLevel": 0,
      "usableClasses": 1,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3005,
      "effects": [
        "LegendaryChestArmor1"
      ]
    },
    {
      "id": "LegendaryChestArmor2",
      "name": "荆棘之心护胸甲",
      "nameEn": "Thornheart Cuirass",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3006,
      "effects": []
    },
    {
      "id": "LegendaryChestArmor3",
      "name": "符文守护法衣",
      "nameEn": "Runeward Vestment",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 25,
      "maxDropLevel": 0,
      "usableClasses": 6,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3007,
      "effects": [
        "LegendaryChest3"
      ]
    },
    {
      "id": "LegendaryChestArmor4",
      "name": "无尽涌流之器",
      "nameEn": "Vessel of the Endless Stream",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 35,
      "maxDropLevel": 0,
      "usableClasses": 8,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3025,
      "effects": [
        "LegendaryChestArmor4"
      ]
    },
    {
      "id": "LegendaryChestArmor5",
      "name": "不屈胸甲",
      "nameEn": "Unyielding Cuirass",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 35,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3033,
      "effects": [
        "LegendaryChestArmor5"
      ]
    },
    {
      "id": "LegendaryChestArmor6",
      "name": "灵巧胸甲",
      "nameEn": "Evasive Cuirass",
      "slot": 3,
      "slotCn": "胸甲",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 12,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3036,
      "effects": [
        "LegendaryChestArmor6"
      ]
    },
    {
      "id": "CommonShoulder1",
      "name": "皮革肩甲",
      "nameEn": "Leather Spaulder",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonShoulder2",
      "name": "破旧护肩",
      "nameEn": "Worn Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonShoulder3",
      "name": "填充护肩",
      "nameEn": "Padded Shoulderguard",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonShoulder4",
      "name": "搭扣皮革肩甲",
      "nameEn": "Buckled Leather Spaulder",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonShoulder1",
      "name": "层叠铁护肩",
      "nameEn": "Layered Iron Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 80,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonShoulder2",
      "name": "铁肩板",
      "nameEn": "Iron Shoulderplate",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 130,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonShoulder3",
      "name": "铆钉钢肩甲",
      "nameEn": "Riveted Steel Spaulder",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonShoulder4",
      "name": "铆钉青铜肩甲",
      "nameEn": "Riveted Bronze Spaulder",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareShoulder1",
      "name": "深红卫士护肩",
      "nameEn": "Crimsonguard Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 140,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareShoulder2",
      "name": "死颅护肩",
      "nameEn": "Deathskull Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareShoulder3",
      "name": "阳刺护肩",
      "nameEn": "Sunspike Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 360,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareShoulder4",
      "name": "鎏金札甲肩铠",
      "nameEn": "Gilded Lamellar Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 360,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareShoulder5",
      "name": "紫罗兰侍僧肩饰",
      "nameEn": "Violet Acolyte's Mantle",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 360,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareShoulder6",
      "name": "象牙白符印肩饰",
      "nameEn": "Ivory Sigil Mantle",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 360,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareShoulder7",
      "name": "蔚蓝仪仗肩章",
      "nameEn": "Azure Ceremonial Epaulet",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 360,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareShoulder8",
      "name": "月羽肩饰",
      "nameEn": "Moonfeather Mantle",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 360,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryShoulder1",
      "name": "甲壳尖刺护肩",
      "nameEn": "Shell Spike Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3020,
      "effects": [
        "LegendaryShoulder1"
      ]
    },
    {
      "id": "LegendaryShoulder2",
      "name": "元素爆发护肩",
      "nameEn": "Elemental Burst Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3021,
      "effects": [
        "LegendaryShoulder2"
      ]
    },
    {
      "id": "LegendaryShoulder3",
      "name": "收割者护肩",
      "nameEn": "Reaper's Pauldron",
      "slot": 4,
      "slotCn": "护肩",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3041,
      "effects": [
        "LegendaryShoulder3"
      ]
    },
    {
      "id": "CommonNeck1",
      "name": "黑玉泪滴吊坠",
      "nameEn": "Onyx Teardrop Pendant",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonNeck2",
      "name": "铁链项链",
      "nameEn": "Iron Link Necklace",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonNeck3",
      "name": "简单银吊坠",
      "nameEn": "Simple Silver Pendant",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonNeck4",
      "name": "朝圣者十字坠",
      "nameEn": "Pilgrim's Cross",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonNeck1",
      "name": "红宝石泪滴吊坠",
      "nameEn": "Ruby Drop Pendant",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 80,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonNeck2",
      "name": "棱晶四重护符",
      "nameEn": "Prism Quartet Amulet",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 130,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonNeck3",
      "name": "黑曜叶片吊坠",
      "nameEn": "Obsidian Leaf Pendant",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 135,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonNeck4",
      "name": "精制金项链",
      "nameEn": "Fine Gold Chain",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 135,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareNeck1",
      "name": "紫晶黄金护符",
      "nameEn": "Amethyst Gold Amulet",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareNeck2",
      "name": "绿松石之眼护符",
      "nameEn": "Turquoise Eye Amulet",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 340,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareNeck3",
      "name": "蓝宝石碎片护符",
      "nameEn": "Sapphire Shard Amulet",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareNeck4",
      "name": "琥珀叶护符",
      "nameEn": "Amberleaf Talisman",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryNeck1",
      "name": "涌动心智吊坠",
      "nameEn": "Pendant of the Surging Mind",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3013,
      "effects": [
        "LegendaryNeck1"
      ]
    },
    {
      "id": "LegendaryNeck2",
      "name": "裂创怒吼吊坠",
      "nameEn": "Bellow of the Open Wound",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 40,
      "maxDropLevel": 0,
      "usableClasses": 1,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3014,
      "effects": [
        "LegendaryNeck2"
      ]
    },
    {
      "id": "LegendaryNeck3",
      "name": "火焰领主项链",
      "nameEn": "Fire Lord's Necklace",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 2,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3015,
      "effects": [
        "LegendaryNeck3"
      ]
    },
    {
      "id": "LegendaryNeck4",
      "name": "风暴守护项链",
      "nameEn": "Stormguard Necklace",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "usableClasses": 2,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3002,
      "effects": [
        "LegendaryNeck4"
      ]
    },
    {
      "id": "LegendaryNeck5",
      "name": "精力吊坠",
      "nameEn": "Pendant of Vigor",
      "slot": 5,
      "slotCn": "项链",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 55,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3046,
      "effects": [
        "LegendaryNeck5"
      ]
    },
    {
      "id": "CommonGloves1",
      "name": "破旧皮革手套",
      "nameEn": "Worn Leather Gloves",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonGloves2",
      "name": "铆钉兽皮手套",
      "nameEn": "Studded Hide Gloves",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonGloves3",
      "name": "素布手套",
      "nameEn": "Plain Cloth Gloves",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonGloves4",
      "name": "露指劳作手套",
      "nameEn": "Fingerless Work Gloves",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonGloves1",
      "name": "钢板护手",
      "nameEn": "Steel Plated Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 130,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonGloves2",
      "name": "翠绿皮革手套",
      "nameEn": "Verdant Leather Gloves",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonGloves3",
      "name": "水手手套",
      "nameEn": "Mariner's Gloves",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonGloves4",
      "name": "黑色符印手套",
      "nameEn": "Black Sigil Gloves",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareGloves1",
      "name": "死颅护手",
      "nameEn": "Deathskull Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareGloves2",
      "name": "深红爪护手",
      "nameEn": "Crimson Claw Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 350,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareGloves3",
      "name": "铭文护手",
      "nameEn": "Rune-Etched Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 350,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareGloves4",
      "name": "鎏金守护者护手",
      "nameEn": "Gilded Guardian Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 350,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryGloves1",
      "name": "怒火护手",
      "nameEn": "Ragefire Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 1,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3008,
      "effects": [
        "LegendaryGloves1"
      ]
    },
    {
      "id": "LegendaryGloves2",
      "name": "势不可挡护手",
      "nameEn": "Unstoppable Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3009,
      "effects": [
        "LegendaryGloves2"
      ]
    },
    {
      "id": "LegendaryGloves3",
      "name": "唤雷护手",
      "nameEn": "Stormcaller Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 35,
      "maxDropLevel": 0,
      "usableClasses": 2,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3029,
      "effects": [
        "LegendaryGloves3"
      ]
    },
    {
      "id": "LegendaryGloves4",
      "name": "卸力缠手",
      "nameEn": "Deflecting Handwraps",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 40,
      "maxDropLevel": 0,
      "usableClasses": 8,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3034,
      "effects": [
        "LegendaryGloves4"
      ]
    },
    {
      "id": "LegendaryGloves5",
      "name": "穿心护手",
      "nameEn": "Deadeye Grips",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3039,
      "effects": [
        "LegendaryGloves5_KnifeBarrage",
        "LegendaryGloves5_TwinArrows"
      ]
    },
    {
      "id": "LegendaryGloves6",
      "name": "溃烂护手",
      "nameEn": "Festering Gauntlets",
      "slot": 6,
      "slotCn": "手套",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 40,
      "maxDropLevel": 0,
      "usableClasses": 7,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3042,
      "effects": [
        "LegendaryGloves6"
      ]
    },
    {
      "id": "CommonBelt1",
      "name": "破旧铁扣腰带",
      "nameEn": "Worn Iron-Buckle Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonBelt2",
      "name": "磨损皮革带",
      "nameEn": "Frayed Leather Strap",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 40,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonBelt3",
      "name": "简单皮带",
      "nameEn": "Simple Leather Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 65,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonBelt4",
      "name": "打结布腰带",
      "nameEn": "Knotted Cloth Sash",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 65,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBelt1",
      "name": "坚固扣环腰带",
      "nameEn": "Sturdy Buckled Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBelt2",
      "name": "环扣腰带",
      "nameEn": "Ringclasp Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 110,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBelt3",
      "name": "旅者缠腰带",
      "nameEn": "Wayfarer's Wrap Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 45,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBelt4",
      "name": "钢箍腰带",
      "nameEn": "Steelbound Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 45,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBelt1",
      "name": "翠绿鹰爪腰带",
      "nameEn": "Verdant Talon Girdle",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 115,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBelt2",
      "name": "阳石腰带",
      "nameEn": "Sunstone Sash",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBelt3",
      "name": "紫晶暗影腰带",
      "nameEn": "Amethyst Shadow Sash",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 300,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBelt4",
      "name": "琥珀符印腰带",
      "nameEn": "Amber Sigil Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 300,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryBelt1",
      "name": "无底药带",
      "nameEn": "Bottomless Potion Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 34,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3003,
      "effects": [
        "LegendaryBelt1"
      ]
    },
    {
      "id": "LegendaryBelt2",
      "name": "无尽法力腰带",
      "nameEn": "Endless Mana Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3032,
      "effects": [
        "LegendaryBelt2"
      ]
    },
    {
      "id": "LegendaryBelt3",
      "name": "战饮腰带",
      "nameEn": "Battle Draught Belt",
      "slot": 7,
      "slotCn": "腰带",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 50,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3045,
      "effects": [
        "LegendaryBelt3"
      ]
    },
    {
      "id": "CommonPant1",
      "name": "亚麻马裤",
      "nameEn": "Linen Breeches",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonPant2",
      "name": "补丁长裤",
      "nameEn": "Patched Trousers",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonPant3",
      "name": "黑色布裤",
      "nameEn": "Black Cloth Pants",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonPant4",
      "name": "帆布短裤",
      "nameEn": "Canvas Shorts",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonPant1",
      "name": "加固兽皮护腿",
      "nameEn": "Reinforced Hide Leggings",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonPant2",
      "name": "荆棘护卫护腿",
      "nameEn": "Thornguard Leggings",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 80,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonPant3",
      "name": "林者马裤",
      "nameEn": "Forester's Breeches",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 130,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonPant4",
      "name": "绗缝皮革护腿",
      "nameEn": "Quilted Leather Leggings",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 130,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RarePant1",
      "name": "青钢护腿",
      "nameEn": "Tealsteel Legguards",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 140,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RarePant2",
      "name": "岩浆裂纹长裤",
      "nameEn": "Magmacrack Trousers",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 360,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RarePant3",
      "name": "镀金丝绸护腿",
      "nameEn": "Gilded Silk Leggings",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RarePant4",
      "name": "暮影追猎者护腿",
      "nameEn": "Duskstalker Legguards",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 5,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RarePant5",
      "name": "绯红仪式战裙",
      "nameEn": "Crimson Ritual Kilt",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RarePant6",
      "name": "贤者符文裙",
      "nameEn": "Sage's Rune Skirt",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RarePant7",
      "name": "翠玉门徒战裙",
      "nameEn": "Jade Disciple's Kilt",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RarePant8",
      "name": "余烬符印长裤",
      "nameEn": "Ember Sigil Trousers",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 10,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryPants1",
      "name": "奥术之刃护胫",
      "nameEn": "Greaves of the Arcane Edge",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 50,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3016,
      "effects": [
        "LegendaryPants1",
        "LegendaryPants1_Lightning",
        "LegendaryPants1_Arcane"
      ]
    },
    {
      "id": "LegendaryPants2",
      "name": "坚毅药剂护胫",
      "nameEn": "Greaves of the Stalwart Tonic",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3017,
      "effects": [
        "LegendaryPants2"
      ]
    },
    {
      "id": "LegendaryPants3",
      "name": "魔能护腿",
      "nameEn": "Manaflow Greaves",
      "slot": 8,
      "slotCn": "护腿",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 25,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3044,
      "effects": [
        "LegendaryPants3"
      ]
    },
    {
      "id": "CommonBoots1",
      "name": "破旧旅行靴",
      "nameEn": "Worn Travel Boots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonBoots2",
      "name": "农夫脚布",
      "nameEn": "Peasant's Footwraps",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 45,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonBoots3",
      "name": "皮革骑行靴",
      "nameEn": "Hide Riding Boots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonBoots4",
      "name": "破旧皮凉鞋",
      "nameEn": "Worn Leather Sandals",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBoots1",
      "name": "荆棘步靴",
      "nameEn": "Thornstep Boots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 75,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBoots2",
      "name": "毛皮内衬远足靴",
      "nameEn": "Fur-Lined Trekkers",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 120,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBoots3",
      "name": "流浪者之靴",
      "nameEn": "Wanderer's Boots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 125,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonBoots4",
      "name": "扣带旅行靴",
      "nameEn": "Buckled Travel Boots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 125,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBoots1",
      "name": "铁甲战靴",
      "nameEn": "Ironclad Warboots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 50,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBoots2",
      "name": "蓝宝石奥术靴",
      "nameEn": "Sapphire Arcane Boots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 80,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBoots3",
      "name": "红宝石镀金靴",
      "nameEn": "Ruby-Gilded Boots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 320,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBoots4",
      "name": "青铜护筒靴",
      "nameEn": "Bronze-Cuffed Boots",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 320,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryBoots1",
      "name": "唤风者之靴",
      "nameEn": "Boots of the Windcaller",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 25,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3004,
      "effects": [
        "LegendaryBoots1"
      ]
    },
    {
      "id": "LegendaryBoots2",
      "name": "落叶行者靴",
      "nameEn": "Treads of the Falling Leaf",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 40,
      "maxDropLevel": 0,
      "usableClasses": 8,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3024,
      "effects": [
        "LegendaryBoots2"
      ]
    },
    {
      "id": "LegendaryBoots3",
      "name": "愈行之靴",
      "nameEn": "Boots of the Mending Stride",
      "slot": 9,
      "slotCn": "靴子",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 520,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3043,
      "effects": [
        "LegendaryBoots3"
      ]
    },
    {
      "id": "CommonRing1",
      "name": "朴素铁环",
      "nameEn": "Plain Iron Band",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonRing2",
      "name": "铜环",
      "nameEn": "Copper Band",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 70,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonRing3",
      "name": "锤制银戒指",
      "nameEn": "Hammered Silver Ring",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "CommonRing4",
      "name": "青铜指环",
      "nameEn": "Bronze Band",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 0,
      "rarityCn": "普通",
      "sellPrice": 55,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonRing1",
      "name": "龙脊戒指",
      "nameEn": "Drakespine Ring",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 80,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonRing2",
      "name": "石榴石环",
      "nameEn": "Garnet Band",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 85,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonRing3",
      "name": "尖刺铁环",
      "nameEn": "Spiked Iron Ring",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 140,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "UncommonRing4",
      "name": "发黑钢环",
      "nameEn": "Blackened Steel Band",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 1,
      "rarityCn": "非凡",
      "sellPrice": 140,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareRing1",
      "name": "阳石印戒",
      "nameEn": "Sunstone Signet",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 145,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareRing2",
      "name": "魔女爪戒指",
      "nameEn": "Coven Talon Ring",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 60,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareRing3",
      "name": "炭火焰环",
      "nameEn": "Emberflame Band",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 330,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareRing4",
      "name": "金爪戒指",
      "nameEn": "Golden Talon Ring",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 330,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryRing1",
      "name": "巨龙血牙印戒",
      "nameEn": "Bloodfang Signet of the Wyrm",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 550,
      "minDropLevel": 25,
      "maxDropLevel": 0,
      "usableClasses": 1,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3018,
      "effects": [
        "LegendaryRing1"
      ]
    },
    {
      "id": "LegendaryRing2",
      "name": "展露之戒",
      "nameEn": "Ring of Revelation",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 550,
      "minDropLevel": 60,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3019,
      "effects": [
        "LegendaryRing2"
      ]
    },
    {
      "id": "LegendaryRing3",
      "name": "天目指环",
      "nameEn": "Ring of the Third Eye",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 550,
      "minDropLevel": 25,
      "maxDropLevel": 0,
      "usableClasses": 8,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3027,
      "effects": [
        "LegendaryRing3"
      ]
    },
    {
      "id": "LegendaryRing4",
      "name": "第四火焰之戒",
      "nameEn": "Ring of the Fourth Flame",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 550,
      "minDropLevel": 40,
      "maxDropLevel": 0,
      "usableClasses": 2,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3030,
      "effects": [
        "LegendaryRing4"
      ]
    },
    {
      "id": "LegendaryRing5",
      "name": "充能指环",
      "nameEn": "Charged Ring",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 550,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3031,
      "effects": [
        "LegendaryRing5"
      ]
    },
    {
      "id": "LegendaryRing6",
      "name": "奥术精准之戒",
      "nameEn": "Ring of Arcane Precision",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 550,
      "minDropLevel": 15,
      "maxDropLevel": 0,
      "usableClasses": 4,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3037,
      "effects": [
        "LegendaryRing6"
      ]
    },
    {
      "id": "LegendaryRing7",
      "name": "屠龙戒",
      "nameEn": "Ring of Dragonslayer",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 550,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 3040,
      "effects": [
        "LegendaryRing7"
      ]
    },
    {
      "id": "DivineRing1",
      "name": "古贤遗骨",
      "nameEn": "Remnant of the Elder Sage",
      "slot": 10,
      "slotCn": "戒指",
      "rarity": 4,
      "rarityCn": "神圣",
      "sellPrice": 50000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 1003,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBack1",
      "name": "棕色冒险者披风",
      "nameEn": "Brown Adventurer's Cape",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 1000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBack2",
      "name": "红色冒险者披风",
      "nameEn": "Red Adventurer's Cape",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 1000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "RareBack3",
      "name": "灰色冒险者披风",
      "nameEn": "Grey Adventurer's Cape",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 2,
      "rarityCn": "稀有",
      "sellPrice": 1000,
      "minDropLevel": 1,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryBack1",
      "name": "霜晶殓袍",
      "nameEn": "Rimeshard Shroud",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 10000,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryBack2",
      "name": "烬暮披风",
      "nameEn": "Emberdusk Mantle",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 10000,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryBack3",
      "name": "雪裘披风",
      "nameEn": "Snowpelt Mantle",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 10000,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "LegendaryBack4",
      "name": "暮羽之翼",
      "nameEn": "Duskfeather Wings",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 3,
      "rarityCn": "传说",
      "sellPrice": 1,
      "minDropLevel": 9999,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 0,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "DivineBack1",
      "name": "圣光之翼",
      "nameEn": " Wings of the Light",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 4,
      "rarityCn": "神圣",
      "sellPrice": 100000,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 1002,
      "blackMistSteamItemDefId": 0,
      "effects": []
    },
    {
      "id": "DivineBack2",
      "name": "灰烬领主之翼",
      "nameEn": "Wings of the Cinderlord",
      "slot": 11,
      "slotCn": "背部",
      "rarity": 4,
      "rarityCn": "神圣",
      "sellPrice": 100000,
      "minDropLevel": 30,
      "maxDropLevel": 0,
      "usableClasses": 15,
      "steamItemDefId": 1000,
      "blackMistSteamItemDefId": 0,
      "effects": []
    }
  ],
  "gems": [
    {
      "id": "GemAmethyst1",
      "name": "粗糙的紫水晶球",
      "nameEn": "Raw Sphere Amethyst",
      "rarity": 0,
      "sellPrice": 2000,
      "minDropLevel": 30,
      "maxDropLevel": 34,
      "armor": [
        {
          "stat": 2,
          "mod": 0,
          "value": 5.0
        }
      ],
      "accessory": [
        {
          "stat": 55,
          "mod": 0,
          "value": 0.05
        }
      ],
      "weapon": [
        {
          "stat": 28,
          "mod": 0,
          "value": 0.1
        }
      ]
    },
    {
      "id": "GemAmethyst2",
      "name": "碎裂的紫水晶泪滴",
      "nameEn": "Chipped Teardrop Amethyst",
      "rarity": 0,
      "sellPrice": 4000,
      "minDropLevel": 35,
      "maxDropLevel": 39,
      "armor": [
        {
          "stat": 2,
          "mod": 0,
          "value": 10.0
        }
      ],
      "accessory": [
        {
          "stat": 55,
          "mod": 0,
          "value": 0.07
        }
      ],
      "weapon": [
        {
          "stat": 28,
          "mod": 0,
          "value": 0.15
        }
      ]
    },
    {
      "id": "GemAmethyst3",
      "name": "粗砺的紫水晶方块",
      "nameEn": "Rough Square Amethyst",
      "rarity": 0,
      "sellPrice": 6000,
      "minDropLevel": 40,
      "maxDropLevel": 44,
      "armor": [
        {
          "stat": 2,
          "mod": 0,
          "value": 15.0
        }
      ],
      "accessory": [
        {
          "stat": 55,
          "mod": 0,
          "value": 0.09
        }
      ],
      "weapon": [
        {
          "stat": 28,
          "mod": 0,
          "value": 0.2
        }
      ]
    },
    {
      "id": "GemAmethyst4",
      "name": "抛光的紫水晶菱形",
      "nameEn": "Polished Rhombus Amethyst",
      "rarity": 0,
      "sellPrice": 8000,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 2,
          "mod": 0,
          "value": 20.0
        }
      ],
      "accessory": [
        {
          "stat": 55,
          "mod": 0,
          "value": 0.11
        }
      ],
      "weapon": [
        {
          "stat": 28,
          "mod": 0,
          "value": 0.25
        }
      ]
    },
    {
      "id": "GemAmethyst5",
      "name": "无瑕的紫水晶六边形",
      "nameEn": "Flawless Hexagon Amethyst",
      "rarity": 0,
      "sellPrice": 10000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 2,
          "mod": 0,
          "value": 25.0
        }
      ],
      "accessory": [
        {
          "stat": 55,
          "mod": 0,
          "value": 0.13
        }
      ],
      "weapon": [
        {
          "stat": 28,
          "mod": 0,
          "value": 0.35
        }
      ]
    },
    {
      "id": "GemAmethyst6",
      "name": "璀璨的紫水晶八边形",
      "nameEn": "Radiant Octagon Amethyst",
      "rarity": 0,
      "sellPrice": 12000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 2,
          "mod": 0,
          "value": 30.0
        }
      ],
      "accessory": [
        {
          "stat": 55,
          "mod": 0,
          "value": 0.15
        }
      ],
      "weapon": [
        {
          "stat": 28,
          "mod": 0,
          "value": 0.5
        }
      ]
    },
    {
      "id": "GemDiamond1",
      "name": "粗糙的钻石球",
      "nameEn": "Raw Sphere Diamond",
      "rarity": 0,
      "sellPrice": 2000,
      "minDropLevel": 30,
      "maxDropLevel": 34,
      "armor": [
        {
          "stat": 13,
          "mod": 0,
          "value": 0.01
        }
      ],
      "accessory": [
        {
          "stat": 51,
          "mod": 0,
          "value": 0.04
        }
      ],
      "weapon": [
        {
          "stat": 23,
          "mod": 0,
          "value": 0.1
        }
      ]
    },
    {
      "id": "GemDiamond2",
      "name": "碎裂的钻石泪滴",
      "nameEn": "Chipped Teardrop Diamond",
      "rarity": 0,
      "sellPrice": 4000,
      "minDropLevel": 35,
      "maxDropLevel": 39,
      "armor": [
        {
          "stat": 13,
          "mod": 0,
          "value": 0.015
        }
      ],
      "accessory": [
        {
          "stat": 51,
          "mod": 0,
          "value": 0.055
        }
      ],
      "weapon": [
        {
          "stat": 23,
          "mod": 0,
          "value": 0.15
        }
      ]
    },
    {
      "id": "GemDiamond3",
      "name": "粗砺的钻石方块",
      "nameEn": "Rough Square Diamond",
      "rarity": 0,
      "sellPrice": 6000,
      "minDropLevel": 40,
      "maxDropLevel": 44,
      "armor": [
        {
          "stat": 13,
          "mod": 0,
          "value": 0.02
        }
      ],
      "accessory": [
        {
          "stat": 51,
          "mod": 0,
          "value": 0.07
        }
      ],
      "weapon": [
        {
          "stat": 23,
          "mod": 0,
          "value": 0.2
        }
      ]
    },
    {
      "id": "GemDiamond4",
      "name": "抛光的钻石菱形",
      "nameEn": "Polished Rhombus Diamond",
      "rarity": 0,
      "sellPrice": 8000,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 13,
          "mod": 0,
          "value": 0.025
        }
      ],
      "accessory": [
        {
          "stat": 51,
          "mod": 0,
          "value": 0.085
        }
      ],
      "weapon": [
        {
          "stat": 23,
          "mod": 0,
          "value": 0.25
        }
      ]
    },
    {
      "id": "GemDiamond5",
      "name": "无瑕的钻石六边形",
      "nameEn": "Flawless Hexagon Diamond",
      "rarity": 0,
      "sellPrice": 10000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 13,
          "mod": 0,
          "value": 0.03
        }
      ],
      "accessory": [
        {
          "stat": 51,
          "mod": 0,
          "value": 0.1
        }
      ],
      "weapon": [
        {
          "stat": 23,
          "mod": 0,
          "value": 0.35
        }
      ]
    },
    {
      "id": "GemDiamond6",
      "name": "璀璨的钻石八边形",
      "nameEn": "Radiant Octagon Diamond",
      "rarity": 0,
      "sellPrice": 12000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 13,
          "mod": 0,
          "value": 0.04
        }
      ],
      "accessory": [
        {
          "stat": 51,
          "mod": 0,
          "value": 0.115
        }
      ],
      "weapon": [
        {
          "stat": 23,
          "mod": 0,
          "value": 0.5
        }
      ]
    },
    {
      "id": "GemEmerald1",
      "name": "粗糙的祖母绿球",
      "nameEn": "Raw Sphere Emerald",
      "rarity": 0,
      "sellPrice": 2000,
      "minDropLevel": 30,
      "maxDropLevel": 34,
      "armor": [
        {
          "stat": 39,
          "mod": 0,
          "value": 10.0
        }
      ],
      "accessory": [
        {
          "stat": 49,
          "mod": 0,
          "value": 0.05
        }
      ],
      "weapon": [
        {
          "stat": 27,
          "mod": 0,
          "value": 0.1
        }
      ]
    },
    {
      "id": "GemEmerald2",
      "name": "碎裂的祖母绿泪滴",
      "nameEn": "Chipped Teardrop Emerald",
      "rarity": 0,
      "sellPrice": 4000,
      "minDropLevel": 35,
      "maxDropLevel": 39,
      "armor": [
        {
          "stat": 39,
          "mod": 0,
          "value": 20.0
        }
      ],
      "accessory": [
        {
          "stat": 49,
          "mod": 0,
          "value": 0.07
        }
      ],
      "weapon": [
        {
          "stat": 27,
          "mod": 0,
          "value": 0.15
        }
      ]
    },
    {
      "id": "GemEmerald3",
      "name": "粗砺的祖母绿方块",
      "nameEn": "Rough Square Emerald",
      "rarity": 0,
      "sellPrice": 6000,
      "minDropLevel": 40,
      "maxDropLevel": 44,
      "armor": [
        {
          "stat": 39,
          "mod": 0,
          "value": 40.0
        }
      ],
      "accessory": [
        {
          "stat": 49,
          "mod": 0,
          "value": 0.09
        }
      ],
      "weapon": [
        {
          "stat": 27,
          "mod": 0,
          "value": 0.2
        }
      ]
    },
    {
      "id": "GemEmerald4",
      "name": "抛光的祖母绿菱形",
      "nameEn": "Polished Rhombus Emerald",
      "rarity": 0,
      "sellPrice": 8000,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 39,
          "mod": 0,
          "value": 80.0
        }
      ],
      "accessory": [
        {
          "stat": 49,
          "mod": 0,
          "value": 0.11
        }
      ],
      "weapon": [
        {
          "stat": 27,
          "mod": 0,
          "value": 0.25
        }
      ]
    },
    {
      "id": "GemEmerald5",
      "name": "无瑕的祖母绿六边形",
      "nameEn": "Flawless Hexagon Emerald",
      "rarity": 0,
      "sellPrice": 10000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 39,
          "mod": 0,
          "value": 105.0
        }
      ],
      "accessory": [
        {
          "stat": 49,
          "mod": 0,
          "value": 0.13
        }
      ],
      "weapon": [
        {
          "stat": 27,
          "mod": 0,
          "value": 0.35
        }
      ]
    },
    {
      "id": "GemEmerald6",
      "name": "璀璨的祖母绿八边形",
      "nameEn": "Radiant Octagon Emerald",
      "rarity": 0,
      "sellPrice": 12000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 39,
          "mod": 0,
          "value": 130.0
        }
      ],
      "accessory": [
        {
          "stat": 49,
          "mod": 0,
          "value": 0.15
        }
      ],
      "weapon": [
        {
          "stat": 27,
          "mod": 0,
          "value": 0.5
        }
      ]
    },
    {
      "id": "GemRuby1",
      "name": "粗糙的红宝石球",
      "nameEn": "Raw Sphere Ruby",
      "rarity": 0,
      "sellPrice": 2000,
      "minDropLevel": 30,
      "maxDropLevel": 34,
      "armor": [
        {
          "stat": 0,
          "mod": 0,
          "value": 5.0
        }
      ],
      "accessory": [
        {
          "stat": 52,
          "mod": 0,
          "value": 0.05
        }
      ],
      "weapon": [
        {
          "stat": 24,
          "mod": 0,
          "value": 0.1
        }
      ]
    },
    {
      "id": "GemRuby2",
      "name": "碎裂的红宝石泪滴",
      "nameEn": "Chipped Teardrop Ruby",
      "rarity": 0,
      "sellPrice": 4000,
      "minDropLevel": 35,
      "maxDropLevel": 39,
      "armor": [
        {
          "stat": 0,
          "mod": 0,
          "value": 10.0
        }
      ],
      "accessory": [
        {
          "stat": 52,
          "mod": 0,
          "value": 0.07
        }
      ],
      "weapon": [
        {
          "stat": 24,
          "mod": 0,
          "value": 0.15
        }
      ]
    },
    {
      "id": "GemRuby3",
      "name": "粗砺的红宝石方块",
      "nameEn": "Rough Square Ruby",
      "rarity": 0,
      "sellPrice": 6000,
      "minDropLevel": 40,
      "maxDropLevel": 44,
      "armor": [
        {
          "stat": 0,
          "mod": 0,
          "value": 15.0
        }
      ],
      "accessory": [
        {
          "stat": 52,
          "mod": 0,
          "value": 0.09
        }
      ],
      "weapon": [
        {
          "stat": 24,
          "mod": 0,
          "value": 0.2
        }
      ]
    },
    {
      "id": "GemRuby4",
      "name": "抛光的红宝石菱形",
      "nameEn": "Polished Rhombus Ruby",
      "rarity": 0,
      "sellPrice": 8000,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 0,
          "mod": 0,
          "value": 20.0
        }
      ],
      "accessory": [
        {
          "stat": 52,
          "mod": 0,
          "value": 0.11
        }
      ],
      "weapon": [
        {
          "stat": 24,
          "mod": 0,
          "value": 0.25
        }
      ]
    },
    {
      "id": "GemRuby5",
      "name": "无瑕的红宝石六边形",
      "nameEn": "Flawless Hexagon Ruby",
      "rarity": 0,
      "sellPrice": 10000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 0,
          "mod": 0,
          "value": 25.0
        }
      ],
      "accessory": [
        {
          "stat": 52,
          "mod": 0,
          "value": 0.13
        }
      ],
      "weapon": [
        {
          "stat": 24,
          "mod": 0,
          "value": 0.35
        }
      ]
    },
    {
      "id": "GemRuby6",
      "name": "璀璨的红宝石八边形",
      "nameEn": "Radiant Octagon Ruby",
      "rarity": 0,
      "sellPrice": 12000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 0,
          "mod": 0,
          "value": 30.0
        }
      ],
      "accessory": [
        {
          "stat": 52,
          "mod": 0,
          "value": 0.15
        }
      ],
      "weapon": [
        {
          "stat": 24,
          "mod": 0,
          "value": 0.5
        }
      ]
    },
    {
      "id": "GemSapphire1",
      "name": "粗糙的蓝宝石球",
      "nameEn": "Raw Sphere Sapphire",
      "rarity": 0,
      "sellPrice": 2000,
      "minDropLevel": 30,
      "maxDropLevel": 34,
      "armor": [
        {
          "stat": 42,
          "mod": 0,
          "value": 0.05
        }
      ],
      "accessory": [
        {
          "stat": 53,
          "mod": 0,
          "value": 0.05
        }
      ],
      "weapon": [
        {
          "stat": 25,
          "mod": 0,
          "value": 0.1
        }
      ]
    },
    {
      "id": "GemSapphire2",
      "name": "碎裂的蓝宝石泪滴",
      "nameEn": "Chipped Teardrop Sapphire",
      "rarity": 0,
      "sellPrice": 4000,
      "minDropLevel": 35,
      "maxDropLevel": 39,
      "armor": [
        {
          "stat": 42,
          "mod": 0,
          "value": 0.08
        }
      ],
      "accessory": [
        {
          "stat": 53,
          "mod": 0,
          "value": 0.07
        }
      ],
      "weapon": [
        {
          "stat": 25,
          "mod": 0,
          "value": 0.15
        }
      ]
    },
    {
      "id": "GemSapphire3",
      "name": "粗砺的蓝宝石方块",
      "nameEn": "Rough Square Sapphire",
      "rarity": 0,
      "sellPrice": 6000,
      "minDropLevel": 40,
      "maxDropLevel": 44,
      "armor": [
        {
          "stat": 42,
          "mod": 0,
          "value": 0.1
        }
      ],
      "accessory": [
        {
          "stat": 53,
          "mod": 0,
          "value": 0.09
        }
      ],
      "weapon": [
        {
          "stat": 25,
          "mod": 0,
          "value": 0.2
        }
      ]
    },
    {
      "id": "GemSapphire4",
      "name": "抛光的蓝宝石菱形",
      "nameEn": "Polished Rhombus Sapphire",
      "rarity": 0,
      "sellPrice": 8000,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 42,
          "mod": 0,
          "value": 0.12
        }
      ],
      "accessory": [
        {
          "stat": 53,
          "mod": 0,
          "value": 0.11
        }
      ],
      "weapon": [
        {
          "stat": 25,
          "mod": 0,
          "value": 0.25
        }
      ]
    },
    {
      "id": "GemSapphire5",
      "name": "无瑕的蓝宝石六边形",
      "nameEn": "Flawless Hexagon Sapphire",
      "rarity": 0,
      "sellPrice": 10000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 42,
          "mod": 0,
          "value": 0.15
        }
      ],
      "accessory": [
        {
          "stat": 53,
          "mod": 0,
          "value": 0.13
        }
      ],
      "weapon": [
        {
          "stat": 25,
          "mod": 0,
          "value": 0.35
        }
      ]
    },
    {
      "id": "GemSapphire6",
      "name": "璀璨的蓝宝石八边形",
      "nameEn": "Radiant Octagon Sapphire",
      "rarity": 0,
      "sellPrice": 12000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 42,
          "mod": 0,
          "value": 0.18
        }
      ],
      "accessory": [
        {
          "stat": 53,
          "mod": 0,
          "value": 0.15
        }
      ],
      "weapon": [
        {
          "stat": 25,
          "mod": 0,
          "value": 0.5
        }
      ]
    },
    {
      "id": "GemTopaz1",
      "name": "粗糙的黄玉球",
      "nameEn": "Raw Sphere Topaz",
      "rarity": 0,
      "sellPrice": 2000,
      "minDropLevel": 30,
      "maxDropLevel": 34,
      "armor": [
        {
          "stat": 1,
          "mod": 0,
          "value": 5.0
        }
      ],
      "accessory": [
        {
          "stat": 54,
          "mod": 0,
          "value": 0.05
        }
      ],
      "weapon": [
        {
          "stat": 26,
          "mod": 0,
          "value": 0.1
        }
      ]
    },
    {
      "id": "GemTopaz2",
      "name": "碎裂的黄玉泪滴",
      "nameEn": "Chipped Teardrop Topaz",
      "rarity": 0,
      "sellPrice": 4000,
      "minDropLevel": 35,
      "maxDropLevel": 39,
      "armor": [
        {
          "stat": 1,
          "mod": 0,
          "value": 10.0
        }
      ],
      "accessory": [
        {
          "stat": 54,
          "mod": 0,
          "value": 0.07
        }
      ],
      "weapon": [
        {
          "stat": 26,
          "mod": 0,
          "value": 0.15
        }
      ]
    },
    {
      "id": "GemTopaz3",
      "name": "粗砺的黄玉方块",
      "nameEn": "Rough Square Topaz",
      "rarity": 0,
      "sellPrice": 6000,
      "minDropLevel": 40,
      "maxDropLevel": 44,
      "armor": [
        {
          "stat": 1,
          "mod": 0,
          "value": 15.0
        }
      ],
      "accessory": [
        {
          "stat": 54,
          "mod": 0,
          "value": 0.09
        }
      ],
      "weapon": [
        {
          "stat": 26,
          "mod": 0,
          "value": 0.2
        }
      ]
    },
    {
      "id": "GemTopaz4",
      "name": "抛光的黄玉菱形",
      "nameEn": "Polished Rhombus Topaz",
      "rarity": 0,
      "sellPrice": 8000,
      "minDropLevel": 45,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 1,
          "mod": 0,
          "value": 20.0
        }
      ],
      "accessory": [
        {
          "stat": 54,
          "mod": 0,
          "value": 0.11
        }
      ],
      "weapon": [
        {
          "stat": 26,
          "mod": 0,
          "value": 0.25
        }
      ]
    },
    {
      "id": "GemTopaz5",
      "name": "无瑕的黄玉六边形",
      "nameEn": "Flawless Hexagon Topaz",
      "rarity": 0,
      "sellPrice": 10000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 1,
          "mod": 0,
          "value": 25.0
        }
      ],
      "accessory": [
        {
          "stat": 54,
          "mod": 0,
          "value": 0.13
        }
      ],
      "weapon": [
        {
          "stat": 26,
          "mod": 0,
          "value": 0.35
        }
      ]
    },
    {
      "id": "GemTopaz6",
      "name": "璀璨的黄玉八边形",
      "nameEn": "Radiant Octagon Topaz",
      "rarity": 0,
      "sellPrice": 12000,
      "minDropLevel": 999,
      "maxDropLevel": 0,
      "armor": [
        {
          "stat": 1,
          "mod": 0,
          "value": 30.0
        }
      ],
      "accessory": [
        {
          "stat": 54,
          "mod": 0,
          "value": 0.15
        }
      ],
      "weapon": [
        {
          "stat": 26,
          "mod": 0,
          "value": 0.5
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "HunterSetRune1_1",
      "name": "设阱者的传承 I",
      "nameEn": "Trapper’s Legacy I",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "HunterSetRune1_2",
      "name": "设阱者的传承 II",
      "nameEn": "Trapper’s Legacy II",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "HunterSetRune1_3",
      "name": "设阱者的传承 III",
      "nameEn": "Trapper’s Legacy III",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 11.35,
          "perLevel": 7.21
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune1_4",
      "name": "设阱者的传承 IV",
      "nameEn": "Trapper’s Legacy IV",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 5,
          "mod": 0,
          "base": null,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune1_5",
      "name": "设阱者的传承 V",
      "nameEn": "Trapper’s Legacy V",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 267,
          "perLevel": 27.69
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune1_6",
      "name": "设阱者的传承 VI",
      "nameEn": "Trapper’s Legacy VI",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 62,
          "mod": 0,
          "base": 0.49,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune2_1",
      "name": "神射手的决心 I",
      "nameEn": "Deadeye’s Resolve I",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "HunterSetRune2_2",
      "name": "神射手的决心 II",
      "nameEn": "Deadeye’s Resolve II",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 5,
          "mod": 0,
          "base": null,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune2_3",
      "name": "神射手的决心 III",
      "nameEn": "Deadeye’s Resolve III",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 11.35,
          "perLevel": 7.21
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune2_4",
      "name": "神射手的决心 IV",
      "nameEn": "Deadeye’s Resolve IV",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 23,
          "mod": 0,
          "base": 0.21,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune2_5",
      "name": "神射手的决心 V",
      "nameEn": "Deadeye’s Resolve V",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 130.97,
          "perLevel": 27.31
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune2_6",
      "name": "神射手的决心 VI",
      "nameEn": "Deadeye’s Resolve VI",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 11,
          "mod": 0,
          "base": 23.2,
          "perLevel": 0.81
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune3_1",
      "name": "毒牙 I",
      "nameEn": "Venomfang I",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "HunterSetRune3_2",
      "name": "毒牙 II",
      "nameEn": "Venomfang II",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "HunterSetRune3_3",
      "name": "毒牙 III",
      "nameEn": "Venomfang III",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 62,
          "mod": 0,
          "base": 0.07,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune3_4",
      "name": "毒牙 IV",
      "nameEn": "Venomfang IV",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 11.35,
          "perLevel": 7.21
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune3_5",
      "name": "毒牙 V",
      "nameEn": "Venomfang V",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 130.97,
          "perLevel": 27.31
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "HunterSetRune3_6",
      "name": "毒牙 VI",
      "nameEn": "Venomfang VI",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 6,
          "mod": 0,
          "base": null,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune1_1",
      "name": "百手符文 (I)",
      "nameEn": "Hundred Hands Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "MonkSetRune1_2",
      "name": "百手符文 (II)",
      "nameEn": "Hundred Hands Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 33,
          "mod": 0,
          "base": null,
          "perLevel": 0.12
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "MonkSetRune1_3",
      "name": "百手符文 (III)",
      "nameEn": "Hundred Hands Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 11.85,
          "perLevel": 7.49
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune1_4",
      "name": "百手符文 (IV)",
      "nameEn": "Hundred Hands Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 6,
          "mod": 0,
          "base": 0.06,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune1_5",
      "name": "百手符文 (V)",
      "nameEn": "Hundred Hands Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 11,
          "mod": 0,
          "base": 11,
          "perLevel": 0.71
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune1_6",
      "name": "百手符文 (VI)",
      "nameEn": "Hundred Hands Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 167.86,
          "perLevel": 14.17
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune2_1",
      "name": "九天轮符文 (I)",
      "nameEn": "Wheel of Nine Heavens Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "MonkSetRune2_2",
      "name": "九天轮符文 (II)",
      "nameEn": "Wheel of Nine Heavens Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 22,
          "mod": 0,
          "base": 0,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "MonkSetRune2_3",
      "name": "九天轮符文 (III)",
      "nameEn": "Wheel of Nine Heavens Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 11.04,
          "perLevel": 2.85
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune2_4",
      "name": "九天轮符文 (IV)",
      "nameEn": "Wheel of Nine Heavens Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 26,
          "mod": 0,
          "base": 0.46,
          "perLevel": 0.02
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune2_5",
      "name": "九天轮符文 (V)",
      "nameEn": "Wheel of Nine Heavens Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 13,
          "mod": 0,
          "base": 0.08,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune2_6",
      "name": "九天轮符文 (VI)",
      "nameEn": "Wheel of Nine Heavens Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 161.86,
          "perLevel": 9.36
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune3_1",
      "name": "蛇信符文 (I)",
      "nameEn": "Serpent's Tongue Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "MonkSetRune3_2",
      "name": "蛇信符文 (II)",
      "nameEn": "Serpent's Tongue Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 22,
          "mod": 0,
          "base": 0,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "MonkSetRune3_3",
      "name": "蛇信符文 (III)",
      "nameEn": "Serpent's Tongue Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 11.04,
          "perLevel": 2.85
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune3_4",
      "name": "蛇信符文 (IV)",
      "nameEn": "Serpent's Tongue Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 23,
          "mod": 0,
          "base": 0.46,
          "perLevel": 0.02
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune3_5",
      "name": "蛇信符文 (V)",
      "nameEn": "Serpent's Tongue Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 40,
          "mod": 0,
          "base": null,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "MonkSetRune3_6",
      "name": "蛇信符文 (VI)",
      "nameEn": "Serpent's Tongue Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 161.86,
          "perLevel": 9.36
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "RareRune_HunterBasicAttack1",
      "name": "毒箭符文",
      "nameEn": "Poison Shot Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 25.24,
          "perLevel": 0.81
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_HunterBasicAttack2",
      "name": "奥术炸弹符文",
      "nameEn": "Arcane Bomb Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 42,
          "mod": 0,
          "base": 0.08,
          "perLevel": 0.02
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_HunterBasicAttack3",
      "name": "飞刀连击符文",
      "nameEn": "Knife Barrage Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 14,
          "mod": 0,
          "base": 30.1,
          "perLevel": 0.8
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_HunterHeavyAttack1",
      "name": "稳固射击符文",
      "nameEn": "Steady Shot Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 44,
          "mod": 0,
          "base": 0.46,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_HunterHeavyAttack2",
      "name": "多重射击符文",
      "nameEn": "Multishot Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 59,
          "mod": 0,
          "base": 0.14,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_HunterHeavyAttack3",
      "name": "急速射击符文",
      "nameEn": "Rapid Fire Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 57,
          "mod": 0,
          "base": 0.04,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_HunterSpecial1",
      "name": "毒陷阱符文",
      "nameEn": "Poison Trap Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 17,
          "mod": 0,
          "base": 0.17,
          "perLevel": 0.06
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_HunterSpecial2",
      "name": "冲击波符文",
      "nameEn": "Shockwave Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 21.32,
          "perLevel": 0.51
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_MonkBasicAttack1",
      "name": "三重击符文",
      "nameEn": "Threefold Strike Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": null,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_MonkBasicAttack2",
      "name": "怒拳符文",
      "nameEn": "Furious Fist Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 42,
          "mod": 0,
          "base": 0.11,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_MonkBasicAttack3",
      "name": "震地击符文",
      "nameEn": "Seismic Strike Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 14,
          "mod": 0,
          "base": 23.7,
          "perLevel": 1.13
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_MonkHeavyAttack1",
      "name": "圣裁之击符文",
      "nameEn": "Sacred Judgment Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 44,
          "mod": 0,
          "base": 0.25,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_MonkHeavyAttack2",
      "name": "穿刺突进符文",
      "nameEn": "Piercing Lunge Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 59,
          "mod": 0,
          "base": 0.38,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_MonkHeavyAttack3",
      "name": "旋风棍式符文",
      "nameEn": "Whirlwind Staff Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 57,
          "mod": 0,
          "base": 0.08,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_MonkSpecial1",
      "name": "神圣法球符文",
      "nameEn": "Sacred Orbs Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 17,
          "mod": 0,
          "base": 0.29,
          "perLevel": 0.08
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_MonkSpecial2",
      "name": "灵气涌流符文",
      "nameEn": "Spirit Stream Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 1,
          "mod": 0,
          "base": 8.57,
          "perLevel": 0.57
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_SorcererBasicAttack1",
      "name": "火球符文",
      "nameEn": "Fire Ball Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 2,
          "mod": 0,
          "base": 8.51,
          "perLevel": 0.65
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_SorcererBasicAttack2",
      "name": "冰碎片符文",
      "nameEn": "Ice Shards Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 42,
          "mod": 0,
          "base": null,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_SorcererBasicAttack3",
      "name": "电击符文",
      "nameEn": "Electrocute Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 14,
          "mod": 0,
          "base": null,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_SorcererSpecial1",
      "name": "冰霜新星符文",
      "nameEn": "Ice Nova Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 17,
          "mod": 0,
          "base": 0.17,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_SorcererSpecial2",
      "name": "火元素符文",
      "nameEn": "Fire Elemental Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 2,
          "mod": 0,
          "base": null,
          "perLevel": 1.85
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_SorcererStrongAttack1",
      "name": "烈焰吐息符文",
      "nameEn": "Flame Breath Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 44,
          "mod": 0,
          "base": 0.46,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_SorcererStrongAttack2",
      "name": "冰陨石符文",
      "nameEn": "Ice Meteor Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 59,
          "mod": 0,
          "base": 0.18,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_SorcererStrongAttack3",
      "name": "闪电风暴符文",
      "nameEn": "Lightning Storm Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 57,
          "mod": 0,
          "base": 0.05,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_WarriorBasicAttack",
      "name": "英勇打击符文",
      "nameEn": "Valiant Strike Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 0,
          "mod": 0,
          "base": 9.2,
          "perLevel": 0.75
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_WarriorBasicAttack2",
      "name": "横扫符文",
      "nameEn": "Cleave Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 42,
          "mod": 0,
          "base": null,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_WarriorBasicAttack3",
      "name": "血刃打击符文",
      "nameEn": "Blood Strike Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 14,
          "mod": 0,
          "base": null,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_WarriorHeavyAttack1",
      "name": "烈焰打击符文",
      "nameEn": "Flame Strike Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 44,
          "mod": 0,
          "base": 0.4,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_WarriorHeavyAttack2",
      "name": "半月斩符文",
      "nameEn": "Half Moon Slash Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 59,
          "mod": 0,
          "base": null,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_WarriorHeavyAttack3",
      "name": "旋风斩符文",
      "nameEn": "Whirlwind Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 57,
          "mod": 0,
          "base": 0.06,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_WarriorRageShield",
      "name": "狂怒护盾符文",
      "nameEn": "Rage Shield Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 0,
          "mod": 0,
          "base": 32,
          "perLevel": 1.64
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "RareRune_WarriorRageShout",
      "name": "怒吼符文",
      "nameEn": "Rage Shout Rune",
      "rarity": 2,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 17,
          "mod": 0,
          "base": 0.13,
          "perLevel": 0.04
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "SorcererSetRune1_1",
      "name": "炼狱盟约符文 (I)",
      "nameEn": "Infernal Covenant Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "SorcererSetRune1_2",
      "name": "炼狱盟约符文 (II)",
      "nameEn": "Infernal Covenant Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "SorcererSetRune1_3",
      "name": "炼狱盟约符文 (III)",
      "nameEn": "Infernal Covenant Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 2,
          "mod": 0,
          "base": 9.92,
          "perLevel": 3.66
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune1_4",
      "name": "炼狱盟约符文 (IV)",
      "nameEn": "Infernal Covenant Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 14,
          "mod": 0,
          "base": 36.09,
          "perLevel": 2.28
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune1_5",
      "name": "炼狱盟约符文 (V)",
      "nameEn": "Infernal Covenant Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 510.04,
          "perLevel": 17.9
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune1_6",
      "name": "炼狱盟约符文 (VI)",
      "nameEn": "Infernal Covenant Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 11,
          "mod": 0,
          "base": 29.58,
          "perLevel": 1.28
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune2_1",
      "name": "冰封弹幕符文 (I)",
      "nameEn": "Frozen Barrage Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "SorcererSetRune2_2",
      "name": "冰封弹幕符文 (II)",
      "nameEn": "Frozen Barrage Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "SorcererSetRune2_3",
      "name": "冰封弹幕符文 (III)",
      "nameEn": "Frozen Barrage Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 2,
          "mod": 0,
          "base": 30.29,
          "perLevel": 4.15
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune2_4",
      "name": "冰封弹幕符文 (IV)",
      "nameEn": "Frozen Barrage Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 33,
          "mod": 0,
          "base": 0.15,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune2_5",
      "name": "冰封弹幕符文 (V)",
      "nameEn": "Frozen Barrage Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 6,
          "mod": 0,
          "base": 0.06,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune2_6",
      "name": "冰封弹幕符文 (VI)",
      "nameEn": "Frozen Barrage Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 255.52,
          "perLevel": 13.18
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune3_1",
      "name": "唤雷者符文 (I)",
      "nameEn": "Stormcaller Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "SorcererSetRune3_2",
      "name": "唤雷者符文 (II)",
      "nameEn": "Stormcaller Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "SorcererSetRune3_3",
      "name": "唤雷者符文 (III)",
      "nameEn": "Stormcaller Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 2,
          "mod": 0,
          "base": 15.3,
          "perLevel": 6.14
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune3_4",
      "name": "唤雷者符文 (IV)",
      "nameEn": "Stormcaller Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 42,
          "mod": 0,
          "base": 0.06,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune3_5",
      "name": "唤雷者符文 (V)",
      "nameEn": "Stormcaller Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 34,
          "mod": 0,
          "base": null,
          "perLevel": 0.02
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "SorcererSetRune3_6",
      "name": "唤雷者符文 (VI)",
      "nameEn": "Stormcaller Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 29,
          "mod": 0,
          "base": 0.13,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_DamageVsBleeding",
      "name": "放血",
      "nameEn": "Bloodletting",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 45,
          "mod": 0,
          "base": 0.15,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_DamageVsDistant",
      "name": "远射",
      "nameEn": "Longshot",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 58,
          "mod": 0,
          "base": 0.23,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_DamageVsElite",
      "name": "巨人杀手",
      "nameEn": "Giantslayer",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 32,
          "mod": 0,
          "base": null,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_DamageVsHealthy",
      "name": "伏击",
      "nameEn": "Ambush",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 29,
          "mod": 0,
          "base": null,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_DamageVsInjured",
      "name": "处决",
      "nameEn": "Execution",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 30,
          "mod": 0,
          "base": null,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_DamageVsPoisoned",
      "name": "疫病",
      "nameEn": "Blight",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 46,
          "mod": 0,
          "base": 0.49,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_DamageVsSlowed",
      "name": "罗网",
      "nameEn": "Snare",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 31,
          "mod": 0,
          "base": 0.16,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_DamageVsStunned",
      "name": "恍惚",
      "nameEn": "Daze",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 43,
          "mod": 0,
          "base": 0.35,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "UncommonRune_VulnerableDamage",
      "name": "脆弱",
      "nameEn": "Frailty",
      "rarity": 1,
      "sellPrice": 500,
      "attributes": [
        {
          "stat": 40,
          "mod": 0,
          "base": 0.41,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune1_1",
      "name": "阿瑟隆之盾符文 (I)",
      "nameEn": "Rune of Atheron's Shield (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "WarriorSetRune1_2",
      "name": "阿瑟隆之盾符文 (II)",
      "nameEn": "Rune of Atheron's Shield (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 51.88,
          "perLevel": 12.09
        },
        {
          "stat": 8,
          "mod": 0,
          "base": 87.45,
          "perLevel": 2
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune1_3",
      "name": "阿瑟隆之盾符文 (III)",
      "nameEn": "Rune of Atheron's Shield (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 317.78,
          "perLevel": 18.84
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "WarriorSetRune1_4",
      "name": "阿瑟隆之盾符文 (IV)",
      "nameEn": "Rune of Atheron's Shield (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 8,
          "mod": 0,
          "base": 36.84,
          "perLevel": 3.08
        },
        {
          "stat": 9,
          "mod": 0,
          "base": 39.33,
          "perLevel": 3.23
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune1_5",
      "name": "阿瑟隆之盾符文 (V)",
      "nameEn": "Rune of Atheron's Shield (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 44,
          "mod": 0,
          "base": 0.49,
          "perLevel": 0.03
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune1_6",
      "name": "阿瑟隆之盾符文 (VI)",
      "nameEn": "Rune of Atheron's Shield (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 400.39,
          "perLevel": 14.8
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune2_1",
      "name": "风暴之眼符文 (I)",
      "nameEn": "Eye of the Storm Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "WarriorSetRune2_2",
      "name": "风暴之眼符文 (II)",
      "nameEn": "Eye of the Storm Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 5,
          "mod": 0,
          "base": null,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "WarriorSetRune2_3",
      "name": "风暴之眼符文 (III)",
      "nameEn": "Eye of the Storm Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 0,
          "mod": 0,
          "base": 8.85,
          "perLevel": 5.75
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune2_4",
      "name": "风暴之眼符文 (IV)",
      "nameEn": "Eye of the Storm Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 23,
          "mod": 0,
          "base": 0.21,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune2_5",
      "name": "风暴之眼符文 (V)",
      "nameEn": "Eye of the Storm Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 130.97,
          "perLevel": 27.31
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune2_6",
      "name": "风暴之眼符文 (VI)",
      "nameEn": "Eye of the Storm Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 11,
          "mod": 0,
          "base": 23.2,
          "perLevel": 0.81
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune3_1",
      "name": "山岳之重符文 (I)",
      "nameEn": "Weight of the Mountain Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "WarriorSetRune3_2",
      "name": "山岳之重符文 (II)",
      "nameEn": "Weight of the Mountain Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 33,
          "mod": 0,
          "base": 0.2,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "WarriorSetRune3_3",
      "name": "山岳之重符文 (III)",
      "nameEn": "Weight of the Mountain Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 6,
          "mod": 0,
          "base": 0.11,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune3_4",
      "name": "山岳之重符文 (IV)",
      "nameEn": "Weight of the Mountain Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 5,
          "mod": 0,
          "base": 0.16,
          "perLevel": 0.09
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune3_5",
      "name": "山岳之重符文 (V)",
      "nameEn": "Weight of the Mountain Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 7,
          "mod": 0,
          "base": 214.67,
          "perLevel": 12.05
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune3_6",
      "name": "山岳之重符文 (VI)",
      "nameEn": "Weight of the Mountain Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 0,
          "mod": 0,
          "base": 10.09,
          "perLevel": 2.33
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune4_1",
      "name": "秋收之月符文 (I)",
      "nameEn": "Harvest Moon Rune (I)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "WarriorSetRune4_2",
      "name": "秋收之月符文 (II)",
      "nameEn": "Harvest Moon Rune (II)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 59,
          "mod": 0,
          "base": 0.09,
          "perLevel": 0
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": 3
    },
    {
      "id": "WarriorSetRune4_3",
      "name": "秋收之月符文 (III)",
      "nameEn": "Harvest Moon Rune (III)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 47,
          "mod": 0,
          "base": 3.35,
          "perLevel": null
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune4_4",
      "name": "秋收之月符文 (IV)",
      "nameEn": "Harvest Moon Rune (IV)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 14,
          "mod": 0,
          "base": 63.09,
          "perLevel": 2.75
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune4_5",
      "name": "秋收之月符文 (V)",
      "nameEn": "Harvest Moon Rune (V)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 5,
          "mod": 0,
          "base": 0.39,
          "perLevel": 0.04
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    },
    {
      "id": "WarriorSetRune4_6",
      "name": "秋收之月符文 (VI)",
      "nameEn": "Harvest Moon Rune (VI)",
      "rarity": 5,
      "sellPrice": 5000,
      "attributes": [
        {
          "stat": 0,
          "mod": 0,
          "base": 13.81,
          "perLevel": 4.02
        }
      ],
      "abilityLevels": null,
      "everyNRuneLevels": null
    }
  ],
  "affixPools": {
    "slotPools": [
      {
        "slot": 1,
        "slotCn": "武器",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 3,
            "statCn": "伤害"
          },
          {
            "stat": 5,
            "statCn": "暴击伤害"
          },
          {
            "stat": 6,
            "statCn": "攻击速度"
          },
          {
            "stat": 33,
            "statCn": "普通攻击伤害"
          },
          {
            "stat": 34,
            "statCn": "强力攻击伤害"
          },
          {
            "stat": 61,
            "statCn": "特殊技能伤害"
          },
          {
            "stat": 23,
            "statCn": "物理伤害"
          },
          {
            "stat": 24,
            "statCn": "火焰伤害"
          },
          {
            "stat": 25,
            "statCn": "冰霜伤害"
          },
          {
            "stat": 26,
            "statCn": "闪电伤害"
          },
          {
            "stat": 27,
            "statCn": "毒素伤害"
          },
          {
            "stat": 28,
            "statCn": "奥术伤害"
          },
          {
            "stat": 29,
            "statCn": "对健康敌人伤害"
          },
          {
            "stat": 30,
            "statCn": "对受伤敌人伤害"
          },
          {
            "stat": 31,
            "statCn": "对减速敌人伤害"
          },
          {
            "stat": 43,
            "statCn": "对眩晕敌人伤害"
          },
          {
            "stat": 32,
            "statCn": "对精英伤害"
          },
          {
            "stat": 45,
            "statCn": "对流血敌人伤害"
          },
          {
            "stat": 58,
            "statCn": "对远程敌人伤害"
          },
          {
            "stat": 46,
            "statCn": "对中毒敌人伤害"
          },
          {
            "stat": 62,
            "statCn": "持续伤害"
          },
          {
            "stat": 63,
            "statCn": "对燃烧敌人伤害"
          },
          {
            "stat": 40,
            "statCn": "易伤伤害"
          }
        ],
        "secondary": [
          {
            "stat": 11,
            "statCn": "命中回复生命"
          },
          {
            "stat": 12,
            "statCn": "击杀回复生命"
          },
          {
            "stat": 35,
            "statCn": "击杀回复法力"
          }
        ]
      },
      {
        "slot": 2,
        "slotCn": "头盔",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 7,
            "statCn": "最大生命值"
          },
          {
            "stat": 14,
            "statCn": "最大法力"
          },
          {
            "stat": 13,
            "statCn": "冷却缩减"
          },
          {
            "stat": 8,
            "statCn": "护甲"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          },
          {
            "stat": 22,
            "statCn": "闪避"
          },
          {
            "stat": 44,
            "statCn": "护甲%"
          },
          {
            "stat": 54,
            "statCn": "闪电伤害减免"
          },
          {
            "stat": 55,
            "statCn": "奥术伤害减免"
          }
        ],
        "secondary": [
          {
            "stat": 36,
            "statCn": "生命回复"
          },
          {
            "stat": 16,
            "statCn": "魔法发现"
          },
          {
            "stat": 15,
            "statCn": "金币获取"
          },
          {
            "stat": 17,
            "statCn": "生命药水发现"
          },
          {
            "stat": 41,
            "statCn": "经验获取"
          }
        ]
      },
      {
        "slot": 3,
        "slotCn": "胸甲",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 7,
            "statCn": "最大生命值"
          },
          {
            "stat": 8,
            "statCn": "护甲"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          },
          {
            "stat": 22,
            "statCn": "闪避"
          },
          {
            "stat": 39,
            "statCn": "荆棘"
          },
          {
            "stat": 44,
            "statCn": "护甲%"
          },
          {
            "stat": 42,
            "statCn": "最大生命值%"
          },
          {
            "stat": 61,
            "statCn": "特殊技能伤害"
          },
          {
            "stat": 29,
            "statCn": "对健康敌人伤害"
          },
          {
            "stat": 30,
            "statCn": "对受伤敌人伤害"
          },
          {
            "stat": 51,
            "statCn": "物理伤害减免"
          },
          {
            "stat": 53,
            "statCn": "冰霜伤害减免"
          }
        ],
        "secondary": [
          {
            "stat": 36,
            "statCn": "生命回复"
          },
          {
            "stat": 11,
            "statCn": "命中回复生命"
          },
          {
            "stat": 15,
            "statCn": "金币获取"
          },
          {
            "stat": 16,
            "statCn": "魔法发现"
          },
          {
            "stat": 41,
            "statCn": "经验获取"
          }
        ]
      },
      {
        "slot": 4,
        "slotCn": "护肩",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 7,
            "statCn": "最大生命值"
          },
          {
            "stat": 8,
            "statCn": "护甲"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          },
          {
            "stat": 22,
            "statCn": "闪避"
          },
          {
            "stat": 39,
            "statCn": "荆棘"
          },
          {
            "stat": 44,
            "statCn": "护甲%"
          },
          {
            "stat": 42,
            "statCn": "最大生命值%"
          },
          {
            "stat": 49,
            "statCn": "毒素伤害减免"
          },
          {
            "stat": 51,
            "statCn": "物理伤害减免"
          }
        ],
        "secondary": [
          {
            "stat": 36,
            "statCn": "生命回复"
          },
          {
            "stat": 11,
            "statCn": "命中回复生命"
          },
          {
            "stat": 15,
            "statCn": "金币获取"
          },
          {
            "stat": 16,
            "statCn": "魔法发现"
          },
          {
            "stat": 41,
            "statCn": "经验获取"
          }
        ]
      },
      {
        "slot": 5,
        "slotCn": "项链",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 7,
            "statCn": "最大生命值"
          },
          {
            "stat": 8,
            "statCn": "护甲"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          },
          {
            "stat": 22,
            "statCn": "闪避"
          },
          {
            "stat": 37,
            "statCn": "法力消耗降低"
          },
          {
            "stat": 53,
            "statCn": "冰霜伤害减免"
          },
          {
            "stat": 52,
            "statCn": "火焰伤害减免"
          },
          {
            "stat": 60,
            "statCn": "暴击伤害减免"
          }
        ],
        "secondary": [
          {
            "stat": 17,
            "statCn": "生命药水发现"
          },
          {
            "stat": 57,
            "statCn": "移动速度%"
          },
          {
            "stat": 11,
            "statCn": "命中回复生命"
          },
          {
            "stat": 16,
            "statCn": "魔法发现"
          },
          {
            "stat": 15,
            "statCn": "金币获取"
          }
        ]
      },
      {
        "slot": 6,
        "slotCn": "手套",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 7,
            "statCn": "最大生命值"
          },
          {
            "stat": 22,
            "statCn": "闪避"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          },
          {
            "stat": 37,
            "statCn": "法力消耗降低"
          },
          {
            "stat": 38,
            "statCn": "药水充能"
          },
          {
            "stat": 13,
            "statCn": "冷却缩减"
          },
          {
            "stat": 6,
            "statCn": "攻击速度"
          },
          {
            "stat": 39,
            "statCn": "荆棘"
          }
        ],
        "secondary": [
          {
            "stat": 17,
            "statCn": "生命药水发现"
          },
          {
            "stat": 36,
            "statCn": "生命回复"
          },
          {
            "stat": 35,
            "statCn": "击杀回复法力"
          },
          {
            "stat": 41,
            "statCn": "经验获取"
          }
        ]
      },
      {
        "slot": 7,
        "slotCn": "腰带",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 4,
            "statCn": "暴击几率"
          },
          {
            "stat": 5,
            "statCn": "暴击伤害"
          },
          {
            "stat": 6,
            "statCn": "攻击速度"
          },
          {
            "stat": 14,
            "statCn": "最大法力"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          },
          {
            "stat": 40,
            "statCn": "易伤伤害"
          },
          {
            "stat": 23,
            "statCn": "物理伤害"
          },
          {
            "stat": 24,
            "statCn": "火焰伤害"
          },
          {
            "stat": 25,
            "statCn": "冰霜伤害"
          },
          {
            "stat": 26,
            "statCn": "闪电伤害"
          },
          {
            "stat": 27,
            "statCn": "毒素伤害"
          },
          {
            "stat": 28,
            "statCn": "奥术伤害"
          },
          {
            "stat": 65,
            "statCn": "伤害%"
          }
        ],
        "secondary": [
          {
            "stat": 11,
            "statCn": "命中回复生命"
          },
          {
            "stat": 12,
            "statCn": "击杀回复生命"
          },
          {
            "stat": 41,
            "statCn": "经验获取"
          },
          {
            "stat": 16,
            "statCn": "魔法发现"
          },
          {
            "stat": 15,
            "statCn": "金币获取"
          }
        ]
      },
      {
        "slot": 8,
        "slotCn": "护腿",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 4,
            "statCn": "暴击几率"
          },
          {
            "stat": 5,
            "statCn": "暴击伤害"
          },
          {
            "stat": 6,
            "statCn": "攻击速度"
          },
          {
            "stat": 13,
            "statCn": "冷却缩减"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          },
          {
            "stat": 33,
            "statCn": "普通攻击伤害"
          },
          {
            "stat": 34,
            "statCn": "强力攻击伤害"
          },
          {
            "stat": 23,
            "statCn": "物理伤害"
          },
          {
            "stat": 24,
            "statCn": "火焰伤害"
          },
          {
            "stat": 25,
            "statCn": "冰霜伤害"
          },
          {
            "stat": 26,
            "statCn": "闪电伤害"
          },
          {
            "stat": 27,
            "statCn": "毒素伤害"
          },
          {
            "stat": 28,
            "statCn": "奥术伤害"
          },
          {
            "stat": 29,
            "statCn": "对健康敌人伤害"
          },
          {
            "stat": 30,
            "statCn": "对受伤敌人伤害"
          },
          {
            "stat": 31,
            "statCn": "对减速敌人伤害"
          },
          {
            "stat": 32,
            "statCn": "对精英伤害"
          },
          {
            "stat": 40,
            "statCn": "易伤伤害"
          },
          {
            "stat": 44,
            "statCn": "护甲%"
          },
          {
            "stat": 65,
            "statCn": "伤害%"
          }
        ],
        "secondary": [
          {
            "stat": 57,
            "statCn": "移动速度%"
          },
          {
            "stat": 11,
            "statCn": "命中回复生命"
          },
          {
            "stat": 16,
            "statCn": "魔法发现"
          },
          {
            "stat": 41,
            "statCn": "经验获取"
          }
        ]
      },
      {
        "slot": 9,
        "slotCn": "靴子",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 13,
            "statCn": "冷却缩减"
          },
          {
            "stat": 37,
            "statCn": "法力消耗降低"
          },
          {
            "stat": 14,
            "statCn": "最大法力"
          },
          {
            "stat": 4,
            "statCn": "暴击几率"
          },
          {
            "stat": 3,
            "statCn": "伤害"
          },
          {
            "stat": 5,
            "statCn": "暴击伤害"
          },
          {
            "stat": 6,
            "statCn": "攻击速度"
          },
          {
            "stat": 60,
            "statCn": "暴击伤害减免"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          }
        ],
        "secondary": [
          {
            "stat": 15,
            "statCn": "金币获取"
          },
          {
            "stat": 16,
            "statCn": "魔法发现"
          },
          {
            "stat": 17,
            "statCn": "生命药水发现"
          },
          {
            "stat": 35,
            "statCn": "击杀回复法力"
          },
          {
            "stat": 41,
            "statCn": "经验获取"
          }
        ]
      },
      {
        "slot": 10,
        "slotCn": "戒指",
        "primary": [
          {
            "stat": 0,
            "statCn": "力量"
          },
          {
            "stat": 1,
            "statCn": "敏捷"
          },
          {
            "stat": 2,
            "statCn": "智力"
          },
          {
            "stat": 7,
            "statCn": "最大生命值"
          },
          {
            "stat": 8,
            "statCn": "护甲"
          },
          {
            "stat": 9,
            "statCn": "魔法抗性"
          },
          {
            "stat": 22,
            "statCn": "闪避"
          },
          {
            "stat": 13,
            "statCn": "冷却缩减"
          },
          {
            "stat": 49,
            "statCn": "毒素伤害减免"
          },
          {
            "stat": 52,
            "statCn": "火焰伤害减免"
          },
          {
            "stat": 60,
            "statCn": "暴击伤害减免"
          },
          {
            "stat": 39,
            "statCn": "荆棘"
          }
        ],
        "secondary": [
          {
            "stat": 36,
            "statCn": "生命回复"
          },
          {
            "stat": 57,
            "statCn": "移动速度%"
          }
        ]
      }
    ],
    "gemSockets": [
      {
        "slot": 1,
        "maxSockets": 3
      },
      {
        "slot": 2,
        "maxSockets": 1
      },
      {
        "slot": 3,
        "maxSockets": 2
      },
      {
        "slot": 4,
        "maxSockets": 2
      },
      {
        "slot": 5,
        "maxSockets": 0
      },
      {
        "slot": 6,
        "maxSockets": 0
      },
      {
        "slot": 7,
        "maxSockets": 1
      },
      {
        "slot": 8,
        "maxSockets": 1
      },
      {
        "slot": 9,
        "maxSockets": 0
      },
      {
        "slot": 10,
        "maxSockets": 0
      },
      {
        "slot": 11,
        "maxSockets": 0
      }
    ],
    "minLevelForSockets": 30
  },
  "loot": {
    "blackMistChance": 0.002,
    "ancientChance": 0.1,
    "minBlackMistDifficulty": 1.0,
    "minDivineDifficulty": 2.0,
    "minSetDifficulty": 2.0,
    "minLegendaryLevel": 10.0,
    "dropSettings": {
      "normal": {
        "min": {
          "noDrop": 87.4,
          "common": 9.0,
          "uncommon": 3.0,
          "rare": 0.6,
          "legendary": 0.0
        },
        "max": {
          "noDrop": 95.0,
          "common": 2.5,
          "uncommon": 1.75,
          "rare": 0.6,
          "legendary": 0.15
        },
        "divineChance": 0.0,
        "gemDropChance": 0.01,
        "rollAttempts": 1
      },
      "elite": {
        "min": {
          "noDrop": 0.0,
          "common": 69.5,
          "uncommon": 23.0,
          "rare": 6.5,
          "legendary": 1.0
        },
        "max": {
          "noDrop": 0.0,
          "common": 47.5,
          "uncommon": 36.0,
          "rare": 15.0,
          "legendary": 1.5
        },
        "divineChance": 3e-06,
        "gemDropChance": 0.06,
        "rollAttempts": 1
      },
      "miniboss": {
        "min": {
          "noDrop": 35.2,
          "common": 33.8,
          "uncommon": 22.5,
          "rare": 7.0,
          "legendary": 1.5
        },
        "max": {
          "noDrop": 10.6,
          "common": 32.4,
          "uncommon": 35.0,
          "rare": 20.0,
          "legendary": 2.0
        },
        "divineChance": 1e-05,
        "gemDropChance": 0.1,
        "rollAttempts": 2
      },
      "boss": {
        "min": {
          "noDrop": 0.0,
          "common": 60.0,
          "uncommon": 30.0,
          "rare": 8.0,
          "legendary": 2.0
        },
        "max": {
          "noDrop": 0.0,
          "common": 38.0,
          "uncommon": 35.0,
          "rare": 24.0,
          "legendary": 3.0
        },
        "divineChance": 1e-05,
        "gemDropChance": 0.12,
        "rollAttempts": 3
      },
      "mythicboss": {
        "min": {
          "noDrop": 0.0,
          "common": 51.8,
          "uncommon": 30.0,
          "rare": 16.2,
          "legendary": 2.0
        },
        "max": {
          "noDrop": 0.0,
          "common": 24.0,
          "uncommon": 37.5,
          "rare": 35.0,
          "legendary": 3.5
        },
        "divineChance": 2e-05,
        "gemDropChance": 0.12,
        "rollAttempts": 3
      }
    },
    "runeDropChance": 0.02,
    "runeMinDropLevel": 40.0
  }
};