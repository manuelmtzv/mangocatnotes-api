import fs from 'fs'
import { Express, Router } from 'express'

const routesDirectory = './src/routes'

export default function setRoutes(app: Express, dirname = 'routes') {
  fs.readdirSync(routesDirectory).forEach(async (file) => {
    const routeModule = (await import(`${__dirname}/${dirname}/${file}`)) as {
      default: Router
    }
    const routeBase = `/api/${file.split('.')[0]}`
    app.use(routeBase, routeModule.default)
  })
}
