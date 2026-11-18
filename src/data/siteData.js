/**
 * ============================================================================
 *  siteData.js — the only file you need to edit to personalise this website.
 * ============================================================================
 *
 *  Change the names, date, photos, letters, memories and wishes below.
 *  Layout, colours, stickers and animation timings are fixed in the components,
 *  so you do not need to touch them unless you want to redesign something.
 *
 *  Quick checklist when reusing this for someone else:
 *   1. Update `person` and `sender`.
 *   2. Replace the photo in `src/assets/orihime.jpg` (or change `person.photo`).
 *   3. Rewrite `littleLetter`, `bigLetter` and `loveNotes`.
 *   4. Edit `memories`, `timeline`, `reasons` and `wishes`.
 *   5. Optionally change `scrapbook.title` and `scrapbook.intro`.
 *
 *  Sticker / paper artwork lives in `public/stickers/`. If you replace those
 *  files, keep the same filenames and nothing else needs to change.
 * ============================================================================
 */

import portrait from '../assets/orihime.jpg';
import stamp from '../assets/love.png';
import heartLetter from '../assets/heart_letter.png';
import mewmew from '../assets/mewmew.gif';

/* ---------------------------------------------------------------------------
 * 1. The people
 * ------------------------------------------------------------------------ */

export const person = {
  name: 'Trisha',
  shortName: 'Trish',
  age: 18,
  birthday: '19 November',
  photo: portrait,
  photoAlt: 'A portrait of Trisha',
};

export const sender = {
  name: 'Rexon',
  signature: 'Your Best Friend, Rexon',
};

/* ---------------------------------------------------------------------------
 * 2. The little letter (the small animated envelope on the home page)
 * ------------------------------------------------------------------------ */

export const littleLetter = {
  from: 'Rajib',
  date: '19 · 11 · 2026',
  greeting: `My dearest ${person.name},`,
  paragraphs: [
    'Happy 18th birthday! I hope this little letter finds you smiling in that way that makes every room feel warmer.',
    'Thank you for being the softest, bravest, most ridiculous part of my days. You turn ordinary moments into stories I want to keep forever.',
    'May this year be gentle with your heart, loud with your laughter, and full of every little thing you quietly wish for.',
  ],
  closing: 'Always in your corner,',
  signature: 'Rajib',
  stamp,
};

/* ---------------------------------------------------------------------------
 * 3. The big fold-out letter (opened with “Click Here …”)
 * ------------------------------------------------------------------------ */

export const bigLetter = {
  coverTo: `Dear ${person.name}`,
  coverTitle: 'Happy Birthday!',
  coverSubtitle: 'A purr-fect message just for you... 💌',
  heading: 'To You!',
  paragraphs: [
    `Happy Birthday, ${person.name} ❤️`,
    'From the moment we met, something in my life shifted — like the universe quietly guiding me toward someone meant for me. You brought warmth into the parts of me I didn’t even know were cold, and you expanded my days with a dimension I can only call my own.',
    'On your birthday, I just want you to know this: I want you with me in every chapter, every storm, every sunshine, every tomorrow. No matter what comes, I’ll be on your side — always. I’ll choose you, protect you, stand with you, and love you in ways that remind you you’re never alone.',
    'You’re not just another year older today… you’re the reason my life feels softer, brighter, and endlessly worth living. Happy Birthday.',
  ],
  signature: sender.signature,
};

/* ---------------------------------------------------------------------------
 * 4. The floating notes page
 * ------------------------------------------------------------------------ */

export const loveNotes = [
  'Wish you the happiest birthday',
  'One picture from you can change my whole day, my whole mood, my whole heartbeat.',
  'Even through screens and pixels, your laugh reaches me like sunlight through a window — warm, real, and impossible to forget.',
  'Every notification from you feels like a heartbeat whispering, I’m here, and I love you.',
  'Our messages might travel through wires, but every word you send lands straight in my heart.',
  'Ever since we met, my heart knew where it wanted to stay — with you, in every soft moment, every smile, every quiet piece of forever.',
  'You turned an ordinary day into a memory my heart refuses to forget. Since then, every moment with you has felt softer, brighter, and filled with a kind of peace only you bring.',
  'Since our first conversation, you’ve been the quiet spark that changed my world, turning ordinary days into moments that feel beautifully meant to be.',
];

/* ---------------------------------------------------------------------------
 * 5. Home page labels
 * ------------------------------------------------------------------------ */

export const home = {
  greeting: `Dear ${person.name}`,
  date: person.birthday,
  letterButton: `Click Here ${person.name}`,
  notesButton: `From ${sender.name}`,
  scrapbookLabel: 'Our Scrapbook',
};

