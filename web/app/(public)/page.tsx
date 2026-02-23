import { Suspense } from 'react';
import PropertyList from '@/components/properties/PropertyList';
import { SkeletonCard } from '@/components/common/Skeleton';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { HomeSolutions } from '@/components/home/HomeSolutions';
import { HomeTrust } from '@/components/home/HomeTrust';
import { HomeFeaturedSection } from '@/components/home/HomeFeaturedSection';
import { HomeFAQ } from '@/components/home/HomeFAQ';
import { HomeCta } from '@/components/home/HomeCta';

export default async function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <HomeSolutions />
      <HomeTrust />
      <HomeFeaturedSection>
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          }
        >
          <PropertyList filters={{ limit: 6 }} />
        </Suspense>
      </HomeFeaturedSection>
      <HomeFAQ />
      <HomeCta />
    </>
  );
}
