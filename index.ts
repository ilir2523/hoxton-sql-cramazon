import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4001

const prisma = new PrismaClient({ log: ['query', 'error', 'warn', 'info'] })

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({ include: { orders: { select: { quantity: true, item: true } } } })
    res.send(users)
})

app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const user = await prisma.user.findUnique({ where: { id: id }, include: { orders: { select: { quantity: true, item: true } } } })
        res.send(user)
    } catch (err) {
        // @ts-ignore
        res.status(400).send(`<pre>${err.message}</pre>`)
    }
})

app.patch('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const { name, email } = req.body
    try {
        const user = await prisma.user.update({
            where: { id: id },
            data: { name: name, email: email }
        })
        res.send(user)
    } catch (err) {
        // @ts-ignore
        res.status(400).send(err.message)
    }
})

app.get('/items', async (req, res) => {
    const items = await prisma.item.findMany()
    res.send(items)
})

app.get('/items/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const item = await prisma.item.findFirst({ where: { id: id } })
        if (item) {
            res.send(item)
        } else res.status(404).send({ error: 'Item not found.' })
    } catch (err) {
        // @ts-ignore
        res.status(400).send(`<pre>${err.message}</pre>`)
    }
})

app.post('/items', async (req, res) => {
    const { title, image } = req.body
    try {
        const item = await prisma.item.create({ data: { title: title, image: image } })
        res.send(item)
    } catch (err) {
        // @ts-ignore
        res.status(400).send(err.message)
    }

})

app.get('/orders', async (req, res) => {
    const orders = await prisma.order.findMany({ select: { user: true, item: true, quantity: true } })
    res.send(orders)
})

app.post('/orders', async (req, res) => {
    const { userId, itemId, quantity } = req.body
    try {
        const newOrder = await prisma.order.create({ data: { userId: userId, itemId: itemId, quantity: quantity } })
        res.send(newOrder)
    } catch (err) {
        // @ts-ignore
        res.status(400).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server runing on: http://localhost:${PORT}/`)
})