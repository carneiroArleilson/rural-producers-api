# 🌾 Rural Management API

API para gestão de propriedades rurais com cadastro de produtores, propriedades e culturas (safras), além de geração de métricas de área.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **NestJS** — Framework para aplicações escaláveis
- **TypeORM** — ORM para integração com banco de dados
- **PostgreSQL** — Banco de dados relacional
- **Docker** — Contêinerização da aplicação
- **Jest** — Testes automatizados

## 📁 Estrutura de Pastas
```bash
src/
├── crop/ # Módulo de culturas
├── property/ # Módulo de propriedades
├── producer/ # Módulo de produtores
├── common/ # Filtros, interceptors e utilidades
├── infra/ # Conexões com banco de dados
└── main.ts # Arquivo principal da aplicação
```

## 🔧 Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Comandos

```bash
# Clone o repositório
git clone https://github.com/carneiroArleilson/rural-producers-api.git
cd rural-producers-api
cp .example.env .env

# Suba a infraestrutura com Docker
docker-compose up -d

# Instale as dependências
yarn install

# Rode a aplicação localmente
yarn start:dev

# Rode os testes
yarn test
```