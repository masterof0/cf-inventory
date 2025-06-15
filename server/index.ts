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
		await c.env.DB.prepare('UPDATE NxStage SET Qty = ? WHERE Name = ?').bind(value, key).run()
	}
	return new Response(null, { status: 200 })
})

app.post('/api/product', async (c) => {
	const body = await c.req.json()

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

app.put('/api/product', async (c) => {
	const body = await c.req.json()

	const resp = await c.env.DB.prepare(
		`UPDATE NxStage
	    SET PartNum = ?, Name = ?, Description = ?, Qty = ?, BoxQty = ? WHERE ID = ? RETURNING *`,
	)
		.bind(body.PartNum, body.Name, body.Description, body.Qty, body.BoxQty, body.ID)
		.run()

	// return new Response(null, { status: 200 });
	console.log(resp.results)
	const ok = resp.success
	return c.json({ ok })
})

app.delete('/api/product/:id', async (c) => {
	const id = await c.req.param('id')

	const resp = await c.env.DB.prepare(`DELETE FROM NxStage WHERE ID = ? RETURNING *`).bind(id).run()

	console.log(resp.results)
	const ok = resp.success
	return c.json({ ok })
})

app.get('/api/log/:id', async (c) => {
	const id = await c.req.param('id')

	if (id === 'latest') {
		const resp = await c.env.DB.prepare(`SELECT * FROM Logs ORDER BY ID DESC LIMIT 1`).run()

		const l = resp.results
		console.log(resp.results)

		return c.json(l)
	}

	const resp = await c.env.DB.prepare(`SELECT * FROM logs WHERE id = ?`).bind(id).run()
	const l = resp.results
	console.log(resp.results)

	return c.json(l)
})

app.get('/api/logs', async (c) => {
	const resp = await c.env.DB.prepare('SELECT * FROM logs ORDER BY ID DESC;').all()
	const logs = resp.results
	for (const element of logs) {
		element.Tags = JSON.parse(element.Tags)
	}
	return c.json(logs)
})

app.post('/api/log', async (c) => {
	const body = await c.req.json()

	const resp = await c.env.DB.prepare(`INSERT INTO Logs (Date, Subject, Tags, Notes) VALUES (?, ?, ?, ?) RETURNING *`)
		.bind(body.date, body.subject, body.tags, body.notes)
		.run()

	const log = resp.results
	console.log(log)
	return c.json(log)
})

app.put('/api/log/:id', async (c) => {
	const id = await c.req.param('id')
	const body = await c.req.json()

	const resp = await c.env.DB.prepare(
		`UPDATE Logs
	  SET Date = ?, Subject = ?, Tags = ?, Notes = ? WHERE ID = ? RETURNING *`,
	)
		.bind(body.Date, body.Subject, body.Tags, body.Notes, body.ID)
		.run()

	console.log(resp.results)
	const ok = resp.success
	return c.json({ ok })
})

export default app
