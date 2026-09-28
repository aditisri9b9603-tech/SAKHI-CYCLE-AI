export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_cycle_tracker: string;
  nav_ai_companion: string;
  nav_doctors: string;
  nav_sound_bath: string;
  nav_period_products: string;
  nav_lifestyle_nutrition: string;
  nav_community: string;
  nav_settings: string;
  nav_sign_in: string;
  nav_cart: string;

  // Header & Brand
  brand_title: string;
  brand_tagline: string;
  header_encrypted_vault: string;
  header_language: string;
  header_search_placeholder: string;
  header_voice_checkin: string;

  // Actions & Common
  btn_get_started: string;
  btn_track_cycle: string;
  btn_ask_sakhi: string;
  btn_explore_forecast: string;
  btn_record_feelings: string;
  btn_save_entry: string;
  btn_saving: string;
  btn_saved: string;
  btn_edit: string;
  btn_delete: string;
  btn_cancel: string;
  btn_close: string;
  btn_send: string;
  btn_copy: string;
  btn_copied: string;
  btn_view_all: string;
  btn_learn_more: string;
  btn_checkout: string;
  btn_start_listening: string;
  btn_book_consultation: string;
  btn_send_query: string;

  // Home Page & Product Tour
  hero_badge: string;
  hero_title_main: string;
  hero_title_highlight: string;
  hero_title_end: string;
  hero_description: string;
  hero_cycle_indicator: string;
  hero_estrogen_note: string;
  hero_saved_entries: string;
  hero_days_until_period: string;

  checkin_badge: string;
  checkin_title: string;
  checkin_desc: string;

  tour_title: string;
  tour_subtitle: string;

  // Tour Step 1 - Smart Cycle Tracking
  tour_step1_badge: string;
  tour_step1_title: string;
  tour_step1_desc: string;
  tour_step1_bullet1: string;
  tour_step1_bullet2: string;
  tour_step1_bullet3: string;
  tour_step1_cta: string;

  // Tour Step 2 - Daily Quick-Select Logs
  tour_step2_badge: string;
  tour_step2_title: string;
  tour_step2_desc: string;
  tour_step2_bullet1: string;
  tour_step2_bullet2: string;
  tour_step2_bullet3: string;
  tour_step2_cta: string;

  // Tour Step 3 - AI Predictive Trend Line
  tour_step3_badge: string;
  tour_step3_title: string;
  tour_step3_desc: string;
  tour_step3_bullet1: string;
  tour_step3_bullet2: string;
  tour_step3_bullet3: string;
  tour_step3_cta: string;

  // Tour Step 4 - Lifestyle & Phase Nutrition
  tour_step4_badge: string;
  tour_step4_title: string;
  tour_step4_desc: string;
  tour_step4_bullet1: string;
  tour_step4_bullet2: string;
  tour_step4_bullet3: string;
  tour_step4_cta: string;

  // Tour Step 5 - Sakhi AI Companion
  tour_step5_badge: string;
  tour_step5_title: string;
  tour_step5_desc: string;
  tour_step5_bullet1: string;
  tour_step5_bullet2: string;
  tour_step5_bullet3: string;
  tour_step5_cta: string;

  // Tour Step 6 - Privacy & Vault
  tour_step6_badge: string;
  tour_step6_title: string;
  tour_step6_desc: string;
  tour_step6_bullet1: string;
  tour_step6_bullet2: string;
  tour_step6_bullet3: string;
  tour_step6_cta: string;

  // Disclaimers & Privacy
  disclaimer_estimates: string;
  disclaimer_privacy: string;

  // Cycle Tracker Screen
  tracker_title: string;
  tracker_subtitle: string;
  tab_chart_forecast: string;
  tab_daily_journal: string;
  tab_history: string;
  selected_day_label: string;
  today_badge: string;
  energy_label: string;
  comfort_label: string;
  notes_label: string;
  notes_placeholder: string;
  mood_prompt: string;
  symptoms_prompt: string;

  // AI Companion
  companion_title: string;
  companion_subtitle: string;
  companion_welcome: string;
  companion_placeholder: string;
  companion_typing: string;
  companion_quick_title: string;

  // Doctors Screen
  doctors_title: string;
  doctors_subtitle: string;
  doctors_verified_note: string;

  // Sound Bath
  sound_title: string;
  sound_subtitle: string;

  // Period Products
  products_title: string;
  products_subtitle: string;
  cart_empty: string;
  cart_total: string;

  // Community
  community_title: string;
  community_subtitle: string;

  // Settings
  settings_title: string;
  settings_subtitle: string;
  settings_language: string;
  settings_language_desc: string;
  settings_privacy: string;
  settings_privacy_desc: string;
  settings_delete_data: string;
  settings_delete_confirm: string;
  settings_data_deleted: string;
  settings_export_data: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    nav_home: 'Home Sanctuary',
    nav_cycle_tracker: 'Cycle & Daily Journal',
    nav_ai_companion: 'Sakhi AI Friend',
    nav_doctors: 'Doctor Support',
    nav_sound_bath: 'Calm & Sound Bath',
    nav_period_products: 'Period Care',
    nav_lifestyle_nutrition: 'Food & Nutrition',
    nav_community: 'Community Circle',
    nav_settings: 'Settings & Privacy',
    nav_sign_in: 'Sign In / Register',
    nav_cart: 'Care Bag',

    // Header & Brand
    brand_title: 'Sakhi Cycle',
    brand_tagline: 'Understand • Track • Thrive',
    header_encrypted_vault: 'Private Medical Vault',
    header_language: 'Language',
    header_search_placeholder: 'Search symptoms, phase foods, or remedies...',
    header_voice_checkin: 'Voice Check-in',

    // Actions & Common
    btn_get_started: 'Get Started Free',
    btn_track_cycle: 'Track My Cycle',
    btn_ask_sakhi: 'Ask Sakhi AI',
    btn_explore_forecast: 'View Upcoming Forecast',
    btn_record_feelings: 'Log Daily Feelings',
    btn_save_entry: 'Save to My Journal',
    btn_saving: 'Saving...',
    btn_saved: 'Saved Successfully! 🌸',
    btn_edit: 'Edit Entry',
    btn_delete: 'Delete Entry',
    btn_cancel: 'Cancel',
    btn_close: 'Close',
    btn_send: 'Send',
    btn_copy: 'Copy',
    btn_copied: 'Copied!',
    btn_view_all: 'View All',
    btn_learn_more: 'Learn More',
    btn_checkout: 'Confirm Order',
    btn_start_listening: 'Start Listening',
    btn_book_consultation: 'Book Video Visit',
    btn_send_query: 'Send Private Question',

    // Home Page & Product Tour
    hero_badge: 'Gentle Cycle Wellness & Forecasting',
    hero_title_main: 'Understand Your Body.',
    hero_title_highlight: 'Forecast Your Feelings.',
    hero_title_end: 'Thrive Every Day.',
    hero_description:
      'A peaceful sanctuary made for women. Log symptoms with one tap, explore your 28-day hormone wave, and preview how you will feel next week.',
    hero_cycle_indicator: 'Cycle Rhythm',
    hero_estrogen_note: 'Estrogen building naturally • High energy window',
    hero_saved_entries: 'Saved Journal Logs',
    hero_days_until_period: 'days until period renewal',

    checkin_badge: 'Daily Mood & Symptom Check-In',
    checkin_title: 'How is your body feeling right now?',
    checkin_desc: 'Tap a feeling below to open your daily journal and save your entry:',

    tour_title: 'Your Complete Cycle Sanctuary',
    tour_subtitle: 'Explore how Sakhi Cycle empowers you through every stage of your 28-day rhythm',

    // Tour Step 1 - Smart Cycle Tracking
    tour_step1_badge: 'Step 1 • Visual Rhythm',
    tour_step1_title: 'Follow your 28-day cycle with zero guesswork',
    tour_step1_desc:
      'See exactly which phase of your cycle you are in. Watch estrogen and progesterone waves fluctuate naturally and discover your body’s true rhythm.',
    tour_step1_bullet1: 'Real-time 28-day interactive cycle dial and clinical graph',
    tour_step1_bullet2: 'Clear indicators for Menstrual, Follicular, Ovulation, and Luteal phases',
    tour_step1_bullet3: 'Calculated cycle estimates with honest, transparent guidance',
    tour_step1_cta: 'Open Cycle Wheel',

    // Tour Step 2 - Daily Quick-Select Logs
    tour_step2_badge: 'Step 2 • Effortless Journaling',
    tour_step2_title: 'Record symptoms with gentle one-tap chips',
    tour_step2_desc:
      'Logging should never feel like a chore. Tap emotional moods, physical feelings, pelvic comfort, and period flow in under 15 seconds.',
    tour_step2_bullet1: 'Pre-set mood chips: Calm, Radiant, Tender, Restless, Grounded',
    tour_step2_bullet2: 'Physical symptoms: Mild cramps, bloating, head tension, glowing skin',
    tour_step2_bullet3: 'Optional voice note recorder powered by Gemini 3.5 Transcribe',
    tour_step2_cta: 'Try Daily Journal',

    // Tour Step 3 - AI Predictive Trend Line
    tour_step3_badge: 'Step 3 • Predictive Trend Forecast',
    tour_step3_title: 'Forecast potential symptom patterns before they arrive',
    tour_step3_desc:
      'Our intelligent algorithm analyzes your past journal entries to project upcoming symptom patterns and energy windows so you can plan with confidence.',
    tour_step3_bullet1: 'Glowing predictive trend line showing expected comfort levels',
    tour_step3_bullet2: 'Upcoming phase prep cards with customized nutrition and tea tips',
    tour_step3_bullet3: 'Personalized confidence corridor adapting as you log more days',
    tour_step3_cta: 'Explore Trend Forecast',

    // Tour Step 4 - Lifestyle & Phase Nutrition
    tour_step4_badge: 'Step 4 • Phase-Matched Wellness',
    tour_step4_title: 'Eat and move in harmony with your hormones',
    tour_step4_desc:
      'Your nutritional and movement needs change every week. Learn what whole foods, seed cycling, and workouts support your body in each phase.',
    tour_step4_bullet1: 'Seed cycling guide: Pumpkin & flax seeds, sunflower & sesame',
    tour_step4_bullet2: 'Energy-boosting proteins and soothing herbal tea recommendations',
    tour_step4_bullet3: 'Gentle workout suggestions tailored to your daily energy levels',
    tour_step4_cta: 'View Nutrition Guide',

    // Tour Step 5 - Sakhi AI Companion
    tour_step5_badge: 'Step 5 • 24/7 AI Companion',
    tour_step5_title: 'Ask any question in simple, comforting language',
    tour_step5_desc:
      'Sakhi answers your health curiosities instantly—from cramp remedies and bloating relief to fertility signals and mood changes.',
    tour_step5_bullet1: 'Fast real-time responses powered by Gemini AI',
    tour_step5_bullet2: 'Simple, everyday layman English without confusing medical jargon',
    tour_step5_bullet3: 'Always ready with quick prompt buttons and voice question input',
    tour_step5_cta: 'Chat with Sakhi AI',

    // Tour Step 6 - Privacy & Vault
    tour_step6_badge: 'Step 6 • Total Privacy',
    tour_step6_title: 'Your medical data stays strictly yours',
    tour_step6_desc:
      'We never sell your health information. Your entries are stored in your private encrypted vault, and you have complete control to export or delete them anytime.',
    tour_step6_bullet1: 'Encrypted Firestore database storage tied only to your account',
    tour_step6_bullet2: 'One-click full data deletion option in settings',
    tour_step6_bullet3: 'No advertisements, tracking scripts, or data brokers',
    tour_step6_cta: 'Check Privacy Settings',

    // Disclaimers & Privacy
    disclaimer_estimates:
      'Medical Notice: Cycle predictions and fertile window dates are mathematical estimates based on average rhythms. They are not medical advice, contraception, or guarantees. Always consult a licensed healthcare professional for medical diagnoses.',
    disclaimer_privacy:
      'Data Privacy: Your logs, symptoms, and voice notes are stored securely in your private vault. You can export or delete your health records at any time from Settings.',

    // Cycle Tracker Screen
    tracker_title: 'Cycle Tracker & Daily Journal',
    tracker_subtitle: 'Explore your 28-day hormone curve, view predictive forecasts, and log daily feelings.',
    tab_chart_forecast: 'Chart & Predictive Forecast',
    tab_daily_journal: 'Daily Journaling',
    tab_history: 'Past Journal History',
    selected_day_label: 'Selected Cycle Day',
    today_badge: 'Today',
    energy_label: 'Energy & Vitality',
    comfort_label: 'Pelvic Comfort / Cramps',
    notes_label: 'Personal Reflection / Journal Note',
    notes_placeholder: 'Write any feelings, dreams, or physical sensations you noticed today...',
    mood_prompt: 'Select Emotional Mood',
    symptoms_prompt: 'Select Physical Symptoms',

    // AI Companion
    companion_title: 'Sakhi AI Friend',
    companion_subtitle: 'Ask any question about your body, feelings, or food in plain, gentle English',
    companion_welcome: 'Hello, friend! 🌸 I am Sakhi, your cycle wellness friend. How is your body feeling today?',
    companion_placeholder: 'Ask anything about your cycle, moods, foods, or body feelings...',
    companion_typing: 'Sakhi is writing a helpful answer...',
    companion_quick_title: 'Tap any question to ask instantly:',

    // Doctors Screen
    doctors_title: 'Doctor Support & Telehealth',
    doctors_subtitle: 'Connect with verified gynecologists and women’s health specialists for personalized care.',
    doctors_verified_note: 'All specialists are licensed practitioners. Consultations are confidential and private.',

    // Sound Bath
    sound_title: 'Calm & Sound Bath Sanctuary',
    sound_subtitle: 'Soothing acoustic frequencies, guided breathing, and gentle meditations for cramp relief.',

    // Period Products
    products_title: 'Period Care & Organic Products',
    products_subtitle: 'Thoughtful organic cotton pads, soothing herbal teas, and gentle hot water accessories.',
    cart_empty: 'Your care bag is currently empty.',
    cart_total: 'Estimated Total',

    // Community
    community_title: 'Community Circle',
    community_subtitle: 'A warm, moderated space to share experiences and find sisterhood across all cycle phases.',

    // Settings
    settings_title: 'Settings & Privacy',
    settings_subtitle: 'Manage your preferences, language, and private health records.',
    settings_language: 'Interface Language',
    settings_language_desc: 'Choose your preferred language. All buttons, labels, and text will update immediately.',
    settings_privacy: 'Health Data & Privacy Management',
    settings_privacy_desc: 'You have full ownership of your data. You can export your journal history or permanently delete all saved entries.',
    settings_delete_data: 'Delete All Health Data',
    settings_delete_confirm: 'Are you sure? This will permanently erase your logged symptoms and journal entries from your private vault.',
    settings_data_deleted: 'Your health records have been permanently cleared from your private vault.',
    settings_export_data: 'Export Health Records (JSON)',
  },

  hi: {
    // Navigation
    nav_home: 'होम संचुरी',
    nav_cycle_tracker: 'मासिक चक्र और दैनिक डायरी',
    nav_ai_companion: 'सखी एआई मित्र',
    nav_doctors: 'डॉक्टर सहायता',
    nav_sound_bath: 'शांति और ध्वनि ध्यान',
    nav_period_products: 'मासिक धर्म देखभाल',
    nav_lifestyle_nutrition: 'आहार और पोषण',
    nav_community: 'सहेली मंडल',
    nav_settings: 'सेटिंग्स और गोपनीयता',
    nav_sign_in: 'साइन इन / नया खाता',
    nav_cart: 'केयर बैग',

    // Header & Brand
    brand_title: 'सखी साइकल',
    brand_tagline: 'समझें • ट्रैक करें • स्वस्थ रहें',
    header_encrypted_vault: 'निजी सुरक्षित वॉल्ट',
    header_language: 'भाषा (Language)',
    header_search_placeholder: 'लक्षण, पोषण या घरेलू उपाय खोजें...',
    header_voice_checkin: 'वॉइस चेक-इन',

    // Actions & Common
    btn_get_started: 'मुफ़्त शुरू करें',
    btn_track_cycle: 'साइकल ट्रैक करें',
    btn_ask_sakhi: 'सखी एआई से पूछें',
    btn_explore_forecast: 'आने वाला अनुमान देखें',
    btn_record_feelings: 'आज के लक्षण दर्ज करें',
    btn_save_entry: 'डायरी में सुरक्षित करें',
    btn_saving: 'सहेज रहे हैं...',
    btn_saved: 'सफलतापूर्वक सुरक्षित हुआ! 🌸',
    btn_edit: 'संपादित करें',
    btn_delete: 'हटाएं',
    btn_cancel: 'रद्द करें',
    btn_close: 'बंद करें',
    btn_send: 'भेजें',
    btn_copy: 'कॉपी करें',
    btn_copied: 'कॉपी हो गया!',
    btn_view_all: 'सभी देखें',
    btn_learn_more: 'और जानें',
    btn_checkout: 'ऑर्डर कन्फर्म करें',
    btn_start_listening: 'सुनना शुरू करें',
    btn_book_consultation: 'वीडियो परामर्श बुक करें',
    btn_send_query: 'निजी प्रश्न भेजें',

    // Home Page & Product Tour
    hero_badge: 'सौम्य मासिक धर्म स्वास्थ्य और पूर्वानुमान',
    hero_title_main: 'अपने शरीर को समझें।',
    hero_title_highlight: 'लक्षणों का पूर्वानुमान लगाएं।',
    hero_title_end: 'हर दिन ऊर्जावान रहें।',
    hero_description:
      'महिलाओं के लिए एक शांत और सुंदर स्थान। एक टैप में लक्षण दर्ज करें, अपने 28-दिवसीय हार्मोन प्रवाह को देखें और जानें कि आने वाले दिनों में आप कैसा महसूस करेंगी।',
    hero_cycle_indicator: 'साइकल रिदम',
    hero_estrogen_note: 'एस्ट्रोजेन प्राकृतिक रूप से बढ़ रहा है • उच्च ऊर्जा का समय',
    hero_saved_entries: 'सहेजी गई प्रविष्टियाँ',
    hero_days_until_period: 'दिन बचे हैं अगले पीरियड में',

    checkin_badge: 'दैनिक मनोदशा और लक्षण चेक-इन',
    checkin_title: 'आज आपका शरीर कैसा महसूस कर रहा है?',
    checkin_desc: 'अपनी डायरी खोलने और आज का विवरण सहेजने के लिए नीचे किसी भावना पर टैप करें:',

    tour_title: 'आपका संपूर्ण स्वास्थ्य संचुरी',
    tour_subtitle: 'जानिए कैसे सखी साइकल आपके 28-दिवसीय चक्र के हर चरण में आपका साथ देती है',

    // Tour Step 1 - Smart Cycle Tracking
    tour_step1_badge: 'चरण 1 • विजुअल चक्र',
    tour_step1_title: 'बिना किसी उलझन के अपने 28-दिवसीय चक्र को समझें',
    tour_step1_desc:
      'देखें कि आप अपने चक्र के किस चरण में हैं। एस्ट्रोजेन और प्रोजेस्टेरोन के प्राकृतिक उतार-चढ़ाव को समझें और अपने शरीर की प्राकृतिक लय को पहचानें।',
    tour_step1_bullet1: '28-दिवसीय इंटरएक्टिव साइकल डायल और मेडिकल चार्ट',
    tour_step1_bullet2: 'पीरियड, फॉलिक्युलर, ओव्यूलेशन और ल्यूटियल चरणों की स्पष्ट जानकारी',
    tour_step1_bullet3: 'सटीक और पारदर्शी चक्र अनुमान',
    tour_step1_cta: 'साइकल व्हील देखें',

    // Tour Step 2 - Daily Quick-Select Logs
    tour_step2_badge: 'चरण 2 • आसान डायरी',
    tour_step2_title: 'एक टैप में अपने लक्षण और मूड दर्ज करें',
    tour_step2_desc:
      'लक्षण दर्ज करना कभी मुश्किल नहीं होना चाहिए। 15 सेकंड से भी कम समय में अपने मूड, शारीरिक संवेदनाओं और फ्लो को आसानी से चुनें।',
    tour_step2_bullet1: 'मनोदशा चिप्स: शांत, चमकदार, संवेदनशील, बेचैन, ऊर्जावान',
    tour_step2_bullet2: 'शारीरिक लक्षण: हल्के ऐंठन, पेट फूलना, सिरदर्द, खिली हुई त्वचा',
    tour_step2_bullet3: 'जेमिनी 3.5 से संचालित वैकल्पिक वॉयस नोट रिकॉर्डर',
    tour_step2_cta: 'दैनिक डायरी आज़माएं',

    // Tour Step 3 - AI Predictive Trend Line
    tour_step3_badge: 'चरण 3 • एआई पूर्वानुमान ट्रेंड लाइन',
    tour_step3_title: 'आने वाले दिनों के शारीरिक लक्षणों का पहले से अनुमान लगाएं',
    tour_step3_desc:
      'हमारा एआई एल्गोरिदम आपकी पुरानी डायरी प्रविष्टियों का विश्लेषण करके आने वाले लक्षणों और ऊर्जा स्तर का पूर्वानुमान दिखाता है ताकि आप पहले से तैयार रह सकें।',
    tour_step3_bullet1: 'चमकदार बैंगनी ट्रेंड लाइन जो आने वाले लक्षणों का स्तर दिखाती है',
    tour_step3_bullet2: 'अगले चरण की तैयारी के लिए उपयुक्त चाय और पौष्टिक आहार की सलाह',
    tour_step3_bullet3: 'जैसे-जैसे आप डायरी भरते हैं, यह अनुमान और अधिक सटीक होता जाता है',
    tour_step3_cta: 'ट्रेंड पूर्वानुमान देखें',

    // Tour Step 4 - Lifestyle & Phase Nutrition
    tour_step4_badge: 'चरण 4 • चरण-आधारित पोषण',
    tour_step4_title: 'हार्मोन के अनुसार सही खान-पान और व्यायाम अपनाएं',
    tour_step4_desc:
      'हर हफ्ते आपके शरीर की ज़रूरतें बदलती हैं। जानिए हर चरण में कौन से खाद्य पदार्थ, बीज चक्र (सीड साइकलिंग) और आसान व्यायाम आपके लिए सबसे अच्छे हैं।',
    tour_step4_bullet1: 'सीड साइकलिंग गाइड: कद्दू और अलसी के बीज, सूरजमुखी और तिल',
    tour_step4_bullet2: 'ऊर्जा बढ़ाने वाले प्रोटीन और आरामदायक हर्बल चाय की सलाह',
    tour_step4_bullet3: 'रोज़ाना की ऊर्जा के अनुसार हल्के और सुरक्षित व्यायाम',
    tour_step4_cta: 'पोषण गाइड देखें',

    // Tour Step 5 - Sakhi AI Companion
    tour_step5_badge: 'चरण 5 • 24/7 सखी एआई मित्र',
    tour_step5_title: 'सरल और आत्मीय भाषा में कोई भी सवाल पूछें',
    tour_step5_desc:
      'सखी आपके हर सवाल का तुरंत उत्तर देती है—ऐंठन के घरेलू उपाय, पेट फूलना, नींद की कमी से लेकर मूड में बदलाव और ओव्यूलेशन के संकेतों तक।',
    tour_step5_bullet1: 'जेमिनी एआई द्वारा संचालित त्वरित और सटीक उत्तर',
    tour_step5_bullet2: 'कठिन मेडिकल शब्दों के बिना सरल, रोज़मर्रा की भाषा',
    tour_step5_bullet3: 'एक क्लिक में पूछने के लिए तैयार प्रश्न और बोलकर पूछने की सुविधा',
    tour_step5_cta: 'सखी एआई से बात करें',

    // Tour Step 6 - Privacy & Vault
    tour_step6_badge: 'चरण 6 • पूर्ण गोपनीयता',
    tour_step6_title: 'आपका स्वास्थ्य डेटा केवल आपका है',
    tour_step6_desc:
      'हम आपकी स्वास्थ्य जानकारी कभी किसी को नहीं बेचते। आपकी सभी प्रविष्टियाँ आपके निजी एन्क्रिप्टेड वॉल्ट में सुरक्षित रहती हैं, और आप जब चाहें इन्हें डाउनलोड या मिटा सकते हैं।',
    tour_step6_bullet1: 'केवल आपके खाते से जुड़ा सुरक्षित फायरस्टोर डेटाबेस',
    tour_step6_bullet2: 'सेटिंग्स में एक क्लिक से अपना पूरा डेटा मिटाने की सुविधा',
    tour_step6_bullet3: 'कोई विज्ञापन, ट्रैकिंग या बाहरी डेटा ब्रोकर नहीं',
    tour_step6_cta: 'गोपनीयता सेटिंग्स देखें',

    // Disclaimers & Privacy
    disclaimer_estimates:
      'चिकित्सीय सूचना: साइकल भविष्यवाणियाँ और फर्टाइल विंडो केवल औसत तालमेल पर आधारित गणितीय अनुमान हैं। यह चिकित्सकीय सलाह या गर्भनिरोधक गारंटी नहीं है। स्वास्थ्य संबंधी किसी भी निर्णय के लिए हमेशा योग्य डॉक्टर से संपर्क करें।',
    disclaimer_privacy:
      'डेटा गोपनीयता: आपके लक्षण, प्रविष्टियाँ और वॉयस नोट्स सुरक्षित निजी वॉल्ट में रखे जाते हैं। आप सेटिंग्स से कभी भी अपना डेटा निर्यात या पूर्णतः हटा सकते हैं।',

    // Cycle Tracker Screen
    tracker_title: 'मासिक चक्र और दैनिक डायरी',
    tracker_subtitle: 'अपने 28-दिवसीय हार्मोन प्रवाह को देखें, पूर्वानुमान जानें और रोज़ाना के लक्षण दर्ज करें।',
    tab_chart_forecast: 'चार्ट और एआई पूर्वानुमान',
    tab_daily_journal: 'दैनिक डायरी',
    tab_history: 'पिछला डायरी इतिहास',
    selected_day_label: 'चयनित चक्र दिवस',
    today_badge: 'आज',
    energy_label: 'ऊर्जा और सक्रियता',
    comfort_label: 'शारीरिक आराम / ऐंठन',
    notes_label: 'निजी विचार / डायरी नोट',
    notes_placeholder: 'आज आपने जो भी भावनाएँ या शारीरिक बदलाव महसूस किए, यहाँ लिखें...',
    mood_prompt: 'अपनी मनोदशा चुनें',
    symptoms_prompt: 'शारीरिक लक्षण चुनें',

    // AI Companion
    companion_title: 'सखी एआई मित्र',
    companion_subtitle: 'अपने शरीर, मूड या खान-पान के बारे में सरल और प्यार भरी भाषा में पूछें',
    companion_welcome: 'नमस्ते सखी! 🌸 मैं सखी हूँ, आपकी स्वास्थ्य मित्र। आज आपका शरीर कैसा महसूस कर रहा है?',
    companion_placeholder: 'अपने चक्र, दर्द, खान-पान या मन की बात यहाँ पूछें...',
    companion_typing: 'सखी आपके लिए उत्तर लिख रही है...',
    companion_quick_title: 'तुरंत पूछने के लिए किसी भी प्रश्न पर टैप करें:',

    // Doctors Screen
    doctors_title: 'डॉक्टर सहायता और टेलीहेल्थ',
    doctors_subtitle: 'प्रमाणित स्त्री रोग विशेषज्ञों से जुड़ें और घर बैठे निजी परामर्श प्राप्त करें।',
    doctors_verified_note: 'सभी डॉक्टर सत्यापित और अनुभवी हैं। सभी परामर्श पूर्णतः निजी और गोपनीय होते हैं।',

    // Sound Bath
    sound_title: 'शांति और ध्वनि ध्यान संचुरी',
    sound_subtitle: 'दर्द में राहत और मन की शांति के लिए आरामदायक ध्वनियाँ और श्वास अभ्यास।',

    // Period Products
    products_title: 'मासिक धर्म देखभाल और ऑर्गेनिक उत्पाद',
    products_subtitle: 'ऑर्गेनिक कॉटन पैड्स, राहत देने वाली हर्बल चाय और आरामदायक हीटिंग एक्सेसरीज़।',
    cart_empty: 'आपका केयर बैग अभी खाली है।',
    cart_total: 'अनुमानित कुल',

    // Community
    community_title: 'सहेली मंडल',
    community_subtitle: 'सभी चरणों की महिलाओं के साथ अपने अनुभव साझा करने के लिए एक सुरक्षित मंच।',

    // Settings
    settings_title: 'सेटिंग्स और गोपनीयता',
    settings_subtitle: 'अपनी प्राथमिकताएं, भाषा और निजी स्वास्थ्य रिकॉर्ड प्रबंधित करें।',
    settings_language: 'ऐप की भाषा (Interface Language)',
    settings_language_desc: 'अपनी पसंदीदा भाषा चुनें। सभी बटन, लेबल और जानकारी तुरंत बदल जाएगी।',
    settings_privacy: 'स्वास्थ्य डेटा और गोपनीयता प्रबंधन',
    settings_privacy_desc: 'आपका डेटा पूर्णतः आपका है। आप अपनी डायरी डाउनलोड कर सकते हैं या सभी रिकॉर्ड स्थायी रूप से हटा सकते हैं।',
    settings_delete_data: 'सभी स्वास्थ्य डेटा हटाएं',
    settings_delete_confirm: 'क्या आप निश्चित हैं? इससे आपके सभी दर्ज लक्षण और डायरी प्रविष्टियाँ निजी वॉल्ट से स्थायी रूप से मिट जाएंगी।',
    settings_data_deleted: 'आपका स्वास्थ्य रिकॉर्ड आपके निजी वॉल्ट से स्थायी रूप से हटा दिया गया है।',
    settings_export_data: 'स्वास्थ्य रिकॉर्ड निर्यात करें (JSON)',
  },
};
