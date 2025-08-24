import type { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const links = [
		{ url: "/", changefreq: "daily", priority: 1.0 },
		{ url: "/about", changefreq: "daily", priority: 1.0 },
		{ url: "/delivery", changefreq: "daily", priority: 1.0 },
		{ url: "/garantee", changefreq: "daily", priority: 1.0 },
		{ url: "/service", changefreq: "daily", priority: 1.0 },
		{ url: "/contact", changefreq: "daily", priority: 1.0 },

	];

	const stream = new SitemapStream({
		hostname: "https://technohub-kg.vercel.app/",
	});
	res.writeHead(200, { "Content-Type": "application/xml" });

	streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
		res.end(data.toString())
	);
};