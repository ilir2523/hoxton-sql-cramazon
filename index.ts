import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import e from 'express'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4001

const prisma = new PrismaClient({ log: ['query', 'error', 'warn', 'info'] })

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({ include: { Order: { select: { quantity: true, item: true} } } })
    res.send(users)
})

app.listen(PORT, () => {
    console.log(`Server runing on: http://localhost:${PORT}/`)
})