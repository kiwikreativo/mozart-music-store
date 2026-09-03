export type CatalogGroup = 'instrumentos' | 'audio';

export type CatalogFilter = {
	key: string;
	label: string;
	icon: string;
	options: string[];
};

export type CatalogProduct = {
	id: string;
	brand: string;
	model: string;
	type: string;
	price: number;
	availability: 'Disponible' | 'Por encargo' | 'Agotado';
	level: 'Principiante' | 'Intermedio' | 'Profesional';
	date: string;
	image: string;
	attributes: Record<string, string>;
};

export type CatalogCategory = {
	group: CatalogGroup;
	slug: string;
	title: string;
	brands: string[];
	types: string[];
	filters: CatalogFilter[];
	basePrice: number;
	imageSeed: string;
};

const instrumentCategories: CatalogCategory[] = [
	{ group: 'instrumentos', slug: 'bajos', title: 'Bajos', brands: ['Squier', 'Yamaha', 'Ibanez', 'Cort'], types: ['Eléctrico', 'Acústico', 'Fretless'], filters: [{ key: 'cuerdas', label: 'Número de cuerdas', icon: 'ph-list-numbers', options: ['4 cuerdas', '5 cuerdas', '6 cuerdas'] }, { key: 'orientacion', label: 'Orientación', icon: 'ph-arrows-out-cardinal', options: ['Diestro', 'Zurdo'] }], basePrice: 155000, imageSeed: 'bass' },
	{ group: 'instrumentos', slug: 'baterias', title: 'Baterías', brands: ['Yamaha', 'Pearl', 'Tama', 'Mapex'], types: ['Acústica', 'Electrónica', 'Junior'], filters: [{ key: 'piezas', label: 'Número de piezas', icon: 'ph-circles-four', options: ['4 piezas', '5 piezas', '7 piezas'] }, { key: 'material', label: 'Material', icon: 'ph-tree', options: ['Álamo', 'Arce', 'Abedul'] }], basePrice: 210000, imageSeed: 'drums' },
	{ group: 'instrumentos', slug: 'bienestar', title: 'Bienestar', brands: ['Meinl', 'Toca', 'LP', 'Soundsation'], types: ['Meditación', 'Terapia sonora', 'Relajación'], filters: [{ key: 'material', label: 'Material', icon: 'ph-tree', options: ['Madera', 'Metal', 'Cristal'] }, { key: 'uso', label: 'Uso', icon: 'ph-heart', options: ['Personal', 'Terapéutico', 'Grupal'] }], basePrice: 28000, imageSeed: 'wellness' },
	{ group: 'instrumentos', slug: 'bolillos-y-mallets', title: 'Bolillos y mallets', brands: ['Vic Firth', 'Promark', 'Meinl', 'Vater'], types: ['Baquetas', 'Mallets', 'Escobillas'], filters: [{ key: 'material', label: 'Material', icon: 'ph-tree', options: ['Hickory', 'Arce', 'Nylon'] }, { key: 'punta', label: 'Punta', icon: 'ph-circle', options: ['Madera', 'Nylon', 'Fieltro'] }], basePrice: 8500, imageSeed: 'drumsticks' },
	{ group: 'instrumentos', slug: 'estilo-de-vida', title: 'Estilo de vida', brands: ['Fender', 'Yamaha', 'Meinl', 'Marshall'], types: ['Ropa', 'Decoración', 'Regalos'], filters: [{ key: 'talla', label: 'Talla', icon: 'ph-ruler', options: ['Pequeña', 'Mediana', 'Grande'] }, { key: 'material', label: 'Material', icon: 'ph-t-shirt', options: ['Algodón', 'Cerámica', 'Metal'] }], basePrice: 12000, imageSeed: 'music-lifestyle' },
	{ group: 'instrumentos', slug: 'guitarras', title: 'Guitarras', brands: ['Yamaha', 'Cort', 'Ibanez', 'Squier'], types: ['Acústica', 'Eléctrica', 'Electroacústica', 'Clásica'], filters: [{ key: 'cuerdas', label: 'Número de cuerdas', icon: 'ph-list-numbers', options: ['6 cuerdas', '7 cuerdas', '12 cuerdas'] }, { key: 'orientacion', label: 'Orientación', icon: 'ph-arrows-out-cardinal', options: ['Diestro', 'Zurdo'] }], basePrice: 99000, imageSeed: 'guitar' },
	{ group: 'instrumentos', slug: 'instrumentos-de-marcha', title: 'Instrumentos de marcha', brands: ['Yamaha', 'Pearl', 'Mapex', 'Jupiter'], types: ['Percusión', 'Metal', 'Accesorio'], filters: [{ key: 'formato', label: 'Formato', icon: 'ph-drum', options: ['Marcha', 'Banda', 'Escolar'] }, { key: 'material', label: 'Material', icon: 'ph-tree', options: ['Aluminio', 'Latón', 'Madera'] }], basePrice: 65000, imageSeed: 'marching-band' },
	{ group: 'instrumentos', slug: 'metodos-y-partituras', title: 'Métodos y partituras', brands: ['Hal Leonard', 'Alfred', 'Mel Bay', 'Berklee'], types: ['Método', 'Partitura', 'Cancionero'], filters: [{ key: 'instrumento', label: 'Instrumento', icon: 'ph-music-notes', options: ['Guitarra', 'Piano', 'Batería'] }, { key: 'nivel', label: 'Nivel', icon: 'ph-graduation-cap', options: ['Principiante', 'Intermedio', 'Profesional'] }], basePrice: 10500, imageSeed: 'sheet-music' },
	{ group: 'instrumentos', slug: 'percusion-latina', title: 'Percusión latina', brands: ['LP', 'Meinl', 'Toca', 'Gon Bops'], types: ['Congas', 'Bongós', 'Timbales'], filters: [{ key: 'material', label: 'Material', icon: 'ph-tree', options: ['Madera', 'Fibra', 'Metal'] }, { key: 'tamano', label: 'Tamaño', icon: 'ph-ruler', options: ['Pequeño', 'Mediano', 'Grande'] }], basePrice: 54000, imageSeed: 'latin-percussion' },
	{ group: 'instrumentos', slug: 'pianos-y-teclados', title: 'Pianos y teclados', brands: ['Yamaha', 'Casio', 'Roland', 'Korg'], types: ['Piano digital', 'Teclado', 'Controlador MIDI'], filters: [{ key: 'teclas', label: 'Número de teclas', icon: 'ph-piano-keys', options: ['49 teclas', '61 teclas', '88 teclas'] }, { key: 'accion', label: 'Acción', icon: 'ph-hand', options: ['Sintetizada', 'Semi-pesada', 'Pesada'] }], basePrice: 145000, imageSeed: 'piano-keyboard' },
	{ group: 'instrumentos', slug: 'platillos', title: 'Platillos', brands: ['Zildjian', 'Meinl', 'Sabian', 'Paiste'], types: ['Crash', 'Ride', 'Hi-hat'], filters: [{ key: 'diametro', label: 'Diámetro', icon: 'ph-circle', options: ['14 pulgadas', '16 pulgadas', '20 pulgadas'] }, { key: 'acabado', label: 'Acabado', icon: 'ph-sparkle', options: ['Brillante', 'Tradicional', 'Oscuro'] }], basePrice: 49000, imageSeed: 'cymbals' },
	{ group: 'instrumentos', slug: 'ukeleles', title: 'Ukeleles', brands: ['Kala', 'Mahalo', 'Flight', 'Cordoba'], types: ['Soprano', 'Concierto', 'Tenor'], filters: [{ key: 'tamano', label: 'Tamaño', icon: 'ph-ruler', options: ['Soprano', 'Concierto', 'Tenor'] }, { key: 'material', label: 'Material', icon: 'ph-tree', options: ['Caoba', 'Abeto', 'Nogal'] }], basePrice: 42000, imageSeed: 'ukulele' },
	{ group: 'instrumentos', slug: 'vientos', title: 'Vientos', brands: ['Yamaha', 'Jupiter', 'Buffet', 'Eastman'], types: ['Saxofón', 'Trompeta', 'Flauta'], filters: [{ key: 'tonalidad', label: 'Tonalidad', icon: 'ph-music-note', options: ['Do', 'Sib', 'Mib'] }, { key: 'material', label: 'Material', icon: 'ph-wind', options: ['Latón', 'Plata', 'Madera'] }], basePrice: 125000, imageSeed: 'wind-instrument' },
];

