const puzzles = [
  {
    id: 1,
    slug: "arthur",
    title: "חופשי! אני סוף סוף חופשי!",
    type: "location",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/arthur-morgan.jpg", alt: "ארתור מורגן" },
      { type: "text", content: "תודה לך, גראלט. בלעדיך לא הייתי יוצא משם בחיים. אבל אחרי כל כך הרבה זמן במערה, אני כל כך רעב...יש מנה אחת שחלמתי עליה כל הזמן הזה אבל אני לא מצליח לזכור איך קוראים לה: משהו עם ביצה רכה על לחמנייה מתוקה, עם רוטב טעים בצבע צהוב. איך קוראים לזה?" },
    ],
    targetLocation: {
      latitude: 31.2419,
      longitude: 34.8121, 
      name: "פארק החוף"
    }
  },
  {
    id: 2,
    slug: "benedict", 
    title: "בתאבון!",
    type: "narrative", 
    elements: [
      { type: "image", src: "/location-puzzle-game/images/cat-eggs.png", alt: "חתולים" },
    ]
  },
  {
    id: 3,
    slug: "thomas",
    title: "אין לנו זמן לבזבז!",
    type: "location",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/tommy-shelby.webp", alt: "תומאס" },
      { type: "text", content: "גראלט, אני שמח שהיה לך טעים - אתה תצטרך את האנרגיות. קריפה ניסתה לעזור לנו לאסוף תחמושת אבל היא לא מצליחה להגיע אל הרימונים. סטנלי הסתכל וראה שיש שם חפץ חשוד. אתה חייב לבדוק את זה במהירות האפשרית! ת. שלבי." },
    ],
    targetLocation: {
      latitude: 31.2490,
      longitude: 34.7699, 
      name: "פארק החוף"
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
