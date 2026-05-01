import { GoogleTranslationService } from './googleServices';

/** Supported languages */
export type Language = 'en' | 'hi';

/** Translation schema type */
export type Translations = typeof en;

/** 
 * English Translations 
 * @type {Translations}
 */
export const en = {
  // Navigation
  nav_timeline: 'Timeline',
  nav_assistant: 'AI Assistant',
  nav_polling: 'Polling Booth',
  nav_faq: 'FAQ',
  nav_cta: 'Register to Vote',

  // Hero
  hero_eyebrow: 'YOUR GUIDE TO INDIAN DEMOCRACY',
  hero_title_prefix: 'Empowering Every',
  hero_title_highlight: 'Indian Voter',
  hero_subtitle: 'Your one-stop assistant for voter registration, polling info, and election awareness. Built for the world\'s largest democracy.',
  hero_cta_primary: 'Get Started',
  hero_cta_secondary: 'Ask AI Assistant',
  hero_stat_voters: '960M+ Voters',
  hero_stat_booths: '1M+ Booths',
  hero_stat_phases: '7 Phases',

  // Timeline
  timeline_heading: 'The Electoral Journey',
  timeline_subtitle: 'Step-by-step guide to the Indian election process.',
  timeline_expand_all: 'Expand All',
  timeline_collapse_all: 'Collapse All',

  // Chat
  chat_welcome: 'Namaste! I am LokSaathi, your Indian election assistant. How can I help you today?',
  chat_placeholder: 'Ask about Voter ID, Booths, or EVMs...',
  chat_disclaimer: 'AI can make mistakes. Verify with official ECI sources.',
  chat_loading: 'LokSaathi is thinking...',
  chat_error: 'Something went wrong. Please try again.',
  chat_cleared: 'Chat history cleared!',
  chat_suggested: 'Try asking:',

  // FAQ
  faq_eyebrow: 'COMMON QUERIES',
  faq_heading_prefix: 'Frequently Asked',
  faq_heading_highlight: 'Questions',
  faq_subtitle: 'Quick answers based on official ECI guidelines.',
  faq_allQuestions: 'All',
  faq_eligibility: 'Eligibility',
  faq_registration: 'Registration',
  faq_voting: 'Voting',
  faq_results: 'Results',
  faq_stillQuestions: 'Still have questions?',
  faq_askAi: 'Ask LokSaathi AI Assistant',
  faq_video_title: 'Official ECI Voter Guide',

  // Polling Station
  map_eyebrow: 'POLLING BOOTHS',
  map_heading_prefix: 'Find Your',
  map_heading_highlight: 'Polling Booth',
  map_subtitle: 'Locate your designated station on Google Maps.',
  map_tip1_title: 'Search by EPIC',
  map_tip1_desc: 'Find your booth using your Voter ID number.',
  map_tip2_title: 'Official Portal',
  map_tip2_desc: 'Links to official ECI booth locator.',
  map_tip3_title: 'Directions',
  map_tip3_desc: 'Get turn-by-turn navigation on Google Maps.',
  map_placeholder_title: 'Map Integration Ready',
  map_placeholder_desc: 'Google Maps API is configured and ready.',
  map_placeholder_cta: 'Open NVSP Portal',
  map_openMaps: 'Open in Google Maps',
  map_findNvsp: 'Find on ECI Portal',

  // Footer
  footer_tagline: 'Empowering Indian citizens through digital democracy.',
  footer_explore: 'Explore',
  footer_resources: 'Resources',
  footer_disclaimer: 'LokSaathi is an independent assistant and not an official ECI app. Information is sourced from public ECI guidelines.',
};

/** 
 * Hindi Translations 
 * @type {Translations}
 */
