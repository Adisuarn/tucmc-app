import { createElysiaRouter } from "../root";
import { documentBuilder } from "../controllers/activity.controller";
import { error } from "elysia"
import { pdfGenerateBody } from "../types/activity.type";

export const activityRouter = createElysiaRouter({ prefix: '/activity'})
  .post('/generate', async ({ body: { sheets } }) => {
    try {

      const invalidSheet = sheets.findIndex(sheet => Number(sheet.startPeriod) > Number(sheet.endPeriod));
      if (invalidSheet !== -1) {
        return error(400, `Sheet ${invalidSheet + 1} start period must be less than end period`);
      }

      const response = await documentBuilder(sheets)
      return response
    } catch {
      return error(500, "Internal Server Error")
    }
  },
  {
    body: pdfGenerateBody
  }
)
