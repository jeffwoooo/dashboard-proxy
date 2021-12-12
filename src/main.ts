import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigNumber } from 'bignumber.js';
import axios from 'axios';

// https://mikemcl.github.io/bignumber.js/#exponential-at
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

axios.defaults.baseURL = 'https://fcd.terra.dev/v1/dashboard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
