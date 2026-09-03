export type BrandGroup = {
	title: string;
	icon: string;
	brands: Brand[];
};

export type Brand = {
	name: string;
	description: string;
	route?: string;
};

export const brandGroups: BrandGroup[] = [
	{ title: 'Instrumentos', icon: 'ph-guitar', brands: [
		{ name: 'Godin', description: 'Guitarras eléctricas y acústicas de fabricación canadiense.', route: '/instrumentos/guitarras' },
		{ name: 'Córdoba', description: 'Guitarras clásicas, flamencas y ukeleles.', route: '/instrumentos/guitarras' },
		{ name: 'Winzz', description: 'Instrumentos accesibles para empezar a tocar.' },
		{ name: 'Yamaha', description: 'Instrumentos para cada etapa musical.', route: '/instrumentos/guitarras' },
		{ name: 'Ibanez', description: 'Guitarras y bajos para sonido contemporáneo.', route: '/instrumentos/guitarras' },
		{ name: 'Squier', description: 'Guitarras y bajos inspirados en Fender.', route: '/instrumentos/guitarras' },
		{ name: 'Cort', description: 'Instrumentos versátiles para práctica y escenario.', route: '/instrumentos/guitarras' },
		{ name: 'Fender', description: 'Referente en guitarras y bajos eléctricos.', route: '/instrumentos/guitarras' },
		{ name: 'Kala', description: 'Ukeleles para todos los niveles.', route: '/instrumentos/ukeleles' },
	] },
	{ title: 'Percusión', icon: 'ph-drum', brands: [
		{ name: 'Pearl', description: 'Baterías y hardware para interpretación en vivo.', route: '/instrumentos/baterias' },
		{ name: 'Tama', description: 'Baterías y herrajes de alto rendimiento.', route: '/instrumentos/baterias' },
		{ name: 'Meinl', description: 'Percusión, platillos y accesorios especializados.', route: '/instrumentos/percusion-latina' },
		{ name: 'Zildjian', description: 'Platillos para práctica, estudio y tarima.', route: '/instrumentos/platillos' },
	] },
	{ title: 'Teclados', icon: 'ph-piano-keys', brands: [
		{ name: 'Casio', description: 'Pianos digitales y teclados para aprender.', route: '/instrumentos/pianos-y-teclados' },
		{ name: 'Roland', description: 'Pianos, teclados y controladores expresivos.', route: '/instrumentos/pianos-y-teclados' },
		{ name: 'Korg', description: 'Teclados y soluciones para creación musical.', route: '/instrumentos/pianos-y-teclados' },
	] },
	{ title: 'Instrumentos de viento', icon: 'ph-wind', brands: [
		{ name: 'Jupiter', description: 'Instrumentos de viento para estudiantes y bandas.', route: '/instrumentos/vientos' },
	] },
	{ title: 'Audio en vivo', icon: 'ph-speaker-high', brands: [
		{ name: 'JBL', description: 'Parlantes y sistemas de sonido para eventos.', route: '/audio/audio-profesional' },
		{ name: 'Shure', description: 'Micrófonos confiables para escenario y voz.', route: '/audio/audio-profesional' },
		{ name: 'Sennheiser', description: 'Audio profesional y monitoreo preciso.', route: '/audio/audio-profesional' },
		{ name: 'Marshall', description: 'Amplificación y audio para músicos y hogar.', route: '/audio/audio-hogar' },
		{ name: 'Sony', description: 'Audio para escuchar música en casa.', route: '/audio/audio-hogar' },
	] },
	{ title: 'Estudio y grabación', icon: 'ph-microphone-stage', brands: [
		{ name: 'Focusrite', description: 'Interfaces de audio para grabar con claridad.', route: '/audio/estudio-y-grabacion' },
		{ name: 'Rode', description: 'Micrófonos para estudio, video y podcast.', route: '/audio/estudio-y-grabacion' },
		{ name: 'PreSonus', description: 'Monitores, interfaces y producción musical.', route: '/audio/estudio-y-grabacion' },
	] },
	{ title: 'Creación de contenido', icon: 'ph-video-camera', brands: [
		{ name: 'Razer', description: 'Audio y periféricos para gaming y streaming.', route: '/audio/creadores-de-contenido-y-gaming' },
		{ name: 'HyperX', description: 'Audífonos y micrófonos para comunicación clara.', route: '/audio/creadores-de-contenido-y-gaming' },
		{ name: 'Elgato', description: 'Herramientas para transmisión y creación digital.', route: '/audio/creadores-de-contenido-y-gaming' },
		{ name: 'Logitech', description: 'Accesorios para streaming, trabajo y contenido.', route: '/audio/creadores-de-contenido-y-gaming' },
	] },
];
