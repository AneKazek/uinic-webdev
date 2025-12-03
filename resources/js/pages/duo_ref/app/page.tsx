import DashboardTopNav from '@/components/dashboard-top-nav'
import HeroSection from '@/components/sections/hero-section'
import LanguageCarousel from '@/components/sections/language-carousel'
import FeaturesEffective from '@/components/sections/features-effective'
import FeaturesScience from '@/components/sections/features-science'
import FeaturesMotivated from '@/components/sections/features-motivated'
import FeaturesPersonalized from '@/components/sections/features-personalized'
import LearningAnywhere from '@/components/sections/learning-anywhere'
import ProductsSchools from '@/components/sections/products-schools'
import ProductsMath from '@/components/sections/products-math'
import FinalCta from '@/components/sections/final-cta'
import Footer from '@/components/sections/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-cyan-50 font-nunito">
      <DashboardTopNav />
      <div className=" scroll-mt-24">
        <HeroSection />
        <LanguageCarousel />
        <FeaturesEffective />
        <FeaturesScience />
        <FeaturesMotivated />
        <FeaturesPersonalized />
        <LearningAnywhere />
        <ProductsSchools />
        <ProductsMath />
        <FinalCta />
        <Footer />
      </div>
    </div>
  )
}
