import LaptopDetail from "@/components/home/detail/LaptopDetail";
import PrinterDetail from "@/components/home/detail/PrinterDetail";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getProduct(slug: string) {
  // -------- LAPTOP --------
  let res = await fetch(
    `https://api.technohub.com.kg/store/laptop/${slug}/`,
    { next: { revalidate: 60 } }
  );

  if (res.ok) {
    const data = await res.json();
    return { ...data, type: "laptop" as const };
  }

  // -------- PRINTER --------
  res = await fetch(
    `https://api.technohub.com.kg/store/printer/${slug}/`,
    { next: { revalidate: 60 } }
  );

  if (res.ok) {
    const data = await res.json();
    return { ...data, type: "printer" as const };
  }

  throw new Error("Product not found");
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (product.type === "laptop") {
    return <LaptopDetail data={product} />;
  }

  if (product.type === "printer") {
    return <PrinterDetail data={product} />;
  }

  return null;
};

export default Page;
