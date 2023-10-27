import 'module-alias/register'
import 'dotenv/config'

import app from '@/app'
import { startConnection } from '@/database'
import setRoutes from '@/setRoutes'

const port = process.env.PORT ? Number(process.env.PORT) : 3000

setRoutes(app)

app.listen(port, async () => {
  await startConnection()
  console.log(`Listening in: http://localhost:${port}`)
})
