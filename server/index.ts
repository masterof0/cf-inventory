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

export default app