import { createElysiaRouter } from "../root";

export const testRouter = createElysiaRouter({})
.get("/", async() => 'hello')
