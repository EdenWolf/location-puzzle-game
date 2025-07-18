const puzzles = [
  {
    id: 1,
    slug: "arthur", // URL slug related to solution
    title: "רמז ראשון",
    type: "location",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/arthur-morgan.jpg", alt: "ארתור מורגן" },
      { type: "text", content: "חופשי! אני סוף סוף חופשי!\nתודה לך, גראלט. בלעדיך לא הייתי יוצא משם בחיים.\n אבל אחרי כל כך הרבה זמן במערה, אני כל כך רעב...\nיש מנה אחת שחלמתי עליה כל הזמן הזה אבל אני לא מצליח לזכור איך קוראים לה: משהו עם ביצה רכה על לחמנייה מתוקה, עם רוטב טעים בצבע צהוב. איך קוראים לזה?\n" },
    ],
    targetLocation: {
      latitude: 31.2420,
      longitude: 34.8122, 
      name: "פארק החוף"
    }
  },
  {
    id: 2,
    slug: "message", // URL slug related to solution
    title: "המסר הנסתר",
    type: "narrative", // New type for story advancement  
    elements: [
      { type: "text", content: "מצאת את המיקום הראשון! שקיעת השמש מטילה צללים ארוכים על פני הפארק." },
      { type: "text", content: "בזמן שאתה יושב על הספסל, אתה מבחין בחריטה על גבי קורות העץ." },
      { type: "image", src: "/location-puzzle-game/images/bench-clue.jpg", alt: "מסר נסתר על הספסל" },
      { type: "text", content: "המסר אומר: 'הידע ממתין במקום בו השומרים האבן צופים.'" },
      { type: "button", label: "המשך במסע", action: "next" }
    ]
  },
  {
    id: 3,
    slug: "library", // URL slug related to solution
    title: "עקוב אחר הנתיב",
    type: "location",
    elements: [
      { type: "text", content: "המסר מוביל אותך למקום בו שומרים את הידע." },
      { type: "text", content: "מצא את הבניין שבו אריות אבן שומרים על הכניסה." },
      { type: "hint", content: "במקום זה מאוחסנים אלפי ספרים וחוכמה עתיקה." },
      { type: "text", content: "הספרייה העירונית ניצבת מעל מאה שנים בלב העיר." }
    ],
    targetLocation: {
      latitude: 31.2420, 
      longitude: 34.8122, 
      name: "הספרייה העירונית"
    }
  },
  {
    id: 4,
    slug: "final", // URL slug for completion page
    title: "הגילוי הסופי",
    type: "manual",
    elements: [
      { type: "text", content: "הגעת לספרייה, שם אריות האבן שומרים על הכניסה." },
      { type: "image", src: "/location-puzzle-game/images/library-entrance.jpg", alt: "כניסת הספרייה" },
      { type: "text", content: "בפנים, אתה מוצא כתב יד עתיק החושף את ההיסטוריה הנסתרת של העיר." },
      { type: "text", content: "התעלומה נפתרה - גילית את הסוד המחבר את כל המקומות האלו." },
      { type: "solution", question: "איזה סוד מחבר בין כל הרמזים?", answer: "eggs benedict", placeholder: "הכנס את התשובה הנכונה" },
      { type: "hint", content: "חשוב על המנה שהדמות הזכירה." }
    ]
  },
  {
    id: 5,
    slug: "completion", // URL slug for completion page
    title: "המסע הושלם",
    type: "completion",
    elements: [
      { type: "text", content: "ברכות! סיימת את כל החידות וגילית את הסיפור הנסתר של העיר." },
      { type: "image", src: "/location-puzzle-game/images/completion.jpg", alt: "תעודת סיום" },
      { type: "text", content: "המסע שלך דרך ההיסטוריה והתעלומה הסתיים." },
      { type: "button", label: "התחל מחדש", action: "reset" }
    ]
  }
  // Add more puzzles as needed
];

export default puzzles;
