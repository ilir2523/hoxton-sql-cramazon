import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error', 'warn', 'info'] })

// const users: Prisma.UserCreateInput[] = [
//     {
//         name: 'Nicolas',
//         email: 'nicolas@email.com'
//     },
//     {
//         name: 'Ed',
//         email: 'ed@email.com'
//     },
//     {
//         name: 'Ilir',
//         email: 'ilir@email.com'
//     }

// ]

// const items: Prisma.ItemCreateInput[] = [
//     {
//         title: 'iPhone 12 pro max',
//         image: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg'
//     },
//     {
//         title: "Gildan Men's Fleece Crewneck Sweatshirt, Style G18000",
//         image: 'https://m.media-amazon.com/images/I/61iDKNQdzOL._AC_UL480_FMwebp_QL65_.jpg'
//     },
//     {
//         title: 'Beckham Hotel Collection Bed Pillows for Sleeping',
//         image: 'https://m.media-amazon.com/images/I/31T51VsUJdS._AC_UL480_QL65_.jpg'
//     },
//     {
//         title: 'Pokémon Assorted Cards, 50 Pieces',
//         image: 'https://m.media-amazon.com/images/I/61VJWSztDcL._AC_UL480_QL65_.jpg'
//     }
// ]

const orders = [
    {
        userId: 1,
        itemId: 1,
        quantity: 1
    },
    {
        userId: 2,
        itemId: 1,
        quantity: 1
    },
    {
        userId: 3,
        itemId: 1,
        quantity: 1
    }
]

async function createStuf() {
    // for (const user of users) {
    //     await prisma.user.create({data: user})
    // }
    // for (const item of items) {
    //     await prisma.item.create({data: item})
    // }
    for (const order of orders) {
        await prisma.order.create({data: order})
    }
}

createStuf()