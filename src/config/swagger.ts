import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Trailer API',
      version: '1.0.0',
      description: 'API for managing movie trailers',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routers/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