const audioCategories: CatalogCategory[] = [
	{ group: 'audio', slug: 'audio-corporativo', title: 'Audio corporativo', brands: ['JBL', 'Yamaha', 'Shure', 'Bose'], types: ['Sistema PA', 'Micrófono', 'Conferencia'], filters: [{ key: 'potencia', label: 'Potencia', icon: 'ph-lightning', options: ['100 W', '500 W', '1000 W'] }, { key: 'uso', label: 'Uso', icon: 'ph-users', options: ['Sala pequeña', 'Auditorio', 'Evento'] }], basePrice: 88000, imageSeed: 'corporate-audio' },
	{ group: 'audio', slug: 'audio-hogar', title: 'Audio hogar', brands: ['Sony', 'JBL', 'Yamaha', 'Marshall'], types: ['Parlante', 'Tornamesa', 'Barra de sonido'], filters: [{ key: 'conectividad', label: 'Conectividad', icon: 'ph-bluetooth', options: ['Bluetooth', 'Wi‑Fi', 'Cableado'] }, { key: 'potencia', label: 'Potencia', icon: 'ph-lightning', options: ['30 W', '100 W', '300 W'] }], basePrice: 62000, imageSeed: 'home-audio' },
	{ group: 'audio', slug: 'audio-profesional', title: 'Audio profesional', brands: ['Shure', 'Yamaha', 'JBL', 'Sennheiser'], types: ['Monitor', 'Mezcladora', 'Micrófono'], filters: [{ key: 'canales', label: 'Canales', icon: 'ph-sliders-horizontal', options: ['2 canales', '8 canales', '16 canales'] }, { key: 'conectividad', label: 'Conectividad', icon: 'ph-plug', options: ['XLR', 'USB', 'Inalámbrico'] }], basePrice: 110000, imageSeed: 'professional-audio' },
	{ group: 'audio', slug: 'creadores-de-contenido-y-gaming', title: 'Creadores de contenido y gaming', brands: ['Razer', 'HyperX', 'Elgato', 'Logitech'], types: ['Micrófono USB', 'Audífonos', 'Interfaz'], filters: [{ key: 'conectividad', label: 'Conectividad', icon: 'ph-usb', options: ['USB', 'Inalámbrico', '3.5 mm'] }, { key: 'formato', label: 'Formato', icon: 'ph-video-camera', options: ['Streaming', 'Gaming', 'Podcast'] }], basePrice: 38000, imageSeed: 'content-gaming' },
	{ group: 'audio', slug: 'estudio-y-grabacion', title: 'Estudio y grabación', brands: ['Focusrite', 'Rode', 'PreSonus', 'AKG'], types: ['Interfaz de audio', 'Micrófono condensador', 'Monitor de estudio'], filters: [{ key: 'conectividad', label: 'Conectividad', icon: 'ph-plug', options: ['USB-C', 'USB', 'XLR'] }, { key: 'canales', label: 'Canales', icon: 'ph-sliders-horizontal', options: ['1 canal', '2 canales', '4 canales'] }], basePrice: 73000, imageSeed: 'recording-studio' },
];

