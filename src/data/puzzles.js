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
    slug: "jin",
    title: "נראה שאתה זקוק לאימון...",
    type: "narrative",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/jin-sakai.jpg", alt: "ג׳ין סאקאי" },
      { type: "text", content: "גראלט, עכשיו כשהתחמשת אתה אולי חושב שאתה מוכן לקרב- אך אין זה נכון. כל לוחם דגול יודע שעליו להתאמן. אם אין לך חרב מתאימה לאימון, קח שלט. ג׳ין סאקאי." },
    ]
  },
  {
    id: 5,
    slug: "training",
    title: "קשה באימונים- קל בקרב",
    type: "narrative",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/training.png", alt: "חתולים מתאמנים" },
      { type: "text", content: "הגיע הזמן לקצת מציאות מפוצלת" },
    ]
  },
  {
    id: 6,
    slug: "food",
    title: "בדבר אחד תאנוס צודק...",
    type: "narrative",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/thor.webp", alt: "תור" },
      { type: "text", content: "גראלט, אני שונא להסכים עם תאנוס, אבל אם נרצה להביס אותו אנחנו צריכים שתהיה בשיא כוחך. כמו שרואים, אני מאמין שאסור להגיד לא לארוחה. בתאבון! ת׳ור." },
    ]
  },
];

export default puzzles;
