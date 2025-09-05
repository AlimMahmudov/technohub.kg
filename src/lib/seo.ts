// lib/seo.ts
export const generateMetadata = ({
	title,
	description,
	url,
	image,
	keywords = "электроника, ноутбуки, техника, Кыргызстан, Бишкек, купить, магазин",
}: {
	title: string;
	description: string;
	url: string;
	image: string;
	keywords?: string;
}) => ({
	title,
	description,
	keywords, // Добавляем keywords meta tag
	image,
	robots: "index, follow",
	authors: [{ name: "TechnoHub.kg" }],
	publisher: "TechnoHub.kg",
	viewport: "width=device-width, initial-scale=1.0",
	openGraph: {
			title,
			description,
			url,
			type: "website",
			locale: "ru_KG", // Добавляем локаль для Кыргызстана
			siteName: "TechnoHub.kg",
			images: [{ 
					url: image,
					width: 1200,
					height: 630,
					alt: title,
			}],
	},
	twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
	},
	alternates: {
			canonical: url,
	},
	// Добавляем дополнительные мета-теги
	other: {
			"theme-color": "#000000",
			"apple-mobile-web-app-capable": "yes",
			"apple-mobile-web-app-status-bar-style": "black-translucent",
	}
});

// Дополнительная функция для структурированных данных
export const generateStructuredData = () => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'name': 'TechnoHub.kg',
	'url': 'https://www.technohub.kg/',
	'potentialAction': {
			'@type': 'SearchAction',
			'target': 'https://www.technohub.kg/search?q={search_term_string}',
			'query-input': 'required name=search_term_string'
	}
});