export const catalogCategories = [...instrumentCategories, ...audioCategories];

export const getCatalogCategory = (group: string, slug: string) => catalogCategories.find((category) => category.group === group && category.slug === slug);

const imageFor = (seed: string, index: number) => `https://images.unsplash.com/photo-${['1511379938547-c1f69419868d', '1516280440614-37939bbacd81', '1493225457124-a3eb161ffa5f', '1520523839897-bd0b52f945a0'][index % 4]}?auto=format&fit=crop&w=900&q=85&sig=${seed}-${index}`;

export const productsFor = (category: CatalogCategory): CatalogProduct[] => Array.from({ length: 12 }, (_, index) => {
	const brand = category.brands[index % category.brands.length];
	const type = category.types[index % category.types.length];
	const attributes = Object.fromEntries(category.filters.map((filter, filterIndex) => [filter.key, filter.options[(index + filterIndex) % filter.options.length]]));
	return {
		id: `${category.slug}-${index + 1}`,
		brand,
		model: `${type} Serie ${String(index + 1).padStart(2, '0')}`,
		type,
		price: category.basePrice + index * Math.round(category.basePrice * .17),
		availability: ['Disponible', 'Disponible', 'Por encargo', 'Agotado'][index % 4] as CatalogProduct['availability'],
		level: ['Principiante', 'Intermedio', 'Profesional'][index % 3] as CatalogProduct['level'],
		date: `2026-08-${String(31 - index).padStart(2, '0')}`,
		image: imageFor(category.imageSeed, index),
		attributes,
	};
});
