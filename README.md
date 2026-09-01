# Pokédex 

App Ionic + Angular que consome a [PokeAPI](https://pokeapi.co/) para listar e detalhar Pokémon, com paginação e favoritos.

## Stack

- Ionic 9 + Angular 22 (standalone components, sem NgModules)
- Signals para estado reativo (o projeto roda em modo *zoneless*, então é o padrão correto pra atualizar a tela)
- RxJS (HttpClient, `forkJoin`/`switchMap`) para consumo da API
- Vitest para testes unitários

## Como rodar

```bash
npm install
ionic serve
```

## Estrutura

```
src/app/
├── core/
│   ├── services/     → PokemonService (consumo da API) e FavoritesService (estado de favoritos)
│   └── icons.ts       → registro dos ícones usados (Ionicons)
├── models/            → tipagem dos dados da PokeAPI
└── pages/
    ├── home/          → listagem paginada
    ├── details/       → detalhes do Pokémon (6+ infos + status base)
    └── favorites/     → lista de favoritos
```

## Funcionalidades

- Listagem com nome, imagem e paginação (anterior/próxima)
- Tela de detalhes: ID, altura, peso, experiência base, tipos, habilidades e status base
- Favoritar/desfavoritar, com persistência em `localStorage`
- Layout responsivo (grid se adapta a retrato/paisagem)
- Injeção de dependência em todos os services (`HttpClient`, `PokemonService`, `FavoritesService`)

## Minha abordagem

Priorizei uma arquitetura simples e direta: services isolados pra regra de negócio, componentes finos só cuidando de tela. Separei `PokemonService` (dados da API) de `FavoritesService` (estado local) porque são responsabilidades diferentes, e isso evita um service faz tudo. Usei signals em vez de propriedades comuns porque o projeto roda zoneless — é o jeito correto de garantir que a tela atualize sozinha quando o dado muda, sem depender de Zone.js. Optei por paginação com offset/limit direto da API em vez de carregar tudo de uma vez, pensando em performance real. Não usei nenhuma lib de state management (NgRx etc.) porque o escopo não justifica essa complexidade — dois services com signals resolvem bem. Escrevi testes unitários cobrindo a lógica de negócio (services), que é onde um bug realmente dói, em vez de testar exaustivamente componentes de tela.

## Diferenciais

- **Documentação**: este README, cobrindo arquitetura, decisões técnicas e como rodar o projeto
- **Webhook**: configurado no repositório para notificar um canal do Discord a cada push
- **Apresentação**: vídeo de demonstração do app (seção abaixo)
- **Testes unitários**: Vitest cobrindo `PokemonService`, `FavoritesService` e criação dos componentes de página

## Apresentação

Vídeo demonstrando as 3 telas (Home, Details, Favoritos), paginação, favoritar/desfavoritar, responsividade (DevTools) e o webhook do Discord notificando um commit em tempo real:

https://github.com/user-attachments/assets/60087086-73f8-4183-b0c5-6197623a6a94