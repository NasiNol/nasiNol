// src/app/page.tsx
import PageLayout from '@/components/Layout/PageLayout'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import RecommendedFoodsSection from '@/components/home/RecommendedFoodsSection'
import DessertSection from '@/components/home/DessertSection'
import DrinkSection from '@/components/home/DrinkSection'

export default function HomePage() {
  return (
    <PageLayout 
      locationValue="bandung"
      showOrnaments={false}
      showLeftOrnament={true}
      showRightOrnament={true}
    >
      <HeroSection />
      <FeaturesSection />
      <RecommendedFoodsSection />
      <DessertSection />
      <DrinkSection />
    </PageLayout>
  )
}