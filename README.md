# LangAssist AI

Aplicação fullstack para tradução inteligente de palavras e frases entre Português, Inglês e Espanhol, utilizando a API do Google Translate.

## Funcionalidades

- Tradução de palavras entre os três idiomas
- Geração de frases de exemplo em cada idioma
- Tradução das frases geradas
- Interface web moderna e responsiva

## Tecnologias

- **Backend:** Node.js + Express
- **Frontend:** React.js
- **API de Tradução:** Google Cloud Translate

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no Google Cloud com a API do Translate habilitada
- Arquivo de credenciais JSON da conta de serviço

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/LangAssistAI.git
   cd LangAssistAI
   ```

2. Instale as dependências do backend:
   ```bash
   npm install
   ```

3. Instale as dependências do frontend:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. Crie o arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   GOOGLE_PROJECT_ID=seu-project-id
   GOOGLE_APPLICATION_CREDENTIALS=./credentials/seu-arquivo.json
   ```

5. Coloque o arquivo JSON da conta de serviço na pasta `credentials`.

6. Inicie o backend:
   ```bash
   npm start
   ```

7. Inicie o frontend:
   ```bash
   cd frontend
   npm start
   ```

8. Acesse o frontend em [http://localhost:3001](http://localhost:3001)

## Deploy no Render

- Crie dois serviços: um para o backend (Node) e outro para o frontend (React).
- Configure as variáveis de ambiente no painel do Render.
- Não suba o arquivo de credenciais JSON para o GitHub! Adicione manualmente no Render.

## Licença

MIT

---

**Observação:**  
Nunca suba o arquivo de credenciais do Google para o repositório público. 