const PHONICS_DICT = {
    "exercise": [
        { text: "Ex", speak: "ex" },
        { text: "er", speak: "er" },
        { text: "cise", speak: "size" }
    ],
    "healthy": [
        { text: "heal", speak: "hel" },
        { text: "thy", speak: "thee" }
    ],
    "strong": [
        { text: "strong", speak: "strong" }
    ],
    "and": [
        { text: "and", speak: "and" }
    ],
    "happy": [
        { text: "hap", speak: "hap" },
        { text: "py", speak: "pee" }
    ],
    "energetic": [
        { text: "en", speak: "en" },
        { text: "er", speak: "er" },
        { text: "ge", speak: "je" },
        { text: "tic", speak: "tick" }
    ],
    "performance": [
        { text: "per", speak: "per" },
        { text: "for", speak: "for" },
        { text: "mance", speak: "mans" }
    ],
    "welcome": [
        { text: "wel", speak: "wel" },
        { text: "come", speak: "come" }
    ],
    "children": [
        { text: "chil", speak: "chil" },
        { text: "dren", speak: "dren" }
    ],
    "with": [
        { text: "with", speak: "with" }
    ],
    "taiiku": [
        { text: "Ta", speak: "ta" },
        { text: "i", speak: "ee" },
        { text: "i", speak: "ee" },
        { text: "ku", speak: "koo" }
    ],
    "let's": [
        { text: "Let's", speak: "lets" }
    ],
    "give": [
        { text: "give", speak: "give" }
    ],
    "them": [
        { text: "them", speak: "them" }
    ],
    "a": [
        { text: "a", speak: "ay" }
    ],
    "big": [
        { text: "big", speak: "big" }
    ],
    "round": [
        { text: "round", speak: "round" }
    ],
    "of": [
        { text: "of", speak: "ov" }
    ],
    "applause": [
        { text: "ap", speak: "ap" },
        { text: "plause", speak: "ploz" }
    ],
    "enjoy": [
        { text: "en", speak: "en" },
        { text: "joy", speak: "joy" }
    ],
    "show": [
        { text: "show", speak: "show" }
    ]
};

