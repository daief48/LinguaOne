/* =========================================================================
   LinguaOne — demo data
   All content is local mock data. No backend, no AI API, no payments.
   ========================================================================= */

export const user = {
  name: 'Alex',
  fullName: 'Alex Morgan',
  initials: 'AM',
  email: 'alex.morgan@email.com',
  memberSince: 'March 2025',
  level: 'B1',
  levelName: 'Intermediate',
  language: 'English',
  languageFlag: '🇬🇧',
  goal: 'Speak Fluently',
  dailyGoalMinutes: 15,
  minutesToday: 12,
  streak: 7,
  xp: 2480,
  xpToNextLevel: 3000,
  wordsLearned: 326,
  totalPractice: '8h 42m',
  conversations: 42,
}

/* ------------------------------ Languages ------------------------------ */

export const languages = [
  { id: 'en', name: 'English', flag: '🇬🇧', desc: 'Global business & travel', learners: '12.4M', tint: 'blue' },
  { id: 'de', name: 'German', flag: '🇩🇪', desc: 'Work & study in Europe', learners: '3.1M', tint: 'orange' },
  { id: 'fr', name: 'French', flag: '🇫🇷', desc: 'Culture & diplomacy', learners: '4.6M', tint: 'indigo' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸', desc: 'Spoken on 4 continents', learners: '8.2M', tint: 'amber' },
  { id: 'ar', name: 'Arabic', flag: '🇸🇦', desc: 'Business across the Gulf', learners: '2.4M', tint: 'green' },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵', desc: 'Tech, culture & travel', learners: '3.8M', tint: 'pink' },
  { id: 'it', name: 'Italian', flag: '🇮🇹', desc: 'Design, food & art', learners: '1.9M', tint: 'rose' },
  { id: 'zh', name: 'Chinese', flag: '🇨🇳', desc: 'Trade & manufacturing', learners: '5.3M', tint: 'red' },
  { id: 'ko', name: 'Korean', flag: '🇰🇷', desc: 'Culture & K-content', learners: '4.1M', tint: 'violet' },
]

/* ------------------------------- Goals --------------------------------- */

export const learningGoals = [
  { id: 'fluency', label: 'Speak Fluently', desc: 'Talk without hesitating', icon: 'Speech', tint: 'violet' },
  { id: 'ielts', label: 'IELTS', desc: 'Target band 7.0+', icon: 'GraduationCap', tint: 'indigo' },
  { id: 'job', label: 'Job', desc: 'Interviews & workplace', icon: 'Briefcase', tint: 'blue' },
  { id: 'study', label: 'Study', desc: 'University & academics', icon: 'BookOpen', tint: 'cyan' },
  { id: 'travel', label: 'Travel', desc: 'Airports, hotels, tours', icon: 'Plane', tint: 'green' },
  { id: 'daily', label: 'Daily Conversation', desc: 'Everyday small talk', icon: 'MessageCircle', tint: 'amber' },
  { id: 'business', label: 'Business', desc: 'Meetings & negotiation', icon: 'Building2', tint: 'orange' },
  { id: 'general', label: 'General Fluency', desc: 'A balanced all-round plan', icon: 'Globe', tint: 'pink' },
]

export const dailyGoalOptions = [
  { id: 5, minutes: 5, label: 'Casual', desc: 'A quick daily warm-up', xp: '40 XP / day' },
  { id: 10, minutes: 10, label: 'Steady', desc: 'Build a light habit', xp: '80 XP / day' },
  { id: 15, minutes: 15, label: 'Serious', desc: 'The sweet spot for progress', xp: '120 XP / day', recommended: true },
  { id: 30, minutes: 30, label: 'Intense', desc: 'Fast, visible improvement', xp: '240 XP / day' },
  { id: 60, minutes: 60, label: 'Immersive', desc: 'Exam-ready in weeks', xp: '480 XP / day' },
]

/* --------------------------- Placement test ---------------------------- */

export const placementQuestions = [
  {
    id: 1,
    category: 'Grammar',
    prompt: 'Choose the correct sentence.',
    options: [
      { id: 'a', text: 'She go to school every day.' },
      { id: 'b', text: 'She goes to school every day.' },
      { id: 'c', text: 'She going to school every day.' },
    ],
    correct: 'b',
    explain: 'With he / she / it in the present simple, the verb takes an -s ending.',
  },
  {
    id: 2,
    category: 'Vocabulary',
    prompt: 'Which word means “to change to fit a new situation”?',
    options: [
      { id: 'a', text: 'Adapt' },
      { id: 'b', text: 'Adopt' },
      { id: 'c', text: 'Admire' },
    ],
    correct: 'a',
    explain: '“Adapt” means to adjust. “Adopt” means to take something on as your own.',
  },
  {
    id: 3,
    category: 'Grammar',
    prompt: 'Complete the sentence: “I have worked here ___ 2021.”',
    options: [
      { id: 'a', text: 'for' },
      { id: 'b', text: 'since' },
      { id: 'c', text: 'during' },
    ],
    correct: 'b',
    explain: 'Use “since” with a point in time, and “for” with a length of time.',
  },
  {
    id: 4,
    category: 'Listening',
    prompt: 'Listen and choose what the speaker is asking for.',
    audioLabel: 'Coffee shop · 0:09',
    options: [
      { id: 'a', text: 'A table for two' },
      { id: 'b', text: 'The bill' },
      { id: 'c', text: 'The wifi password' },
    ],
    correct: 'c',
    explain: 'The speaker says “Could I get the wifi code, please?”',
  },
  {
    id: 5,
    category: 'Vocabulary',
    prompt: 'Choose the most natural word: “The deadline is very ___.”',
    options: [
      { id: 'a', text: 'tight' },
      { id: 'b', text: 'narrow' },
      { id: 'c', text: 'thin' },
    ],
    correct: 'a',
    explain: '“A tight deadline” is the natural collocation in English.',
  },
  {
    id: 6,
    category: 'Speaking',
    speaking: true,
    prompt: 'Answer out loud: “Tell me about the work you do.”',
    hint: 'Speak for about 20 seconds. Your AI teacher scores fluency and pronunciation.',
  },
]

export const placementResult = {
  level: 'B1',
  levelName: 'Intermediate',
  blurb: 'You can handle everyday conversations and follow most clear speech at natural speed.',
  percentile: 'Ahead of 64% of learners who started this week',
  skills: [
    { key: 'speaking', label: 'Speaking', score: 62, tint: 'violet' },
    { key: 'listening', label: 'Listening', score: 71, tint: 'cyan' },
    { key: 'grammar', label: 'Grammar', score: 68, tint: 'blue' },
    { key: 'vocabulary', label: 'Vocabulary', score: 65, tint: 'green' },
    { key: 'pronunciation', label: 'Pronunciation', score: 58, tint: 'pink' },
  ],
  recommendation: 'Your strongest skill is listening. Let’s focus on speaking and pronunciation.',
  focus: ['Speaking', 'Pronunciation'],
}

/* ------------------------- Personalized plan --------------------------- */

export const learningPlan = {
  week: 1,
  title: 'Foundation for confident speaking',
  totalMinutes: 105,
  days: [
    { day: 1, title: 'Speaking Basics', skill: 'Speaking', minutes: 15, status: 'current', icon: 'Speech', tint: 'violet', desc: 'Introduce yourself naturally' },
    { day: 2, title: 'Daily Vocabulary', skill: 'Vocabulary', minutes: 15, status: 'locked', icon: 'BookOpen', tint: 'green', desc: '10 high-frequency words' },
    { day: 3, title: 'Listening Practice', skill: 'Listening', minutes: 15, status: 'locked', icon: 'Headphones', tint: 'cyan', desc: 'Understand natural speed' },
    { day: 4, title: 'Grammar Boost', skill: 'Grammar', minutes: 15, status: 'locked', icon: 'PenTool', tint: 'blue', desc: 'Articles and prepositions' },
    { day: 5, title: 'Conversation Practice', skill: 'Speaking', minutes: 15, status: 'locked', icon: 'MessageCircle', tint: 'indigo', desc: 'Free talk with your AI teacher' },
    { day: 6, title: 'Pronunciation', skill: 'Pronunciation', minutes: 15, status: 'locked', icon: 'AudioLines', tint: 'pink', desc: 'Word stress and the /θ/ sound' },
    { day: 7, title: 'Weekly Review', skill: 'Review', minutes: 15, status: 'locked', icon: 'Trophy', tint: 'amber', desc: 'Check what stuck this week' },
  ],
  outcomes: [
    'Introduce yourself without hesitating',
    'Learn 40 words you will actually use',
    'Fix the 3 grammar mistakes you repeat most',
  ],
}

/* ---------------------------- Home dashboard --------------------------- */

export const continueLesson = {
  id: 'intro-yourself',
  title: 'Introducing Yourself',
  section: 'Speaking',
  minutes: 8,
  progress: 45,
  step: 'Step 3 of 6',
}

export const quickPractice = [
  { id: 'conversation', label: 'Conversation', icon: 'MessageCircle', tint: 'violet', to: '/conversation', meta: '5 min' },
  { id: 'listening', label: 'Listening', icon: 'Headphones', tint: 'cyan', to: '/listening', meta: '4 min' },
  { id: 'vocabulary', label: 'Vocabulary', icon: 'BookOpen', tint: 'green', to: '/vocabulary', meta: '5 new' },
  { id: 'grammar', label: 'Grammar', icon: 'PenTool', tint: 'blue', to: '/grammar', meta: '3 fixes' },
]

export const skillProgress = [
  { key: 'speaking', label: 'Speaking', value: 62, delta: 6, tint: 'violet', icon: 'Speech' },
  { key: 'listening', label: 'Listening', value: 71, delta: 9, tint: 'cyan', icon: 'Headphones' },
  { key: 'grammar', label: 'Grammar', value: 68, delta: 4, tint: 'blue', icon: 'PenTool' },
  { key: 'vocabulary', label: 'Vocabulary', value: 65, delta: 7, tint: 'green', icon: 'BookOpen' },
  { key: 'pronunciation', label: 'Pronunciation', value: 58, delta: 3, tint: 'pink', icon: 'AudioLines' },
]

/* ------------------------------ Vocabulary ----------------------------- */

export const vocabulary = [
  {
    id: 'adapt',
    word: 'Adapt',
    phonetic: '/əˈdæpt/',
    type: 'verb',
    level: 'B1',
    meaning: 'To change something to fit a new situation.',
    example: 'Developers must adapt to new technologies.',
    synonyms: ['adjust', 'modify', 'tailor'],
    tint: 'violet',
  },
  {
    id: 'reliable',
    word: 'Reliable',
    phonetic: '/rɪˈlaɪəbl/',
    type: 'adjective',
    level: 'B1',
    meaning: 'Able to be trusted to do what you promised.',
    example: 'She is the most reliable member of the team.',
    synonyms: ['dependable', 'trustworthy', 'consistent'],
    tint: 'cyan',
  },
  {
    id: 'deadline',
    word: 'Deadline',
    phonetic: '/ˈdedlaɪn/',
    type: 'noun',
    level: 'B1',
    meaning: 'The latest time by which something must be finished.',
    example: 'We agreed on a tight deadline for the launch.',
    synonyms: ['due date', 'cut-off', 'time limit'],
    tint: 'green',
  },
  {
    id: 'improve',
    word: 'Improve',
    phonetic: '/ɪmˈpruːv/',
    type: 'verb',
    level: 'A2',
    meaning: 'To make something better than it was before.',
    example: 'Ten minutes a day will improve your speaking.',
    synonyms: ['enhance', 'refine', 'upgrade'],
    tint: 'pink',
  },
  {
    id: 'confident',
    word: 'Confident',
    phonetic: '/ˈkɒnfɪdənt/',
    type: 'adjective',
    level: 'B1',
    meaning: 'Feeling sure about your own ability to do something.',
    example: 'After a month of practice he felt confident in meetings.',
    synonyms: ['assured', 'self-assured', 'certain'],
    tint: 'amber',
  },
]

/* ------------------------------- Learn --------------------------------- */

export const learnSections = [
  { id: 'speaking', label: 'Speaking', icon: 'Speech', tint: 'violet', progress: 45, lessons: 12 },
  { id: 'grammar', label: 'Grammar', icon: 'PenTool', tint: 'blue', progress: 62, lessons: 18 },
  { id: 'vocabulary', label: 'Vocabulary', icon: 'BookOpen', tint: 'green', progress: 51, lessons: 16 },
  { id: 'listening', label: 'Listening', icon: 'Headphones', tint: 'cyan', progress: 38, lessons: 14 },
  { id: 'pronunciation', label: 'Pronunciation', icon: 'AudioLines', tint: 'pink', progress: 22, lessons: 10 },
]

export const coursePath = {
  speaking: [
    { id: 'greetings', title: 'Greetings & Small Talk', minutes: 6, status: 'done', xp: 40 },
    { id: 'intro-yourself', title: 'Introducing Yourself', minutes: 8, status: 'current', xp: 60, progress: 45 },
    { id: 'work-life', title: 'Talking About Your Work', minutes: 9, status: 'locked', xp: 60 },
    { id: 'opinions', title: 'Giving Your Opinion', minutes: 10, status: 'locked', xp: 80 },
    { id: 'storytelling', title: 'Telling a Short Story', minutes: 12, status: 'locked', xp: 100 },
  ],
  grammar: [
    { id: 'articles', title: 'Articles: a, an, the', minutes: 7, status: 'done', xp: 40 },
    { id: 'present-perfect', title: 'Present Perfect', minutes: 9, status: 'done', xp: 60 },
    { id: 'prepositions', title: 'Prepositions of Time', minutes: 8, status: 'current', xp: 60, progress: 30 },
    { id: 'conditionals', title: 'First & Second Conditionals', minutes: 11, status: 'locked', xp: 80 },
    { id: 'passive', title: 'The Passive Voice', minutes: 10, status: 'locked', xp: 80 },
  ],
  vocabulary: [
    { id: 'workplace', title: 'Workplace Essentials', minutes: 6, status: 'done', xp: 40 },
    { id: 'tech-words', title: 'Technology & Tools', minutes: 7, status: 'current', xp: 60, progress: 55 },
    { id: 'phrasal', title: 'Everyday Phrasal Verbs', minutes: 9, status: 'locked', xp: 60 },
    { id: 'collocations', title: 'Natural Collocations', minutes: 8, status: 'locked', xp: 80 },
    { id: 'idioms', title: 'Useful Idioms', minutes: 10, status: 'locked', xp: 80 },
  ],
  listening: [
    { id: 'numbers', title: 'Numbers, Dates & Prices', minutes: 5, status: 'done', xp: 40 },
    { id: 'cafe', title: 'At a Coffee Shop', minutes: 6, status: 'current', xp: 60, progress: 20 },
    { id: 'meeting', title: 'A Short Team Meeting', minutes: 8, status: 'locked', xp: 60 },
    { id: 'podcast', title: 'Podcast: Working Remotely', minutes: 11, status: 'locked', xp: 100 },
    { id: 'accents', title: 'Different English Accents', minutes: 12, status: 'locked', xp: 100 },
  ],
  pronunciation: [
    { id: 'th-sound', title: 'The /θ/ and /ð/ Sounds', minutes: 6, status: 'current', xp: 60, progress: 15 },
    { id: 'word-stress', title: 'Word Stress Patterns', minutes: 7, status: 'locked', xp: 60 },
    { id: 'linking', title: 'Linking Words Together', minutes: 8, status: 'locked', xp: 80 },
    { id: 'intonation', title: 'Question Intonation', minutes: 9, status: 'locked', xp: 80 },
    { id: 'minimal-pairs', title: 'Minimal Pairs Drill', minutes: 10, status: 'locked', xp: 100 },
  ],
}

export const lessonDetail = {
  id: 'intro-yourself',
  title: 'Introducing Yourself',
  subtitle: 'Sound natural in the first 30 seconds of any conversation',
  minutes: 8,
  xp: 60,
  level: 'B1',
  skills: ['Speaking', 'Vocabulary'],
  progress: 45,
  sections: [
    { id: 'learn', label: 'Learn', desc: '4 key phrases with examples', minutes: 2, icon: 'BookOpen', tint: 'blue', status: 'done' },
    { id: 'listen', label: 'Listen', desc: 'Hear a native introduction', minutes: 2, icon: 'Headphones', tint: 'cyan', status: 'done' },
    { id: 'speak', label: 'Speak', desc: 'Record your own introduction', minutes: 3, icon: 'Mic', tint: 'violet', status: 'current' },
    { id: 'practice', label: 'Practice', desc: 'AI checks grammar and fluency', minutes: 1, icon: 'Sparkles', tint: 'pink', status: 'locked' },
  ],
  vocabulary: [
    { word: 'Profession', phonetic: '/prəˈfeʃn/', meaning: 'The job you are trained to do.' },
    { word: 'Experience', phonetic: '/ɪkˈspɪəriəns/', meaning: 'The skill you gain by doing something.' },
    { word: 'Interest', phonetic: '/ˈɪntrəst/', meaning: 'A subject you enjoy and want to know more about.' },
    { word: 'Background', phonetic: '/ˈbækɡraʊnd/', meaning: 'Your education and work history.' },
  ],
}

/* ---------------------------- Conversation ----------------------------- */

export const conversationTopic = {
  title: 'Introducing Yourself',
  level: 'B1',
  minutes: 5,
  goal: 'Talk about your job and experience',
}

export const conversationScript = [
  {
    id: 1,
    ai: 'Hi! Nice to meet you. Tell me a little about yourself.',
    userSaid: 'I’m a web developer and I have three years experience.',
    correction: {
      corrected: 'I’m a web developer with three years of experience.',
      tip: 'Use “with” when describing experience.',
      xp: 10,
    },
  },
  {
    id: 2,
    ai: 'Nice — three years is solid. What kind of projects do you enjoy most?',
    userSaid: 'I like to build the dashboards for the startup companies.',
    correction: {
      corrected: 'I like building dashboards for startups.',
      tip: 'Drop “the” when you mean things in general.',
      xp: 10,
    },
  },
  {
    id: 3,
    ai: 'Great. And where would you like your career to go in the next two years?',
    userSaid: 'I want to become a senior developer and lead a small team.',
    correction: null,
    praise: 'Perfect sentence — clear structure and natural word order.',
  },
]

export const grammarCorrection = {
  original: 'I have three years experience.',
  corrected: 'I have three years of experience.',
  explanation:
    'Use “of experience” after a number when talking about how much experience someone has.',
  tipTitle: 'Grammar Tip',
  tip: 'Number + years + of + noun. The same pattern works for “two years of study” and “five years of training”.',
  xp: 10,
  more: [
    { wrong: 'I have 5 years experience in design.', right: 'I have 5 years of experience in design.' },
    { wrong: 'She has ten years experience.', right: 'She has ten years of experience.' },
  ],
  category: 'Prepositions',
  seenBefore: 3,
}

/* ---------------------------- Pronunciation ---------------------------- */

export const pronunciationWord = {
  word: 'Experience',
  phonetic: '/ɪkˈspɪəriəns/',
  syllables: ['ex', 'PE', 'ri', 'ence'],
  stressIndex: 1,
  meaning: 'The skill or knowledge you get from doing something.',
  score: 82,
  verdict: 'Good pronunciation!',
  areas: [
    { key: 'stress', label: 'Stress', score: 88, note: 'Stress lands on the second syllable — correct.', tint: 'violet' },
    { key: 'vowels', label: 'Vowels', score: 74, note: 'The /ɪə/ sound is a little short.', tint: 'cyan' },
    { key: 'rhythm', label: 'Rhythm', score: 84, note: 'Natural pace, keep it up.', tint: 'green' },
  ],
  nextWords: ['Professional', 'Comfortable', 'Opportunity'],
}

/* ------------------------------ Listening ------------------------------ */

export const listeningExercise = {
  title: 'Meeting a New Colleague',
  accent: 'British English',
  speed: 'Natural',
  duration: 42,
  transcript: [
    { t: 0, speaker: 'Sarah', text: 'Hi, I’m Sarah. I just joined the product team last week.' },
    { t: 8, speaker: 'Tom', text: 'Welcome! I’m Tom. So what do you do exactly?' },
    { t: 15, speaker: 'Sarah', text: 'I’m a designer — I work mostly on the mobile app.' },
    { t: 24, speaker: 'Tom', text: 'That’s great. How long have you been designing?' },
    { t: 31, speaker: 'Sarah', text: 'About six years now. I moved here from Manchester.' },
  ],
  question: 'What does Sarah do?',
  options: [
    { id: 'a', text: 'Teacher' },
    { id: 'b', text: 'Designer' },
    { id: 'c', text: 'Developer' },
    { id: 'd', text: 'Doctor' },
  ],
  correct: 'b',
  explanation: 'Sarah says “I’m a designer — I work mostly on the mobile app.” at 0:15.',
}

/* -------------------------------- IELTS -------------------------------- */

export const ielts = {
  targetBand: 7.0,
  estimatedBand: 6.5,
  testDate: 'Nov 22, 2026',
  daysLeft: 74,
  skills: [
    { key: 'speaking', label: 'Speaking', band: 6.5, tint: 'violet' },
    { key: 'listening', label: 'Listening', band: 7.0, tint: 'cyan' },
    { key: 'grammar', label: 'Grammar', band: 6.5, tint: 'blue' },
    { key: 'vocabulary', label: 'Vocabulary', band: 6.0, tint: 'green' },
  ],
  parts: [
    { id: 'part1', title: 'Speaking Part 1', desc: 'Introduction & familiar topics', minutes: '4–5 min', questions: 12, status: 'done', tint: 'violet' },
    { id: 'part2', title: 'Speaking Part 2', desc: 'Long turn — the cue card', minutes: '3–4 min', questions: 8, status: 'current', tint: 'indigo' },
    { id: 'part3', title: 'Speaking Part 3', desc: 'Abstract discussion', minutes: '4–5 min', questions: 10, status: 'locked', tint: 'cyan' },
  ],
  tips: [
    'Use linking phrases: “on top of that”, “having said that”.',
    'Give a reason and an example for every opinion.',
    'Don’t stop to fix small mistakes — keep speaking.',
  ],
}

export const ieltsTest = {
  part: 'Part 2',
  question: 'Describe a skill you would like to learn.',
  cues: [
    'What the skill is',
    'How you would learn it',
    'How difficult it would be',
    'And explain why you want to learn it',
  ],
  result: {
    band: 6.5,
    criteria: [
      { key: 'fluency', label: 'Fluency', fullLabel: 'Fluency & Coherence', band: 6.5, tint: 'violet', note: 'Good flow with occasional hesitation.' },
      { key: 'vocabulary', label: 'Vocabulary', fullLabel: 'Lexical Resource', band: 6.0, tint: 'cyan', note: 'Mostly common words — add topic-specific range.' },
      { key: 'grammar', label: 'Grammar', fullLabel: 'Grammatical Range', band: 6.5, tint: 'blue', note: 'Mixed structures, a few article slips.' },
      { key: 'pronunciation', label: 'Pronunciation', fullLabel: 'Pronunciation', band: 6.0, tint: 'pink', note: 'Clear overall, work on word stress.' },
    ],
    feedback: 'Your answer is clear and well structured. Try using more advanced linking phrases.',
    strengths: ['Answered every cue point', 'Natural, steady pace', 'Clear opening sentence'],
    improve: [
      'Replace “very good” with “remarkably useful” or “invaluable”.',
      'Add one complex sentence with “which” or “although”.',
      'Stress the second syllable in “develop”.',
    ],
    wordsSpoken: 168,
    speakingTime: '1:52',
  },
}

/* ------------------------------- Practice ------------------------------ */

export const practiceModes = [
  { id: 'free', title: 'Free Conversation', desc: 'Talk about anything with your AI teacher', minutes: 5, icon: 'MessageCircle', tint: 'violet', to: '/conversation', badge: 'Popular' },
  { id: 'ielts', title: 'IELTS Speaking', desc: 'Full mock test with band scoring', minutes: 12, icon: 'GraduationCap', tint: 'indigo', to: '/ielts', badge: 'Exam' },
  { id: 'interview', title: 'Job Interview', desc: 'Answer real interview questions', minutes: 10, icon: 'Briefcase', tint: 'blue', to: '/conversation', premium: true },
  { id: 'travel', title: 'Travel English', desc: 'Airports, hotels and directions', minutes: 6, icon: 'Plane', tint: 'cyan', to: '/conversation' },
  { id: 'shopping', title: 'Shopping', desc: 'Prices, sizes and returns', minutes: 5, icon: 'ShoppingBag', tint: 'green', to: '/conversation' },
  { id: 'casual', title: 'Casual Conversation', desc: 'Small talk that feels natural', minutes: 7, icon: 'Coffee', tint: 'amber', to: '/conversation' },
  { id: 'business', title: 'Business English', desc: 'Meetings, email and negotiation', minutes: 9, icon: 'Building2', tint: 'orange', to: '/conversation', premium: true },
  { id: 'academic', title: 'Academic English', desc: 'Presentations and seminars', minutes: 11, icon: 'BookMarked', tint: 'pink', to: '/conversation', premium: true },
]

export const practiceDrills = [
  { id: 'pronunciation', title: 'Pronunciation Coach', desc: 'Word-by-word scoring', icon: 'AudioLines', tint: 'pink', to: '/pronunciation' },
  { id: 'listening', title: 'Listening Lab', desc: 'Real conversations', icon: 'Headphones', tint: 'cyan', to: '/listening' },
  { id: 'vocabulary', title: 'Vocabulary Cards', desc: '5 new words today', icon: 'BookOpen', tint: 'green', to: '/vocabulary' },
  { id: 'grammar', title: 'Grammar Fixes', desc: 'Your repeated mistakes', icon: 'PenTool', tint: 'blue', to: '/grammar' },
]

/* ------------------------------- Progress ------------------------------ */

export const weeklyActivity = [
  { day: 'Mon', minutes: 14, goal: 15 },
  { day: 'Tue', minutes: 18, goal: 15 },
  { day: 'Wed', minutes: 9, goal: 15 },
  { day: 'Thu', minutes: 16, goal: 15 },
  { day: 'Fri', minutes: 22, goal: 15 },
  { day: 'Sat', minutes: 11, goal: 15 },
  { day: 'Sun', minutes: 12, goal: 15, today: true },
]

export const commonMistakes = [
  { rank: 1, title: 'Articles', desc: 'Missing “the” before specific nouns', count: 14, trend: -3, example: '“I work in the marketing.” → “I work in marketing.”' },
  { rank: 2, title: 'Prepositions', desc: '“years experience” instead of “years of experience”', count: 9, trend: -2, example: '“three years experience” → “three years of experience”' },
  { rank: 3, title: 'Pronunciation of “th”', desc: '/θ/ pronounced as /s/ or /f/', count: 7, trend: 1, example: '“think” sounding like “sink”' },
]

export const progressStats = [
  { key: 'xp', label: 'Total XP', value: '2,480', icon: 'Zap', tint: 'amber' },
  { key: 'streak', label: 'Day Streak', value: '7', icon: 'Flame', tint: 'orange' },
  { key: 'time', label: 'Practice Time', value: '8h 42m', icon: 'Clock', tint: 'violet' },
  { key: 'words', label: 'Words Learned', value: '326', icon: 'BookOpen', tint: 'green' },
  { key: 'convos', label: 'Conversations', value: '42', icon: 'MessageCircle', tint: 'cyan' },
  { key: 'lessons', label: 'Lessons Done', value: '38', icon: 'CheckCircle2', tint: 'blue' },
]

export const progressInsight =
  'You’re improving fastest in listening. Spend 10 more minutes on speaking this week.'

export const levelJourney = [
  { level: 'A1', state: 'done' },
  { level: 'A2', state: 'done' },
  { level: 'B1', state: 'current', percent: 42 },
  { level: 'B2', state: 'next' },
  { level: 'C1', state: 'locked' },
  { level: 'C2', state: 'locked' },
]

/* -------------------------------- Premium ------------------------------ */

export const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Try your AI teacher every day',
    features: [
      '5 min AI practice / day',
      'Basic conversation',
      'Basic grammar correction',
      'Limited listening',
      'Limited pronunciation',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$3.99',
    period: 'per month',
    desc: 'Everything, billed monthly',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$29.99',
    period: 'per year',
    monthly: '$2.49 / month',
    desc: 'Best value — save 37%',
    badge: 'Best Value',
    bestValue: true,
  },
]

