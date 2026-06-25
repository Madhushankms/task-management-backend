import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { ENV } from "./env";

const url = new URL(ENV.DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  connectionLimit: 5,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      ENV.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (ENV.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
