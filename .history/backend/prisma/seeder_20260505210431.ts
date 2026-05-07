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
  console.log("Seeder amjilttai:", { admin, employee });
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

async function deleteData() {
  try {
    await prisma.leaveRequest.deleteMany();
    await prisma.requestType.deleteMany();
    await prisma.user.deleteMany();
    console.log("Ugugdul bugdiig ustgalaa...");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

if (process.argv[2] === "-i") {
  main();
} else if (process.argv[2] === "-d") {
  deleteData();
}
