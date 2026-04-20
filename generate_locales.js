const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'frontend/src/locales');

const baseKeys = {
  nav: {
    home: "Home",
    explore: "Explore Schemes",
    dashboard: "Dashboard",
    howItWorks: "How It Works",
    updates: "Updates",
    search: "Search schemes..."
  },
  dashboard: {
    title: "My Dashboard",
    subtitle: "Your personalised scheme tracker",
    savedSchemes: "Saved Schemes",
    recentlyViewed: "Recently Viewed",
    applicationProgress: "Application Progress",
    noSaved: "No saved schemes yet",
    noSavedDesc: "Click the bookmark icon on any scheme card to save it here.",
    noRecent: "No recently viewed schemes",
    noRecentDesc: "Schemes you view will appear here automatically.",
    noProgress: "No applications in progress",
    noProgressDesc: "Start an application guide from any scheme card to track your progress.",
    exploreSchemes: "Explore Schemes",
    of: "of",
    stepsCompleted: "steps completed"
  },
  scheme: {
    save: "Save",
    saved: "Saved",
    benefits: "Benefits",
    eligibility: "Eligibility",
    howToApply: "How to Apply",
    requiredDocs: "Required Documents",
    details: "Details →",
    less: "← Less",
    applyGuide: "Apply Guide",
    website: "Website",
    ongoing: "Ongoing",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    partial: "Partial"
  }
};

