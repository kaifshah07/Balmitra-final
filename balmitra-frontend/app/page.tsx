import OfferStrip from "@/components/homepage/TopBar/OfferStrip";
import MegaMenu from "@/components/homepage/MegaMenu/MegaMenu";
import MainHero from "@/components/homepage/Hero/MainHero";
import CategoryGrid from "@/components/homepage/Categories/CategoryGrid";
import FlashSale from "@/components/homepage/FlashSale/FlashSale";
import ProductGrid from "@/components/homepage/Products/ProductGrid";
import WideBanner from "@/components/homepage/PromoBanners/WideBanner";
import BannerStrip from "@/components/homepage/PromoBanners/BannerStrip";
import BrandSlider from "@/components/homepage/Brands/BrandSlider";
import CharacterZone from "@/components/homepage/Characters/CharacterZone";
import CollectionStrip from "@/components/homepage/Collections/CollectionStrip";
import BusinessStrip from "@/components/homepage/BusinessStrip/BusinessStrip";
import TrustSection from "@/components/homepage/Trust/TrustSection";

export default function HomePage() {
  return (
    <>
      <OfferStrip />
      <MegaMenu />
      
      {/* 1. Hero Slider */}
      <MainHero />
      
      {/* 2. Categories */}
      <CategoryGrid />
      
      {/* 3. Advertisements */}
      <WideBanner />
      
      {/* 4. Flash Sale */}
      <FlashSale />
      
      {/* 5. Featured Products */}
      <ProductGrid type="featured" title="Featured Collection" />
      
      {/* 6. Trending Products */}
      <ProductGrid type="trending" title="Trending Products" />
      
      {/* 7. Brands */}
      <BrandSlider />
      
      {/* 8. Character Zone */}
      <CharacterZone />
      
      {/* 9. New Arrivals */}
      <ProductGrid type="new-arrivals" title="New Arrivals" />
      
      {/* 10. Shop By Collection */}
      <CollectionStrip />
      
      {/* 11. Best Sellers */}
      <ProductGrid type="best-sellers" title="Best Sellers" />
      
      {/* 12. Business Strip */}
      <BusinessStrip />
      
      {/* 13. Trust Section */}
      <TrustSection />
      
    </>
  );
}