/**
 * @file lib/electionData.ts
 * @description Static election data for LokSaathi — India-specific phases, FAQs, and quick prompts.
 * Based on the Election Commission of India (ECI) guidelines and Indian electoral law.
 * 
 * Optimized for O(1) lookups using Maps and standardized with Google-style docstrings.
 */

import type { ElectionPhase, FAQItem, QuickPrompt, ElectionCategory } from '@/types';

/**
 * Election Timeline Phases — Indian Electoral Process
 * @type {ElectionPhase[]}
 */
export const ELECTION_PHASES: ElectionPhase[] = [
  {
    id: 'eligibility',
    step: 1,
    title: 'पात्रता जांचें — Check Your Eligibility',
    subtitle: 'Know your rights as an Indian voter',
    description:
      'Every Indian citizen who is at least 18 years old and is ordinarily a resident of a constituency is eligible to vote in India. Verify your eligibility against the criteria set by the Election Commission of India (ECI).',
    icon: '✅',
    color: '#FF6B00',
    details: [
      'Must be a citizen of India',
      'Must be at least 18 years of age as of the qualifying date (January 1st)',
      'Must be ordinarily resident in the constituency where you wish to vote',
      'Must not be disqualified under the Representation of the People Act, 1951',
      'Must not have been declared of unsound mind or insolvent',
    ],
    tips: [
      'NRIs (Non-Resident Indians) can enroll in their home constituency in India',
      'Students living away from home can enroll either at their home or at their current place of stay',
      'Visit voters.eci.gov.in to check your exact eligibility',
    ],
  },
  {
    id: 'registration',
    step: 2,
    title: 'मतदाता पंजीकरण — Voter Registration (EPIC)',
    subtitle: 'Enroll on the Electoral Roll & get your EPIC card',
    description:
      "Register as a voter to get your EPIC (Electors' Photo Identity Card) — India's official voter ID. Without enrollment on the Electoral Roll, you cannot vote. Registration can be done online via the NVSP or Voter Helpline App.",
    icon: '📝',
    color: '#138808',
    details: [
      'Fill Form 6 online at voters.eci.gov.in or via the Voter Helpline App',
      'Provide Aadhaar number for linking (optional but recommended)',
      'Upload a recent passport-size photograph',
      'Submit proof of age and proof of address',
      'Your application is verified by the Booth Level Officer (BLO)',
      'EPIC card is issued after successful verification',
    ],
    requiredDocuments: [
      'Proof of Age: Aadhaar Card, Birth Certificate, Class 10 Marksheet',
      'Proof of Address: Aadhaar Card, Passport, Bank Passbook, Utility Bill',
      'Recent passport-size photograph',
      'Aadhaar number (for linking — optional but strongly recommended)',
    ],
    deadline: 'Enrollment deadlines vary. Check ECI announcements for your constituency.',
    tips: [
      'Use the Voter Helpline App (Android/iOS) for the easiest registration experience',
      'Link your Aadhaar with your EPIC at voters.eci.gov.in to prevent duplicate entries',
      'Check your name on the electoral roll at nvsp.in after applying',
      'Report any errors using Form 8 to your Electoral Registration Officer (ERO)',
    ],
  },
  {
    id: 'research',
    step: 3,
    title: 'उम्मीदवार शोध — Research Candidates & Manifestos',
    subtitle: 'Make an informed, independent decision',
    description:
      'India\'s elections involve candidates from multiple national and regional parties. Study candidates\' affidavits, declared assets, and criminal records (if any) on the ECI\'s Affidavit portal before voting.',
    icon: '🔍',
    color: '#1A4FA0',
    details: [
      'Read candidate affidavits on the ECI\'s Affidavit Disclosure Portal',
      'Review party manifestos and policy positions',
      'Watch candidate debates on Doordarshan and news channels',
      'Read non-partisan voter guides from organisations like ADR (Association for Democratic Reforms)',
      'Understand Lok Sabha vs. Rajya Sabha vs. Vidhan Sabha differences',
    ],
    tips: [
      'Visit myneta.info for candidate criminal and financial disclosures',
      'Use non-partisan fact-checking sites to verify campaign claims',
      'The Model Code of Conduct (MCC) restricts certain campaign activities once announced',
      'Report election violations to the ECI via the cVIGIL app',
    ],
  },
  {
    id: 'preparation',
    step: 4,
    title: 'Election Day की तैयारी — Prepare for Polling Day',
    subtitle: 'Know your booth, your ID, and your rights',
    description:
      'Before polling day, locate your polling booth (मतदान केंद्र) using your EPIC or the Voter Helpline App. India uses Electronic Voting Machines (EVMs) — no paper ballots. Preparation ensures a smooth, confident voting experience.',
    icon: '🗓️',
    color: '#D45500',
    details: [
      'Find your polling booth at nvsp.in or the Voter Helpline App',
      'Verify your name appears on the Electoral Roll (Voter List)',
      'Note your Booth number, Serial number, and polling station address',
      'Check polling booth opening hours (usually 7 AM – 6 PM)',
      'EPIC (Voter ID) is the primary ID at the booth; 12 alternative IDs are also accepted',
    ],
    requiredDocuments: [
      'EPIC (Voter ID Card) — preferred',
      'Alternatively: Aadhaar Card, Passport, Driving Licence, PAN Card, MNREGA Job Card, Bank/Post Office Passbook with photo, Smart Card issued by RGI',
      'Voter Slip (delivered by BLO before elections — helpful but not mandatory)',
    ],
    tips: [
      'Download your e-EPIC (digital voter ID) from voters.eci.gov.in',
      'Locate your polling booth a day before to avoid confusion',
      'EVMs and VVPATs (Voter-Verified Paper Audit Trail) are used — no manual ballot filling required',
      'You can apply for a postal ballot (Form 12D) if you are a service voter or above 80 years of age',
    ],
  },
  {
    id: 'voting',
    step: 5,
    title: 'मतदान करें — Cast Your Vote (EVM)',
    subtitle: 'Make your voice heard on Polling Day',
    description:
      'On polling day, head to your designated booth, present your ID, sign the register, and press the button next to your chosen candidate on the Electronic Voting Machine (EVM). The VVPAT slip confirms your vote.',
    icon: '🗳️',
    color: '#138808',
    details: [
      'Go to your designated polling booth with your voter ID',
      'Join the queue — maintain order and decorum',
      'Show your ID to the Presiding Officer and sign/give thumb impression in the register',
      'Collect your indelible ink mark on your left index finger',
      'Press the blue button next to your chosen candidate on the EVM',
      'Your vote is confirmed by a beep — VVPAT prints a slip for 7 seconds for your verification',
    ],
    tips: [
      'If your name is on the roll but you forgot your ID, 11 alternative documents are accepted',
      'You have the right to vote even if others in line are turned away',
      'If you are in line when polls close, you still have the right to vote',
      'Use NOTA (None of the Above) if you find no candidate suitable — it\'s your right',
      'Report any booth malpractice on cVIGIL app or call 1950 (Voter Helpline)',
    ],
  },
  {
    id: 'results',
    step: 6,
    title: 'परिणाम — Follow the Election Results',
    subtitle: 'Watch democracy in action — ECI live counting',
    description:
      'After polling closes, EVMs are stored in secure strongrooms. On counting day, Returning Officers count the votes in phases — round by round — and report tallies to the ECI. Results are updated live on results.eci.gov.in.',
    icon: '📊',
    color: '#D45500',
    details: [
      'EVMs are stored in sealed, guarded strongrooms post-election',
      'On counting day, votes are tallied round by round by Returning Officers',
      'Party agents and candidates can observe the counting process',
      'Results are communicated to the ECI and announced constituency-by-constituency',
      'Official results are published by the Returning Officer and the ECI',
    ],
    tips: [
      'Follow live results on results.eci.gov.in',
      'Exit polls are projections — official results may differ significantly',
      'Close contests may be decided by postal ballots counted last',
      'EVM results can be challenged through an Election Petition in the High Court within 45 days',
    ],
  },
  {
    id: 'transition',
    step: 7,
    title: 'शपथ ग्रहण — Oath & Transfer of Power',
    subtitle: 'Democracy completes its cycle',
    description:
      'After result certification, winning candidates are declared elected by the Returning Officer. They are then sworn in by the President (Lok Sabha) or Governor (Vidhan Sabha) — completing India\'s peaceful democratic cycle.',
    icon: '🏛️',
    color: '#FF6B00',
    details: [
      'Winning candidates receive an Election Certificate from the Returning Officer',
      'Political parties negotiate coalition government formation (if needed)',
      'Prime Minister / Chief Minister is sworn in by President / Governor',
      'Cabinet Ministers take oath of office and secrecy',
      'The new Lok Sabha / Vidhan Sabha is constituted and begins its term',
    ],
    tips: [
      'Stay civically engaged — democracy doesn\'t end on election day!',
      'Contact your elected MP/MLA through their official constituency office',
      'Track how your representative votes using PRS Legislative Research (prsindia.org)',
      'Participate in public consultations and gram sabha meetings',
    ],
  },
];

