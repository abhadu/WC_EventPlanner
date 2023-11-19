import NextMatch from '@/components/nextmatch'
import Slider from '@/components/slider'
import SlideShow from '@/components/slideshow'
import Image from 'next/image'
import UpcomingMatches from './upcomingMatches'
import TopPlaces from '@/components/topplaces'

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-around px-24 py-2">
      <SlideShow className="w-full h-64 overflow-hidden rounded-lg md:h-1/3">
        <NextMatch />
      </SlideShow>
      <UpcomingMatches />
      <TopPlaces />
    </main>
  )
}
