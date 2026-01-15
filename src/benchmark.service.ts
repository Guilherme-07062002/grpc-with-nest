import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import axios from 'axios'; // Vamos usar axios pro teste HTTP

interface HeroService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getHeroes(data: {}): any;
}

@Injectable()
export class BenchmarkService implements OnModuleInit {
  private grpcHeroService: HeroService;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcHeroService = this.client.getService<HeroService>('HeroService');
  }

  async runComparison() {
    console.log('🏁 Iniciando Benchmark: 5.000 Objetos');

    // --- TESTE REST ---
    const startRest = performance.now();
    // o endpoint REST de heroes está em '/' no HeroController
    const res = await axios.get('http://localhost:3000/hero');
    const endRest = performance.now();
    const timeRest = (endRest - startRest).toFixed(2);
    console.log(`📡 REST (JSON): ${timeRest} ms (bytes: ${res.headers['content-length'] || 'unknown'})`);

    // --- TESTE gRPC ---
    const startGrpc = performance.now();
    await firstValueFrom(this.grpcHeroService.getHeroes({}));
    const endGrpc = performance.now();
    const timeGrpc = (endGrpc - startGrpc).toFixed(2);
    console.log(`🚀 gRPC (Proto): ${timeGrpc} ms`);

    // --- CONCLUSÃO ---
    const diff = (Number(timeRest) / Number(timeGrpc)).toFixed(1);
    console.log(`📊 O gRPC foi aproximadamente ${diff}x mais rápido.`);
  }
}