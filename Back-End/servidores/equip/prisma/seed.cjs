// prisma/seed.cjs
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const email = 'admin@exemplo.com'
  const passwordHash = await bcrypt.hash('TroqueEstaSenha123!', 10)

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name: 'Administrador',
      role: 'ADMIN',
    },
  })
  console.log('Seed ok: admin@exemplo.com')
}

main().finally(() => prisma.$disconnect())
