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

    init() {
        console.log("App Initialized");
    },

    selectUnit(unitId) {
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
            
            // Xử lý dừng video nếu đang ở chế độ đọc từng câu
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

    showView(viewId, mode = null) {
        const video = document.getElementById('lesson-video');
        if (this.currentView === 'video-view' && viewId !== 'video-view') {
            video.pause();
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

            // 1. Phóng pháo hoa (Tiếng rít chói lên cao)
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

            // 2. Pháo hoa nổ (Tiếng nổ xì xì/bốp)
            setTimeout(() => {
                const bufferSize = ctx.sampleRate * 1.5;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

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
        if (this.flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(card.dataset.word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);

        card.classList.add('flipped');
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.isProcessing = true;
            this.checkMemoryMatch();
        }
    },

    checkMemoryMatch() {
        const [card1, card2] = this.flippedCards;
        const match = card1.dataset.word === card2.dataset.word;
        const vocab = LESSON_DATA[this.currentUnitId].vocab;

        if (match) {
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;
                document.getElementById('memory-score').innerText = this.matchedPairs * 10;
                this.flippedCards = [];
                this.isProcessing = false;

                if (this.matchedPairs === vocab.length) {
                    this.triggerConfetti();
                    document.getElementById('restart-memory-btn').classList.remove('hidden');
                }
            }, 500);
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.isProcessing = false;
            }, 1000);
        }
    },

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
            document.getElementById('options-board').innerHTML = `<h3>Thật Tuyệt Vời! Điểm của bạn: ${this.listenScore}/${this.maxListenRounds}</h3>`;
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
        if (document.querySelector('.option-card.correct') || document.querySelector('.option-card.wrong')) {
            return;
        }

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
                if (card.innerText.includes(this.currentListenWord.word)) {
                    card.classList.add('correct');
                }
            });
        }

        this.listenAttempts++;

        setTimeout(() => {
            this.nextListenRound();
        }, 1500);
    },

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
        
        // Highlight word temporarily
        document.querySelectorAll('.word-span').forEach(s => {
            if (s.dataset.raw === word.toLowerCase()) {
                s.classList.add('word-highlight');
                setTimeout(() => s.classList.remove('word-highlight'), 1000);
            }
        });

        let spokenWord = word;
        if (word.toUpperCase() === 'I' || word.toLowerCase() === 'a') {
            spokenWord = word + ','; // Thêm dấu phẩy để hệ thống đọc chuẩn từ, tránh bị nhận diện thành chữ cái hoặc số La Mã
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
        
        // Reset highlight index
        this.currentHighlightIndex = 0;
        document.querySelectorAll('.word-span').forEach(s => s.classList.remove('word-highlight'));
        
        // Lấy tốc độ
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
                        const spokenWord = match[0].toLowerCase();
                        app.highlightWordOnScreen(spokenWord);
                    }
                }
            };
            
            utterance.onend = () => {
                document.querySelectorAll('.word-span').forEach(s => s.classList.remove('word-highlight'));
                i++;
                setTimeout(playNext, 600); // Tạm dừng 0.6s giữa các đoạn
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
        
        // Wrap around if not found (chunk repeats previous words)
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
        }
    },

    prevReadSentence() {
        if (this.currentSentenceIndex > 0) {
            this.currentSentenceIndex--;
            this.renderReadSentence();
        }
    }
};

// Initialize
window.onload = () => app.init();
