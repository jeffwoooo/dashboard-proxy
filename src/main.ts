import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigNumber } from 'bignumber.js';
import axios from 'axios';
import { RequestMethod } from '@nestjs/common';

// https://mikemcl.github.io/bignumber.js/#exponential-at
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

axios.defaults.baseURL = 'https://fcd.terra.dev/v1/dashboard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('chart', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  await app.listen(3000);
}
bootstrap();
