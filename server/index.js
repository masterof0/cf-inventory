export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const pathname = url.pathname;
		const params = url.searchParams;

		// console.log(pathname);
		// console.log(params);

// ToDo allow paths to have trailing /

		if (pathname === "/api/products") {
			const { results } =  await env.DB.prepare(
				"SELECT * FROM NxStage"
			)
			.bind()
			.all();
			return Response.json(results);
		}

		if (pathname === "/api/updates") {
			// console.log(params);
			params.forEach(async (value, key) => {
				// console.log(key, value);
				console.log(`UPDATE NxStage SET Qty = ${value} WHERE ID = ${key}`)
				const { results } = await env.DB.prepare(
					"UPDATE NxStage SET Qty = ? WHERE ID = ?"
				).bind(value, key).run()
			});
			return new Response(null, { status: 200 });
		}

		return new Response(null, { status: 404 });
	},
};
