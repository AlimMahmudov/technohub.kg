// components/StructuredData.tsx
"use client";

import { generateStructuredData } from "@/lib/seo";

export default function StructuredData() {
  const structuredData = generateStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
