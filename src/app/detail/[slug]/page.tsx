// src/app/detail/[slug]/page.tsx
import Detail from "@/components/home/detail/Detail";
import { IDetail } from "@/components/home/detail/types";
import { generateMetadata as generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";

// generateMetadata — принимает объект с params, возвращает Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Распаковываем params из Promise
  const { slug } = await params;
  
  const res = await fetch(
    `https://api.technohub.com.kg/store/laptop/${slug}`,
    { next: { revalidate: 60 } }
  );
  const data: IDetail = await res.json();

  return generateSeoMetadata({
    title: data.name ?? "Technohub.kg",
    description: data.description ?? "Technohub.kg - магазин электроники",
    url: `https://www.technohub.kg/detail/${slug}`,
    image:
      data.laptop_image?.[0]?.image ??
      "https://images.prom.ua/6134218801_w600_h600_6134218801.jpg",
    keywords: data.keys ?? "электроника, ноутбуки, Кыргызстан",
  });
}

// Page компонент — асинхронный, slug внутри не нужен, так как Detail использует useParams()
const Page = async () => {
  return (
    <>
      <Detail />
    </>
  );
};

export default Page;