/**
 * Single source of truth for exhibition events: data + images.
 * Used by: Exhibitions (home), EventsGrid, HighlightsSlider (exhibition page).
 */

export interface ExhibitionEvent {
  id: string
  name: string
  location: string
  country: string
  date: string
  summary: string
  /** صورة/شعار الكارد في الصفحة الرئيسية (اختياري) */
  logo?: string
  gallery: string[]
}

const gulfoodGallery: string[] = [
  '/images/gulfood/gulfood-1.jpeg',
  '/images/gulfood/gulfood-2.jpeg',
  '/images/gulfood/gulfood-3.jpeg',
  '/images/gulfood/gulfood-4.jpeg',
]

const saudiFoodGallery: string[] = [
  '/images/saudi/saudi-1.jpeg',
  '/images/saudi/saudi-2.jpeg',
  '/images/saudi/saudi-3.jpeg',
  '/images/saudi/saudi-4.jpeg',
]

const turkeyGallery: string[] = [
  '/images/turkey/turkey-1.jpeg',
  '/images/turkey/turkey-2.jpeg',
  '/images/turkey/turkey-3.jpeg',
  '/images/turkey/turkey-4.jpeg',
]

const thaiGallery: string[] = [
  '/images/thai/tha1.jpeg',
  '/images/thai/th2.jpeg',
  '/images/thai/thai3.jpeg',
  '/images/thai/thai4.jpeg',
  '/images/thai/thai6.jpeg',
  '/images/thai/thai7.jpeg',
]

const exhibitionsData: ExhibitionEvent[] = [
  {
    id: 'gulfood',
    name: 'Gulfood',
    location: 'Dubai',
    country: 'UAE',
    date: '2026',
    summary:
      'Capital Food International participated in Gulfood Dubai 2026, connecting with global partners.',
    logo: '/logo-Exhibitions/logo_h2/ChatGPT%20Image%20Feb%2028%2C%202026%2C%2001_32_16%20PM.png',
    gallery: gulfoodGallery,
  },
  {
    id: 'saudi-food-show',
    name: 'The Saudi Food Show',
    location: 'Riyadh',
    country: 'Saudi Arabia',
    date: '2026',
    summary:
      'Capital Food International participated in The Saudi Food Show in Riyadh 2026, presenting our premium canned seafood products.',
    logo: '/logo-Exhibitions/logo_h2/ChatGPT%20Image%20Feb%2028%2C%202026%2C%2001_30_36%20PM.png',
    gallery: saudiFoodGallery,
  },
  {
    id: 'tuyap',
    name: 'TÜYAP Fair Center',
    location: 'Istanbul, Turkey',
    country: 'Turkey',
    date: '2026',
    summary:
      'Capital Food International participated at TÜYAP Fair Center in Istanbul 2026, showcasing our canned tuna and seafood range.',
    logo: '/logo-Exhibitions/tuyap-logo-png_seeklogo-534849.png',
    gallery: turkeyGallery,
  },
  {
    id: 'thai',
    name: 'Thaifex',
    location: 'Bangkok',
    country: 'Thailand',
    date: '2024',
    summary:
      'Capital Food International participated in Thaifex Bangkok 2024, connecting with buyers and partners across Asia.',
    logo: '/logo-Exhibitions/logo_h2/ChatGPT%20Image%20Feb%2028%2C%202026%2C%2001_20_47%20PM.png',
    gallery: thaiGallery,
  },
]

export function useExhibitions(): { events: ExhibitionEvent[] } {
  return { events: exhibitionsData }
}
