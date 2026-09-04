import { catalogCategories, getCatalogCategory, productsFor, type CatalogProduct } from './catalog';

export type ProductMedia = { src: string; alt: string };
export type ProductSpecification = { label: string; value: string; icon: string };
export type ProductFeature = { title: string; description: string; icon: string };
export type ProductDetail = {
	group: 'instrumentos' | 'audio'; category: string; slug: string; product: CatalogProduct; description: string;
	gallery: ProductMedia[]; video: { src: string; poster: string; duration: string }; features: ProductFeature[]; specifications: ProductSpecification[];
};

const slugify = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const assetRoot = '/products/acustica-serie-01';
const guitars = getCatalogCategory('instrumentos', 'guitarras');
if (!guitars) throw new Error('No se encontró la categoría de guitarras.');
const acousticSeries01 = productsFor(guitars)[0];
const iconFor = (label: string) => ({ Tipo: 'ph-guitar', Marca: 'ph-tag', Disponibilidad: 'ph-check-circle', Nivel: 'ph-graduation-cap', Cuerdas: 'ph-list-numbers', 'Número de cuerdas': 'ph-list-numbers', Orientación: 'ph-arrows-out-cardinal', Material: 'ph-tree', Conectividad: 'ph-plug', Potencia: 'ph-lightning', Canales: 'ph-sliders-horizontal', Tamaño: 'ph-ruler', Formato: 'ph-package', Uso: 'ph-heart', Acabado: 'ph-sparkle' }[label] ?? 'ph-music-notes');

const acousticDetail: ProductDetail = {
	group: 'instrumentos', category: 'guitarras', slug: 'acustica-serie-01', product: { ...acousticSeries01, image: `${assetRoot}/hero.png` },
	description: 'Una guitarra acústica confiable, cómoda y equilibrada para comenzar, volver a ejecutar o acompañar tus próximas canciones.',
	gallery: [{ src: `${assetRoot}/hero.png`, alt: 'Guitarra Acústica Serie 01 en acabado natural' }, { src: `${assetRoot}/sound-cover.png`, alt: 'Acústica Serie 01 siendo ejecutada en estudio' }, { src: `${assetRoot}/neck.png`, alt: 'Detalle del mástil de la Acústica Serie 01' }, { src: `${assetRoot}/bridge.png`, alt: 'Detalle del puente y las cuerdas de la Acústica Serie 01' }],
	video: { src: `${assetRoot}/acustica-serie-01.mp4`, poster: `${assetRoot}/sound-cover.png`, duration: '00:10' },
	features: [{ title: 'Abeto brillante', description: 'Una tapa que aporta claridad y buena proyección.', icon: 'ph-tree-evergreen' }, { title: 'Cuerpo resonante', description: 'Respuesta equilibrada para acordes y acompañamientos.', icon: 'ph-circles-three-plus' }, { title: 'Afinación estable', description: 'Clavijas precisas para ejecutar con confianza.', icon: 'ph-metronome' }],
	specifications: [{ label: 'Tipo', value: 'Acústica', icon: 'ph-guitar' }, { label: 'Cuerdas', value: '6 cuerdas de acero', icon: 'ph-list-numbers' }, { label: 'Orientación', value: 'Diestro', icon: 'ph-hand' }, { label: 'Nivel', value: 'Principiante', icon: 'ph-graduation-cap' }, { label: 'Tapa', value: 'Abeto', icon: 'ph-tree-evergreen' }, { label: 'Aros y fondo', value: 'Meranti', icon: 'ph-waves' }, { label: 'Acabado', value: 'Natural', icon: 'ph-sparkle' }, { label: 'Disponibilidad', value: 'Disponible', icon: 'ph-check-circle' }],
};

const genericDetail = (product: CatalogProduct, category: typeof catalogCategories[number]): ProductDetail => {
	const specs = [{ label: 'Tipo', value: product.type, icon: iconFor('Tipo') }, { label: 'Marca', value: product.brand, icon: iconFor('Marca') }, ...Object.entries(product.attributes).map(([key, value]) => { const label = category.filters.find((filter) => filter.key === key)?.label ?? key; return { label, value, icon: iconFor(label) }; }), { label: 'Nivel', value: product.level, icon: iconFor('Nivel') }, { label: 'Disponibilidad', value: product.availability, icon: iconFor('Disponibilidad') }];
	return { group: category.group, category: category.slug, slug: slugify(product.model), product, description: `${product.brand} ${product.model} combina una construcción confiable y una respuesta equilibrada para tus sesiones de ${category.title.toLowerCase()}.`, gallery: [{ src: product.image, alt: `${product.brand} ${product.model}` }], video: { src: '', poster: product.image, duration: '00:00' }, features: [{ title: 'Construcción confiable', description: 'Materiales seleccionados para acompañar tu práctica.', icon: 'ph-shield-check' }, { title: 'Respuesta equilibrada', description: 'Diseñado para expresarte con claridad en cada sesión.', icon: 'ph-waveform' }, { title: 'Listo para usar', description: 'Una opción práctica para tu próximo proyecto musical.', icon: 'ph-music-notes' }], specifications: specs };
};

export const productDetails: ProductDetail[] = catalogCategories.flatMap((category) => productsFor(category).map((product) => category.slug === 'guitarras' && product.id === acousticSeries01.id ? acousticDetail : genericDetail(product, category)));
export const getProductDetail = (group: string, category: string, slug: string) => productDetails.find((detail) => detail.group === group && detail.category === category && detail.slug === slug);
export const productDetailUrl = (product: CatalogProduct) => { const detail = productDetails.find((item) => item.product.id === product.id); return detail ? `/${detail.group}/${detail.category}/${detail.slug}` : undefined; };