/**
 * FAQ Data — India Election Specific
 * @type {FAQItem[]}
 */
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'भारत में मतदान के लिए कौन पात्र है? (Who is eligible to vote in India?)',
    answer:
      'Every Indian citizen who is 18 years or older as of January 1st of the qualifying year, and is ordinarily a resident of a constituency, is eligible to vote. You must also be enrolled on the Electoral Roll of that constituency. You are not eligible if you have been disqualified under the Representation of the People Act, 1951.',
    category: 'eligibility',
    relatedPhaseId: 'eligibility',
  },
  {
    id: 'faq-2',
    question: 'मतदाता पंजीकरण (EPIC) कैसे करें? (How do I register to vote and get an EPIC card?)',
    answer:
      'Fill Form 6 online at voters.eci.gov.in, through the Voter Helpline App, or in person at your Electoral Registration Office (ERO). You need proof of age, proof of address, and a recent photograph. After verification by the Booth Level Officer (BLO), your name is added to the Electoral Roll and an EPIC (Voter ID) card is issued.',
    category: 'registration',
    relatedPhaseId: 'registration',
  },
  {
    id: 'faq-3',
    question: 'क्या मैं Aadhaar से EPIC लिंक कर सकता हूँ? (Can I link my Aadhaar to my Voter ID?)',
    answer:
      'Yes! Linking Aadhaar with your EPIC is optional but strongly recommended. It helps the ECI eliminate duplicate voter registrations across constituencies. You can link them at voters.eci.gov.in or through the Voter Helpline App using Form 6B. Your Aadhaar data remains confidential.',
    category: 'registration',
    relatedPhaseId: 'registration',
  },
  {
    id: 'faq-4',
    question: 'Polling Booth पर कौन सा ID लाएं? (What ID do I need at the polling booth?)',
    answer:
      'Your EPIC (Voter ID Card) is the primary accepted ID. However, 12 alternative documents are accepted: Aadhaar Card, Passport, Driving Licence, PAN Card, MNREGA Job Card, Bank/Post Office Passbook with photo, Smart Card (RGI), Pension Document with photo, NPR Smart Card, Health Insurance Smart Card, and official ID cards issued by Government. An e-EPIC (digital voter ID) on your phone is also accepted.',
    category: 'voting',
    relatedPhaseId: 'preparation',
  },
  {
    id: 'faq-5',
    question: 'EVM (Electronic Voting Machine) कैसे काम करती है? (How does EVM voting work?)',
    answer:
      'At your polling booth, after ID verification and inking of your finger, you press the blue button next to your chosen candidate\'s name and symbol on the EVM (Ballot Unit). A beep confirms your vote. The VVPAT (Voter-Verified Paper Audit Trail) machine then displays your chosen candidate\'s symbol on a slip for 7 seconds before it drops into a sealed box — allowing you to verify your vote.',
    category: 'voting',
    relatedPhaseId: 'voting',
  },
  {
    id: 'faq-6',
    question: 'NOTA क्या है? (What is NOTA — None of the Above?)',
    answer:
      'NOTA (None of the Above) is an option on the EVM ballot that allows you to reject all candidates without spoiling your ballot. Introduced by the Supreme Court in 2013, pressing NOTA registers your dissent. However, NOTA votes are not counted towards any candidate\'s victory — the candidate with the most votes still wins, even if NOTA gets more votes.',
    category: 'voting',
    relatedPhaseId: 'voting',
  },
  {
    id: 'faq-7',
    question: 'भारत में वोटों की गिनती कैसे होती है? (How are votes counted in India?)',
    answer:
      'On counting day (a day announced separately from polling), EVMs are unsealed in the presence of candidates and their agents. Votes are counted round by round (each round counts one EVM) by the Returning Officer\'s team. Results are tallied and announced after each round until all EVMs from the constituency are counted. Results are published on results.eci.gov.in live.',
    category: 'results',
    relatedPhaseId: 'results',
  },
  {
    id: 'faq-8',
    question: 'चुनाव परिणाम को कैसे चुनौती दें? (How can election results be challenged?)',
    answer:
      'An Election Petition can be filed in the concerned High Court within 45 days of the declaration of results under the Representation of the People Act, 1951. Grounds include corrupt practices, voter suppression, bribery, and EVM tampering. The petition must be filed by an elector or the defeated candidate.',
    category: 'results',
    relatedPhaseId: 'results',
  },
];

