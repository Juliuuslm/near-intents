import { getAllCaseStudies } from '@/lib/content';
import { NavigationWrapper as Navigation } from '@/components/sections/NavigationWrapper';
import HeroSection from '@/components/overview/HeroSection';
import PartnerMarquee from '@/components/overview/PartnerMarquee';
import StatsBar from '@/components/overview/StatsBar';
import CaseStudyCarousel from '@/components/overview/CaseStudyCarousel';
import UserTypeSelector from '@/components/overview/UserTypeSelector';
import TickerBoard from '@/components/overview/TickerBoard';
import AirtableChainBoard from '@/components/overview/AirtableChainBoard';
import ChainGrid from '@/components/overview/ChainGrid';
import OverviewCTA from '@/components/overview/OverviewCTA';
import OverviewFooter from '@/components/overview/OverviewFooter';
import { FooterBar } from '@/components/sections/FooterBar';
import { buildMetadata } from '@/lib/seo';
import { getChainLogos } from '@/lib/airtable';
import { chains as fallbackChains, getChain, type Chain } from '@/lib/data/chains';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: 'Overview — NEAR Intents',
  description: 'Explore NEAR Intents: the universal liquidity protocol powering cross-chain swaps, payments, and asset flows across 31 chains.',
  path: '/overview',
});

export default async function OverviewPage() {
  const caseStudies = getAllCaseStudies();
  const chainLogos = await getChainLogos();
  const chains: Chain[] = chainLogos.length > 0
    ? chainLogos.map(({ name, logoUrl }) => {
        const slug = name.toLowerCase().trim().replace(/\s+/g, '-');
        return { slug, name, logo: logoUrl, color: getChain(slug)?.color ?? '#ffffff' };
      })
    : fallbackChains;

  return (
    <>
      <Navigation />
      <main className="bg-black text-white min-h-screen pt-16">
        <HeroSection />
        <PartnerMarquee />
        <StatsBar />
        <CaseStudyCarousel caseStudies={caseStudies} />
        <UserTypeSelector />
        <div className="hidden"><TickerBoard /></div>
        <div className="hidden"><AirtableChainBoard /></div>
        <ChainGrid chains={chains} />
        <OverviewCTA />
      </main>
      <div className="hidden"><OverviewFooter /></div>
      <FooterBar />
    </>
  );
}
