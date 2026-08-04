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
        ]
    }
};
