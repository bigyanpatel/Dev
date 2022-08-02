import { ConfigService } from '@nestjs/config';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { RollbarLogger } from 'nestjs-rollbar';
import { AllExceptionsFilter } from './exceptions/all.exception';

const { ExpressReceiver } = require('@slack/bolt');

const bootstrap = async() => {
  const app = await NestFactory.create(AppModule);
  const receiver = new ExpressReceiver({ 
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    endpoints: { commands: '/slack/command' },
  });
  const httpAdapter = app.get(HttpAdapterHost);
  
  const rollbarLogger = app.get(RollbarLogger);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, rollbarLogger));
  
  const appModule = app.get(AppModule);
  appModule.initSlack(receiver);
  app.use(receiver.router);
  
  // app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();