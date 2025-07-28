"use client";
import { useEffect } from "react";
import { useGetGaranteeQuery } from "@/redux/api/text";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import TextSkeleton from "../skeleton/TextSkeleton";

const BASE_URL = process.env.NEXT_PUBLIC_API || "";

const Garantee = () => {
  const { data, isLoading } = useGetGaranteeQuery();
  console.log(data, "garante");

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {});
  }, [data]);

  if (isLoading) {
    return <TextSkeleton />;
  }

  const processedDescription = data?.[0]?.description?.replace(
    /<img(.*?)src="\/media\/(.*?)"(.*?)>/g,
    `<a data-fancybox="gallery" href="${BASE_URL}/media/$2"><img$1src="${BASE_URL}/media/$2"$3 class="custom-image" /></a>`
  );

  return (
    <div className="container">
      <div className="w-full h-full min-h-[100vh] py-2 md:px-5 px-0">
        {processedDescription && (
          <div dangerouslySetInnerHTML={{ __html: processedDescription }} />
        )}
      </div>

      <style jsx global>{`
        .custom-image {
          max-width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          margin-top: 1rem;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }
        .custom-image:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Garantee;
