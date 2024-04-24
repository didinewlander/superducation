const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    // await db.userRole.create({ data: { name: "Student" } });
    // await db.userRole.create({ data: { name: "Teacher" } });
    // await db.userRole.create({ data: { name: "Institute" } });

    const user = await db.user.create({
      data: {
        name: "Lev Academic Center",
        email: "mazal@jct.ac.il",
        phone: "+9722-6751129",
        gender: "0",
      },
    });

    await db.institute.create({
      data: {
        name: "Lev Academic Center",
        phoneNumber: "+9722-6751111",
        website: "https://www.jct.ac.il",
        userId: user.id,
      },
    });
    console.log("🟢 Seed script run successfully!🟢");
  } catch (error) {
    console.log("🔴 Error in seed script 🔴", error);
  } finally {
    await db.$disconnect();
  }
}

main();