export const premiumFeatures = [
  { label: 'Unlimited AI conversation', icon: 'MessageCircle' },
  { label: 'Full A1–C2 courses', icon: 'BookOpen' },
  { label: 'Personalized learning plan', icon: 'Sparkles' },
  { label: 'Advanced grammar correction', icon: 'PenTool' },
  { label: 'Vocabulary builder', icon: 'Layers' },
  { label: 'Listening lab', icon: 'Headphones' },
  { label: 'Pronunciation coach', icon: 'AudioLines' },
  { label: 'IELTS mode with band scores', icon: 'GraduationCap' },
  { label: 'Full progress tracking', icon: 'BarChart3' },
  { label: 'No ads', icon: 'Shield' },
]

export const premiumProof = [
  { value: '4.9', label: 'App rating' },
  { value: '1.2M', label: 'Learners' },
  { value: '+1.5', label: 'Avg. band gain' },
]

/* -------------------------------- Profile ------------------------------ */

export const achievements = [
  { id: 'first-convo', title: 'First Conversation', desc: 'You spoke with your AI teacher', icon: 'MessageCircle', tint: 'violet', earned: true, date: 'Mar 14' },
  { id: 'streak-7', title: '7 Day Streak', desc: 'A full week without missing', icon: 'Flame', tint: 'orange', earned: true, date: 'Sep 08' },
  { id: 'words-100', title: '100 Words', desc: 'Your vocabulary is growing', icon: 'BookOpen', tint: 'green', earned: true, date: 'Jun 02' },
  { id: 'convo-10', title: '10 Conversations', desc: 'Real practice, real progress', icon: 'Trophy', tint: 'amber', earned: true, date: 'Jul 19' },
  { id: 'streak-30', title: '30 Day Streak', desc: '23 days to go', icon: 'Medal', tint: 'pink', earned: false, progress: 23 },
  { id: 'band-7', title: 'IELTS Band 7', desc: 'Reach an estimated band 7.0', icon: 'GraduationCap', tint: 'indigo', earned: false, progress: 86 },
]

