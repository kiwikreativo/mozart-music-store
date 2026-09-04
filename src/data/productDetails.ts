import { catalogCategories, getCatalogCategory, productsFor, type CatalogProduct } from './catalog';

export type ProductMedia = { src: string; alt: string };
export type ProductSpecification = { label: string; value: string; icon: string };
export type ProductFeature = { title: string; description: string; icon: string };
export type ProductDetail = {
	group: 'instrumentos' | 'audio'; category: string; slug: string; product: CatalogProduct; description: string;
	priceDisplay?: string; referencePrice?: string; gallery: ProductMedia[]; video: { src: string; poster: string; duration: string }; features: ProductFeature[]; specifications: ProductSpecification[];
};

const slugify = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const assetRoot = '/products/tagima-tw61-jazz-red';
const guitars = getCatalogCategory('instrumentos', 'guitarras');
if (!guitars) throw new Error('No se encontró la categoría de guitarras.');
const tagimaTw61 = productsFor(guitars)[0];
const iconFor = (label: string) => ({ Tipo: 'ph-guitar', Marca: 'ph-tag', Disponibilidad: 'ph-check-circle', Nivel: 'ph-graduation-cap', Cuerdas: 'ph-list-numbers', 'Número de cuerdas': 'ph-list-numbers', Orientación: 'ph-arrows-out-cardinal', Material: 'ph-tree', Conectividad: 'ph-plug', Potencia: 'ph-lightning', Canales: 'ph-sliders-horizontal', Tamaño: 'ph-ruler', Formato: 'ph-package', Uso: 'ph-heart', Acabado: 'ph-sparkle' }[label] ?? 'ph-music-notes');

const tagimaDetail: ProductDetail = {
	group: 'instrumentos', category: 'guitarras', slug: 'tagima-tw61-jazz-red', product: { ...tagimaTw61, image: `${assetRoot}/tagima-tw61-jazz-red-01.jpg` },
	priceDisplay: '$265.00', referencePrice: 'Precio de referencia: ₡120.252,67 · IVA incluido',
	description: 'Una guitarra eléctrica Tagima TW-61 en acabado Jazz Rojo, con dos pastillas P-90 y control de varitonos.',
	gallery: [{ src: `${assetRoot}/tagima-tw61-jazz-red-01.jpg`, alt: 'Tagima TW-61 Jazz Red, vista principal' }, { src: `${assetRoot}/tagima-tw61-jazz-red-02.jpg`, alt: 'Tagima TW-61 Jazz Red, segunda vista' }],
	video: { src: '', poster: `${assetRoot}/tagima-tw61-jazz-red-02.jpg`, duration: '' },
	features: [{ title: 'Dos P-90 Tagima', description: 'Configuración de dos pastillas Tagima modelo P-90.', icon: 'ph-waveform' }, { title: 'Varitonos y selector', description: 'Selector de 3 vías, interruptor de varitonos, un volumen y un tono.', icon: 'ph-sliders-horizontal' }, { title: 'Trémolo cromado', description: 'Puente cromado de dos pivotes y clavijeros cromados.', icon: 'ph-guitar' }],
	specifications: [{ label: 'Cuerpo', value: 'Álamo', icon: 'ph-tree-evergreen' }, { label: 'Cuello', value: 'Arce', icon: 'ph-tree' }, { label: 'Diapasón', value: 'Madera técnica · 22 trastes', icon: 'ph-list-numbers' }, { label: 'Tuerca', value: '43 mm', icon: 'ph-ruler' }, { label: 'Pastillas', value: '2 Tagima P-90', icon: 'ph-waveform' }, { label: 'Controles', value: '3 vías, varitonos, volumen y tono', icon: 'ph-sliders-horizontal' }, { label: 'Puente', value: 'Trémolo cromado · 2 pivotes', icon: 'ph-guitar' }, { label: 'Clavijeros', value: 'Cromo', icon: 'ph-gear' }],
};

const genericDetail = (product: CatalogProduct, category: typeof catalogCategories[number]): ProductDetail => {
	const specs = [{ label: 'Tipo', value: product.type, icon: iconFor('Tipo') }, { label: 'Marca', value: product.brand, icon: iconFor('Marca') }, ...Object.entries(product.attributes).map(([key, value]) => { const label = category.filters.find((filter) => filter.key === key)?.label ?? key; return { label, value, icon: iconFor(label) }; }), { label: 'Nivel', value: product.level, icon: iconFor('Nivel') }, { label: 'Disponibilidad', value: product.availability, icon: iconFor('Disponibilidad') }];
	return { group: category.group, category: category.slug, slug: slugify(product.model), product, description: `${product.brand} ${product.model} combina una construcción confiable y una respuesta equilibrada para tus sesiones de ${category.title.toLowerCase()}.`, gallery: [{ src: product.image, alt: `${product.brand} ${product.model}` }], video: { src: '', poster: product.image, duration: '00:00' }, features: [{ title: 'Construcción confiable', description: 'Materiales seleccionados para acompañar tu práctica.', icon: 'ph-shield-check' }, { title: 'Respuesta equilibrada', description: 'Diseñado para expresarte con claridad en cada sesión.', icon: 'ph-waveform' }, { title: 'Listo para usar', description: 'Una opción práctica para tu próximo proyecto musical.', icon: 'ph-music-notes' }], specifications: specs };
};

export const productDetails: ProductDetail[] = catalogCategories.flatMap((category) => productsFor(category).map((product) => category.slug === 'guitarras' && product.id === tagimaTw61.id ? tagimaDetail : genericDetail(product, category)));
export const getProductDetail = (group: string, category: string, slug: string) => productDetails.find((detail) => detail.group === group && detail.category === category && detail.slug === slug);
export const productDetailUrl = (product: CatalogProduct) => { const detail = productDetails.find((item) => item.product.id === product.id); return detail ? `/${detail.group}/${detail.category}/${detail.slug}` : undefined; };
