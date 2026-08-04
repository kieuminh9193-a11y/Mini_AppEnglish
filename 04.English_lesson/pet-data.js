// ==========================================
// PET CONFIGURATION
// ==========================================
const PET_CONFIG = {
    // --- Pet Types ---
    types: {
        cat: {
            name: "Mèo",
            defaultName: "Mimi",
            description: "Dễ thương, hay nũng nịu",
            emoji: "🐱",
            color: "#ffb347"
        },
        dog: {
            name: "Cún",
            defaultName: "Bobo",
            description: "Năng động, vui vẻ",
            emoji: "🐶",
            color: "#87ceeb"
        },
        bunny: {
            name: "Thỏ",
            defaultName: "Bunny",
            description: "Thông minh, nhanh nhẹn",
            emoji: "🐰",
            color: "#ffb6c1"
        }
    },

    // --- Growth Stages ---
    stages: [
        { name: "Trứng",        minLevel: 0, folder: "egg",   description: "Quả trứng bí ẩn..." },
        { name: "Sơ sinh",      minLevel: 2, folder: "baby",  description: "Bé xíu đáng yêu!" },
        { name: "Nhỏ",          minLevel: 4, folder: "child", description: "Biết chạy nhảy rồi!" },
        { name: "Lớn",          minLevel: 6, folder: "teen",  description: "Khỏe mạnh, năng động!" },
        { name: "Trưởng thành", minLevel: 8, folder: "adult", description: "Oai phong lẫm liệt!" }
    ],

    // --- Moods ---
    moods: {
        happy:  { name: "Vui vẻ",      emoji: "😊", pose: "happy" },
        normal: { name: "Bình thường",  emoji: "😐", pose: "idle"  },
        sad:    { name: "Buồn",         emoji: "😢", pose: "sad"   },
        sleep:  { name: "Đang ngủ",     emoji: "😴", pose: "sleep" }
    },

    // --- Care Activities ---
    activities: {
        feed:  { name: "Cho ăn",     emoji: "🍎", cost: 5,  animation: "feed",  free: false },
        bath:  { name: "Tắm rửa",    emoji: "🛁", cost: 0,  animation: "bath",  free: true  },
        brush: { name: "Đánh răng",   emoji: "🪥", cost: 0,  animation: "brush", free: true  },
        play:  { name: "Chơi bóng",   emoji: "🎾", cost: 0,  animation: "play",  free: true  },
        sleep: { name: "Ru ngủ",      emoji: "😴", cost: 0,  animation: "sleep", free: true  }
    },

    // --- Shop Items ---
    shopItems: [
        { id: "bow",    name: "Nơ hồng",       emoji: "🎀", price: 10, type: "head" },
        { id: "hat",    name: "Mũ phù thủy",   emoji: "🎩", price: 15, type: "head" },
        { id: "shades", name: "Kính mát",       emoji: "🕶️", price: 20, type: "face" },
        { id: "scarf",  name: "Khăn quàng",     emoji: "🧣", price: 15, type: "neck" }
    ],

    // --- XP Rewards ---
    xpRewards: {
        videoComplete:    10,
        memoryComplete:   20,
        listenCorrect:    5,
        listenPerfect:    30,
        readComplete:     15
    },

    // --- Level Calculation ---
    calcLevel(totalXP) {
        return Math.floor(Math.log2(totalXP / 10 + 1));
    },

    getStage(level) {
        let stage = this.stages[0];
        for (let i = this.stages.length - 1; i >= 0; i--) {
            if (level >= this.stages[i].minLevel) {
                stage = this.stages[i];
                break;
            }
        }
        return stage;
    },

    // Get image path for a pet
    getImagePath(petType, level, pose) {
        const stage = this.getStage(level);
        if (stage.folder === "egg") {
            return `assets/pets/${petType}_egg.png`;
        }
        return `assets/pets/${petType}_${stage.folder}_${pose}.png`;
    },

    // Get next level XP requirement
    getNextLevelXP(currentLevel) {
        return Math.round(10 * (Math.pow(2, currentLevel + 1) - 1));
    }
};