const translations = {
  bn: {
    nav: { home: "হোম", explore: "স্কিম খুঁজুন", dashboard: "ড্যাশবোর্ড", howItWorks: "কীভাবে কাজ করে", updates: "আপডেট", search: "স্কিম খুঁজুন..." },
    dashboard: { title: "আমার ড্যাশবোর্ড", subtitle: "আপনার ব্যক্তিগত স্কিম ট্র্যাকার", savedSchemes: "সংরক্ষিত স্কিম", recentlyViewed: "সম্প্রতি দেখা", applicationProgress: "আবেদনের অগ্রগতি", noSaved: "কোনো স্কিম সংরক্ষিত নেই", noSavedDesc: "স্কিম সংরক্ষণ করতে বুকমার্ক আইকনে ক্লিক করুন।", noRecent: "সম্প্রতি দেখা কোনো স্কিম নেই", noRecentDesc: "আপনি যে স্কিমগুলি দেখবেন তা এখানে স্বয়ংক্রিয়ভাবে প্রদর্শিত হবে।", noProgress: "কোনো আবেদনের অগ্রগতি নেই", noProgressDesc: "আপনার অগ্রগতি ট্র্যাক করতে যেকোনো স্কিম কার্ড থেকে অ্যাপ্লিকেশন গাইড শুরু করুন।", exploreSchemes: "স্কিম খুঁজুন", of: "এর মধ্যে", stepsCompleted: "টি ধাপ সম্পন্ন" },
    scheme: { save: "সংরক্ষণ করুন", saved: "সংরক্ষিত", benefits: "সুবিধাসমূহ", eligibility: "যোগ্যতা", howToApply: "কীভাবে আবেদন করবেন", requiredDocs: "প্রয়োজনীয় নথিপত্র", details: "বিবরণ →", less: "← কম", applyGuide: "আবেদন গাইড", website: "ওয়েবসাইট", ongoing: "চলমান", excellent: "চমৎকার", good: "ভালো", fair: "মোটামুটি", partial: "আংশিক" }
  },
  ta: {
    nav: { home: "முகப்பு", explore: "திட்டங்களை தேடுக", dashboard: "டாஷ்போர்டு", howItWorks: "எப்படி செயல்படுகிறது", updates: "புதுப்பிப்புகள்", search: "திட்டங்களை தேடுக..." },
    dashboard: { title: "என் டாஷ்போர்டு", subtitle: "உங்கள் தனிப்பட்ட திட்ட கண்காணிப்பாளர்", savedSchemes: "சேமிக்கப்பட்ட திட்டங்கள்", recentlyViewed: "சமீபத்தில் பார்த்தவை", applicationProgress: "விண்ணப்ப முன்னேற்றம்", noSaved: "எந்த திட்டமும் சேமிக்கப்படவில்லை", noSavedDesc: "திட்டத்தை சேமிக்க புக்மார்க் ஐகானை கிளிக் செய்யவும்.", noRecent: "சமீபத்தில் எந்த திட்டமும் பார்க்கப்படவில்லை", noRecentDesc: "நீங்கள் பார்க்கும் திட்டங்கள் இங்கு தானாகவே தோன்றும்.", noProgress: "எந்த விண்ணப்ப முன்னேற்றமும் இல்லை", noProgressDesc: "உங்கள் முன்னேற்றத்தை கண்காணிக்க எந்தவொரு திட்ட அட்டைக்கும் சென்று விண்ணப்ப வழிகாட்டியை தொடங்கவும்.", exploreSchemes: "திட்டங்களை தேடுக", of: "இல்", stepsCompleted: "படிகள் முடிந்துள்ளன" },
    scheme: { save: "சேமி", saved: "சேமிக்கப்பட்டது", benefits: "நன்மைகள்", eligibility: "தகுதி", howToApply: "எப்படி விண்ணப்பிப்பது", requiredDocs: "தேவையான ஆவணங்கள்", details: "விவரங்கள் →", less: "← குறைவான", applyGuide: "விண்ணப்ப வழிகாட்டி", website: "இணையதளம்", ongoing: "நடைபெறுகிறது", excellent: "மிக நன்று", good: "நன்று", fair: "சுமாரான", partial: "பகுதி" }
  },
  te: {
    nav: { home: "హోమ్", explore: "పథకాలను అన్వేషించండి", dashboard: "డాష్‌బోర్డ్", howItWorks: "ఇది ఎలా పనిచేస్తుంది", updates: "నవీకరణలు", search: "పథకాలను శోధించండి..." },
    dashboard: { title: "నా డాష్‌బోర్డ్", subtitle: "మీ వ్యక్తిగత పథకం ట్రాకర్", savedSchemes: "సేవ్ చేయబడిన పథకాలు", recentlyViewed: "ఇటీవల చూసినవి", applicationProgress: "అప్లికేషన్ పురోగతి", noSaved: "ఇంకా సేవ్ చేయబడిన పథకాలు లేవు", noSavedDesc: "దాన్ని సేవ్ చేయడానికి ఏదైనా పథకం కార్డ్‌పై బుక్‌మార్క్ చిహ్నాన్ని క్లిక్ చేయండి.", noRecent: "ఇటీవల చూసిన పథకాలు లేవు", noRecentDesc: "మీరు చూసే పథకాలు స్వయంచాలకంగా ఇక్కడ కనిపిస్తాయి.", noProgress: "ప్రగతిలో అప్లికేషన్లు లేవు", noProgressDesc: "మీ పురోగతిని ట్రాక్ చేయడానికి అప్లికేషన్ గైడ్‌ని ప్రారంభించండి.", exploreSchemes: "పథకాలను అన్వేషించండి", of: "లో", stepsCompleted: "దశలు పూర్తయ్యాయి" },
    scheme: { save: "సేవ్", saved: "సేవ్ చేయబడింది", benefits: "ప్రయోజనాలు", eligibility: "అర్హత", howToApply: "ఎలా దరఖాస్తు చేయాలి", requiredDocs: "అవసరమైన పత్రాలు", details: "వివరాలు →", less: "← తక్కువ", applyGuide: "అప్లికేషన్ గైడ్", website: "వెబ్‌సైట్", ongoing: "కొనసాగుతోంది", excellent: "అద్భుతమైన", good: "మంచిది", fair: "పర్వాలేదు", partial: "పాక్షిక" }
  },
  gu: {
    nav: { home: "હોમ", explore: "યોજનાઓ શોધો", dashboard: "ડેશબોર્ડ", howItWorks: "તે કેવી રીતે કાર્ય કરે છે", updates: "અપડેટ્સ", search: "યોજનાઓ શોધો..." },
    dashboard: { title: "મારું ડેશબોર્ડ", subtitle: "તમારું વ્યક્તિગત યોજના ટ્રેકર", savedSchemes: "સાચવેલી યોજનાઓ", recentlyViewed: "તાજેતરમાં જોયેલી", applicationProgress: "અરજીની પ્રગતિ", noSaved: "હજી કોઈ યોજના સાચવી નથી", noSavedDesc: "યોજના સાચવવા માટે બુકમાર્ક આઇકોન પર ક્લિક કરો.", noRecent: "તાજેતરમાં જોયેલી કોઈ યોજના નથી", noRecentDesc: "તમે જોયેલી યોજનાઓ અહીં આપમેળે દેખાશે.", noProgress: "કોઈ અરજી પ્રગતિમાં નથી", noProgressDesc: "પ્રગતિને ટ્રેક કરવા માટે અરજી માર્ગદર્શિકા શરૂ કરો.", exploreSchemes: "યોજનાઓ શોધો", of: "માંથી", stepsCompleted: "પગલાં પૂર્ણ થયાં" },
    scheme: { save: "સાચવો", saved: "સાચવેલ", benefits: "ફાયદા", eligibility: "પાત્રતા", howToApply: "કેવી રીતે અરજી કરવી", requiredDocs: "જરૂરી દસ્તાવેજો", details: "વિગતો →", less: "← ઓછું", applyGuide: "અરજી માર્ગદર્શિકા", website: "વેબસાઇટ", ongoing: "ચાલુ છે", excellent: "ઉત્કૃષ્ટ", good: "સારું", fair: "યોગ્ય", partial: "આંશિક" }
  },
  ur: {
    nav: { home: "ہوم", explore: "اسکیمیں تلاش کریں", dashboard: "ڈیش بورڈ", howItWorks: "یہ کیسے کام کرتا ہے", updates: "اپ ڈیٹس", search: "اسکیمیں تلاش کریں..." },
    dashboard: { title: "میرا ڈیش بورڈ", subtitle: "آپ کا ذاتی اسکیم ٹریکر", savedSchemes: "محفوظ کی گئی اسکیمیں", recentlyViewed: "حال ہی میں دیکھی گئیں", applicationProgress: "درخواست کی پیش رفت", noSaved: "ابھی تک کوئی اسکیم محفوظ نہیں کی گئی", noSavedDesc: "اسکیم کو محفوظ کرنے کے لیے بُک مارک آئیکن پر کلک کریں۔", noRecent: "حال ہی میں دیکھی گئی کوئی اسکیم نہیں", noRecentDesc: "آپ جو اسکیمیں دیکھیں گے وہ یہاں خود بخود ظاہر ہوں گی۔", noProgress: "کوئی درخواست جاری نہیں ہے", noProgressDesc: "اپنی پیش رفت کو ٹریک کرنے کے لیے درخواست گائیڈ شروع کریں۔", exploreSchemes: "اسکیمیں تلاش کریں", of: "میں سے", stepsCompleted: "مراحل مکمل" },
    scheme: { save: "محفوظ کریں", saved: "محفوظ کی گئی", benefits: "فوائد", eligibility: "اہلیت", howToApply: "درخواست کیسے دیں", requiredDocs: "مطلوبہ دستاویزات", details: "تفصیلات →", less: "← کم", applyGuide: "درخواست گائیڈ", website: "ویب سائٹ", ongoing: "جاری ہے", excellent: "بہترین", good: "اچھا", fair: "مناسب", partial: "جزوی" }
  },
  mr: {
    nav: { home: "मुख्यपृष्ठ", explore: "योजना शोधा", dashboard: "डॅशबोर्ड", howItWorks: "हे कसे काम करते", updates: "अद्यतने", search: "योजना शोधा..." },
    dashboard: { title: "माझा डॅशबोर्ड", subtitle: "तुमचा वैयक्तिक योजना ट्रॅकर", savedSchemes: "जतन केलेल्या योजना", recentlyViewed: "नुकत्याच पाहिलेल्या", applicationProgress: "अर्ज प्रगती", noSaved: "अद्याप कोणतीही योजना जतन केलेली नाही", noSavedDesc: "योजना जतन करण्यासाठी बुकमार्क चिन्हावर क्लिक करा.", noRecent: "नुकत्याच पाहिलेल्या कोणत्याही योजना नाहीत", noRecentDesc: "तुम्ही पाहिलेल्या योजना येथे आपोआप दिसतील.", noProgress: "कोणतेही अर्ज प्रगतीत नाहीत", noProgressDesc: "तुमच्या प्रगतीचा मागोवा घेण्यासाठी अर्ज मार्गदर्शक सुरू करा.", exploreSchemes: "योजना शोधा", of: "पैकी", stepsCompleted: "पायऱ्या पूर्ण झाल्या" },
    scheme: { save: "जतन करा", saved: "जतन केले", benefits: "फायदे", eligibility: "पात्रता", howToApply: "अर्ज कसा करावा", requiredDocs: "आवश्यक कागदपत्रे", details: "तपशील →", less: "← कमी", applyGuide: "अर्ज मार्गदर्शक", website: "वेबसाइट", ongoing: "चालू आहे", excellent: "उत्कृष्ट", good: "चांगले", fair: "ठीक", partial: "अंशतः" }
  },
  kn: {
    nav: { home: "ಮುಖಪುಟ", explore: "ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ", dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", updates: "ನವೀಕರಣಗಳು", search: "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ..." },
    dashboard: { title: "ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", subtitle: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಯೋಜನೆ ಟ್ರ್ಯಾಕರ್", savedSchemes: "ಉಳಿಸಲಾದ ಯೋಜನೆಗಳು", recentlyViewed: "ಇತ್ತೀಚೆಗೆ ವೀಕ್ಷಿಸಿದವು", applicationProgress: "ಅರ್ಜಿ ಪ್ರಗತಿ", noSaved: "ಇನ್ನೂ ಯಾವುದೇ ಯೋಜನೆಗಳನ್ನು ಉಳಿಸಲಾಗಿಲ್ಲ", noSavedDesc: "ಅದನ್ನು ಉಳಿಸಲು ಯಾವುದೇ ಯೋಜನೆ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಬುಕ್‌ಮಾರ್ಕ್ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.", noRecent: "ಇತ್ತೀಚೆಗೆ ವೀಕ್ಷಿಸಿದ ಯಾವುದೇ ಯೋಜನೆಗಳಿಲ್ಲ", noRecentDesc: "ನೀವು ವೀಕ್ಷಿಸುವ ಯೋಜನೆಗಳು ಇಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ.", noProgress: "ಯಾವುದೇ ಅರ್ಜಿ ಪ್ರಗತಿಯಲ್ಲಿಲ್ಲ", noProgressDesc: "ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ.", exploreSchemes: "ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ", of: "ರಲ್ಲಿ", stepsCompleted: "ಹಂತಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ" },
    scheme: { save: "ಉಳಿಸಿ", saved: "ಉಳಿಸಲಾಗಿದೆ", benefits: "ಪ್ರಯೋಜನಗಳು", eligibility: "ಅರ್ಹತೆ", howToApply: "ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ", requiredDocs: "ಅಗತ್ಯ ದಾಖಲೆಗಳು", details: "ವಿವರಗಳು →", less: "← ಕಡಿಮೆ", applyGuide: "ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶಿ", website: "ವೆಬ್‌ಸೈಟ್", ongoing: "ಮುಂದುವರೆಯುತ್ತಿದೆ", excellent: "ಅತ್ಯುತ್ತಮ", good: "ಉತ್ತಮ", fair: "ಸಾಧಾರಣ", partial: "ಭಾಗಶಃ" }
  },
  or: {
    nav: { home: "ହୋମ୍", explore: "ଯୋଜନାଗୁଡିକ ଅନ୍ୱେଷଣ କରନ୍ତୁ", dashboard: "ଡ୍ୟାସବୋର୍ଡ", howItWorks: "ଏହା କିପରି କାମ କରେ", updates: "ଅପଡେଟ୍", search: "ଯୋଜନାଗୁଡିକ ଖୋଜନ୍ତୁ..." },
    dashboard: { title: "ମୋର ଡ୍ୟାସବୋର୍ଡ", subtitle: "ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ ଯୋଜନା ଟ୍ରାକର୍", savedSchemes: "ସଂରକ୍ଷିତ ଯୋଜନାଗୁଡିକ", recentlyViewed: "ନିକଟରେ ଦେଖାଯାଇଥିବା", applicationProgress: "ଆବେଦନ ପ୍ରଗତି", noSaved: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଯୋଜନା ସଂରକ୍ଷିତ ହୋଇନାହିଁ", noSavedDesc: "ଏହାକୁ ସଂରକ୍ଷଣ କରିବାକୁ ଯେକୌଣସି ଯୋଜନା କାର୍ଡରେ ବୁକମାର୍କ ଆଇକନ୍ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।", noRecent: "ନିକଟରେ ଦେଖାଯାଇଥିବା କୌଣସି ଯୋଜନା ନାହିଁ", noRecentDesc: "ଆପଣ ଦେଖୁଥିବା ଯୋଜନାଗୁଡିକ ଏଠାରେ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ଦେଖାଯିବ।", noProgress: "ପ୍ରଗତିରେ କୌଣସି ଆବେଦନ ନାହିଁ", noProgressDesc: "ଆପଣଙ୍କର ପ୍ରଗତି ଟ୍ରାକ୍ କରିବାକୁ ଆବେଦନ ଗାଇଡ୍ ଆରମ୍ଭ କରନ୍ତୁ।", exploreSchemes: "ଯୋଜନାଗୁଡିକ ଅନ୍ୱେଷଣ କରନ୍ତୁ", of: "ରୁ", stepsCompleted: "ପଦକ୍ଷେପଗୁଡିକ ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଛି" },
    scheme: { save: "ସେଭ୍", saved: "ସେଭ୍ ହୋଇଛି", benefits: "ଲାଭ", eligibility: "ଯୋଗ୍ୟତା", howToApply: "କିପରି ଆବେଦନ କରିବେ", requiredDocs: "ଆବଶ୍ୟକ ଡକ୍ୟୁମେଣ୍ଟ୍", details: "ବିବରଣୀ →", less: "← କମ୍", applyGuide: "ଆବେଦନ ଗାଇଡ୍", website: "ୱେବସାଇଟ୍", ongoing: "ଚାଲୁଅଛି", excellent: "ଉତ୍କୃଷ୍ଟ", good: "ଭଲ", fair: "ଠିକ୍", partial: "ଆଂଶିକ" }
  },
  ml: {
    nav: { home: "ഹോം", explore: "പദ്ധതികൾ തിരയുക", dashboard: "ഡാഷ്‌ബോർഡ്", howItWorks: "ഇതെങ്ങനെ പ്രവർത്തിക്കുന്നു", updates: "അപ്‌ഡേറ്റുകൾ", search: "പദ്ധതികൾ തിരയുക..." },
    dashboard: { title: "എന്റെ ഡാഷ്‌ബോർഡ്", subtitle: "നിങ്ങളുടെ വ്യക്തിഗത പദ്ധതി ട്രാക്കർ", savedSchemes: "സംരക്ഷിച്ച പദ്ധതികൾ", recentlyViewed: "സമീപകാലത്ത് കണ്ടവ", applicationProgress: "അപേക്ഷാ പുരോഗതി", noSaved: "ഇതുവരെ പദ്ധതികളൊന്നും സംരക്ഷിച്ചിട്ടില്ല", noSavedDesc: "പദ്ധതി സംരക്ഷിക്കാൻ ബുക്ക്മാർക്ക് ഐക്കണിൽ ക്ലിക്കുചെയ്യുക.", noRecent: "സമീപകാലത്ത് കണ്ട പദ്ധതികളൊന്നുമില്ല", noRecentDesc: "നിങ്ങൾ കാണുന്ന പദ്ധതികൾ ഇവിടെ യാന്ത്രികമായി ദൃശ്യമാകും.", noProgress: "അപേക്ഷകളൊന്നും പുരോഗതിയിലില്ല", noProgressDesc: "നിങ്ങളുടെ പുരോഗതി ട്രാക്കുചെയ്യുന്നതിന് അപേക്ഷാ ഗൈഡ് ആരംഭിക്കുക.", exploreSchemes: "പദ്ധതികൾ തിരയുക", of: "ൽ", stepsCompleted: "ഘട്ടങ്ങൾ പൂർത്തിയായി" },
    scheme: { save: "സംരക്ഷിക്കുക", saved: "സംരക്ഷിച്ചു", benefits: "നേട്ടങ്ങൾ", eligibility: "യോഗ്യത", howToApply: "എങ്ങനെ അപേക്ഷിക്കണം", requiredDocs: "ആവശ്യമായ രേഖകൾ", details: "വിശദാംശങ്ങൾ →", less: "← കുറവ്", applyGuide: "അപേക്ഷാ ഗൈഡ്", website: "വെബ്സൈറ്റ്", ongoing: "നടന്നുകൊണ്ടിരിക്കുന്നു", excellent: "മികച്ചത്", good: "നല്ലത്", fair: "കുഴപ്പമില്ല", partial: "ഭാഗികം" }
  }
};

Object.keys(translations).forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(translations[lang], null, 2));
});

console.log('Generated translation files');
