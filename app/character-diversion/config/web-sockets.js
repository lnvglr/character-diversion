
export default {
	sockets: [{
		name: 'main',
		default: true,
		url: 'http://localhost:3000',
		// url: process.env.NODE_ENV === "production" ? 'https://www.character-diversion.com/ws' : 'http://localhost:3000',
		cors: {
			credentials: true,
			origin: [
				'http://localhost:3000',
				'https://www.character-diversion.com',
			]
		}
	}, {
		name: 'local',
		url: 'http://localhost:3000'
	}]
}