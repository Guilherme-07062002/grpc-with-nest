 # gRPC

 Exemplo de aplicação híbrida (HTTP + gRPC) usando NestJS para comparar performance e demonstrar integração via Protobuf.

 - **Visão geral**: a aplicação expõe um endpoint REST e um serviço gRPC que retornam a mesma massa de dados (5.000 objetos). Existe também um `BenchmarkService` que compara o tempo de transferência REST vs gRPC.

 - **Arquivos importantes**:
	 - `src/main.ts` — conecta o microservice gRPC (porta `50051`) e inicia a aplicação HTTP na porta `3000`.
	 - `src/hero/hero.proto` — definição Protobuf do pacote `hero` com o serviço `HeroService` e mensagens `HeroList`/`Hero`.
	 - `src/hero/hero.controller.ts` — implementa `GET /hero` (REST) e `@GrpcMethod('HeroService','GetHeroes')` (gRPC). Gera uma massa de 5.000 heróis para comparação de payload.
	 - `src/app.module.ts` — registra o `ClientsModule` com um cliente gRPC (`HERO_PACKAGE`) para consumo do serviço via `ClientGrpc`.
	 - `src/benchmark.service.ts` — exemplo de benchmark que realiza uma chamada HTTP para `GET /hero` e uma chamada gRPC (`getHeroes`) medindo latências e exibindo um comparativo.

 - **Comportamento**:
	 - O endpoint REST (`GET /hero`) retorna um array JSON com 5.000 objetos.
	 - O método gRPC (`GetHeroes`) retorna a mesma massa serializada via Protobuf, possibilitando comparação de payload, latência e tamanho.
	 - O `BenchmarkService` realiza ambas chamadas e imprime tempos no console; ele usa `axios` para o teste HTTP e `ClientGrpc` + `firstValueFrom` para a chamada gRPC.

 - **Como rodar**:

 ```bash
 npm install
 npm run start:dev
 ```

 - A aplicação HTTP ficará em `http://localhost:3000` e o servidor gRPC em `0.0.0.0:50051`.

 - **Exemplos de chamadas**:

 ```bash
 # REST
 curl http://localhost:3000/hero

 # gRPC (ex.: usando grpcurl)
 grpcurl -plaintext 0.0.0.0:50051 hero.HeroService/GetHeroes
 ```
  - **Observações**:
    - Este exemplo é útil para entender as diferenças de performance entre REST e gRPC, especialmente em payloads maiores.
    - Pode ser estendido para incluir mais métodos, autenticação ou outras funcionalidades gRPC.