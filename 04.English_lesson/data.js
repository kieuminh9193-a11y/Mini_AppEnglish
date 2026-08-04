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
    }
};
