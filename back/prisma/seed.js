const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456');
const userData = [
  { role: 'USER', email: 'andy@ggg.mail', password, address: '123 Street, City', firstName: 'Andy', lastName: 'Smith', phone: '0970890759' },
  { role: 'USER', email: 'bobby@ggg.mail', password, address: '1234 Street, City', firstName: 'bobby', lastName: 'so', phone: '0970890758' },
  { role: 'USER', email: 'candy@ggg.mail', password, address: '1235 Street, City', firstName: 'candy', lastName: 'mo', phone: '0970890757' }
];

const run = async () => {
  await prisma.user.createMany({
    data: userData,
  });
};

run()