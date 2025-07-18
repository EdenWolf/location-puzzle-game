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
  {
    id: 7,
    slug: "mimir",
    title: "האם זה הסוף?",
    type: "narrative",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/mimir.avif", alt: "מימיר" },
      { type: "text", content: "גראלט, הגיע הזמן לקרב האחרון. למרות כל האימונים שלך זה לא הולך להיות קרב חרבות, אלא קרב מוחות. כדי לנצח את תאנוס עליך לחזור אל ההיסטוריה- אל הדפים בהם כתוב העבר שלך, כי רק ממנו נוכל ללמוד על העתיד לבוא. מימיר." },
    ]
  },
  {
    id: 8,
    slug: "ciri",
    title: "האם איחרנו את המועד?",
    type: "location",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/ciri.jpeg", alt: "סירי" },
      { type: "text", content: "גראלט, אני חוששת שכבר מאוחר מידי. תאנוס כבר בדרך אל הגביע! רוץ, רוץ מהר ככל שתוכל- אתה יודע איפה גביע הזהב נמצא. סירי." },
    ],
    targetLocation: {
      latitude: 31.2592,
      longitude: 34.7970,
      name: "גביע הזהב"
    }
  },
  {
    id: 9,
    slug: "win",
    title: "ניצחון!",
    type: "narrative",
    elements: [
      { type: "image", src: "/location-puzzle-game/images/win.png", alt: "ניצחון" },
      { type: "text", content: "גראלט, ניצחת כנגד כל הסיכויים! כל הכבוד! אנחנו גאים בך!" },
    ]
  },
];

export default puzzles;
