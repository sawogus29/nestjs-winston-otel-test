import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  // Define the custom log format
  const customFormat = winston.format.printf((record) => {
    const {timestamp, level, trace_id='', span_id='', service_name = process.env.OTEL_SERVICE_NAME ?? '', message} = record;    
    /*
    console.log(record);
    // {
    //   context: 'InstanceLoader',
    //   level: 'info',
    //   message: 'AppModule dependencies initialized',
    //   trace_id: '6557e295aca3fe2c04e0e59adca46ce9',
    //   span_id: 'f0254c8adfc84662',
    //   trace_flags: '01',
    //   timestamp: '2024-11-11 14:51:17,366',
    //   [Symbol(level)]: 'info',
    //   [Symbol(splat)]: [ { context: 'InstanceLoader' } ],
    //   [Symbol(message)]: '{"context":"InstanceLoader","level":"info","message":"AppModule dependencies initialized","span_id":"f0254c8adfc84662","trace_flags":"01","trace_id":"6557e295aca3fe2c04e0e59adca46ce9"}'
    // }
    */
    return `${timestamp} ${level.toUpperCase()} [${trace_id}|${span_id}|${service_name}] ${message}`;
  });

  // Create the logger with the custom format
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss,SSS'}),
            customFormat  // Apply the custom format
            // nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
  });
  await app.listen(3000);
}
bootstrap();
