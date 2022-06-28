export default defineEventHandler((event) => {
	if (event.req.headers.referer?.indexOf('http://') === 0) {
		event.res.writeHead(302, {
			'Location': event.req.headers.referer?.replace('http://', 'https://')
		});
		event.res.end();
	}
})