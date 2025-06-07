import { Hono } from 'hono'

type Bindings = {
	// @ts-ignore
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/products', async (c) => {
	const resp = await c.env.DB.prepare('select * from nxstage;').all()
	const products = resp.results

	return c.json(products)
})

// ToDo update to be a batch function
app.patch('/api/product', async (c) => {
	const query = c.req.query()
	for (const [key, value] of Object.entries(query)) {
		await c.env.DB.prepare('UPDATE NxStage SET Qty = ? WHERE Name = ?')
			.bind(value, key)
			.run()
	}
	return new Response(null, { status: 200 })
})

// Split to post and put
app.put('/api/product', async (c) => {
	const body = await c.req.json()

	if (typeof body.ID == 'number') {
		const resp = await c.env.DB.prepare(
			`UPDATE NxStage
      SET PartNum = ?, Name = ?, Description = ?, Qty = ?, BoxQty = ? WHERE ID = ? RETURNING *`,
		)
			.bind(
				body.PartNum,
				body.Name,
				body.Description,
				body.Qty,
				body.BoxQty,
				body.ID,
			)
			.run()

		// return new Response(null, { status: 200 });
		console.log(resp.results)
		const ok = resp.success
		return c.json({ ok })
	}

	const resp = await c.env.DB.prepare(
		`INSERT INTO NxStage (PartNum, Name, Description, Qty, BoxQty) VALUES (?, ?, ?, ?, ?) RETURNING *`,
	)
		.bind(body.PartNum, body.Name, body.Description, body.Qty, body.BoxQty)
		.run()

	// return new Response(null, { status: 200 });
	console.log(resp.results)
	const ok = resp.success
	return c.json({ ok })
})

app.delete('/api/product/:id', async (c) => {
	const id = await c.req.param('id')

	const resp = await c.env.DB.prepare(
		`DELETE FROM NxStage WHERE ID = ? RETURNING *`,
	)
		.bind(id)
		.run()

	console.log(resp.results)
	const ok = resp.success
	return c.json({ ok })
})

app.get('/api/logs', async (c) => {
	const resp = await c.env.DB.prepare('select * from logs;').all()
	const logs = resp.results

	return c.json(logs)
})

app.post('/api/log', async (c) => {
	const body = await c.req.json()

	const resp = await c.env.DB.prepare(
		`INSERT INTO Logs (Date, Subject, Tags, Notes) VALUES (?, ?, ?, ?) RETURNING *`,
	)
		.bind(body.date, body.subject, body.tags, body.notes)
		.run()

	console.log(resp.results)
	const ok = resp.success
	return c.json({ ok })
})

export default app