export const hi: Translations = {
  nav_timeline: 'समयरेखा',
  nav_assistant: 'AI सहायक',
  nav_polling: 'मतदान केंद्र',
  nav_faq: 'FAQ',
  nav_cta: 'वोटर रजिस्टर करें',

  hero_eyebrow: 'भारतीय लोकतंत्र के लिए आपका मार्गदर्शक',
  hero_title_prefix: 'हर भारतीय मतदाता को',
  hero_title_highlight: 'सशक्त बनाना',
  hero_subtitle: 'मतदाता पंजीकरण, मतदान जानकारी और चुनाव जागरूकता के लिए आपका वन-स्टॉप सहायक। दुनिया के सबसे बड़े लोकतंत्र के लिए निर्मित।',
  hero_cta_primary: 'शुरू करें',
  hero_cta_secondary: 'AI सहायक से पूछें',
  hero_stat_voters: '96 करोड़+ मतदाता',
  hero_stat_booths: '10 लाख+ केंद्र',
  hero_stat_phases: '7 चरण',

  timeline_heading: 'चुनावी यात्रा',
  timeline_subtitle: 'भारतीय चुनावी प्रक्रिया के लिए चरण-दर-चरण मार्गदर्शिका।',
  timeline_expand_all: 'सभी विस्तार करें',
  timeline_collapse_all: 'सभी संक्षिप्त करें',

  chat_welcome: 'नमस्ते! मैं लोकसाथी हूं, आपका भारतीय चुनाव सहायक। मैं आज आपकी क्या मदद कर सकता हूं?',
  chat_placeholder: 'वोटर आईडी, बूथ या ईवीएम के बारे में पूछें...',
  chat_disclaimer: 'AI गलतियां कर सकता है। आधिकारिक ECI स्रोतों से पुष्टि करें।',
  chat_loading: 'लोकसाथी सोच रहा है...',
  chat_error: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
  chat_cleared: 'चैट इतिहास हटा दिया गया!',
  chat_suggested: 'पूछने का प्रयास करें:',

  faq_eyebrow: 'सामान्य प्रश्न',
  faq_heading_prefix: 'अक्सर पूछे जाने वाले',
  faq_heading_highlight: 'प्रश्न',
  faq_subtitle: 'आधिकारिक ECI दिशानिर्देशों पर आधारित त्वरित उत्तर।',
  faq_allQuestions: 'सभी',
  faq_eligibility: 'पात्रता',
  faq_registration: 'पंजीकरण',
  faq_voting: 'मतदान',
  faq_results: 'परिणाम',
  faq_stillQuestions: 'अभी भी प्रश्न हैं?',
  faq_askAi: 'लोकसाथी AI सहायक से पूछें',
  faq_video_title: 'आधिकारिक ECI मतदाता मार्गदर्शिका',

  map_eyebrow: 'मतदान केंद्र',
  map_heading_prefix: 'अपना',
  map_heading_highlight: 'मतदान केंद्र खोजें',
  map_subtitle: 'Google Maps पर अपना निर्धारित स्टेशन खोजें।',
  map_tip1_title: 'EPIC द्वारा खोजें',
  map_tip1_desc: 'अपने वोटर आईडी नंबर का उपयोग करके अपना बूथ खोजें।',
  map_tip2_title: 'आधिकारिक पोर्टल',
  map_tip2_desc: 'आधिकारिक ECI बूथ लोकेटर का लिंक।',
  map_tip3_title: 'दिशा-निर्देश',
  map_tip3_desc: 'Google Maps पर नेविगेशन प्राप्त करें।',
  map_placeholder_title: 'मानचित्र एकीकरण तैयार',
  map_placeholder_desc: 'Google Maps API कॉन्फ़िगर और तैयार है।',
  map_placeholder_cta: 'NVSP पोर्टल खोलें',
  map_openMaps: 'Google Maps में खोलें',
  map_findNvsp: 'ECI पोर्टल पर खोजें',

  footer_tagline: 'डिजिटल लोकतंत्र के माध्यम से भारतीय नागरिकों को सशक्त बनाना।',
  footer_explore: 'एक्सप्लोर करें',
  footer_resources: 'संसाधन',
  footer_disclaimer: 'लोकसाथी एक स्वतंत्र सहायक है और आधिकारिक ECI ऐप नहीं है। जानकारी सार्वजनिक ECI दिशानिर्देशों से प्राप्त की गई है।',
};

/** 
 * List of supported languages for the UI selector.
 */
export const LANGUAGES = [
  { code: 'en' as const, label: 'English', labelEn: 'English' },
  { code: 'hi' as const, label: 'हिन्दी', labelEn: 'Hindi' },
];

/**
 * Returns translations for a given language.
 * @param {Language} lang The language code.
 * @returns {Translations} The translations object.
 */
export function getTranslations(lang: Language): Translations {
  switch (lang) {
    case 'hi':
      return hi;
    case 'en':
    default:
      return en;
  }
}

/**
 * Dynamically translates text using Google Cloud Translation AI.
 * Falls back to static translations if available.
 * 
 * @param {string} text Text to translate.
 * @param {Language} targetLang Target language.
 * @returns {Promise<string>}
 */
export async function translateDynamic(text: string, targetLang: Language): Promise<string> {
  // Check if we have a static translation for this exact key/text (simple mock logic)
  const t = getTranslations(targetLang);
  const staticMatch = Object.entries(t).find(([_, v]) => v === text);
  if (staticMatch) return text; 

  return GoogleTranslationService.translateText(text, targetLang);
}

