import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BenchmarkService } from './benchmark.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly benchmarkService: BenchmarkService
  ) {}

  @Get('benchmark')
  async triggerBenchmark() {
    await this.benchmarkService.runComparison();
    return 'Teste finalizado. Olhe o terminal.';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