const app = {
    currentView: 'home-view',
    currentUnitId: null,
    currentMemoryMode: 'emoji',
    
    // Video State
    targetPauseTime: null,

    // Memory Game State
    memoryCards: [],
    flippedCards: [],
    matchedPairs: 0,
    isProcessing: false,

    // Listen Game State
    listenScore: 0,
    currentListenWord: null,
    listenAttempts: 0,
    maxListenRounds: 6,
    currentSelectedListenCard: null,

    // Read Along State
    currentSentenceIndex: 0,
    currentHighlightIndex: 0,

    // Fill State
    fillScore: 0,
    currentFillIndex: 0,
    fillQuestions: [],
    currentSelectedFillCard: null,

    // Unit MC State
    mcCurrentStep: 0,
    mcStepsList: [],
    mcSynth: window.speechSynthesis,
    mcVoices: [],
    mcCurrentUtterance: null,
    mcAutoAdvanceTimer: null,
    mcShowVietnamese: true,
    mcIsSpellingSingleWord: false,
    mcIsListeningActive: false,
    mcListeningIndex: -1,
    mcListenUtterance: null,
    mcListenLoopActive: false,
    mcListenAutoSpeedActive: false,
    mcListenCycleLevel: 0,

    // Pet State
    selectedPetType: null,

    init() {
        console.log("App Initialized");
        this.showView('home-view');
    },

    // ====== PET SELECTION ======
    previewPet(petType) {
        this.selectedPetType = petType;
        document.querySelectorAll('.pet-select-card').forEach(c => c.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
        
        const config = PET_CONFIG.types[petType];
        document.getElementById('pet-name-input').value = config.defaultName;
        document.getElementById('pet-name-form').classList.remove('hidden');
    },

    confirmPetAdoption() {
        if (!this.selectedPetType) return;
        const name = document.getElementById('pet-name-input').value.trim() || PET_CONFIG.types[this.selectedPetType].defaultName;
        
        petManager.adoptPet(this.selectedPetType, name);
        this.selectedPetType = null;
        
        // Reset form
        document.getElementById('pet-name-form').classList.add('hidden');
        document.querySelectorAll('.pet-select-card').forEach(c => c.classList.remove('selected'));
        
        this.updatePetStatusBar();
        this.showView('home-view');
        this.triggerConfetti();
    },

    // ====== PET STATUS BAR ======
    updatePetStatusBar() {
        const bar = document.getElementById('pet-status-bar');
        if (bar) bar.classList.add('hidden');
    },

    // ====== PET ROOM ======
    renderPetRoom() {
        const pet = petManager.getActivePet();
        const data = petManager.load();
        if (!pet) return;

        const progress = petManager.getProgress();
        const mood = petManager.getMood();
        const imgPath = PET_CONFIG.getImagePath(pet.petType, progress.level, mood.pose);

        document.getElementById('pet-room-name').innerText = pet.petName;
        document.getElementById('pet-room-image').src = imgPath;
        document.getElementById('pet-stage-label').innerText = progress.stage.name + ' — Level ' + progress.level;
        document.getElementById('pet-mood-label').innerText = mood.emoji + ' ' + mood.name;
        document.getElementById('pet-xp-fill').style.width = (progress.progress * 100) + '%';
        document.getElementById('pet-level-text').innerText = 'Level ' + progress.level;
        document.getElementById('pet-xp-text').innerText = '💰 ' + data.availableXP + ' XP';

        // Set animation class based on mood
        const petImg = document.getElementById('pet-room-image');
        petImg.className = 'pet-room-img pet-anim-' + mood.pose;

        // Show pet switcher if 2 pets
        if (data.pets.length === 2) {
            document.getElementById('pet-switcher').classList.remove('hidden');
            document.getElementById('switch-pet-0').innerText = data.pets[0].petName;
            document.getElementById('switch-pet-1').innerText = data.pets[1].petName;
            document.getElementById('adopt-second-btn').classList.add('hidden');
        } else if (data.pets.length === 1) {
            document.getElementById('pet-switcher').classList.add('hidden');
            document.getElementById('adopt-second-btn').classList.remove('hidden');
        }
    },

    switchActivePet(index) {
        petManager.switchPet(index);
        this.renderPetRoom();
        this.updatePetStatusBar();
    },

    doPetCare(activityId) {
        const result = petManager.doCare(activityId);
        
        if (!result.success) {
            if (result.reason === 'no_xp') {
                this.showXPPopup('XP không đủ! 📚 Học bài thêm nhé!');
            }
            return;
        }

        const petImg = document.getElementById('pet-room-image');
        const activity = PET_CONFIG.activities[activityId];
        
        // Play care animation
        petImg.className = 'pet-room-img pet-anim-' + activity.animation;
        
        // Spawn particles
        this.spawnCareParticles(activityId);

        // If sleep, switch to sleep pose
        if (activityId === 'sleep') {
            const pet = petManager.getActivePet();
            const level = petManager.getLevel();
            petImg.src = PET_CONFIG.getImagePath(pet.petType, level, 'sleep');
        }

        // After animation, switch to happy
        setTimeout(() => {
            const pet = petManager.getActivePet();
            const level = petManager.getLevel();
            if (activityId !== 'sleep') {
                petImg.src = PET_CONFIG.getImagePath(pet.petType, level, 'happy');
                petImg.className = 'pet-room-img pet-anim-happy';
            }
            
            // After happy, back to idle
            setTimeout(() => {
                if (activityId !== 'sleep') {
                    this.renderPetRoom();
                }
            }, 2000);
        }, 1500);

        this.renderPetRoom();
    },

    spawnCareParticles(activityId) {
        const container = document.getElementById('pet-particles');
        container.innerHTML = '';
        
        const emojis = {
            feed: ['🍎', '🍊', '🥕', '🍇'],
            bath: ['🫧', '🫧', '💧', '🫧'],
            brush: ['✨', '⭐', '✨', '💫'],
            play: ['🎾', '⚽', '🏀', '🎈'],
            sleep: ['💤', '💤', '⭐', '🌙']
        };

        const icons = emojis[activityId] || ['✨'];
        for (let i = 0; i < 6; i++) {
            const p = document.createElement('span');
            p.className = 'particle';
            p.innerText = icons[i % icons.length];
            p.style.left = (20 + Math.random() * 60) + '%';
            p.style.top = (30 + Math.random() * 40) + '%';
            p.style.animationDelay = (Math.random() * 0.5) + 's';
            container.appendChild(p);
        }
    },

    // ====== PET SHOP ======
    renderShop() {
        const data = petManager.load();
        const pet = petManager.getActivePet();
        const grid = document.getElementById('shop-items-grid');
        
        document.getElementById('shop-xp-display').innerHTML = '💰 XP hiện có: <strong>' + data.availableXP + '</strong>';

        grid.innerHTML = PET_CONFIG.shopItems.map(item => {
            const owned = pet && pet.ownedItems.includes(item.id);
            const equipped = pet && pet.equippedItems.includes(item.id);
            
            let btnHtml = '';
            if (owned) {
                if (equipped) {
                    btnHtml = `<button class="btn secondary" onclick="app.unequipShopItem('${item.id}')">Tháo ra</button>`;
                } else {
                    btnHtml = `<button class="btn primary" onclick="app.equipShopItem('${item.id}')">Đeo lên</button>`;
                }
            } else {
                btnHtml = `<button class="btn accent" onclick="app.buyShopItem('${item.id}')">Mua ${item.price} XP</button>`;
            }

            return `
                <div class="shop-item ${owned ? 'owned' : ''}">
                    <div class="item-emoji">${item.emoji}</div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${owned ? '✅ Đã mua' : item.price + ' XP'}</div>
                    ${btnHtml}
                </div>
            `;
        }).join('');
    },

    buyShopItem(itemId) {
        const result = petManager.buyItem(itemId);
        if (!result.success) {
            if (result.reason === 'no_xp') this.showXPPopup('XP không đủ! 📚');
            else if (result.reason === 'owned') this.showXPPopup('Đã mua rồi!');
            return;
        }
        this.showXPPopup('🎉 Mua thành công!');
        this.renderShop();
        this.updatePetStatusBar();
    },

    equipShopItem(itemId) {
        petManager.equipItem(itemId);
        this.renderShop();
    },

    unequipShopItem(itemId) {
        petManager.unequipItem(itemId);
        this.renderShop();
    },

    // ====== XP POPUP ======
    showXPPopup(text) {
        const popup = document.getElementById('xp-popup');
        document.getElementById('xp-popup-text').innerText = text;
        popup.classList.remove('hidden');
        popup.style.animation = 'none';
        popup.offsetHeight; // trigger reflow
        popup.style.animation = 'xp-pop 0.6s ease';
        
        setTimeout(() => popup.classList.add('hidden'), 2000);
    },

    awardXP(amount, label) {
        petManager.addXP(amount);
        this.showXPPopup('+' + amount + ' XP! ' + (label || '🎉'));
        this.updatePetStatusBar();
    },

    // ====== VIEW NAVIGATION ======
    selectUnit(unitId) {
        if (unitId === 'unit_mc') {
            this.currentUnitId = unitId;
            this.showView('unit-mc-view');
            return;
        }
        if (unitId === 'unit4') {
            this.currentUnitId = unitId;
            this.showView('unit4-view');
            return;
        }
        if (LESSON_DATA[unitId]) {
            this.currentUnitId = unitId;
            const unit = LESSON_DATA[unitId];
            
            const video = document.getElementById('lesson-video');
            if (video) {
                video.querySelector('source').src = unit.videoSrc;
                video.load();
            }

            const menuTitle = document.getElementById('menu-title');
            if (menuTitle) menuTitle.innerText = unit.title;

            this.initVideoView();
            this.showView('menu-view');
        } else {
            alert("Unit data not found!");
        }
    },

    initVideoView() {
        const container = document.getElementById('interactive-transcript');
        const video = document.getElementById('lesson-video');
        if (!container || !video || !this.currentUnitId) return;

        const transcriptData = LESSON_DATA[this.currentUnitId].transcriptData;

        container.innerHTML = transcriptData.map((item, index) => 
            `<p class="transcript-line" id="ts-line-${index}" onclick="app.seekVideo(${item.start}, ${index})">${item.text}</p>`
        ).join('');

        video.addEventListener('timeupdate', () => {
            const currentTime = video.currentTime;
            
            if (app.targetPauseTime !== null && currentTime >= app.targetPauseTime) {
                video.pause();
                app.targetPauseTime = null;
            }

            let activeIndex = 0;
            for (let i = 0; i < transcriptData.length; i++) {
                if (currentTime >= transcriptData[i].start) {
                    activeIndex = i;
                } else {
                    break;
                }
            }

            document.querySelectorAll('.transcript-line').forEach(el => el.classList.remove('active'));
            const activeEl = document.getElementById(`ts-line-${activeIndex}`);
            if (activeEl) {
                if (!activeEl.classList.contains('active')) {
                    activeEl.classList.add('active');
                    document.getElementById('video-caption').innerText = transcriptData[activeIndex].text;
                    const containerRect = container.getBoundingClientRect();
                    const elRect = activeEl.getBoundingClientRect();
                    if (elRect.top < containerRect.top || elRect.bottom > containerRect.bottom) {
                        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        });
    },

    changeVideoSpeed(speed) {
        const video = document.getElementById('lesson-video');
        if (video) video.playbackRate = parseFloat(speed);
    },

    seekVideo(time, index) {
        const video = document.getElementById('lesson-video');
        if (video) {
            const wasPaused = video.paused;
            video.currentTime = time;
            
            if (wasPaused) {
                const transcriptData = LESSON_DATA[this.currentUnitId].transcriptData;
                let endTime = video.duration || (time + 5);
                if (index !== undefined && index < transcriptData.length - 1) {
                    endTime = transcriptData[index + 1].start;
                }
                this.targetPauseTime = endTime;
            } else {
                this.targetPauseTime = null;
            }
            
            video.play();
        }
    },

    goBack() {
        if (this.currentUnitId === 'unit_mc') {
            this.showView('unit-mc-view');
        } else {
            this.showView('menu-view');
        }
    },

    showView(viewId, mode = null) {
        const video = document.getElementById('lesson-video');
        if (this.currentView === 'video-view' && viewId !== 'video-view') {
            video.pause();
        }

        // Cancel speech synthesis and cleanup Unit MC timers when leaving/changing views
        window.speechSynthesis.cancel();
        if (this.mcAutoAdvanceTimer) {
            clearTimeout(this.mcAutoAdvanceTimer);
            this.mcAutoAdvanceTimer = null;
        }
        this.mcIsSpellingSingleWord = false;
        if (typeof this.stopMCListening === 'function') {
            this.stopMCListening();
        }
        if (typeof this.hideMCActiveWordBanner === 'function') {
            this.hideMCActiveWordBanner();
        }

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        this.currentView = viewId;

        if (viewId === 'game1-view') {
            if (mode) this.currentMemoryMode = mode;
            this.startMemoryGame(this.currentMemoryMode);
        } else if (viewId === 'game2-view') {
            this.startListenGame();
        } else if (viewId === 'game3-view') {
            this.startReadAlong();
        } else if (viewId === 'game4-view') {
            this.startFillGame();
        } else if (viewId === 'unit-mc-view') {
            this.startUnitMC();
        } else if (viewId === 'unit4-view') {
            this.initU4();
        } else if (viewId === 'pet-room-view') {
            this.renderPetRoom();
        } else if (viewId === 'pet-shop-view') {
            this.renderShop();
        } else if (viewId === 'home-view') {
            this.updatePetStatusBar();
        }
    },

    triggerConfetti() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff9a9e', '#fecfef', '#ff9f43', '#4ecdc4']
            });
            this.playWinSound();
        }
    },

    playWinSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(500, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.5);
            oscGain.gain.setValueAtTime(0, ctx.currentTime);
            oscGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
            oscGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
            osc.connect(oscGain);
            oscGain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.5);
            setTimeout(() => {
                const bufferSize = ctx.sampleRate * 1.5;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(1000, ctx.currentTime);
                filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + 1.5);
                const gain = ctx.createGain();
                gain.gain.setValueAtTime(1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                noise.start(ctx.currentTime);
            }, 450);
        } catch (e) {
            console.error("Audio API not supported", e);
        }
    },

    // ====== GAME 1: MEMORY ======
    startMemoryGame(mode = 'emoji') {
        const board = document.getElementById('memory-board');
        board.innerHTML = '';
        document.getElementById('restart-memory-btn').classList.add('hidden');
        document.getElementById('memory-title').innerText = mode === 'word' ? 'Lật Chữ Giống Nhau' : 'Lật Hình Giống Nhau';

        this.matchedPairs = 0;
        document.getElementById('memory-score').innerText = this.matchedPairs * 10;
        this.flippedCards = [];
        this.isProcessing = false;

        const vocab = LESSON_DATA[this.currentUnitId].vocab;
        let gameItems = [...vocab, ...vocab];
        gameItems.sort(() => 0.5 - Math.random());

        gameItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.word = item.word;
            card.dataset.index = index;
            const content = mode === 'word' ? item.word : item.emoji;
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back" style="${mode === 'word' ? 'font-size: 1.5rem;' : ''}">${content}</div>
                </div>
            `;
            card.addEventListener('click', () => this.flipMemoryCard(card));
            board.appendChild(card);
        });
    },

    flipMemoryCard(card) {
        if (this.flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched') || this.isProcessing) return;

        card.classList.add('flipped');
        this.flippedCards.push(card);
        this.isProcessing = true; // Lock interactions

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(card.dataset.word);
        utterance.lang = 'en-US';
        utterance.rate = this.currentUnitId === 'unit_mc' ? 0.7 : 0.9;

        if (this.flippedCards.length === 2) {
            // Visual match check immediately for instant feedback
            const [card1, card2] = this.flippedCards;
            const isMatch = card1.dataset.word === card2.dataset.word;
            
            if (isMatch) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;
                document.getElementById('memory-score').innerText = this.matchedPairs * 10;
            }

            utterance.onend = () => {
                this.resolveMemoryTurn(isMatch);
            };
            utterance.onerror = () => {
                this.resolveMemoryTurn(isMatch);
            };
        } else {
            // First card spoken
            utterance.onend = () => {
                this.isProcessing = false; // Unlock for second click
            };
            utterance.onerror = () => {
                this.isProcessing = false;
            };
        }

        window.speechSynthesis.speak(utterance);
    },

    resolveMemoryTurn(isMatch) {
        const [card1, card2] = this.flippedCards;
        const vocab = LESSON_DATA[this.currentUnitId].vocab;

        if (isMatch) {
            this.flippedCards = [];
            this.isProcessing = false;

            if (this.matchedPairs === vocab.length) {
                this.triggerConfetti();
                this.awardXP(PET_CONFIG.xpRewards.memoryComplete, '🎮 Hoàn thành!');
                document.getElementById('restart-memory-btn').classList.remove('hidden');
            }
        } else {
            // Very fast flip back delay after speech finishes
            setTimeout(() => {
                if (card1 && card2) {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                }
                this.flippedCards = [];
                this.isProcessing = false;
            }, 300);
        }
    },

    // ====== GAME 2: LISTEN & CHOOSE ======
    startListenGame() {
        this.listenScore = 0;
        this.listenAttempts = 0;
        document.getElementById('listen-score').innerText = this.listenScore;
        document.getElementById('restart-listen-btn').classList.add('hidden');
        this.nextListenRound();
    },

    nextListenRound() {
        document.getElementById('confirm-listen-btn').classList.add('hidden');
        this.currentSelectedListenCard = null;

        if (this.listenAttempts >= this.maxListenRounds) {
            this.triggerConfetti();
            const bonus = this.listenScore === this.maxListenRounds ? PET_CONFIG.xpRewards.listenPerfect : 0;
            const total = (this.listenScore * PET_CONFIG.xpRewards.listenCorrect) + bonus;
            this.awardXP(total, '👂 Nghe giỏi!');
            document.getElementById('options-board').innerHTML = `<h3>Thật Tuyệt Vời! Điểm: ${this.listenScore}/${this.maxListenRounds}</h3>`;
            document.getElementById('restart-listen-btn').classList.remove('hidden');
            return;
        }

        const board = document.getElementById('options-board');
        board.innerHTML = '';
        const vocab = LESSON_DATA[this.currentUnitId].vocab;
        
        this.currentListenWord = vocab[Math.floor(Math.random() * vocab.length)];
        
        let options = [this.currentListenWord];
        let available = vocab.filter(v => v.word !== this.currentListenWord.word);
        available.sort(() => 0.5 - Math.random());
        options.push(available[0], available[1], available[2]);
        options.sort(() => 0.5 - Math.random());

        options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'option-card';
            btn.innerHTML = `<span>${opt.emoji}</span><span>${opt.word}</span>`;
            btn.addEventListener('click', () => this.selectListenOption(btn, opt.word));
            board.appendChild(btn);
        });

        setTimeout(() => this.playCurrentWord(), 500);
    },

    playCurrentWord() {
        if (!this.currentListenWord) return;
        const utterance = new SpeechSynthesisUtterance(this.currentListenWord.word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    },

    selectListenOption(cardElement, selectedWord) {
        if (document.querySelector('.option-card.correct') || document.querySelector('.option-card.wrong')) return;

        document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
        cardElement.classList.add('selected');
        this.currentSelectedListenCard = { cardElement, selectedWord };
        document.getElementById('confirm-listen-btn').classList.remove('hidden');
    },

    confirmListenAnswer() {
        if (!this.currentSelectedListenCard) return;
        const { cardElement, selectedWord } = this.currentSelectedListenCard;
        document.getElementById('confirm-listen-btn').classList.add('hidden');
        this.currentSelectedListenCard = null;

        const isCorrect = selectedWord === this.currentListenWord.word;
        if (isCorrect) {
            cardElement.classList.remove('selected');
            cardElement.classList.add('correct');
            this.listenScore++;
            document.getElementById('listen-score').innerText = this.listenScore;
        } else {
            cardElement.classList.remove('selected');
            cardElement.classList.add('wrong');
            document.querySelectorAll('.option-card').forEach(card => {
                if (card.innerText.includes(this.currentListenWord.word)) card.classList.add('correct');
            });
        }
        this.listenAttempts++;
        setTimeout(() => this.nextListenRound(), 1500);
    },

    // ====== GAME 3: READ ALONG ======
    startReadAlong() {
        this.currentSentenceIndex = 0;
        this.renderReadSentence();
    },

    renderReadSentence() {
        const sentences = LESSON_DATA[this.currentUnitId].sentences;
        const sentence = sentences[this.currentSentenceIndex];
        const card = document.getElementById('read-card');
        
        const parts = sentence.text.split(/<br\s*\/?>/i);
        let htmlLines = parts.map(part => {
            const words = part.split(' ').map(w => {
                const cleanWord = w.replace(/[^a-zA-Z]/g, '');
                return `<span class="word-span" data-raw="${cleanWord.toLowerCase()}" onclick="app.playSingleWord('${cleanWord}')">${w}</span>`;
            }).join(' ');
            return `<div>${words}</div>`;
        }).join('');

        card.innerHTML = `
            <div class="sentence-emoji">${sentence.emoji}</div>
            <div class="sentence-text">${htmlLines}</div>
        `;
        document.getElementById('read-progress').innerText = `${this.currentSentenceIndex + 1} / ${sentences.length}`;
    },

    playSingleWord(word) {
        window.speechSynthesis.cancel();
        document.querySelectorAll('.word-span').forEach(s => {
            if (s.dataset.raw === word.toLowerCase()) {
                s.classList.add('word-highlight');
                setTimeout(() => s.classList.remove('word-highlight'), 1000);
            }
        });

        let spokenWord = word;
        if (word.toUpperCase() === 'I' || word.toLowerCase() === 'a') {
            spokenWord = word + ',';
        }
        const utterance = new SpeechSynthesisUtterance(spokenWord);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    },

    playReadSentence() {
        window.speechSynthesis.cancel();
        const sentences = LESSON_DATA[this.currentUnitId].sentences;
        const sentence = sentences[this.currentSentenceIndex];
        
        this.currentHighlightIndex = 0;
        document.querySelectorAll('.word-span').forEach(s => s.classList.remove('word-highlight'));
        
        let speed = 0.8;
        const speedInput = document.querySelector('input[name="speed"]:checked');
        if (speedInput) speed = parseFloat(speedInput.value);
        
        const toPlay = sentence.chunks || [sentence.text.replace(/<br\s*\/?>/gi, '. ')];
        
        let i = 0;
        const playNext = () => {
            if (i >= toPlay.length) {
                document.querySelectorAll('.word-span').forEach(s => s.classList.remove('word-highlight'));
                return;
            }
            const utterance = new SpeechSynthesisUtterance(toPlay[i]);
            utterance.lang = 'en-US';
            utterance.rate = speed;
            utterance.onboundary = (event) => {
                if (event.name === 'word') {
                    const textAfter = utterance.text.substring(event.charIndex);
                    const match = textAfter.match(/^[a-zA-Z]+/);
                    if (match) {
                        app.highlightWordOnScreen(match[0].toLowerCase());
                    }
                }
            };
            utterance.onend = () => {
                document.querySelectorAll('.word-span').forEach(s => s.classList.remove('word-highlight'));
                i++;
                setTimeout(playNext, 600);
            };
            window.speechSynthesis.speak(utterance);
        };
        playNext();
    },

    highlightWordOnScreen(spokenWord) {
        const spans = document.querySelectorAll('.word-span');
        spans.forEach(s => s.classList.remove('word-highlight'));
        
        let found = false;
        for (let i = this.currentHighlightIndex; i < spans.length; i++) {
            if (spans[i].dataset.raw === spokenWord) {
                spans[i].classList.add('word-highlight');
                this.currentHighlightIndex = i + 1;
                found = true;
                break;
            }
        }
        if (!found) {
            for (let i = 0; i < spans.length; i++) {
                if (spans[i].dataset.raw === spokenWord) {
                    spans[i].classList.add('word-highlight');
                    this.currentHighlightIndex = i + 1;
                    break;
                }
            }
        }
    },

    nextReadSentence() {
        const sentences = LESSON_DATA[this.currentUnitId].sentences;
        if (this.currentSentenceIndex < sentences.length - 1) {
            this.currentSentenceIndex++;
            this.renderReadSentence();
        } else {
            this.triggerConfetti();
            this.awardXP(PET_CONFIG.xpRewards.readComplete, '📖 Đọc giỏi!');
        }
    },

    prevReadSentence() {
        if (this.currentSentenceIndex > 0) {
            this.currentSentenceIndex--;
            this.renderReadSentence();
        }
    },

    // ====== GAME 4: FILL IN THE BLANKS ======
    startFillGame() {
        this.fillScore = 0;
        this.currentFillIndex = 0;
        document.getElementById('restart-fill-btn').classList.add('hidden');
        
        const allQuestions = LESSON_DATA[this.currentUnitId].fillQuestions || [];
        this.fillQuestions = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 6);
        
        document.getElementById('fill-total').innerText = this.fillQuestions.length;
        document.getElementById('fill-score').innerText = this.fillScore;
        
        if (this.fillQuestions.length === 0) {
            document.getElementById('fill-question-card').innerHTML = "<h3>Chưa có câu hỏi cho phần này!</h3>";
            document.getElementById('fill-options-board').innerHTML = "";
            document.getElementById('confirm-fill-btn').classList.add('hidden');
            return;
        }

        this.renderFillQuestion();
    },

    renderFillQuestion() {
        document.getElementById('confirm-fill-btn').classList.add('hidden');
        this.currentSelectedFillCard = null;

        const question = this.fillQuestions[this.currentFillIndex];
        const card = document.getElementById('fill-question-card');
        const board = document.getElementById('fill-options-board');
        
        card.innerHTML = `
            <div class="question-emoji">${question.emoji || "❓"}</div>
            <div class="question-text">${question.question}</div>
        `;
        
        board.innerHTML = "";
        
        const options = [...question.options].sort(() => 0.5 - Math.random());
        options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'fill-option-card';
            btn.innerText = opt;
            btn.addEventListener('click', () => this.selectFillOption(btn, opt));
            board.appendChild(btn);
        });
    },

    selectFillOption(cardElement, selectedOption) {
        if (document.querySelector('.fill-option-card.correct') || document.querySelector('.fill-option-card.wrong')) {
            return;
        }

        document.querySelectorAll('.fill-option-card').forEach(card => card.classList.remove('selected'));
        cardElement.classList.add('selected');
        this.currentSelectedFillCard = { cardElement, selectedOption };
        document.getElementById('confirm-fill-btn').classList.remove('hidden');
    },

    confirmFillAnswer() {
        if (!this.currentSelectedFillCard) return;
        const { cardElement, selectedOption } = this.currentSelectedFillCard;
        document.getElementById('confirm-fill-btn').classList.add('hidden');
        this.currentSelectedFillCard = null;

        const question = this.fillQuestions[this.currentFillIndex];
        const isCorrect = selectedOption === question.answer;

        if (isCorrect) {
            cardElement.classList.remove('selected');
            cardElement.classList.add('correct');
            this.fillScore++;
            document.getElementById('fill-score').innerText = this.fillScore;

            // Fill the blank in the UI
            const card = document.getElementById('fill-question-card');
            let filledText = question.question.replace("______", `<span style="color: #28a745; text-decoration: underline;">${selectedOption}</span>`);
            if (question.question.startsWith("_")) {
                filledText = `<span style="color: #28a745; text-decoration: underline;">${selectedOption}</span>` + question.question.substring(1);
            }
            card.querySelector('.question-text').innerHTML = filledText;

            window.speechSynthesis.cancel();
            let toSpeak = question.question.replace("______", question.answer);
            if (question.question.startsWith("_")) {
                toSpeak = question.answer + question.question.substring(1);
            }
            const utterance = new SpeechSynthesisUtterance(toSpeak);
            utterance.lang = 'en-US';
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);

            setTimeout(() => {
                this.currentFillIndex++;
                if (this.currentFillIndex < this.fillQuestions.length) {
                    this.renderFillQuestion();
                } else {
                    this.triggerConfetti();
                    this.awardXP(20, '✍️ Viết giỏi!');
                    document.getElementById('fill-question-card').innerHTML = `
                        <div class="question-emoji">🎉</div>
                        <div class="question-text">Tuyệt vời! Bé đã hoàn thành trò chơi!</div>
                    `;
                    document.getElementById('fill-options-board').innerHTML = "";
                    document.getElementById('restart-fill-btn').classList.remove('hidden');
                }
            }, 1800);
        } else {
            cardElement.classList.remove('selected');
            cardElement.classList.add('wrong');
            setTimeout(() => {
                cardElement.classList.remove('wrong');
            }, 1000);
        }
    },

    // ====== UNIT MC: BÉ TẬP ĐỌC LOGIC ======
    startUnitMC() {
        this.mcCurrentStep = 0;
        this.mcShowVietnamese = true;
        document.getElementById('mcSubToggleText').textContent = 'Ẩn tiếng Việt';
        
        // Build flat mcStepsList with phrase mode by default
        this.buildMCSteps('phrase');

        // Initialize voices dropdown
        this.initMCVoices();
        this.renderMCStep();
    },

    buildMCSteps(type) {
        this.mcStepsList = [];
        const unitData = LESSON_DATA.unit_mc;
        if (unitData && unitData.sentencesData) {
            unitData.sentencesData.forEach((s) => {
                if (type === 'phrase') {
                    // 1. Phrasal chunks
                    s.phrases.forEach((phraseText, idx) => {
                        this.mcStepsList.push({
                            type: 'phrase',
                            sentenceNum: s.sentenceNum,
                            phraseNum: idx + 1,
                            totalPhrases: s.phrases.length,
                            text: phraseText
                        });
                    });
                }

                // 2. Full sentence step
                this.mcStepsList.push({
                    type: 'full_sentence',
                    sentenceNum: s.sentenceNum,
                    text: s.fullText
                });
            });
        }
    },

    initMCVoices() {
        const voiceSelect = document.getElementById('mcVoiceSelect');
        const loadVoices = () => {
            this.mcVoices = this.mcSynth.getVoices().filter(v => v.lang.startsWith('en'));
            if (this.mcVoices.length === 0) this.mcVoices = this.mcSynth.getVoices();

            voiceSelect.innerHTML = '';
            this.mcVoices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${voice.name} (${voice.lang})`;
                if (voice.lang === 'en-US' || voice.name.includes('US') || voice.name.includes('Samantha')) {
                    option.selected = true;
                }
                voiceSelect.appendChild(option);
            });

            if (this.mcVoices.length === 0) {
                voiceSelect.innerHTML = '<option value="">Giọng đọc mặc định</option>';
            }
        };

        loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    },

    renderMCStep() {
        this.stopMCSpeech();
        if (this.mcStepsList.length === 0) return;

        const stepData = this.mcStepsList[this.mcCurrentStep];
        const mainCard = document.getElementById('mcMainCard');
        const stepBadge = document.getElementById('mcStepBadge');
        const stepInstruction = document.getElementById('mcStepInstruction');
        const playBtn = document.getElementById('mcPlayBtn');
        const playBtnText = document.getElementById('mcPlayBtnText');
        const container = document.getElementById('mcTextDisplay');
        const unitData = LESSON_DATA.unit_mc;

        container.innerHTML = '';

        if (stepData.type === 'phrase') {
            mainCard.className = "bg-white rounded-3xl shadow-md border-2 border-slate-100 p-6 md:p-8 text-center relative overflow-hidden transition-all duration-300 box-border";
            stepBadge.className = "px-3.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700 flex items-center gap-1.5";
            stepBadge.innerHTML = `<i class="fa-solid fa-puzzle-piece text-sky-500"></i> Câu ${stepData.sentenceNum} • Cụm ${stepData.phraseNum}/${stepData.totalPhrases}`;
            
            stepInstruction.textContent = "Bé tập đọc cụm từ qua hình ảnh:";
            playBtn.className = "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 active:scale-95 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-sky-500/30 transition flex items-center gap-3 border-0 cursor-pointer";
            playBtnText.textContent = "Nghe đọc cụm này";
        } else {
            // Full sentence layout
            mainCard.className = "bg-amber-50/70 rounded-3xl shadow-md border-2 border-amber-300 p-6 md:p-8 text-center relative overflow-hidden transition-all duration-300 sentence-mode-card box-border";
            stepBadge.className = "px-3.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 flex items-center gap-1.5 shadow-sm";
            stepBadge.innerHTML = `<i class="fa-solid fa-star text-amber-900"></i> 🌟 Ghép Lại Cả Câu ${stepData.sentenceNum}`;
            
            stepInstruction.textContent = "Tuyệt vời! Giờ cùng nghe nguyên câu hoàn chỉnh nhé:";
            playBtn.className = "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-amber-500/30 transition flex items-center gap-3 border-0 cursor-pointer";
            playBtnText.textContent = "Nghe đọc cả câu";
        }

        // Tokenize and build word cards
        const tokens = stepData.text.match(/[\w']+|[^\w']+/g) || [];
        let wordIndex = 0;

        tokens.forEach(token => {
            const cleanWord = token.replace(/[^a-zA-Z]/g, '');
            const lookupKey = cleanWord || token;
            let dictItem = null;
            if (lookupKey) {
                dictItem = unitData.dictionary[lookupKey];
                if (!dictItem) {
                    const lowerKey = lookupKey.toLowerCase();
                    const dictKey = Object.keys(unitData.dictionary).find(k => k.toLowerCase() === lowerKey);
                    if (dictKey) dictItem = unitData.dictionary[dictKey];
                }
            }

            if (/[\w']/.test(token)) {
                const wIdx = wordIndex;
                wordIndex++;

                // Word Card
                const card = document.createElement('div');
                card.className = 'word-card';
                card.id = `mc-word-card-${wIdx}`;
                card.dataset.word = token;

                const iconDiv = document.createElement('div');
                iconDiv.className = 'word-icon text-2xl md:text-3xl mb-1';
                iconDiv.textContent = dictItem ? dictItem.icon : '🔤';

                const textDiv = document.createElement('div');
                textDiv.className = 'word-text text-base md:text-lg font-bold text-slate-800 flex justify-center gap-0.5';

                const rawCore = token.replace(/[^a-zA-Z']/g, '');
                const coreLower = rawCore.toLowerCase();
                
                if (PHONICS_DICT[coreLower]) {
                    const syllables = PHONICS_DICT[coreLower];
                    syllables.forEach((syl, sIdx) => {
                        let displaySyl = syl.text;
                        if (sIdx === 0 && rawCore[0] && rawCore[0] === rawCore[0].toUpperCase()) {
                            displaySyl = displaySyl.charAt(0).toUpperCase() + displaySyl.slice(1);
                        }
                        textDiv.innerHTML += `<span class="spell-letter inline-block" id="mc-char-${wIdx}-${sIdx}" style="font-size: inherit; letter-spacing: 0.5px;">${displaySyl}</span>`;
                    });
                } else {
                    textDiv.textContent = token;
                }

                const ipaDiv = document.createElement('div');
                ipaDiv.className = 'word-ipa text-[10px] md:text-xs text-sky-600 font-semibold italic select-none';
                ipaDiv.textContent = dictItem && dictItem.ipa ? dictItem.ipa : '';

                const subDiv = document.createElement('div');
                subDiv.className = `word-sub text-[10px] md:text-xs text-slate-400 font-medium ${this.mcShowVietnamese ? '' : 'hidden'}`;
                subDiv.textContent = dictItem ? dictItem.vi : '';

                card.appendChild(iconDiv);
                card.appendChild(textDiv);
                if (dictItem && dictItem.ipa) card.appendChild(ipaDiv);
                if (dictItem && dictItem.vi) card.appendChild(subDiv);

                card.onclick = (e) => {
                    e.stopPropagation();
                    this.spellMCSingleWord(wIdx, token);
                };

                container.appendChild(card);
            } else {
                if (token.trim() !== '') {
                    const punctSpan = document.createElement('span');
                    punctSpan.className = 'text-2xl font-bold text-slate-400 self-end mb-2 px-0.5';
                    punctSpan.textContent = token;
                    container.appendChild(punctSpan);
                }
            }
        });

        // Progress
        document.getElementById('mcCurrentStepNum').textContent = this.mcCurrentStep + 1;
        document.getElementById('mcTotalStepsNum').textContent = this.mcStepsList.length;
        
        const progressPercent = ((this.mcCurrentStep + 1) / this.mcStepsList.length) * 100;
        document.getElementById('mcProgressBar').style.width = `${progressPercent}%`;

        // Nav buttons
        document.getElementById('mcPrevBtn').disabled = (this.mcCurrentStep === 0);
        
        const nextBtn = document.getElementById('mcNextBtn');
        if (this.mcCurrentStep === this.mcStepsList.length - 1) {
            nextBtn.innerHTML = `<span>Hoàn thành bài! 🎉</span>`;
            nextBtn.className = "flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition flex items-center justify-center gap-2 border-0 cursor-pointer";
        } else {
            nextBtn.innerHTML = `<span>Cụm tiếp</span> <i class="fa-solid fa-arrow-right"></i>`;
            nextBtn.className = "flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition flex items-center justify-center gap-2 border-0 cursor-pointer";
        }
    },

    changeMCStep(delta) {
        if (this.mcAutoAdvanceTimer) clearTimeout(this.mcAutoAdvanceTimer);
        const newStep = this.mcCurrentStep + delta;
        if (newStep >= 0 && newStep < this.mcStepsList.length) {
            this.mcCurrentStep = newStep;
            this.renderMCStep();
        } else if (newStep >= this.mcStepsList.length) {
            // Wrap around and trigger confetti + reward XP
            this.triggerConfetti();
            this.awardXP(30, '🎓 Đọc xuất sắc!');
            this.mcCurrentStep = 0;
            this.renderMCStep();
        }
    },

    playMCCurrentStep() {
        this.stopMCSpeech();
        if (this.mcStepsList.length === 0) return;

        const stepData = this.mcStepsList[this.mcCurrentStep];
        this.mcCurrentUtterance = new SpeechSynthesisUtterance(stepData.text);
        this.mcCurrentUtterance.rate = parseFloat(document.getElementById('mcSpeedRange').value);
        this.applyMCSelectedVoice(this.mcCurrentUtterance);

        const cards = document.querySelectorAll('#mcTextDisplay .word-card');
        const unitData = LESSON_DATA.unit_mc;

        // Toggle play/stop buttons
        document.getElementById('mcPlayBtn').classList.add('hidden');
        document.getElementById('mcStopBtn').classList.remove('hidden');
        
        this.mcCurrentUtterance.onboundary = (event) => {
            if (event.name === 'word') {
                this.clearMCHighlights();
                let charAcc = 0;
                cards.forEach(card => {
                    const word = card.dataset.word;
                    const wordIdx = stepData.text.indexOf(word, charAcc);
                    if (event.charIndex >= wordIdx && event.charIndex < wordIdx + word.length) {
                        card.classList.add('speaking');
                        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                        const dictItem = unitData.dictionary[cleanWord] || unitData.dictionary[word];
                        this.showMCActiveWordBanner(word, dictItem ? dictItem.icon : '🔤');
                    }
                });
            }
        };

        this.mcCurrentUtterance.onend = () => {
            this.clearMCHighlights();
            this.hideMCActiveWordBanner();
            document.getElementById('mcPlayBtn').classList.remove('hidden');
            document.getElementById('mcStopBtn').classList.add('hidden');

            const isAutoAdvance = document.getElementById('mcAutoAdvanceToggle').checked;
            if (isAutoAdvance && this.mcCurrentStep < this.mcStepsList.length - 1) {
                this.mcAutoAdvanceTimer = setTimeout(() => {
                    this.changeMCStep(1);
                    this.playMCCurrentStep();
                }, 1400);
            }
        };

        this.mcCurrentUtterance.onerror = () => {
            this.clearMCHighlights();
            this.hideMCActiveWordBanner();
            document.getElementById('mcPlayBtn').classList.remove('hidden');
            document.getElementById('mcStopBtn').classList.add('hidden');
        };

        this.mcSynth.speak(this.mcCurrentUtterance);
    },

    async spellMCSingleWord(wIdx, wordText) {
        this.stopMCSpeech();
        this.mcIsSpellingSingleWord = true;

        const cleanWord = wordText.replace(/[^a-zA-Z']/g, '');
        if (!cleanWord) return;

        const card = document.getElementById(`mc-word-card-${wIdx}`);
        if (card) card.classList.add('active-word', 'scale-105', 'border-indigo-500');

        const coreLower = cleanWord.toLowerCase();
        if (PHONICS_DICT[coreLower]) {
            const syllables = PHONICS_DICT[coreLower];
            for (let j = 0; j < syllables.length; j++) {
                if (!this.mcIsSpellingSingleWord) break;
                
                // Highlight syllable span
                const charEl = document.getElementById(`mc-char-${wIdx}-${j}`);
                if (charEl) charEl.classList.add('active-char');

                // Speak syllable pronunciation
                await this.speakTextAsync(syllables[j].speak, 0.6);
                await new Promise(r => setTimeout(r, 200));

                // Remove highlight
                if (charEl) charEl.classList.remove('active-char');
            }
        } else {
            // Fallback letter-by-letter
            for (let j = 0; j < cleanWord.length; j++) {
                if (!this.mcIsSpellingSingleWord) break;
                const letter = cleanWord[j];
                const charEl = document.getElementById(`mc-char-${wIdx}-${j}`);
                if (charEl) charEl.classList.add('active-char');

                await this.speakTextAsync(letter, 0.55);
                await new Promise(r => setTimeout(r, 200));

                if (charEl) charEl.classList.remove('active-char');
            }
        }

        if (this.mcIsSpellingSingleWord) {
            // Highlight full card
            if (card) card.classList.add('speaking-word');

            // Show active word banner
            const dictItem = LESSON_DATA.unit_mc.dictionary[cleanWord] || LESSON_DATA.unit_mc.dictionary[wordText];
            this.showMCActiveWordBanner(cleanWord, dictItem ? dictItem.icon : '🔤');

            // Speak full blended word
            await this.speakTextAsync(cleanWord, 0.7);
            await new Promise(r => setTimeout(r, 600));
        }

        // Cleanup highlights
        if (card) {
            card.classList.remove('active-word', 'scale-105', 'border-indigo-500', 'speaking-word');
        }
        this.hideMCActiveWordBanner();
        this.mcIsSpellingSingleWord = false;
    },

    stopMCSpeech() {
        this.mcIsSpellingSingleWord = false;
        if (this.mcAutoAdvanceTimer) {
            clearTimeout(this.mcAutoAdvanceTimer);
            this.mcAutoAdvanceTimer = null;
        }
        this.mcSynth.cancel();
        this.clearMCHighlights();
        this.hideMCActiveWordBanner();
        document.getElementById('mcPlayBtn').classList.remove('hidden');
        document.getElementById('mcStopBtn').classList.add('hidden');
    },

    clearMCHighlights() {
        document.querySelectorAll('#mcTextDisplay .word-card').forEach(el => {
            el.classList.remove('speaking', 'active-word', 'scale-105', 'border-indigo-500', 'speaking-word');
        });
        document.querySelectorAll('.spell-letter').forEach(el => {
            el.classList.remove('active-char');
        });
    },

    updateMCSpeed(val) {
        document.getElementById('mcSpeedValue').textContent = `${parseFloat(val).toFixed(1)}x (${val <= 0.7 ? 'Chậm' : 'Chuẩn'})`;
    },

    applyMCSelectedVoice(utterance) {
        const voiceSelect = document.getElementById('mcVoiceSelect');
        const selectedIndex = voiceSelect.value;
        if (selectedIndex !== '' && this.mcVoices[selectedIndex]) {
            utterance.voice = this.mcVoices[selectedIndex];
        } else {
            utterance.lang = 'en-US';
        }
    },

    toggleMCVietnameseSub() {
        this.mcShowVietnamese = !this.mcShowVietnamese;
        const subs = document.querySelectorAll('#mcTextDisplay .word-sub');
        const btnText = document.getElementById('mcSubToggleText');

        subs.forEach(sub => {
            if (this.mcShowVietnamese) {
                sub.classList.remove('hidden');
            } else {
                sub.classList.add('hidden');
            }
        });

        btnText.textContent = this.mcShowVietnamese ? 'Ẩn tiếng Việt' : 'Hiện tiếng Việt';
    },

    showMCActiveWordBanner(word, icon) {
        const banner = document.getElementById('mcActiveWordBanner');
        document.getElementById('mcActiveWordText').textContent = word;
        document.getElementById('mcActiveWordIcon').textContent = icon || '🔤';
        banner.style.opacity = '1';
    },

    hideMCActiveWordBanner() {
        const banner = document.getElementById('mcActiveWordBanner');
        if (banner) banner.style.opacity = '0';
    },

    // ====== UNIT MC: BÉ TẬP NGHE FULL BÀI LOGIC ======
    switchMCMode(mode) {
        this.stopMCSpeech();
        this.stopMCListening(true);

        const btnRead = document.getElementById('mc-btn-read');
        const btnReadSentence = document.getElementById('mc-btn-read-sentence');
        const btnListen = document.getElementById('mc-btn-listen');

        // Reset styling
        [btnRead, btnReadSentence, btnListen].forEach(btn => {
            if (btn) {
                btn.className = "px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-slate-700 border border-slate-200 shadow-sm cursor-pointer transition hover:bg-slate-50";
                btn.style.background = 'none';
            }
        });

        if (mode === 'read') {
            if (btnRead) {
                btnRead.className = "px-5 py-2.5 rounded-xl font-bold text-sm text-white border-0 shadow-md cursor-pointer transition active:scale-95";
                btnRead.style.background = 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)';
            }
            document.getElementById('mc-read-panel').classList.remove('hidden');
            document.getElementById('mc-listen-panel').classList.add('hidden');
            this.buildMCSteps('phrase');
            this.mcCurrentStep = 0;
            this.renderMCStep();
        } else if (mode === 'read_sentence') {
            if (btnReadSentence) {
                btnReadSentence.className = "px-5 py-2.5 rounded-xl font-bold text-sm text-white border-0 shadow-md cursor-pointer transition active:scale-95";
                btnReadSentence.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            }
            document.getElementById('mc-read-panel').classList.remove('hidden');
            document.getElementById('mc-listen-panel').classList.add('hidden');
            this.buildMCSteps('sentence');
            this.mcCurrentStep = 0;
            this.renderMCStep();
        } else if (mode === 'listen') {
            if (btnListen) {
                btnListen.className = "px-5 py-2.5 rounded-xl font-bold text-sm text-white border-0 shadow-md cursor-pointer transition active:scale-95";
                btnListen.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
            }
            document.getElementById('mc-read-panel').classList.add('hidden');
            document.getElementById('mc-listen-panel').classList.remove('hidden');
            this.startMCListening();
        }
    },

    startMCListening() {
        this.stopMCListening(true);
        this.mcListenCycleLevel = 0;
        
        // Reset checkboxes visual state
        const loopChk = document.getElementById('mcListenLoopToggle');
        if (loopChk) loopChk.checked = this.mcListenLoopActive;
        const autoSpeedChk = document.getElementById('mcListenAutoSpeedToggle');
        if (autoSpeedChk) autoSpeedChk.checked = this.mcListenAutoSpeedActive;

        // Setup voice dropdown
        const voiceSelect = document.getElementById('mcListenVoiceSelect');
        if (voiceSelect) {
            const loadVoices = () => {
                this.mcVoices = this.mcSynth.getVoices().filter(v => v.lang.startsWith('en'));
                if (this.mcVoices.length === 0) this.mcVoices = this.mcSynth.getVoices();

                voiceSelect.innerHTML = '';
                this.mcVoices.forEach((voice, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${voice.name} (${voice.lang})`;
                    if (voice.lang === 'en-US' || voice.name.includes('US') || voice.name.includes('Samantha')) {
                        option.selected = true;
                    }
                    voiceSelect.appendChild(option);
                });
            };
            loadVoices();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = loadVoices;
            }
        }

        // Render transcript
        const container = document.getElementById('mcListenTranscriptDisplay');
        if (container) {
            container.innerHTML = '';
            const sentences = LESSON_DATA.unit_mc.sentencesData || [];
            sentences.forEach((s, index) => {
                // Tokenize words to create dynamic highlight spans
                const tokens = s.fullText.match(/[\w']+|[^\w']+/g) || [];
                let wordsHtml = '';
                let wordIdx = 0;
                tokens.forEach(token => {
                    if (/[\w']/.test(token)) {
                        wordsHtml += `<span class="mc-listen-word inline-block transition-all duration-150" id="mc-listen-word-${index}-${wordIdx}" data-word="${token}">${token}</span>`;
                        wordIdx++;
                    } else {
                        wordsHtml += `<span>${token}</span>`;
                    }
                });

                const card = document.createElement('div');
                card.className = 'listen-sentence-card p-4 bg-white rounded-2xl border border-slate-100 shadow-sm cursor-pointer text-left transition hover:bg-slate-50';
                card.id = `mc-listen-sentence-${index}`;
                card.innerHTML = `
                    <div class="flex items-start gap-3 select-none">
                        <span class="text-2xl">💬</span>
                        <div class="text-left flex-1">
                            <p class="text-base md:text-lg font-bold text-slate-800 m-0 leading-snug">${wordsHtml}</p>
                            <p class="text-xs md:text-sm text-slate-400 font-medium m-0 mt-1 leading-snug">${s.vi || ''}</p>
                        </div>
                    </div>
                `;
                card.onclick = (e) => {
                    e.stopPropagation();
                    this.playMCListeningFrom(index);
                };
                container.appendChild(card);
            });
        }
        this.updateMCListenStatus();
    },

    toggleMCListenLoop(checked) {
        this.mcListenLoopActive = checked;
        this.updateMCListenStatus();
    },

    toggleMCListenAutoSpeed(checked) {
        this.mcListenAutoSpeedActive = checked;
        this.mcListenCycleLevel = 0; // reset to slow speed
        this.updateMCListenStatus();
    },

    updateMCListenStatus() {
        const statusEl = document.getElementById('mcListenStatus');
        if (!statusEl) return;
        
        if (!this.mcIsListeningActive) {
            statusEl.innerHTML = '<span class="text-slate-400">Chưa phát</span>';
            return;
        }
        
        let speedText = "";
        if (this.mcListenAutoSpeedActive) {
            const levels = [
                "Lần 1 (Chậm - 0.6x)",
                "Lần 2 (Thường - 0.9x)"
            ];
            speedText = `<span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-bold mr-2">${levels[this.mcListenCycleLevel]}</span>`;
        } else {
            const manualSpeed = parseFloat(document.getElementById('mcListenSpeedRange').value).toFixed(1);
            speedText = `<span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-bold mr-2">Tốc độ: ${manualSpeed}x</span>`;
        }
        
        let loopText = this.mcListenLoopActive ? '<span class="text-emerald-600 font-bold text-xs"><i class="fa-solid fa-arrows-spin"></i> Lặp lại đang bật</span>' : '<span class="text-slate-400 text-xs">Lặp lại đang tắt</span>';
        
        statusEl.innerHTML = `${speedText} ${loopText}`;
    },

    updateMCListenSpeed(val) {
        document.getElementById('mcListenSpeedValue').textContent = `${parseFloat(val).toFixed(1)}x (${val <= 0.7 ? 'Chậm' : 'Chuẩn'})`;
        this.updateMCListenStatus();
    },

    async playMCListening() {
        this.stopMCListening(false);
        this.mcIsListeningActive = true;

        document.getElementById('mcListenPlayBtn').classList.add('hidden');
        document.getElementById('mcListenStopBtn').classList.remove('hidden');
        this.updateMCListenStatus();

        const sentences = LESSON_DATA.unit_mc.sentencesData || [];
        let startIdx = this.mcListeningIndex >= 0 ? this.mcListeningIndex : 0;
        
        for (let i = startIdx; i < sentences.length; i++) {
            if (!this.mcIsListeningActive) break;
            this.mcListeningIndex = i;
            this.highlightListeningSentence(i);

            let speed = parseFloat(document.getElementById('mcListenSpeedRange').value);
            if (this.mcListenAutoSpeedActive) {
                if (this.mcListenCycleLevel === 0) speed = 0.6;
                else if (this.mcListenCycleLevel === 1) speed = 0.9;
            }

            await this.speakListenSentenceAsync(i, sentences[i].fullText, speed);
            await new Promise(r => setTimeout(r, 600));
        }

        if (this.mcIsListeningActive && this.mcListeningIndex === sentences.length - 1) {
            if (this.mcListenAutoSpeedActive) {
                const nextLevel = this.mcListenCycleLevel + 1;
                if (nextLevel < 2) {
                    this.mcListenCycleLevel = nextLevel;
                    this.mcListeningIndex = 0;
                    this.updateMCListenStatus();
                    setTimeout(() => this.playMCListening(), 1000);
                } else {
                    if (this.mcListenLoopActive) {
                        this.mcListenCycleLevel = 0;
                        this.mcListeningIndex = 0;
                        this.updateMCListenStatus();
                        setTimeout(() => this.playMCListening(), 1000);
                    } else {
                        this.stopMCListening(true);
                    }
                }
            } else {
                if (this.mcListenLoopActive) {
                    this.mcListeningIndex = 0;
                    this.updateMCListenStatus();
                    setTimeout(() => this.playMCListening(), 1000);
                } else {
                    this.stopMCListening(true);
                }
            }
        }
    },

    async playMCListeningFrom(index) {
        this.stopMCListening(false);
        this.mcIsListeningActive = true;
        this.mcListeningIndex = index;

        document.getElementById('mcListenPlayBtn').classList.add('hidden');
        document.getElementById('mcListenStopBtn').classList.remove('hidden');
        this.updateMCListenStatus();

        const sentences = LESSON_DATA.unit_mc.sentencesData || [];
        
        for (let i = index; i < sentences.length; i++) {
            if (!this.mcIsListeningActive) break;
            this.mcListeningIndex = i;
            this.highlightListeningSentence(i);

            let speed = parseFloat(document.getElementById('mcListenSpeedRange').value);
            if (this.mcListenAutoSpeedActive) {
                if (this.mcListenCycleLevel === 0) speed = 0.6;
                else if (this.mcListenCycleLevel === 1) speed = 0.9;
            }

            await this.speakListenSentenceAsync(i, sentences[i].fullText, speed);
            await new Promise(r => setTimeout(r, 600));
        }

        if (this.mcIsListeningActive && this.mcListeningIndex === sentences.length - 1) {
            if (this.mcListenAutoSpeedActive) {
                const nextLevel = this.mcListenCycleLevel + 1;
                if (nextLevel < 2) {
                    this.mcListenCycleLevel = nextLevel;
                    this.mcListeningIndex = 0;
                    this.updateMCListenStatus();
                    setTimeout(() => this.playMCListening(), 1000);
                } else {
                    if (this.mcListenLoopActive) {
                        this.mcListenCycleLevel = 0;
                        this.mcListeningIndex = 0;
                        this.updateMCListenStatus();
                        setTimeout(() => this.playMCListening(), 1000);
                    } else {
                        this.stopMCListening(true);
                    }
                }
            } else {
                if (this.mcListenLoopActive) {
                    this.mcListeningIndex = 0;
                    this.updateMCListenStatus();
                    setTimeout(() => this.playMCListening(), 1000);
                } else {
                    this.stopMCListening(true);
                }
            }
        }
    },

    highlightListeningSentence(index) {
        document.querySelectorAll('.listen-sentence-card').forEach(el => {
            el.classList.remove('active-sentence');
        });
        
        const card = document.getElementById(`mc-listen-sentence-${index}`);
        if (card) {
            card.classList.add('active-sentence');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    },

    speakListenSentenceAsync(index, text, rate = 0.8) {
        return new Promise((resolve) => {
            this.mcListenUtterance = new SpeechSynthesisUtterance(text);
            this.mcListenUtterance.lang = 'en-US';
            this.mcListenUtterance.rate = rate;
            
            const voiceSelect = document.getElementById('mcListenVoiceSelect');
            if (voiceSelect && this.mcVoices.length > 0) {
                const selectedVoice = this.mcVoices[voiceSelect.value];
                if (selectedVoice) this.mcListenUtterance.voice = selectedVoice;
            }

            this.mcListenUtterance.onboundary = (event) => {
                if (event.name === 'word') {
                    // Clear previous highlights inside this card
                    document.querySelectorAll(`#mc-listen-sentence-${index} .mc-listen-word`).forEach(el => {
                        el.classList.remove('text-amber-600', 'scale-110', 'underline');
                    });

                    // Highlight active word span
                    let charAcc = 0;
                    const spans = document.querySelectorAll(`#mc-listen-sentence-${index} .mc-listen-word`);
                    spans.forEach(span => {
                        const word = span.dataset.word;
                        const wordIdx = text.indexOf(word, charAcc);
                        if (event.charIndex >= wordIdx && event.charIndex < wordIdx + word.length) {
                            span.classList.add('text-amber-600', 'scale-110', 'underline');
                        }
                        if (wordIdx !== -1) {
                            charAcc = wordIdx + word.length;
                        }
                    });
                }
            };

            this.mcListenUtterance.onend = () => {
                document.querySelectorAll(`#mc-listen-sentence-${index} .mc-listen-word`).forEach(el => {
                    el.classList.remove('text-amber-600', 'scale-110', 'underline');
                });
                resolve();
            };
            this.mcListenUtterance.onerror = () => {
                document.querySelectorAll(`#mc-listen-sentence-${index} .mc-listen-word`).forEach(el => {
                    el.classList.remove('text-amber-600', 'scale-110', 'underline');
                });
                resolve();
            };
            window.speechSynthesis.speak(this.mcListenUtterance);
        });
    },

    stopMCListening(isReset = false) {
        this.mcIsListeningActive = false;
        if (isReset) {
            this.mcListeningIndex = -1;
            this.mcListenCycleLevel = 0;
        }
        window.speechSynthesis.cancel();

        document.querySelectorAll('.listen-sentence-card').forEach(el => {
            el.classList.remove('active-sentence');
        });
        document.querySelectorAll('.mc-listen-word').forEach(el => {
            el.classList.remove('text-amber-600', 'scale-110', 'underline');
        });

        const playBtn = document.getElementById('mcListenPlayBtn');
        const stopBtn = document.getElementById('mcListenStopBtn');
        if (playBtn) playBtn.classList.remove('hidden');
        if (stopBtn) stopBtn.classList.add('hidden');
        
        this.updateMCListenStatus();
    },

    // ====== UNIT 4: TẬP ĐÁNH VẦN & THÊM DẤU TIẾNG VIỆT LOGIC ======
    u4CurrentBaseIndex: 0,
    u4CurrentTone: 'không',
    u4QuizQuestions: [],
    u4QuizIndex: 0,
    u4QuizScore: 0,
    u4ActiveMode: 'deck',
    u4TonesDict: {
        "không": "Không dấu",
        "sắc": "Sắc",
        "huyền": "Huyền",
        "hỏi": "Hỏi",
        "ngã": "Ngã",
        "nặng": "Nặng"
    },

    initU4() {
        if (!window.LESSON_DATA || !window.LESSON_DATA.unit4) {
            console.error("LESSON_DATA.unit4 is not loaded! Possibly a caching issue.");
            alert("Đang tải dữ liệu bài học mới, bé vui lòng tải lại trang (hoặc vuốt xuống để tải lại) nhé!");
            this.showView('home-view');
            return;
        }

        // Load active pet if selectedPetType is empty
        if (!this.selectedPetType && typeof petManager !== 'undefined') {
            const activePet = petManager.getActivePet();
            if (activePet) {
                this.selectedPetType = activePet.petType;
            }
        }

        this.u4CurrentBaseIndex = 0;
        this.u4CurrentTone = 'không';
        this.u4ActiveMode = 'deck';
        this.updateU4XPDisplay();
        this.renderU4BaseList();
        this.renderU4Card();
        
        // Show default panel
        document.getElementById('u4-deck-panel').classList.remove('hidden');
        document.getElementById('u4-quiz-panel').classList.add('hidden');
        
        const btnDeck = document.getElementById('u4-btn-deck');
        const btnQuiz = document.getElementById('u4-btn-quiz');
        if (btnDeck) {
            btnDeck.className = "px-5 py-2.5 rounded-xl font-bold text-sm text-white border-0 shadow-md cursor-pointer transition active:scale-95";
            btnDeck.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        }
        if (btnQuiz) {
            btnQuiz.className = "px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-slate-700 border border-slate-200 shadow-sm cursor-pointer transition hover:bg-slate-50";
            btnQuiz.style.background = 'none';
        }
    },

    updateU4XPDisplay() {
        let currentXP = 0;
        if (typeof petManager !== 'undefined') {
            const data = petManager.load();
            currentXP = data.availableXP || 0;
        }
        const xpText = `${currentXP} XP`;
        const u4Xp = document.getElementById('unit4-xp-text');
        if (u4Xp) u4Xp.textContent = xpText;
        
        const petAvatar = document.getElementById('unit4-pet-avatar');
        if (petAvatar && this.selectedPetType) {
            petAvatar.src = `assets/pets/${this.selectedPetType}_baby_idle.png`;
        }
    },

    renderU4BaseList() {
        const container = document.getElementById('u4-base-list');
        if (!container) return;
        
        const bases = LESSON_DATA.unit4.bases;
        container.innerHTML = bases.map((b, idx) => {
            const activeClass = (idx === this.u4CurrentBaseIndex) ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-100 bg-white text-slate-700';
            return `
                <button onclick="app.selectU4Base(${idx})" class="w-full text-left p-3.5 rounded-2xl border-2 font-black text-lg transition duration-200 cursor-pointer flex items-center justify-between ${activeClass}">
                    <span>${b.base}</span>
                    <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">${Object.keys(b.words).length} từ</span>
                </button>
            `;
        }).join('');
    },

    selectU4Base(idx) {
        this.u4CurrentBaseIndex = idx;
        const baseObj = LESSON_DATA.unit4.bases[idx];
        
        if (!baseObj.words[this.u4CurrentTone]) {
            this.u4CurrentTone = 'không';
        }
        
        this.renderU4BaseList();
        this.renderU4Card();
        this.speakU4CurrentWord();
    },

    selectU4Tone(tone) {
        const baseObj = LESSON_DATA.unit4.bases[this.u4CurrentBaseIndex];
        if (!baseObj.words[tone]) return;
        
        this.u4CurrentTone = tone;
        this.renderU4Card();
        this.speakU4CurrentWord();
    },

    renderU4Card() {
        const baseObj = LESSON_DATA.unit4.bases[this.u4CurrentBaseIndex];
        const wordData = baseObj.words[this.u4CurrentTone];
        if (!wordData) return;

        document.getElementById('u4-card-emoji').textContent = wordData.emoji;
        document.getElementById('u4-card-word').textContent = wordData.word;
        document.getElementById('u4-card-meaning').textContent = wordData.meaning;
        document.getElementById('u4-card-spelling').textContent = wordData.spell;

        const tones = ['không', 'sắc', 'huyền', 'hỏi', 'ngã', 'nặng'];
        tones.forEach(tone => {
            const btn = document.getElementById(`u4-tone-${tone}`);
            if (!btn) return;

            const isSupported = !!baseObj.words[tone];
            if (!isSupported) {
                btn.className = "flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 opacity-20 pointer-events-none transition";
            } else if (tone === this.u4CurrentTone) {
                btn.className = "flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50 text-emerald-800 scale-105 shadow-sm active:scale-95 transition cursor-pointer";
            } else {
                btn.className = "flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-slate-100 active:scale-95 transition cursor-pointer";
            }
        });
    },

    speakU4CurrentWord() {
        const baseObj = LESSON_DATA.unit4.bases[this.u4CurrentBaseIndex];
        const wordData = baseObj.words[this.u4CurrentTone];
        if (!wordData) return;

        const spellText = wordData.spell.replace(/-/g, ', ');
        const speechString = `${spellText}, ... , ${wordData.word}`;
        
        this.speakU4Text(speechString);
    },

    speakU4Text(text, rate = 0.85) {
        return new Promise((resolve) => {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const viVoice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith('vi'));
            if (viVoice) {
                utterance.voice = viVoice;
            }
            utterance.lang = 'vi-VN';
            utterance.rate = rate;
            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();
            window.speechSynthesis.speak(utterance);
        });
    },

    switchU4Mode(mode) {
        this.u4ActiveMode = mode;
        const btnDeck = document.getElementById('u4-btn-deck');
        const btnQuiz = document.getElementById('u4-btn-quiz');

        if (btnDeck) btnDeck.style.background = 'none';
        if (btnQuiz) btnQuiz.style.background = 'none';
        if (btnDeck) btnDeck.className = "px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-slate-700 border border-slate-200 shadow-sm transition hover:bg-slate-50";
        if (btnQuiz) btnQuiz.className = "px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-slate-700 border border-slate-200 shadow-sm transition hover:bg-slate-50";

        if (mode === 'deck') {
            if (btnDeck) {
                btnDeck.className = "px-5 py-2.5 rounded-xl font-bold text-sm text-white border-0 shadow-md cursor-pointer transition active:scale-95";
                btnDeck.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            }
            document.getElementById('u4-deck-panel').classList.remove('hidden');
            document.getElementById('u4-quiz-panel').classList.add('hidden');
        } else if (mode === 'quiz') {
            if (btnQuiz) {
                btnQuiz.className = "px-5 py-2.5 rounded-xl font-bold text-sm text-white border-0 shadow-md cursor-pointer transition active:scale-95";
                btnQuiz.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            }
            document.getElementById('u4-deck-panel').classList.add('hidden');
            document.getElementById('u4-quiz-panel').classList.remove('hidden');
            this.startU4Quiz();
        }
    },

    startU4Quiz() {
        this.u4QuizScore = 0;
        this.u4QuizIndex = 0;
        this.u4QuizQuestions = [];

        const allWords = [];
        LESSON_DATA.unit4.bases.forEach(baseObj => {
            Object.keys(baseObj.words).forEach(tone => {
                allWords.push({
                    base: baseObj.base,
                    tone: tone,
                    word: baseObj.words[tone].word,
                    meaning: baseObj.words[tone].meaning,
                    emoji: baseObj.words[tone].emoji,
                    spell: baseObj.words[tone].spell
                });
            });
        });

        const shuffled = allWords.sort(() => 0.5 - Math.random());
        this.u4QuizQuestions = shuffled.slice(0, 10);

        const container = document.getElementById('u4-quiz-panel');
        if (container) {
            container.innerHTML = `
                <div class="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8 text-center relative overflow-hidden box-border">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider select-none">Luyện tập thêm dấu</span>
                        <span id="u4-quiz-progress-text" class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full select-none">Câu hỏi 1 / 10</span>
                    </div>
                    <div class="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                        <div id="u4-quiz-progress-bar" class="h-full bg-emerald-500 transition-all duration-300" style="width: 10%"></div>
                    </div>
                    <div class="my-6">
                        <div id="u4-quiz-emoji" class="text-7xl md:text-8xl my-2 filter drop-shadow-md select-none animate-pulse-slow">🍆</div>
                        <div id="u4-quiz-word-display" class="text-4xl md:text-5xl font-black text-slate-800 tracking-wide m-0 my-3">Quả c<span class="text-red-500 underline decoration-wavy decoration-2">à</span></div>
                        <p id="u4-quiz-meaning-display" class="text-base md:text-lg font-bold text-slate-500 m-0">Ý nghĩa: Quả cà tím</p>
                    </div>
                    <div class="flex justify-center mb-6">
                        <button onclick="app.playU4QuizVoice()" class="bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-700 font-bold px-5 py-2.5 rounded-2xl border border-emerald-200 transition flex items-center gap-2 cursor-pointer">
                            <i class="fa-solid fa-volume-high text-lg"></i>
                            <span>Nghe giọng đọc</span>
                        </button>
                    </div>
                    <div class="text-center mb-6">
                        <p class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider select-none">Bé hãy chọn dấu thanh phù hợp:</p>
                        <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
                            <button onclick="app.submitU4QuizAnswer('không')" class="flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 transition cursor-pointer">
                                <span class="text-xl font-extrabold text-slate-800">a</span>
                                <span class="text-[10px] text-slate-500 font-bold">Không dấu</span>
                            </button>
                            <button onclick="app.submitU4QuizAnswer('sắc')" class="flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 transition cursor-pointer">
                                <span class="text-xl font-extrabold text-slate-800">á</span>
                                <span class="text-[10px] text-slate-500 font-bold">Dấu Sắc</span>
                            </button>
                            <button onclick="app.submitU4QuizAnswer('huyền')" class="flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 transition cursor-pointer">
                                <span class="text-xl font-extrabold text-slate-800">à</span>
                                <span class="text-[10px] text-slate-500 font-bold">Dấu Huyền</span>
                            </button>
                            <button onclick="app.submitU4QuizAnswer('hỏi')" class="flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 transition cursor-pointer">
                                <span class="text-xl font-extrabold text-slate-800">ả</span>
                                <span class="text-[10px] text-slate-500 font-bold">Dấu Hỏi</span>
                            </button>
                            <button onclick="app.submitU4QuizAnswer('ngã')" class="flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 transition cursor-pointer">
                                <span class="text-xl font-extrabold text-slate-800">ã</span>
                                <span class="text-[10px] text-slate-500 font-bold">Dấu Ngã</span>
                            </button>
                            <button onclick="app.submitU4QuizAnswer('nặng')" class="flex flex-col items-center gap-1 p-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 transition cursor-pointer">
                                <span class="text-xl font-extrabold text-slate-800">ạ</span>
                                <span class="text-[10px] text-slate-500 font-bold">Dấu Nặng</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        this.renderU4QuizQuestion();
    },

    renderU4QuizQuestion() {
        if (this.u4QuizIndex >= this.u4QuizQuestions.length) {
            this.showU4QuizResults();
            return;
        }

        const question = this.u4QuizQuestions[this.u4QuizIndex];
        
        const progressText = `Câu hỏi ${this.u4QuizIndex + 1} / ${this.u4QuizQuestions.length}`;
        document.getElementById('u4-quiz-progress-text').textContent = progressText;
        const progressPct = ((this.u4QuizIndex + 1) / this.u4QuizQuestions.length) * 100;
        document.getElementById('u4-quiz-progress-bar').style.width = `${progressPct}%`;

        document.getElementById('u4-quiz-emoji').textContent = question.emoji;
        
        const displayHtml = `Từ gốc: <span class="text-emerald-600 font-black">${question.base}</span> ➡️ Cần tạo chữ: <span class="text-red-600 font-black underline decoration-wavy decoration-3">${question.word.toUpperCase()}</span>`;
        document.getElementById('u4-quiz-word-display').innerHTML = displayHtml;
        document.getElementById('u4-quiz-meaning-display').textContent = `Ý nghĩa: ${question.meaning}`;

        this.playU4QuizVoice();
    },

    playU4QuizVoice() {
        const question = this.u4QuizQuestions[this.u4QuizIndex];
        if (!question) return;

        const promptText = `Bé hãy chọn dấu thanh để tạo thành chữ: ${question.word}`;
        this.speakU4Text(promptText);
    },

    submitU4QuizAnswer(tone) {
        const question = this.u4QuizQuestions[this.u4QuizIndex];
        if (!question) return;

        const isCorrect = (tone === question.tone);
        
        if (isCorrect) {
            this.u4QuizScore++;
            this.awardXP(10, 'Chính xác! 🎉');
            this.updateU4XPDisplay();
            
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.8 }
            });

            this.speakU4Text("Chính xác! Bé giỏi quá!");
        } else {
            this.speakU4Text(`Chưa chính xác rồi. Dấu đúng là dấu: ${this.u4TonesDict[question.tone] || question.tone}`);
            this.showXPPopup(`Dấu đúng là: ${this.u4TonesDict[question.tone] || question.tone}`);
        }

        this.u4QuizIndex++;
        setTimeout(() => {
            this.renderU4QuizQuestion();
        }, 2200);
    },

    showU4QuizResults() {
        const container = document.getElementById('u4-quiz-panel');
        if (!container) return;

        const earnedXP = this.u4QuizScore * 10;
        container.innerHTML = `
            <div class="max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-center box-border animate-bounce-slow">
                <div class="text-7xl my-4">🏆</div>
                <h2 class="text-2xl font-extrabold text-slate-800 m-0 mb-2">Hoàn Thành Thử Thách!</h2>
                <p class="text-slate-500 font-bold m-0 mb-6">Kết quả luyện tập của bé:</p>
                
                <div class="flex justify-center gap-6 mb-6">
                    <div class="bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
                        <div class="text-xs text-emerald-600 font-bold uppercase tracking-wider">Đúng</div>
                        <div class="text-2xl font-black text-emerald-700">${this.u4QuizScore} / 10</div>
                    </div>
                    <div class="bg-amber-50 px-5 py-3 rounded-2xl border border-amber-100">
                        <div class="text-xs text-amber-600 font-bold uppercase tracking-wider">XP Nhận</div>
                        <div class="text-2xl font-black text-amber-700">+${earnedXP} XP</div>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <button onclick="app.startU4Quiz()" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg py-3.5 rounded-2xl shadow-md border-0 cursor-pointer transition active:scale-95">
                        🔄 Chơi Lại
                    </button>
                    <button onclick="app.switchU4Mode('deck')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3 rounded-2xl border-0 cursor-pointer transition active:scale-95">
                        ⬅️ Quay Lại Bé Tập Đọc
                    </button>
                </div>
            </div>
        `;
    },

    speakTextAsync(text, rate = 0.7) {
        return new Promise((resolve) => {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = rate;
            this.applyMCSelectedVoice(utterance);
            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();
            window.speechSynthesis.speak(utterance);
        });
    }
};

// Initialize
window.onload = () => app.init();
