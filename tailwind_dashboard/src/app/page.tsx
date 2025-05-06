import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeSection from '@/components/HomeSection';
import AboutSection from '@/components/AboutSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import GlobalMapSection from '@/components/GlobalMapSection';
import TexasInitiativesSection from '@/components/TexasInitiativesSection';
import UHMapSection from '@/components/UHMapSection';
import UHFocusSection from '@/components/UHFocusSection';
import FundingPolicySection from '@/components/FundingPolicySection';
import ResourcesSection from '@/components/ResourcesSection';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="pt-16"> {/* Add padding top to account for fixed header */}
        <HomeSection />
        <AboutSection />
        <CaseStudiesSection />
        <GlobalMapSection />
        <TexasInitiativesSection />
        <UHMapSection />
        <UHFocusSection />
        <FundingPolicySection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}
