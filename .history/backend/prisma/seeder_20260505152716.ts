import prisma from "../src/lib/prisma";

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      username: "Admin",
      role: "ADMIN",
    },
  });

  const employee = await prisma.user.create({
    data: {
      email: "employee@gmail.com",
      username: "Employee",
      role: "EMPLOYEE",
    },
  });
}
