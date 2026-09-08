export interface Testimonial {
	name: string;
	rating: number;
	text: string;
}

// Verified once from the public Google review listing for Tienda Musical Mozart.
export const testimonials: Testimonial[] = [
	{
		name: 'Ruben S',
		rating: 5,
		text: 'Excelente lugar. Son personas muy amables. Me ayudaron con unas dudas que tenía de afinación de guitarra y me vendieron un stand de guitarra a un excelente precio. Super recomendados.',
	},
	{
		name: 'Esteban M',
		rating: 5,
		text: 'Buenos precisos, servicio de calidad, los dueños son muy amables y variedad.',
	},
	{
		name: 'Vicaba1',
		rating: 5,
		text: 'Buen trato,muy amables, y lo que buscaba estaba a muy buen precio,',
	},
	{
		name: 'Julio R',
		rating: 5,
		text: 'Aquí encuentras de todo y al mejor precio,la atención al cliente es incomparable de 10=10 así que recomienento tienda Mozart con toda seguridad.',
	},
	{
		name: 'Gabo P',
		rating: 5,
		text: 'Excelente servicio de parte de los dueños y una variedad de material y precios increíbles.',
	},
];
