import OfferStrip from "@/components/homepage/TopBar/OfferStrip";
import MegaMenu from "@/components/homepage/MegaMenu/MegaMenu";
import MainHero from "@/components/homepage/Hero/MainHero";
import CategoryGrid from "@/components/homepage/Categories/CategoryGrid";
import AgeGroupGrid from "@/components/homepage/Categories/AgeGroupGrid";
import FlashSale from "@/components/homepage/FlashSale/FlashSale";
import ProductGrid from "@/components/homepage/Products/ProductGrid";
import WideBanner from "@/components/homepage/PromoBanners/WideBanner";
import BannerStrip from "@/components/homepage/PromoBanners/BannerStrip";

export default function HomePage() {
  return (
    <>
      <OfferStrip />
      <MegaMenu />
      <MainHero />
      <CategoryGrid />
      <FlashSale />
      <WideBanner />
      <AgeGroupGrid />
      
      <ProductGrid type="trending" title="Trending Products" />
      
      <BannerStrip position="banner_strip_1" title="Special Offers For You" />
      
      <ProductGrid type="featured" title="Featured Collection" />
            
      <BannerStrip position="banner_strip_2" title="Trending Deals & Curations" />
      
      <ProductGrid type="new-arrivals" title="New Arrivals" />
            
      <ProductGrid type="best-sellers" title="Best Sellers" />
      
    </>
  );
}