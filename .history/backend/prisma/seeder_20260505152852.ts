import { log } from "console";
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
      username: "Ажилтан",
      role: "EMPLOYEE",
    },
  });

  await prisma.requestType.create({
    data: {
      name: "Цалинтай чөлөө",
      limit: 5,
      period: "YEARLY",
    },
  });
  console.log("");
}
