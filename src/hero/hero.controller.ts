import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

// 1. Gerar Massa de Dados (5.000 itens)
const HEROES = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `Heroi Número ${i}`,
  power: 'Super Velocidade e Força Descomunal',
  description: 'Uma descrição bem longa para ocupar espaço em bytes na transferência e ver quem comprime melhor os dados durante o envio.',
}));

@Controller()
export class HeroController {
  constructor() {}

 // --- ENDPOINT REST (HTTP) ---
  @Get()
  getHeroesRest() {
    return HEROES; // Nest faz JSON.stringify() automático
  }

  // --- ENDPOINT gRPC ---
  @GrpcMethod('HeroService', 'GetHeroes')
  getHeroesGrpc() {
    return { heroes: HEROES }; // Nest serializa para Protobuf
  }
}
