import { createRoute, z } from "@hono/zod-openapi"
import { createErrorSchema } from "stoker/openapi/schemas"
import { insertTasksSchema, selectTasksSchema } from "./tasks.schemas"

const tags = ["Tasks"]

export const list = createRoute({
  tags,
  method: "get",
  path: "/tasks",
  summary: "Get Task List",
  description: "Get all the tasks of a user",
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean().openapi({ example: true }),
            data: z.array(selectTasksSchema),
          }),
        },
      },
    },
  },
})

export const create = createRoute({
  tags,
  method: "post",
  path: "/tasks",
  summary: "Create a Task",
  description: "You can create tasks for a user",
  request: {
    body: {
      description: "The task to create",
      content: {
        "application/json": {
          schema: insertTasksSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            data: selectTasksSchema,
          }),
        },
      },
    },
    422: {
      description: "invalid body",
      content: {
        "application/json": {
          schema: createErrorSchema(insertTasksSchema),
        },
      },
    },
  },
})

export const getOne = createRoute({
  tags,
  method: "get",
  path: "/tasks/{id}",
  summary: "Get task list",
  description: "Get all the tasks of a user",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({ param: { name: "id", in: "path" } }),
    }),
  },
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean().openapi({ example: true }),
            data: selectTasksSchema,
          }),
        },
      },
    },
    404: {
      description: "not found",
      content: {
        "application/json": {
          schema: z.object({
            mesage: z.string().openapi({ example: "Not found" }),
          }),
        },
      },
    },
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
