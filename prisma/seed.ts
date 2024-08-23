import { PrismaClient } from "@prisma/client";
import * as ReactIcons from "lucide-react";
const prisma = new PrismaClient();

async function main() {
  let data: any = [];
  Object.keys(ReactIcons).map((icon, idxIcon) => {
    if (icon !== "icons" && icon !== "default" && icon !== "createLucideIcon") {
      data.push({
        value: icon,
        label: icon,
        provider: "lucide",
        order: idxIcon,
      });
    }
  });

  await prisma.icon.createMany({
    data,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
