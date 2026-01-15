import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroController } from './hero/hero.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BenchmarkService } from './benchmark.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          protoPath: 'src/hero/hero.proto',
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [AppController, HeroController],
  providers: [AppService, BenchmarkService],
})
export class AppModule {}
