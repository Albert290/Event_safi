import CategoryPreview from "../components/homepage/CategoryPreview";
import HeroSection from "../components/homepage/HeroSection";
import HowItWorks from "../components/homepage/HowItWorks";
import FeaturesSection from "../components/homepage/FeaturesSection";
import AIChatbot from "../components/homepage/AIChatbot";

function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryPreview />
      <HowItWorks />
      <FeaturesSection />
      <AIChatbot />
    </div>
  );
}

export default Home;
