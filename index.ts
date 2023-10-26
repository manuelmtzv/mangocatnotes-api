import 'module-alias/register'
import 'dotenv/config'

import app from '@/app'
import { startConnection } from '@/database'
import setRoutes from '@/router'

// Setting all routes files
setRoutes(app)

const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.listen(port, () => {
  startConnection()
  console.log(`Listening in: http://localhost:${port}`)
})
