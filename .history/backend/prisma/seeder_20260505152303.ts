import prisma from "../src/lib/prisma";

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      username: "Admin",
      role: "ADMIN",
    },
  });
}
