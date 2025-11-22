import HeroSection from "../components/homepage/HeroSection";
import VendorCategories from "../components/homepage/VendorCategories";
import HowItWorks from "../components/homepage/HowItWorks";

function Home() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <VendorCategories />
            <HowItWorks />
        </div>
    );
}

export default Home;
