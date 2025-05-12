import { Hono } from 'hono'

type Bindings = {
  // @ts-ignore
  DB : D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/products', async (c) => {
  const resp = await c.env.DB.prepare("select * from nxstage;").all()  
  const products = resp.results

  return c.json(products)
})

app.post('/api/products', async (c) => {
  const query = c.req.query()
  for (const [key, value] of Object.entries(query)) {
    await c.env.DB.prepare(
					"UPDATE NxStage SET Qty = ? WHERE Name = ?"
				).bind(value, key).run();
  }
  return new Response(null, { status: 200 });
})

export default app