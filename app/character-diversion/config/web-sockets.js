
export default {
	sockets: [{
		name: 'main',
		default: true,
		url: 'https://www.character-diversion.com/ws',
		cors: {
			credentials: true,
			origin: [
				'http://localhost:3000',
				'https://www.character-diversion.com',
			]
		}
	}, {
		name: 'local',
		url: 'http://localhost:1718'
	}]
}