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

src/
├── crop/ # Módulo de culturas
├── property/ # Módulo de propriedades
├── producer/ # Módulo de produtores
├── common/ # Filtros, interceptors e utilidades
├── infra/ # Conexões com banco de dados
└── main.ts # Arquivo principal da aplicação

bash
Copiar
Editar

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

# Suba a infraestrutura com Docker
docker-compose up -d

# Instale as dependências
yarn install

# Rode a aplicação localmente
yarn start:dev

# Rode os testes
yarn test
📌 Funcionalidades
✅ Cadastro e listagem de produtores rurais (CPF ou CNPJ)

✅ Cadastro e controle de propriedades

✅ Validação de áreas: total, agrícola e vegetação

✅ Cadastro de culturas vinculadas às propriedades

✅ Geração de métricas e indicadores rurais

📚 Exemplos de Uso
Criar Produtor
http
Copiar
Editar
POST /producers
{
  "name": "José da Silva",
  "cpfCnpj": "12345678901"
}
Criar Propriedade
http
Copiar
Editar
POST /properties
{
  "name": "Fazenda Bela Vista",
  "totalArea": 100,
  "agriculturalArea": 70,
  "vegetationArea": 20,
  "producerId": "uuid-do-produtor"
}
Criar Cultura
http
Copiar
Editar
POST /crops
{
  "name": "Milho",
  "season": "2023/2024",
  "propertyId": "uuid-da-propriedade"
}
📈 Métricas
🔢 Total de produtores

🌱 Total de propriedades

📊 Soma das áreas (total, agrícola e vegetação)

🌾 Número de culturas por propriedade

🧪 Testes
Os testes são escritos com Jest e cobrem as principais operações da aplicação