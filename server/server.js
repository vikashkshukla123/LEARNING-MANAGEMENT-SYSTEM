import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'   // ✅ default import
import { clerkWebhooks } from './controllers/webhooks.js'

// initialize express
const app = express()

// CONNECT TO DATABASE
await connectDB()

app.use(cors())

app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk',express.json(), clerkWebhooks)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