export const profileMenu = [
  { id: 'notifications', label: 'Notifications', desc: 'Reminders and streak alerts', icon: 'Bell', tint: 'violet', to: '/notifications' },
  { id: 'audio', label: 'Audio & Speech', desc: 'Voice, speed and accent', icon: 'Volume2', tint: 'cyan', to: '/settings' },
  { id: 'preferences', label: 'Learning Preferences', desc: 'Goal, level and daily target', icon: 'Sliders', tint: 'blue', to: '/settings' },
  { id: 'subscription', label: 'Subscription', desc: 'Free plan — upgrade anytime', icon: 'Crown', tint: 'amber', to: '/premium' },
  { id: 'help', label: 'Help & Support', desc: 'FAQ and contact us', icon: 'HelpCircle', tint: 'green', to: '/help' },
]

/* ------------------------------- Settings ------------------------------ */

export const settingsGroups = [
  {
    id: 'account',
    title: 'Account',
    items: [
      { id: 'profile', label: 'Personal details', type: 'link', value: 'Alex Morgan', icon: 'User', tint: 'violet', to: '/settings/account' },
      { id: 'email', label: 'Email', type: 'link', value: 'alex.morgan@email.com', icon: 'Mail', tint: 'blue', to: '/settings/account' },
      { id: 'applang', label: 'App language', type: 'link', value: 'English', icon: 'Globe', tint: 'cyan', picker: 'applang' },
    ],
  },
  {
    id: 'learning',
    title: 'Learning Preferences',
    items: [
      { id: 'daily', label: 'Daily goal', type: 'link', value: '15 minutes', icon: 'Target', tint: 'green', picker: 'daily' },
      { id: 'level', label: 'Current level', type: 'link', value: 'B1 Intermediate', icon: 'GraduationCap', tint: 'indigo', picker: 'level' },
      { id: 'focus', label: 'Focus skill', type: 'link', value: 'Speaking', icon: 'Speech', tint: 'violet', picker: 'focus' },
      { id: 'difficulty', label: 'Auto-adjust difficulty', type: 'toggle', value: true, icon: 'Wand2', tint: 'pink' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    items: [
      { id: 'reminder', label: 'Daily reminder', type: 'toggle', value: true, icon: 'Bell', tint: 'amber' },
      { id: 'streak', label: 'Streak alerts', type: 'toggle', value: true, icon: 'Flame', tint: 'orange' },
      { id: 'weekly', label: 'Weekly report', type: 'toggle', value: false, icon: 'BarChart3', tint: 'blue' },
    ],
  },
  {
    id: 'speech',
    title: 'Speech & Audio',
    items: [
      { id: 'voice', label: 'AI teacher voice', type: 'link', value: 'Aria — British', icon: 'Volume2', tint: 'violet', picker: 'voice' },
      { id: 'speed', label: 'Speaking speed', type: 'link', value: 'Natural', icon: 'Gauge', tint: 'cyan', picker: 'speed' },
      { id: 'autoplay', label: 'Autoplay audio', type: 'toggle', value: true, icon: 'Play', tint: 'green' },
      { id: 'haptics', label: 'Haptic feedback', type: 'toggle', value: true, icon: 'Vibrate', tint: 'pink' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    items: [
      { id: 'recordings', label: 'Save voice recordings', type: 'toggle', value: true, icon: 'Mic', tint: 'violet' },
      { id: 'analytics', label: 'Share usage analytics', type: 'toggle', value: false, icon: 'Activity', tint: 'blue' },
      { id: 'download', label: 'Download my data', type: 'link', value: '', icon: 'Download', tint: 'cyan', action: 'export' },
    ],
  },
  {
    id: 'support',
    title: 'Subscription & Support',
    items: [
      { id: 'plan', label: 'Manage subscription', type: 'link', value: 'Free', icon: 'Crown', tint: 'amber', to: '/premium' },
      { id: 'help', label: 'Help center', type: 'link', value: '', icon: 'HelpCircle', tint: 'green', to: '/help' },
      { id: 'rate', label: 'Rate LinguaOne', type: 'link', value: '', icon: 'Star', tint: 'orange', action: 'rate' },
    ],
  },
]

/* ----------------------------- Onboarding ------------------------------ */

export const onboardingSlides = [
  {
    id: 1,
    title: 'Speak with Confidence',
    desc: 'Practice real conversations with your AI teacher — any topic, any time, no judgement.',
    visual: 'conversation',
    tint: 'violet',
  },
  {
    id: 2,
    title: 'Get Instant Feedback',
    desc: 'Improve grammar, pronunciation and vocabulary instantly, sentence by sentence.',
    visual: 'correction',
    tint: 'cyan',
  },
  {
    id: 3,
    title: 'Improve Every Day',
    desc: 'Your AI creates a personalized learning journey based on your goals.',
    visual: 'progress',
    tint: 'pink',
  },
]

/* ----------------------------- Notifications ---------------------------- */

export const notifications = [
  {
    id: 'streak',
    group: 'Today',
    title: 'Keep your 7 day streak alive',
    body: 'You have 3 minutes left to hit today’s goal.',
    time: '2h ago',
    icon: 'Flame',
    tint: 'orange',
    unread: true,
    to: '/conversation',
  },
  {
    id: 'tip',
    group: 'Today',
    title: 'Aria noticed a pattern',
    body: '“years experience” came up again — here’s the fix.',
    time: '5h ago',
    icon: 'Sparkles',
    tint: 'violet',
    unread: true,
    to: '/grammar',
  },
  {
    id: 'words',
    group: 'Today',
    title: '5 new words are ready',
    body: 'Adapt, Reliable, Deadline and 2 more.',
    time: '8h ago',
    icon: 'BookOpen',
    tint: 'green',
    unread: false,
    to: '/vocabulary',
  },
  {
    id: 'badge',
    group: 'Earlier',
    title: 'Achievement unlocked',
    body: '7 Day Streak — a full week without missing.',
    time: 'Yesterday',
    icon: 'Trophy',
    tint: 'amber',
    unread: false,
    to: '/achievements',
  },
  {
    id: 'report',
    group: 'Earlier',
    title: 'Your weekly report is ready',
    body: 'Listening improved 9% — speaking needs attention.',
    time: '2 days ago',
    icon: 'BarChart3',
    tint: 'blue',
    unread: false,
    to: '/progress',
  },
  {
    id: 'ielts',
    group: 'Earlier',
    title: 'IELTS test in 74 days',
    body: 'You’re on track for band 7.0 — keep practising Part 2.',
    time: '3 days ago',
    icon: 'GraduationCap',
    tint: 'indigo',
    unread: false,
    to: '/ielts',
  },
]

/* ------------------------------ Help centre ----------------------------- */

export const faqs = [
  {
    id: 'how-ai',
    q: 'How does the AI teacher work?',
    a: 'Aria listens to what you say, transcribes it, and checks grammar, vocabulary and pronunciation in real time. Every correction is saved so your weak patterns shape tomorrow’s lesson.',
  },
  {
    id: 'accurate',
    q: 'How accurate is the pronunciation score?',
    a: 'Your speech is compared against native recordings across three areas — word stress, vowel length and rhythm. Scores above 80% are close to native for that word.',
  },
  {
    id: 'ielts',
    q: 'Is the IELTS band score official?',
    a: 'No. It is an estimate against the four official speaking criteria and is meant to track progress, not replace a real test result.',
  },
  {
    id: 'offline',
    q: 'Can I practise without internet?',
    a: 'Vocabulary cards and saved lessons work offline. AI conversation and scoring need a connection.',
  },
  {
    id: 'cancel',
    q: 'How do I cancel Premium?',
    a: 'Settings → Manage subscription → Cancel. You keep Premium until the end of the period you already paid for.',
  },
  {
    id: 'reset',
    q: 'Can I change my level or goal later?',
    a: 'Yes — Settings → Learning Preferences. You can also retake the placement test at any time.',
  },
]

export const helpChannels = [
  { id: 'chat', title: 'Chat with support', desc: 'Usually replies in a few minutes', icon: 'MessageCircle', tint: 'violet' },
  { id: 'email', title: 'Email us', desc: 'support@linguaone.app', icon: 'Mail', tint: 'blue' },
  { id: 'community', title: 'Community forum', desc: 'Ask other learners', icon: 'Users', tint: 'green' },
]

/* --------------------------- Lesson study step -------------------------- */

export const lessonStudy = {
  title: 'Introducing Yourself',
  intro: 'Four phrases that cover almost any introduction. Listen, then say each one out loud.',
  phrases: [
    {
      id: 'p1',
      phrase: 'I’m a web developer.',
      note: 'Start with your role — short and confident.',
      alt: 'I work as a web developer.',
    },
    {
      id: 'p2',
      phrase: 'I have three years of experience.',
      note: 'Number + years + of + noun.',
      alt: 'I’ve been doing this for three years.',
    },
    {
      id: 'p3',
      phrase: 'I mostly work on mobile apps.',
      note: '“Mostly” softens it and sounds natural.',
      alt: 'I specialise in mobile apps.',
    },
    {
      id: 'p4',
      phrase: 'Outside work, I’m into photography.',
      note: '“I’m into” is more natural than “I like”.',
      alt: 'In my free time I do photography.',
    },
  ],
  tip: 'Native speakers rarely list everything. Give your role, one detail, then ask a question back.',
}

/* ------------------------- Settings option lists ------------------------ */

export const settingsOptions = {
  applang: {
    title: 'App language',
    subtitle: 'The language of the interface, not what you are learning.',
    options: ['English', 'বাংলা', 'Español', 'Deutsch', 'Français', '日本語'],
  },
  level: {
    title: 'Current level',
    subtitle: 'Your AI teacher adjusts difficulty from here.',
    options: ['A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced'],
  },
  focus: {
    title: 'Focus skill',
    subtitle: 'Where most of your practice time goes.',
    options: ['Speaking', 'Listening', 'Grammar', 'Vocabulary', 'Pronunciation'],
  },
  voice: {
    title: 'AI teacher voice',
    subtitle: 'Aria can speak in several accents.',
    options: ['Aria — British', 'Aria — American', 'Noah — American', 'Isla — Australian', 'Kai — Neutral'],
  },
  speed: {
    title: 'Speaking speed',
    subtitle: 'How fast your AI teacher talks.',
    options: ['Slow', 'Relaxed', 'Natural', 'Fast'],
  },
}

/* The pronunciation coach cycles through these — "Up next" swaps the target. */
export const pronunciationSet = [
  pronunciationWord,
  {
    word: 'Professional',
    phonetic: '/prəˈfeʃənl/',
    syllables: ['pro', 'FE', 'ssio', 'nal'],
    stressIndex: 1,
    meaning: 'Relating to a job that needs training and skill.',
    score: 76,
    verdict: 'Almost there',
    areas: [
      { key: 'stress', label: 'Stress', score: 71, note: 'Stress drifted to the first syllable.', tint: 'violet' },
      { key: 'vowels', label: 'Vowels', score: 80, note: 'Clear vowels throughout.', tint: 'cyan' },
      { key: 'rhythm', label: 'Rhythm', score: 78, note: 'Slightly rushed at the end.', tint: 'green' },
    ],
    nextWords: ['Experience', 'Comfortable', 'Opportunity'],
  },
  {
    word: 'Comfortable',
    phonetic: '/ˈkʌmftəbl/',
    syllables: ['COMF', 'ta', 'ble'],
    stressIndex: 0,
    meaning: 'Feeling relaxed and free from worry.',
    score: 68,
    verdict: 'Keep practising',
    areas: [
      { key: 'stress', label: 'Stress', score: 82, note: 'First syllable stress — correct.', tint: 'violet' },
      { key: 'vowels', label: 'Vowels', score: 58, note: 'Native speakers drop the “or” — say “COMF-ta-ble”.', tint: 'cyan' },
      { key: 'rhythm', label: 'Rhythm', score: 64, note: 'Three syllables, not four.', tint: 'green' },
    ],
    nextWords: ['Experience', 'Professional', 'Opportunity'],
  },
  {
    word: 'Opportunity',
    phonetic: '/ˌɒpəˈtjuːnəti/',
    syllables: ['op', 'por', 'TU', 'ni', 'ty'],
    stressIndex: 2,
    meaning: 'A chance to do something you want to do.',
    score: 88,
    verdict: 'Excellent!',
    areas: [
      { key: 'stress', label: 'Stress', score: 92, note: 'Perfect stress on “TU”.', tint: 'violet' },
      { key: 'vowels', label: 'Vowels', score: 85, note: 'Clean long /uː/.', tint: 'cyan' },
      { key: 'rhythm', label: 'Rhythm', score: 87, note: 'Smooth across all five syllables.', tint: 'green' },
    ],
    nextWords: ['Experience', 'Professional', 'Comfortable'],
  },
]
