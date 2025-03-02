import { createElysiaRouter } from "../root";
import { documentBuilder } from "../controllers/activity.controller";
import { t, error } from "elysia"
import { pdfGenerateBody } from "../types/activity.type";

export const activityRouter = createElysiaRouter({ prefix: '/activity'})
  .post('/generate', async ({ body }) => {
    try {
      if (body.startPeriod > body.endPeriod) {
        return error(400, "Start period must be less than end period")
      }
      const response = await documentBuilder(body)
      return response
    } catch {
      return error(500, "Internal Server Error")
    }
  },
  {
    body: pdfGenerateBody
  }
)
