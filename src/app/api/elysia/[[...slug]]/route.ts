import { appRouter } from "@/server/api";

const handler = appRouter.handle;

export { handler as GET, handler as POST }