/* ---------------------------------------------------------------------------
 * 6. Scrapbook: memories
 * ------------------------------------------------------------------------ */

export const memories = [
  {
    title: 'The first hello',
    date: 'Where it all began',
    caption: 'A simple hello that quietly turned into the best part of my days.',
    image: person.photo,
    imageAlt: person.photoAlt,
    imageFit: 'cover',
  },
  {
    title: 'Late-night talks',
    date: '2 a.m. club',
    caption: 'Conversations that never felt long enough, even when the sun came up.',
    image: mewmew,
    imageAlt: 'A tiny cat holding a heart',
    imageFit: 'contain',
  },
  {
    title: 'You + me',
    date: 'Our favourite equation',
    caption: 'Two little cats, one very big feeling. It has always been us.',
    image: '/stickers/cat-hugging.webp',
    imageAlt: 'Two kittens hugging',
    imageFit: 'contain',
  },
  {
    title: 'Flowers for you',
    date: 'Just because',
    caption: 'A tiny bouquet for the girl who makes absolutely everything bloom.',
    image: '/stickers/sticker-3.webp',
    imageAlt: 'Pressed flower bouquet sticker',
    imageFit: 'contain',
  },
  {
    title: 'The little things',
    date: 'Kept on purpose',
    caption: 'Songs, screenshots, inside jokes, and moments I kept because they were ours.',
    image: heartLetter,
    imageAlt: 'A fabric heart with a stitched arrow',
    imageFit: 'cover',
  },
  {
    title: 'Your main-character era',
    date: `Turning ${person.age}`,
    caption: 'Glasses on, peace sign up, absolutely unstoppable. The world is yours.',
    image: '/stickers/cat-glasses.webp',
    imageAlt: 'A cat wearing glasses and a bow',
    imageFit: 'contain',
  },
];

/* ---------------------------------------------------------------------------
 * 7. Scrapbook: timeline
 * ------------------------------------------------------------------------ */

export const timeline = [
  {
    date: 'Day one',
    title: 'The first hello',
    text: 'One message. No idea that it would become the start of something I would want to remember forever.',
  },
  {
    date: 'Soon after',
    title: 'The first real laugh',
    text: 'The kind of laugh that makes you forget what you were worried about. I knew I wanted more of that sound.',
  },
  {
    date: 'Somewhere in between',
    title: 'The late-night calls',
    text: 'Sleepy voices, silly stories, and promises to talk tomorrow. Somehow, midnight became my favourite time zone.',
  },
  {
    date: 'A favourite chapter',
    title: 'The first “I love you”',
    text: 'Three little words that made the whole world feel quieter, warmer, and a lot more like home.',
  },
  {
    date: person.birthday,
    title: `Today — your ${person.age}th birthday`,
    text: 'And here we are: celebrating you, the person who made all of these little moments add up to something beautiful.',
    highlight: true,
  },
];

/* ---------------------------------------------------------------------------
 * 8. Scrapbook: reasons + wish jar
 * ------------------------------------------------------------------------ */

export const reasons = [
  {
    front: 'Your smile',
    back: 'It arrives before you even say a word — and somehow fixes the whole day.',
  },
  {
    front: 'Your laugh',
    back: 'Loud, ridiculous, contagious. My favourite sound in any room.',
  },
  {
    front: 'Your kindness',
    back: 'You notice the little things people need before they even ask.',
  },
  {
    front: 'Your strength',
    back: 'You keep going, keep growing, keep becoming — and you make it look beautiful.',
  },
  {
    front: 'Your presence',
    back: 'Everything feels calmer, softer, and a little more like home when you are around.',
  },
  {
    front: 'Your dreams',
    back: 'The way you light up when you talk about them is proof that the future is lucky to have you.',
  },
];

export const wishes = [
  'A year full of soft mornings, good coffee, and zero skipped desserts.',
  'The courage to chase the things that make your eyes light up.',
  'People who love you loudly, exactly as you are.',
  'A hundred tiny moments that make you feel ridiculously lucky.',
  'Every door you knock on opening into something better than you imagined.',
  'A life that feels as beautiful as the way you make other people feel.',
  'More laughter than your ribs can handle, and someone always there to catch you.',
  'A front-row seat to every dream you have been quietly working toward.',
];

/* ---------------------------------------------------------------------------
 * 9. Scrapbook: page copy
 * ------------------------------------------------------------------------ */

export const scrapbook = {
  title: 'Our Scrapbook',
  intro:
    'Some people are made of moments. This is a handful of mine with you — the memories, the tiny milestones, the wishes, and the stickers I could not resist.',
  footer: 'Made with love, a little bit of code, and far too many stickers.',
};
