const LESSON_DATA = {
    "unit1": {
        title: "Unit 1: This is me",
        videoSrc: "REF/3663094155105559082.mp4",
        vocab: [
            { word: "Eyes", emoji: "👀" },
            { word: "Ears", emoji: "👂" },
            { word: "Nose", emoji: "👃" },
            { word: "Mouth", emoji: "👄" },
            { word: "Hand", emoji: "✋" },
            { word: "Foot", emoji: "🦶" }
        ],
        transcriptData: [
            { start: 0.0, text: "Unit one. This is me." },
            { start: 6.0, text: "Lungs." },
            { start: 10.0, text: "Breathe." },
            { start: 13.0, text: "What can you do with your lungs?" },
            { start: 19.0, text: "I can breathe with my lungs." },
            { start: 25.0, text: "Hands." },
            { start: 29.0, text: "Feet." },
            { start: 32.0, text: "What do you use your hands for?" },
            { start: 37.0, text: "I use my hands for waving." },
            { start: 43.0, text: "What do you use your feet for?" },
            { start: 48.0, text: "I use my feet for running." },
            { start: 54.0, text: "Fridge." },
            { start: 58.0, text: "Sofa." },
            { start: 62.0, text: "Kitchen." },
            { start: 66.0, text: "Living room." },
            { start: 70.0, text: "Cooker." },
            { start: 74.0, text: "TV." },
            { start: 78.0, text: "What do you see in the kitchen?" },
            { start: 83.0, text: "I see food in the fridge." },
            { start: 90.0, text: "What do you see in the living room?" },
            { start: 96.0, text: "I see a cat on the sofa." },
            { start: 102.0, text: "Mother." },
            { start: 106.0, text: "Father." },
            { start: 110.0, text: "What does your father do?" },
            { start: 115.0, text: "He is a doctor." },
            { start: 119.0, text: "What does your mother do?" },
            { start: 123.0, text: "She is a teacher." },
            { start: 128.0, text: "Brush." },
            { start: 132.0, text: "Teeth." },
            { start: 136.0, text: "Fruits." },
            { start: 140.0, text: "Milk." },
            { start: 143.0, text: "Vegetables." },
            { start: 147.0, text: "Candies." },
            { start: 151.0, text: "Cakes." },
            { start: 155.0, text: "Chocolate." },
            { start: 158.0, text: "What do you do for your teeth?" },
            { start: 164.0, text: "I brush my teeth." },
            { start: 172.0, text: "What foods are good for your teeth?" },
            { start: 178.0, text: "Fruits, vegetables, and milk." },
            { start: 185.0, text: "What foods are not good for your teeth?" },
            { start: 191.0, text: "Candies, cakes, and chocolate." },
            { start: 198.0, text: "Friends." },
            { start: 202.0, text: "Take turns." },
            { start: 207.0, text: "How do you play with your friends?" },
            { start: 212.0, text: "I take turns playing with my friends." }
        ],
        sentences: [
            { 
                text: "What can you do with your lungs?<br>I can breathe with my lungs.", emoji: "🫁",
                chunks: [
                    "What can you do",
                    "with your lungs?",
                    "What can you do with your lungs?",
                    "I can breathe",
                    "with my lungs.",
                    "I can breathe with my lungs."
                ]
            },
            { 
                text: "What do you use your hands for?<br>I use my hands for waving.", emoji: "👋",
                chunks: [
                    "What do you use",
                    "your hands for?",
                    "What do you use your hands for?",
                    "I use my hands",
                    "for waving.",
                    "I use my hands for waving."
                ]
            },
            { 
                text: "What do you use your feet for?<br>I use my feet for running.", emoji: "🏃‍♂️",
                chunks: [
                    "What do you use",
                    "your feet for?",
                    "What do you use your feet for?",
                    "I use my feet",
                    "for running.",
                    "I use my feet for running."
                ]
            },
            { 
                text: "What do you see in the kitchen?<br>I see food in the fridge.", emoji: "🧑‍🍳",
                chunks: [
                    "What do you see",
                    "in the kitchen?",
                    "What do you see in the kitchen?",
                    "I see food",
                    "in the fridge.",
                    "I see food in the fridge."
                ]
            },
            { 
                text: "What do you see in the living room?<br>I see a cat on the sofa.", emoji: "🛋️",
                chunks: [
                    "What do you see",
                    "in the living room?",
                    "What do you see in the living room?",
                    "I see a cat",
                    "on the sofa.",
                    "I see a cat on the sofa."
                ]
            },
            { 
                text: "What does your father do?<br>He is a doctor.", emoji: "👨‍⚕️",
                chunks: [
                    "What does",
                    "your father do?",
                    "What does your father do?",
                    "He is",
                    "a doctor.",
                    "He is a doctor."
                ]
            },
            { 
                text: "What does your mother do?<br>She is a teacher.", emoji: "👩‍🏫",
                chunks: [
                    "What does",
                    "your mother do?",
                    "What does your mother do?",
                    "She is",
                    "a teacher.",
                    "She is a teacher."
                ]
            },
            { 
                text: "What do you do for your teeth?<br>I brush my teeth.", emoji: "🪥",
                chunks: [
                    "What do you do",
                    "for your teeth?",
                    "What do you do for your teeth?",
                    "I brush",
                    "my teeth.",
                    "I brush my teeth."
                ]
            },
            { 
                text: "What foods are good for your teeth?<br>Fruits, vegetables, and milk.", emoji: "🍎",
                chunks: [
                    "What foods",
                    "are good for your teeth?",
                    "What foods are good for your teeth?",
                    "Fruits,",
                    "vegetables,",
                    "and milk.",
                    "Fruits, vegetables, and milk."
                ]
            },
            { 
                text: "What foods are not good for your teeth?<br>Candies, cakes, and chocolate.", emoji: "🍫",
                chunks: [
                    "What foods",
                    "are not good for your teeth?",
                    "What foods are not good for your teeth?",
                    "Candies,",
                    "cakes,",
                    "and chocolate.",
                    "Candies, cakes, and chocolate."
                ]
            },
            { 
                text: "How do you play with your friends?<br>I take turns playing with my friends.", emoji: "🤝",
                chunks: [
                    "How do you play",
                    "with your friends?",
                    "How do you play with your friends?",
                    "I take turns",
                    "playing",
                    "with my friends.",
                    "I take turns playing with my friends."
                ]
            }
        ],
        fillQuestions: [
            { question: "I can breathe with my ______.", options: ["lungs", "hands", "feet"], answer: "lungs", emoji: "🫁" },
            { question: "I use my hands for ______.", options: ["waving", "running", "breathing"], answer: "waving", emoji: "👋" },
            { question: "I use my feet for ______.", options: ["running", "waving", "breathing"], answer: "running", emoji: "🏃‍♂️" },
            { question: "I see a cat on the ______.", options: ["sofa", "fridge", "cooker"], answer: "sofa", emoji: "🛋️" },
            { question: "I see food in the ______.", options: ["fridge", "sofa", "TV"], answer: "fridge", emoji: "🧑‍🍳" },
            { question: "He is a ______.", options: ["doctor", "teacher", "friend"], answer: "doctor", emoji: "👨‍⚕️" },
            { question: "She is a ______.", options: ["teacher", "doctor", "teeth"], answer: "teacher", emoji: "👩‍🏫" },
            { question: "I ______ my teeth.", options: ["brush", "breathe", "wave"], answer: "brush", emoji: "🪥" }
        ]
    },
    "unit2": {
        title: "Unit 2: Sight words letter E",
        videoSrc: "REF/unit2.mp4",
        vocab: [
            { word: "Elephant", emoji: "🐘" },
            { word: "Elephants", emoji: "🐘🐘" },
            { word: "Envelope", emoji: "✉️" },
            { word: "Envelopes", emoji: "✉️✉️" },
            { word: "Egg", emoji: "🥚" },
            { word: "Eggs", emoji: "🥚🥚" }
        ],
        transcriptData: [
            { start: 0.0, text: "I like an elephant." },
            { start: 3.0, text: "I like elephants." },
            { start: 6.0, text: "I like an envelope." },
            { start: 10.0, text: "I like envelopes." },
            { start: 14.0, text: "I like an egg." },
            { start: 17.0, text: "I like eggs." }
        ],
        sentences: [
            { 
                text: "I like an elephant.", emoji: "🐘",
                chunks: [
                    "I like",
                    "I like an elephant."
                ]
            },
            { 
                text: "I like elephants.", emoji: "🐘🐘",
                chunks: [
                    "I like",
                    "I like elephants."
                ]
            },
            { 
                text: "I like an envelope.", emoji: "✉️",
                chunks: [
                    "I like",
                    "I like an envelope."
                ]
            },
            { 
                text: "I like envelopes.", emoji: "✉️✉️",
                chunks: [
                    "I like",
                    "I like envelopes."
                ]
            },
            { 
                text: "I like an egg.", emoji: "🥚",
                chunks: [
                    "I like",
                    "I like an egg."
                ]
            },
            { 
                text: "I like eggs.", emoji: "🥚🥚",
                chunks: [
                    "I like",
                    "I like eggs."
                ]
            }
        ],
        fillQuestions: [
            { question: "_gg", options: ["e", "a", "o", "u"], answer: "e", emoji: "🥚" },
            { question: "_lbow", options: ["e", "i", "y", "u"], answer: "e", emoji: "💪" },
            { question: "_nvelope", options: ["e", "a", "i", "o"], answer: "e", emoji: "✉️" },
            { question: "_lephant", options: ["e", "u", "o", "a"], answer: "e", emoji: "🐘" },
            { question: "_ggs", options: ["e", "i", "a", "y"], answer: "e", emoji: "🥚🥚" },
            { question: "I like an ______.", options: ["elephant", "elephants", "eggs"], answer: "elephant", emoji: "🐘" },
            { question: "I like an ______.", options: ["envelope", "envelopes", "eggs"], answer: "envelope", emoji: "✉️" },
            { question: "I like an ______.", options: ["egg", "eggs", "elephants"], answer: "egg", emoji: "🥚" },
            { question: "I like ______.", options: ["eggs", "egg", "elephant"], answer: "eggs", emoji: "🥚🥚" },
            { question: "I like ______.", options: ["elephants", "elephant", "envelope"], answer: "elephants", emoji: "🐘🐘" },
            { question: "I like ______.", options: ["envelopes", "envelope", "egg"], answer: "envelopes", emoji: "✉️✉️" }
        ]
    },
    "unit_mc": {
        title: "Unit MC: Bé Tập Đọc",
        vocab: [
            { word: "Exercise", emoji: "🏃‍♂️" },
            { word: "healthy", emoji: "🥗" },
            { word: "strong", emoji: "💪" },
            { word: "energetic", emoji: "⚡" },
            { word: "applause", emoji: "👏" },
            { word: "welcome", emoji: "🙌" }
        ],
        dictionary: {
            "Dear": { icon: "💌", vi: "Thân gửi", ipa: "/dɪər/" },
            "everyone": { icon: "👨‍👩‍👧‍👦", vi: "mọi người", ipa: "/ˈev.ri.wʌn/" },
            "Exercise": { icon: "🏃‍♂️", vi: "Tập thể dục", ipa: "/ˈek.sə.saɪz/" },
            "helps": { icon: "🤝", vi: "giúp", ipa: "/helps/" },
            "us": { icon: "👥", vi: "chúng ta", ipa: "/ʌs/" },
            "stay": { icon: "🧘", vi: "giữ cho", ipa: "/steɪ/" },
            "healthy": { icon: "🥗", vi: "khỏe mạnh", ipa: "/ˈhel.θi/" },
            "strong": { icon: "💪", vi: "mạnh mẽ", ipa: "/strɒŋ/" },
            "and": { icon: "➕", vi: "và", ipa: "/ænd/" },
            "happy": { icon: "😄", vi: "vui vẻ", ipa: "/ˈhæp.i/" },
            "Our": { icon: "🧑‍🤝‍🧑", vi: "Của chúng mình", ipa: "/aʊər/" },
            "friends": { icon: "👭", vi: "các bạn", ipa: "/frendz/" },
            "are": { icon: "✨", vi: "thì", ipa: "/ɑːr/" },
            "ready": { icon: "🏁", vi: "sẵn sàng", ipa: "/ˈred.i/" },
            "to": { icon: "➡️", vi: "để", ipa: "/tuː/" },
            "bring": { icon: "🎁", vi: "mang đến", ipa: "/brɪŋ/" },
            "you": { icon: "🫵", vi: "cho các bạn", ipa: "/juː/" },
            "a": { icon: "☝️", vi: "một", ipa: "/ə/" },
            "fun": { icon: "🎈", vi: "vui nhộn", ipa: "/fʌn/" },
            "energetic": { icon: "⚡", vi: "tràn năng lượng", ipa: "/ˌen.əˈdʒet.ɪk/" },
            "performance": { icon: "🎭", vi: "màn trình diễn", ipa: "/pəˈfɔː.məns/" },
            "Now": { icon: "⏰", vi: "Bây giờ", ipa: "/naʊ/" },
            "please": { icon: "🙏", vi: "xin mời", ipa: "/pliːz/" },
            "welcome": { icon: "👋", vi: "chào đón", ipa: "/ˈwel.kəm/" },
            "the": { icon: "👈", vi: "những", ipa: "/ðə/" },
            "children": { icon: "👧👦", vi: "em nhỏ", ipa: "/ˈtʃɪl.drən/" },
            "from": { icon: "📍", vi: "đến từ", ipa: "/frɒm/" },
            "TotoNana": { icon: "🧸", vi: "TotoNana", ipa: "/toʊtoʊnɑːnɑː/" },
            "with": { icon: "🖇", vi: "với tiết mục", ipa: "/wɪð/" },
            "Taiiku": { icon: "🤸‍♀️", vi: "Taiiku", ipa: "/taɪiːkuː/" },
            "Let's": { icon: "🙌", vi: "Hãy cùng", ipa: "/lets/" },
            "give": { icon: "🤲", vi: "dành cho", ipa: "/ɡɪv/" },
            "them": { icon: "👥", vi: "các bạn ấy", ipa: "/ðem/" },
            "big": { icon: "🐘", vi: "thật lớn", ipa: "/bɪɡ/" },
            "round": { icon: "⭕", vi: "tràng", ipa: "/raʊnd/" },
            "of": { icon: "🔗", vi: "của", ipa: "/ɒv/" },
            "applause": { icon: "👏", vi: "vỗ tay", ipa: "/əˈplɔːz/" },
            "enjoy": { icon: "🍿", vi: "thưởng thức", ipa: "/ɪnˈdʒɔɪ/" },
            "show": { icon: "🎪", vi: "buổi diễn", ipa: "/ʃoʊ/" }
        },
        sentencesData: [
            {
                sentenceNum: 1,
                fullText: "Dear everyone!",
                phrases: ["Dear everyone!"],
                vi: "Thân chào mọi người!"
            },
            {
                sentenceNum: 2,
                fullText: "Exercise helps us stay healthy, strong and happy.",
                phrases: [
                    "Exercise helps us",
                    "stay healthy,",
                    "strong and happy."
                ],
                vi: "Tập thể dục giúp chúng ta khỏe mạnh, mạnh mẽ và vui vẻ."
            },
            {
                sentenceNum: 3,
                fullText: "Our friends are ready to bring you a fun and energetic performance.",
                phrases: [
                    "Our friends are ready",
                    "to bring you a fun",
                    "and energetic performance."
                ],
                vi: "Các bạn của chúng mình đã sẵn sàng mang đến một màn trình diễn vui nhộn và tràn đầy năng lượng."
            },
            {
                sentenceNum: 4,
                fullText: "Now, please welcome the children from TotoNana with \"Taiiku.\"",
                phrases: [
                    "Now, please welcome",
                    "the children from TotoNana",
                    "with 'Taiiku.'"
                ],
                vi: "Bây giờ, xin chào đón các em nhỏ từ TotoNana với tiết mục 'Taiiku'."
            },
            {
                sentenceNum: 5,
                fullText: "Let's give them a big round of applause and enjoy the show!",
                phrases: [
                    "Let's give them",
                    "a big round of applause",
                    "and enjoy the show!"
                ],
                vi: "Hãy dành cho các bạn ấy một tràng vỗ tay thật lớn và thưởng thức buổi biểu diễn nào!"
            }
        ],
        spellList: [
            "Exercise",
            "healthy, strong and happy.",
            "energetic performance.",
            "welcome children with \"Taiiku.\"",
            "Let's give them a big round of applause and enjoy the show!"
        ]
    },
    "unit4": {
        title: "Unit 4: Tập Đánh Vần Tiếng Việt",
        bases: [
            {
                base: "ba",
                spelling: "bờ - a - ba",
                words: {
                    "không": { word: "ba", meaning: "Số ba hoặc Ba (bố)", emoji: "👨", spell: "bờ - a - ba" },
                    "sắc": { word: "bá", meaning: "Bá vương / Bác", emoji: "👑", spell: "bờ - a - ba - sắc - bá" },
                    "huyền": { word: "bà", meaning: "Bà nội / Bà ngoại", emoji: "👵", spell: "bờ - a - ba - huyền - bà" },
                    "hỏi": { word: "bả", meaning: "Bả mồi / Bả vai", emoji: "🍖", spell: "bờ - a - ba - hỏi - bả" },
                    "ngã": { word: "bã", meaning: "Bã mía / Xác bã", emoji: "🗑️", spell: "bờ - a - ba - ngã - bã" },
                    "nặng": { word: "bạ", meaning: "Học bạ / Viết bạ", emoji: "📒", spell: "bờ - a - ba - nặng - bạ" }
                }
            },
            {
                base: "ca",
                spelling: "cờ - a - ca",
                words: {
                    "không": { word: "ca", meaning: "Ca hát / Cái ca", emoji: "🎤", spell: "cờ - a - ca" },
                    "sắc": { word: "cá", meaning: "Con cá", emoji: "🐟", spell: "cờ - a - ca - sắc - cá" },
                    "huyền": { word: "cà", meaning: "Quả cà", emoji: "🍆", spell: "cờ - a - ca - huyền - cà" },
                    "hỏi": { word: "cả", meaning: "Tất cả / Anh cả", emoji: "🥇", spell: "cờ - a - ca - hỏi - cả" },
                    "nặng": { word: "cạ", meaning: "Bạn cạ", emoji: "🤝", spell: "cờ - a - ca - nặng - cạ" }
                }
            },
            {
                base: "ma",
                spelling: "mờ - a - ma",
                words: {
                    "không": { word: "ma", meaning: "Con ma", emoji: "👻", spell: "mờ - a - ma" },
                    "sắc": { word: "má", meaning: "Má (mẹ) / Cái má", emoji: "👩", spell: "mờ - a - ma - sắc - má" },
                    "huyền": { word: "mà", meaning: "Nhưng mà", emoji: "🪧", spell: "mờ - a - ma - huyền - mà" },
                    "hỏi": { word: "mả", meaning: "Ngôi mả", emoji: "🪦", spell: "mờ - a - ma - hỏi - mả" },
                    "ngã": { word: "mã", meaning: "Con ngựa / Mã số", emoji: "🐎", spell: "mờ - a - ma - ngã - mã" },
                    "nặng": { word: "mạ", meaning: "Cây mạ", emoji: "🌱", spell: "mờ - a - ma - nặng - mạ" }
                }
            },
            {
                base: "bo",
                spelling: "bờ - o - bo",
                words: {
                    "không": { word: "bo", meaning: "Bo góc / Bánh bo", emoji: "📐", spell: "bờ - o - bo" },
                    "sắc": { word: "bó", meaning: "Bó hoa", emoji: "💐", spell: "bờ - o - bo - sắc - bó" },
                    "huyền": { word: "bò", meaning: "Con bò", emoji: "🐄", spell: "bờ - o - bo - huyền - bò" },
                    "hỏi": { word: "bỏ", meaning: "Bỏ rác / Từ bỏ", emoji: "🗑️", spell: "bờ - o - bo - hỏi - bỏ" },
                    "nặng": { word: "bọ", meaning: "Con bọ / Bọ cánh cứng", emoji: "🐞", spell: "bờ - o - bo - nặng - bọ" }
                }
            },
            {
                base: "co",
                spelling: "cờ - o - co",
                words: {
                    "không": { word: "co", meaning: "Co giãn", emoji: "🪢", spell: "cờ - o - co" },
                    "sắc": { word: "có", meaning: "Có tiền / Có đồ", emoji: "💰", spell: "cờ - o - co - sắc - có" },
                    "huyền": { word: "cò", meaning: "Con cò", emoji: "🦩", spell: "cờ - o - co - huyền - cò" },
                    "hỏi": { word: "cỏ", meaning: "Cỏ xanh", emoji: "🌿", spell: "cờ - o - co - hỏi - cỏ" },
                    "nặng": { word: "cọ", meaning: "Cây cọ / Chổi cọ", emoji: "🖌️", spell: "cờ - o - co - nặng - cọ" }
                }
            },
            {
                base: "ga",
                spelling: "gờ - a - ga",
                words: {
                    "không": { word: "ga", meaning: "Nhà ga", emoji: "🚉", spell: "gờ - a - ga" },
                    "sắc": { word: "gá", meaning: "Gá lắp / Gá đỡ", emoji: "🔧", spell: "gờ - a - ga - sắc - gá" },
                    "huyền": { word: "gà", meaning: "Con gà", emoji: "🐓", spell: "gờ - a - ga - huyền - gà" },
                    "hỏi": { word: "gả", meaning: "Gả chồng", emoji: "👰", spell: "gờ - a - ga - hỏi - gả" },
                    "nặng": { word: "gạ", meaning: "Gạ gẫm / Gạ hỏi", emoji: "🗣️", spell: "gờ - a - ga - nặng - gạ" }
                }
            },
            {
                base: "la",
                spelling: "lờ - a - la",
                words: {
                    "không": { word: "la", meaning: "La hét / Nốt la", emoji: "🗣️", spell: "lờ - a - la" },
                    "sắc": { word: "lá", meaning: "Chiếc lá", emoji: "🍃", spell: "lờ - a - la - sắc - lá" },
                    "huyền": { word: "là", meaning: "Bàn là (ủi)", emoji: "💨", spell: "lờ - a - la - huyền - là" },
                    "hỏi": { word: "lả", meaning: "Mệt lả", emoji: "😫", spell: "lờ - a - la - hỏi - lả" },
                    "nặng": { word: "lạ", meaning: "Người lạ", emoji: "👤", spell: "lờ - a - la - nặng - lạ" }
                }
            },
            {
                base: "le",
                spelling: "lờ - e - le",
                words: {
                    "không": { word: "le", meaning: "Le le (chim)", emoji: "👅", spell: "lờ - e - le" },
                    "sắc": { word: "lé", meaning: "Mắt lé", emoji: "🤪", spell: "lờ - e - le - sắc - lé" },
                    "huyền": { word: "lè", meaning: "Lè lưỡi", emoji: "😜", spell: "lờ - e - le - huyền - lè" },
                    "hỏi": { word: "lẻ", meaning: "Số lẻ / Tiền lẻ", emoji: "1️⃣", spell: "lờ - e - le - hỏi - lẻ" },
                    "nặng": { word: "lẹ", meaning: "Nhanh lẹ", emoji: "⚡", spell: "lờ - e - le - nặng - lẹ" }
                }
            },
            {
                base: "lo",
                spelling: "lờ - o - lo",
                words: {
                    "không": { word: "lo", meaning: "Lo lắng", emoji: "😟", spell: "lờ - o - lo" },
                    "sắc": { word: "ló", meaning: "Ló dạng / Mặt trời ló", emoji: "🌅", spell: "lờ - o - lo - sắc - ló" },
                    "huyền": { word: "lò", meaning: "Cái lò sưởi", emoji: "🔥", spell: "lờ - o - lo - huyền - lò" },
                    "hỏi": { word: "lỏ", meaning: "Lỏ mặt / Biểu cảm lỏ", emoji: "🤐", spell: "lờ - o - lo - hỏi - lỏ" },
                    "nặng": { word: "lọ", meaning: "Cái lọ hoa", emoji: "🏺", spell: "lờ - o - lo - nặng - lọ" }
                }
            },
            {
                base: "me",
                spelling: "mờ - e - me",
                words: {
                    "không": { word: "me", meaning: "Quả me chua", emoji: "🥭", spell: "mờ - e - me" },
                    "sắc": { word: "mé", meaning: "Bờ mé sông", emoji: "🌊", spell: "mờ - e - me - sắc - mé" },
                    "huyền": { word: "mè", meaning: "Hạt mè (vừng)", emoji: "🥯", spell: "mờ - e - me - huyền - mè" },
                    "hỏi": { word: "mẻ", meaning: "Chén mẻ / Mẻ bánh", emoji: "🥣", spell: "mờ - e - me - hỏi - mẻ" },
                    "nặng": { word: "mẹ", meaning: "Mẹ yêu", emoji: "👩‍👦", spell: "mờ - e - me - nặng - mẹ" }
                }
            },
            {
                base: "to",
                spelling: "tờ - o - to",
                words: {
                    "không": { word: "to", meaning: "To lớn", emoji: "🐘", spell: "tờ - o - to" },
                    "sắc": { word: "tó", meaning: "Bị bắt tó", emoji: "👮", spell: "tờ - o - to - sắc - tó" },
                    "huyền": { word: "tò", meaning: "Tò he / Tò mò", emoji: "🧸", spell: "tờ - o - to - huyền - tò" },
                    "hỏi": { word: "tỏ", meaning: "Bày tỏ / Sáng tỏ", emoji: "💖", spell: "tờ - o - to - hỏi - tỏ" },
                    "nặng": { word: "tọ", meaning: "Tọ lòng", emoji: "🤝", spell: "tờ - o - to - nặng - tọ" }
                }
            },
            {
                base: "da",
                spelling: "dờ - a - da",
                words: {
                    "không": { word: "da", meaning: "Làn da", emoji: "🖐️", spell: "dờ - a - da" },
                    "huyền": { word: "dà", meaning: "Dày dà", emoji: "📜", spell: "dờ - a - da - huyền - dà" },
                    "ngã": { word: "dã", meaning: "Dã ngoại", emoji: "⛺", spell: "dờ - a - da - ngã - dã" },
                    "nặng": { word: "dạ", meaning: "Dạ dày / Vâng dạ", emoji: "🙇", spell: "dờ - a - da - nặng - dạ" }
                }
            },
            {
                base: "đa",
                spelling: "đờ - a - đa",
                words: {
                    "không": { word: "đa", meaning: "Cây đa", emoji: "🌳", spell: "đờ - a - đa" },
                    "sắc": { word: "đá", meaning: "Hòn đá / Đá bóng", emoji: "🪨", spell: "đờ - a - đa - sắc - đá" },
                    "huyền": { word: "đà", meaning: "Đà gỗ / Đà điểu", emoji: "🪵", spell: "đờ - a - đa - huyền - đà" },
                    "hỏi": { word: "đả", meaning: "Đả kích / Đánh đả", emoji: "🥊", spell: "đờ - a - đa - hỏi - đả" },
                    "ngã": { word: "đã", meaning: "Đã xong / Đã đời", emoji: "⌛", spell: "đờ - a - đa - ngã - đã" }
                }
            },
            {
                base: "gia",
                spelling: "giờ - a - gia",
                words: {
                    "không": { word: "gia", meaning: "Gia đình / Thêm gia vị", emoji: "👪", spell: "giờ - a - gia" },
                    "sắc": { word: "giá", meaning: "Giá tiền / Giá đỗ", emoji: "🌱", spell: "giờ - a - gia - sắc - giá" },
                    "huyền": { word: "già", meaning: "Người già", emoji: "👴", spell: "giờ - a - gia - huyền - già" },
                    "hỏi": { word: "giả", meaning: "Đồ giả / Giả vờ", emoji: "🎭", spell: "giờ - a - gia - hỏi - giả" }
                }
            },
            {
                base: "nha",
                spelling: "nhờ - a - nha",
                words: {
                    "không": { word: "nha", meaning: "Nha khoa (răng)", emoji: "🦷", spell: "nhờ - a - nha" },
                    "sắc": { word: "nhá", meaning: "Nhá nhem / Nhá bánh", emoji: "🌆", spell: "nhờ - a - nha - sắc - nhá" },
                    "huyền": { word: "nhà", meaning: "Ngôi nhà", emoji: "🏠", spell: "nhờ - a - nha - huyền - nhà" },
                    "hỏi": { word: "nhả", meaning: "Nhả kẹo / Nhả ra", emoji: "🤮", spell: "nhờ - a - nha - hỏi - nhả" }
                }
            },
            {
                base: "cho",
                spelling: "chờ - o - cho",
                words: {
                    "không": { word: "cho", meaning: "Cho đi / Cho quà", emoji: "🎁", spell: "chờ - o - cho" },
                    "sắc": { word: "chó", meaning: "Con chó", emoji: "🐶", spell: "chờ - o - cho - sắc - chó" },
                    "huyền": { word: "chò", meaning: "Cây chò chỉ", emoji: "🌲", spell: "chờ - o - cho - huyền - chò" },
                    "hỏi": { word: "chỏ", meaning: "Chỏm tóc / Chỏ tai", emoji: "👦", spell: "chờ - o - cho - hỏi - chỏ" }
                }
            },
            {
                base: "che",
                spelling: "chờ - e - che",
                words: {
                    "không": { word: "che", meaning: "Che ô / Che chở", emoji: "🌂", spell: "chờ - e - che" },
                    "sắc": { word: "ché", meaning: "Cái ché rượu", emoji: "🏺", spell: "chờ - e - che - sắc - ché" },
                    "huyền": { word: "chè", meaning: "Chén chè / Lá chè", emoji: "🍵", spell: "chờ - e - che - huyền - chè" },
                    "hỏi": { word: "chẻ", meaning: "Chẻ củi / Chẻ tre", emoji: "🪓", spell: "chờ - e - che - hỏi - chẻ" }
                }
            },
            {
                base: "thi",
                spelling: "thờ - i - thi",
                words: {
                    "không": { word: "thi", meaning: "Thi cử / Đi thi", emoji: "📝", spell: "thờ - i - thi" },
                    "sắc": { word: "thí", meaning: "Thí nghiệm / Bố thí", emoji: "🔬", spell: "thờ - i - thi - sắc - thí" },
                    "huyền": { word: "thì", meaning: "Rau thì là", emoji: "🌿", spell: "thờ - i - thi - huyền - thì" },
                    "nặng": { word: "thị", meaning: "Quả thị thơm", emoji: "🟡", spell: "thờ - i - thi - nặng - thị" }
                }
            },
            {
                base: "thu",
                spelling: "thờ - u - thu",
                words: {
                    "không": { word: "thu", meaning: "Mùa thu", emoji: "🍁", spell: "thờ - u - thu" },
                    "sắc": { word: "thú", meaning: "Con thú hoang", emoji: "🦁", spell: "thờ - u - thu - sắc - thú" },
                    "huyền": { word: "thù", meaning: "Kẻ thù / Hận thù", emoji: "👿", spell: "thờ - u - thu - huyền - thù" },
                    "hỏi": { word: "thủ", meaning: "Thủ môn / Thủ đô", emoji: "🧤", spell: "thờ - u - thu - hỏi - thủ" },
                    "nặng": { word: "thụ", meaning: "Cây cổ thụ", emoji: "🌳", spell: "thờ - u - thu - nặng - thụ" }
                }
            },
            {
                base: "ta",
                spelling: "tờ - a - ta",
                words: {
                    "không": { word: "ta", meaning: "Chúng ta", emoji: "👥", spell: "tờ - a - ta" },
                    "sắc": { word: "tá", meaning: "Một tá (12 chiếc)", emoji: "1️⃣2️⃣", spell: "tờ - a - ta - sắc - tá" },
                    "huyền": { word: "tà", meaning: "Tà áo dài", emoji: "👗", spell: "tờ - a - ta - huyền - tà" },
                    "hỏi": { word: "tả", meaning: "Tả bỉm em bé", emoji: "👶", spell: "tờ - a - ta - hỏi - tả" },
                    "ngã": { word: "tã", meaning: "Tã lót / Mệt tã", emoji: "🧷", spell: "tờ - a - ta - ngã - tã" },
                    "nặng": { word: "tạ", meaning: "Quả tạ tập gym", emoji: "🏋️", spell: "tờ - a - ta - nặng - tạ" }
                }
            },
            {
                base: "cao",
                spelling: "cờ - ao - cao",
                words: {
                    "không": { word: "cao", meaning: "Chiều cao / Cây cao", emoji: "🦒", spell: "cờ - ao - cao" },
                    "sắc": { word: "cáo", meaning: "Con cáo", emoji: "🦊", spell: "cờ - ao - cao - sắc - cáo" },
                    "huyền": { word: "cào", meaning: "Con cào cào", emoji: "🦗", spell: "cờ - ao - cao - huyền - cào" },
                    "hỏi": { word: "cảo", meaning: "Bản thảo / Sách cảo", emoji: "📄", spell: "cờ - ao - cao - hỏi - cảo" },
                    "nặng": { word: "cạo", meaning: "Cạo râu", emoji: "🪒", spell: "cờ - ao - cao - nặng - cạo" }
                }
            },
            {
                base: "tay",
                spelling: "tờ - ay - tay",
                words: {
                    "không": { word: "tay", meaning: "Bàn tay", emoji: "🖐️", spell: "tờ - ay - tay" },
                    "huyền": { word: "tày", meaning: "Dân tộc Tày", emoji: "⚖️", spell: "tờ - ay - tay - huyền - tày" },
                    "hỏi": { word: "tẩy", meaning: "Cục tẩy / Tẩy xóa", emoji: "🧼", spell: "tờ - ay - tay - hỏi - tẩy" }
                }
            }
        ]
    }
};
