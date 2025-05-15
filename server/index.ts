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

app.put('/api/products', async (c) => {
  const query = c.req.query()
  for (const [key, value] of Object.entries(query)) {
    await c.env.DB.prepare(
					"UPDATE NxStage SET Qty = ? WHERE Name = ?"
				).bind(value, key).run();
  }
  return new Response(null, { status: 200 });
})

app.post('/api/addedit', async (c) => {
  const body = await c.req.json()
  console.log(body.PartNum, body.Name, body.Description, body.qty, body.BoxQty)

  if (typeof body.ID == "number") {
    const resp = await c.env.DB.prepare( `UPDATE NxStage
      SET PartNum = ?, Name = ?, Description = ?, Qty = ?, BoxQty = ? WHERE ID = ? RETURNING *`)
      .bind(body.PartNum, body.Name, body.Description, body.qty, body.BoxQty. body.ID)
      .run()

    // return new Response(null, { status: 200 });
    const ok = resp.success
    return c.json({ok})
  } 

  const resp = await c.env.DB.prepare(
    `INSERT INTO NxStage (PartNum, Name, Description, Qty, BoxQty) VALUES (?, ?, ?, ?, ?) RETURNING *`)
    .bind(body.PartNum, body.Name, body.Description, body.Qty, body.BoxQty)
    .run()

  // return new Response(null, { status: 200 });
  const ok = resp.success
  return c.json({ok})
})

export default app