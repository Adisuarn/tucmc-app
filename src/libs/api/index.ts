import { treaty } from "@elysiajs/eden";
import type { AppRouter } from '@/server/api'
import { getBaseUrl } from '@/libs/utils'

export const api = treaty<AppRouter>(getBaseUrl()).api.elysia