/**
 * Quick Prompt Chips for the Chat Assistant — India-focused
 * @type {QuickPrompt[]}
 */
export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'qp-1',
    label: 'EPIC card kaise banayein?',
    prompt: 'How do I register for a Voter ID (EPIC card) in India? What documents do I need?',
    icon: '📝',
    category: 'registration',
  },
  {
    id: 'qp-2',
    label: 'Kya main vote kar sakta hoon?',
    prompt: 'What are the eligibility requirements to vote in Indian elections?',
    icon: '✅',
    category: 'eligibility',
  },
  {
    id: 'qp-3',
    label: 'EVM par vote kaise karein?',
    prompt: 'How does voting on an EVM (Electronic Voting Machine) work in India? What is VVPAT?',
    icon: '🗳️',
    category: 'voting',
  },
  {
    id: 'qp-4',
    label: 'Votes kaise gine jaate hain?',
    prompt: 'How are votes counted in Indian elections and when are results declared?',
    icon: '📊',
    category: 'results',
  },
  {
    id: 'qp-5',
    label: 'Aadhaar-EPIC link karna?',
    prompt: 'How do I link my Aadhaar card with my Voter ID (EPIC) in India? Is it mandatory?',
    icon: '🔗',
    category: 'registration',
  },
  {
    id: 'qp-6',
    label: 'NOTA kya hota hai?',
    prompt: 'What is NOTA (None of the Above) in Indian elections? How does it work?',
    icon: '🔍',
    category: 'voting',
  },
];

