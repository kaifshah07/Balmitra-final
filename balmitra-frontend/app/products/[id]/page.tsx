"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL } from "@/lib/api";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";

export default function ProductPage() {
  const params = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      loadProduct();
    }
  }, [params]);

  async function loadProduct() {
    try {
      const response = await fetch(
        `${API_URL}/products/${params.id}`
      );

      const result = await response.json();

      if (result.success) {
        setProduct(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        Product Not Found
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">

        <div className="grid gap-10 lg:grid-cols-2">

          <ProductGallery product={product} />

          <ProductInfo product={product} />

        </div>

        <ProductTabs />

        <ProductReviews />

        <RelatedProducts />

      </div>
    </section>
  );
}