// ==========================================
// PET MANAGER — localStorage CRUD + Logic
// ==========================================
const petManager = {
    STORAGE_KEY: "english_lesson_pet",

    // Default save data
    _defaultData() {
        return {
            pets: [],
            totalXP: 0,
            availableXP: 0,
            activePetIndex: 0
        };
    },

    // Load from localStorage
    load() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.error("Pet data load error:", e);
        }
        return this._defaultData();
    },

    // Save to localStorage
    save(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Pet data save error:", e);
        }
    },

    // Check if pet has been selected
    hasPet() {
        const data = this.load();
        return data.pets.length > 0;
    },

    // Get active pet
    getActivePet() {
        const data = this.load();
        if (data.pets.length === 0) return null;
        return data.pets[data.activePetIndex] || data.pets[0];
    },

    // Adopt a new pet
    adoptPet(petType, petName) {
        const data = this.load();
        if (data.pets.length >= 2) return false; // Max 2 pets

        const config = PET_CONFIG.types[petType];
        if (!config) return false;

        data.pets.push({
            petType: petType,
            petName: petName || config.defaultName,
            feedPoints: 0,
            lastCareTime: Date.now(),
            ownedItems: [],
            equippedItems: [],
            stats: { fed: 0, bathed: 0, brushed: 0, played: 0, slept: 0 }
        });

        data.activePetIndex = data.pets.length - 1;
        this.save(data);
        return true;
    },

    // Switch active pet
    switchPet(index) {
        const data = this.load();
        if (index >= 0 && index < data.pets.length) {
            data.activePetIndex = index;
            this.save(data);
        }
    },

    // Add XP (from completing games)
    addXP(amount) {
        const data = this.load();
        data.totalXP += amount;
        data.availableXP += amount;
        this.save(data);
        return data;
    },

    // Spend XP (for feeding / shopping)
    spendXP(amount) {
        const data = this.load();
        if (data.availableXP < amount) return false;
        data.availableXP -= amount;
        this.save(data);
        return true;
    },

    // Get current level (based on feed points, not totalXP)
    getLevel() {
        const pet = this.getActivePet();
        if (!pet) return 0;
        return PET_CONFIG.calcLevel(pet.feedPoints || 0);
    },

    // Get mood of active pet
    getMood() {
        const pet = this.getActivePet();
        if (!pet) return PET_CONFIG.moods.normal;

        const hoursSinceCare = (Date.now() - pet.lastCareTime) / (1000 * 60 * 60);
        if (hoursSinceCare < 24) return PET_CONFIG.moods.happy;
        if (hoursSinceCare < 48) return PET_CONFIG.moods.normal;
        return PET_CONFIG.moods.sad;
    },

    // Perform care activity
    doCare(activityId) {
        const activity = PET_CONFIG.activities[activityId];
        if (!activity) return { success: false, reason: "unknown" };

        const data = this.load();
        const pet = data.pets[data.activePetIndex];
        if (!pet) return { success: false, reason: "no_pet" };

        // Check XP cost
        if (!activity.free && data.availableXP < activity.cost) {
            return { success: false, reason: "no_xp" };
        }

        // Deduct XP if not free
        if (!activity.free) {
            data.availableXP -= activity.cost;
        }

        // Feeding increases feedPoints (growth)
        if (activityId === 'feed') {
            pet.feedPoints = (pet.feedPoints || 0) + activity.cost;
        }

        // Update stats
        const statKey = activityId === "feed" ? "fed" : 
                        activityId === "bath" ? "bathed" :
                        activityId === "brush" ? "brushed" :
                        activityId === "play" ? "played" : "slept";
        pet.stats[statKey] = (pet.stats[statKey] || 0) + 1;
        pet.lastCareTime = Date.now();

        this.save(data);
        return { success: true, activity: activity };
    },

    // Buy shop item
    buyItem(itemId) {
        const item = PET_CONFIG.shopItems.find(i => i.id === itemId);
        if (!item) return { success: false, reason: "unknown" };

        const data = this.load();
        const pet = data.pets[data.activePetIndex];
        if (!pet) return { success: false, reason: "no_pet" };

        // Already owned?
        if (pet.ownedItems.includes(itemId)) {
            return { success: false, reason: "owned" };
        }

        // Enough XP?
        if (data.availableXP < item.price) {
            return { success: false, reason: "no_xp" };
        }

        data.availableXP -= item.price;
        pet.ownedItems.push(itemId);
        this.save(data);
        return { success: true, item: item };
    },

    // Equip / Unequip
    equipItem(itemId) {
        const data = this.load();
        const pet = data.pets[data.activePetIndex];
        if (!pet || !pet.ownedItems.includes(itemId)) return false;

        if (!pet.equippedItems.includes(itemId)) {
            pet.equippedItems.push(itemId);
        }
        this.save(data);
        return true;
    },

    unequipItem(itemId) {
        const data = this.load();
        const pet = data.pets[data.activePetIndex];
        if (!pet) return false;

        pet.equippedItems = pet.equippedItems.filter(id => id !== itemId);
        this.save(data);
        return true;
    },

    // Get XP progress info (level based on feedPoints)
    getProgress() {
        const data = this.load();
        const pet = data.pets[data.activePetIndex];
        const fp = pet ? (pet.feedPoints || 0) : 0;
        const level = PET_CONFIG.calcLevel(fp);
        const stage = PET_CONFIG.getStage(level);
        const currentLevelXP = PET_CONFIG.getNextLevelXP(level - 1);
        const nextLevelXP = PET_CONFIG.getNextLevelXP(level);
        const progress = nextLevelXP > currentLevelXP 
            ? (fp - currentLevelXP) / (nextLevelXP - currentLevelXP) 
            : 1;

        return {
            level,
            stage,
            totalXP: data.totalXP,
            availableXP: data.availableXP,
            progress: Math.min(Math.max(progress, 0), 1),
            nextLevelXP
        };
    }
};