/**
 * O(1) Lookup Maps for optimized data retrieval.
 * Standardized for maximum efficiency.
 */

/** Map of Election Phases by ID */
export const PHASE_MAP = new Map<string, ElectionPhase>(
  ELECTION_PHASES.map(phase => [phase.id, phase])
);

/** Map of FAQ items by ID */
export const FAQ_MAP = new Map<string, FAQItem>(
  FAQ_ITEMS.map(faq => [faq.id, faq])
);

/** Map of FAQs grouped by Category for efficient filtering */
export const FAQ_BY_CATEGORY = FAQ_ITEMS.reduce((acc, faq) => {
  if (!acc.has(faq.category)) {
    acc.set(faq.category, []);
  }
  acc.get(faq.category)!.push(faq);
  return acc;
}, new Map<ElectionCategory, FAQItem[]>());

/**
 * Get an election phase by its ID.
 * @param {string} id The phase ID.
 * @returns {ElectionPhase | undefined} The phase data or undefined.
 */
export function getPhaseById(id: string): ElectionPhase | undefined {
  return PHASE_MAP.get(id);
}

/**
 * Get FAQs for a specific category.
 * @param {ElectionCategory | 'all'} category The category to filter by.
 * @returns {FAQItem[]} Array of matching FAQ items.
 */
export function getFAQsByCategory(category: ElectionCategory | 'all'): FAQItem[] {
  if (category === 'all') return FAQ_ITEMS;
  return FAQ_BY_CATEGORY.get(category) || [];
}
