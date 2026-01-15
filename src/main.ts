import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// Aplicação hibrida: HTTP + gRPC
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC, // gRPC
    options: {
      package: 'hero', // nome do pacote do .proto
      protoPath: 'src/hero/hero.proto', // caminho para o arquivo .proto
      url: '0.0.0.0:50051', // endereço do servidor gRPC (bind a todas interfaces)
    },
  });
  // Garantir que o microservice gRPC esteja inicializado antes de aceitar requisições HTTP
  try {
    await app.startAllMicroservices();
  } catch (err) {
    console.warn('Não foi possível iniciar microservices automaticamente:', err);
  }

  await app.listen(3000);
}
bootstrap();
