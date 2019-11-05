import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // enable cors for localhost and front app
  app.enableCors({
    origin: ['http://localhost:4200'],
  });
  app.setGlobalPrefix('api');


  // Initializing Swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('GSB')
    .setDescription('API for gsb')
    .setExternalDoc('Swagger document as JSON', '../swagger-json')
    .setVersion('1.0')
    .setSchemes('http')
    .addBearerAuth()
    .setHost('localhost')
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document, {
  customSiteTitle: 'My Gladys API Swagger',
  swaggerOptions: {
    displayOperationId: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
    docExpansion: 'none',
  },
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));

  await app.listen(3000);

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    // Hack to have Swagger JSON on http
    const server = express();
    server.get('/api/swagger.json', (req, res) => {
      res.json(document);
    });
    http.createServer(server).listen(1336);
  }
}
bootstrap();
