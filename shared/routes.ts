
import { z } from 'zod';
import { insertSessionSchema, sessions, AppStateSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  sessions: {
    create: {
      method: 'POST' as const,
      path: '/api/sessions' as const,
      input: z.object({
        name: z.string().optional(),
        data: AppStateSchema
      }),
      responses: {
        201: z.custom<typeof sessions.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/sessions/:id' as const,
      responses: {
        200: z.custom<typeof sessions.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/sessions/:id' as const,
      input: z.object({
        name: z.string().optional(),
        data: AppStateSchema
      }),
      responses: {
        200: z.custom<typeof sessions.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  pdf: {
    generate: {
      method: 'POST' as const,
      path: '/api/pdf/generate' as const,
      input: AppStateSchema,
      responses: {
        200: z.any(), // Blob/Buffer response
        400: errorSchemas.validation,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
