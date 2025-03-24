import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

const prisma = new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjNmOGE5ODAtMmE0NC00ODZkLWE0ZWItZDI4NTcwOTExZmEyIiwidGVuYW50X2lkIjoiM2JmMDIzMzdiMzY1ZWZkMmIxODQ3ZWIyMDQxODdjNGY1YmM3MDFiNmNiNzRiOTA0ZWM4MTI2MTkzMjliN2VjOCIsImludGVybmFsX3NlY3JldCI6IjY3ZGI0YTZiLTQ0YTctNDhkNC1iZjQ2LTcyZGUyMWU5MzcxZiJ9.0t9sA4WdYHNccsOeq8DiPh-nNPxkWyouOmcsn62iLYE"
}).$extends(withAccelerate())

export default prisma