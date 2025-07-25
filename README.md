# SGAA - UFC Sobral Activities

![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)

---

## 📋 Sobre o Projeto

Este é um sistema moderno para o gerenciamento de atividades acadêmicas no campus da UFC em Sobral. Desenvolvido para oferecer uma interface intuitiva e responsiva para professores, administradores e alunos, o projeto utiliza as mais recentes tecnologias web para proporcionar uma experiência de usuário fluida e agradável. A plataforma permite a criação, visualização, edição e exclusão de atividades acadêmicas, como cursos, workshops e seminários, além de contar com recursos de busca, filtros avançados e funcionalidades de acessibilidade.

---

## ✨ Funcionalidades

O sistema oferece uma gama completa de funcionalidades para o gerenciamento de atividades acadêmicas:

* **Gerenciamento de Atividades:**
    * Criação de novas atividades com formulário detalhado.
    * Edição de informações de atividades existentes.
    * Exclusão de atividades com diálogo de confirmação.
    * Listagem de atividades em formato de grade ou lista.
    * Página de detalhes para cada atividade.
* **Busca e Filtragem:**
    * Sistema de busca em tempo real por título, descrição, coordenador ou tags.
    * Filtros por tipo e status da atividade, além de período (data de início e fim).
* **Interface e Experiência do Usuário:**
    * **Tema Claro/Escuro:** Alternância de tema para melhor conforto visual.
    * **Design Responsivo:** Interface adaptável para diferentes tamanhos de tela (desktops, tablets e smartphones).
    * **Performance Otimizada:** Utilização do Next.js para renderização rápida e eficiente.
* **Acessibilidade:**
    * Controles para ajuste de tamanho da fonte.
    * Opções de contraste (normal, alto contraste e cores invertidas).
    * Fonte amigável para dislexia.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* **Frontend:**
    * [Next.js](https://nextjs.org/) (v15.1.7)
    * [React](https://reactjs.org/) (v19.0.0)
    * [Tailwind CSS](https://tailwindcss.com/) (v3.4.1)

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

* Node.js (versão 18 ou superior)
* npm ou yarn

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Roberto10Andrade/ufc-sobral-activities.git
    ```

2.  **Acesse a pasta do projeto:**
      ```bash
    cd ufc-sobral-activities
    ```

3.  **Instale as dependências:**
    ```bash
    npm install --force
    ```

4.  **Execute o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000).

### Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Compila o projeto para produção.
* `npm run start`: Inicia o servidor de produção após o build.
* `npm run lint`: Executa o linter para análise de código.

---

## 📂 Estrutura do Projeto

O projeto segue a estrutura de diretórios do App Router do Next.js:

```
/
├── .github/              # Configurações de CI/CD com GitHub Actions
├── app/                  # Diretório principal da aplicação
│   ├── api/              # Rotas de API (ex: autenticação)
│   ├── components/       # Componentes React reutilizáveis
│   ├── data/             # Dados mockados e funções de manipulação
│   ├── (pages)/          # Diretórios de rotas da aplicação
│   │   ├── atividades/
│   │   └── dashboard/
│   ├── globals.css       # Estilos globais
│   └── layout.tsx        # Layout principal da aplicação
├── public/               # Arquivos estáticos (imagens, fontes)
├── .eslintrc.json        # Configurações do ESLint
├── next.config.js        # Configurações do Next.js
├── package.json          # Dependências e scripts do projeto
├── postcss.config.mjs    # Configurações do PostCSS
├── tailwind.config.js    # Configurações do Tailwind CSS
└── tsconfig.json         # Configurações do TypeScript
```

---

## ♿ Acessibilidade

O projeto inclui um menu de acessibilidade que permite aos usuários:

* **Ajustar o tamanho da fonte:** Normal, Grande e Maior.
* **Alterar o contraste:** Normal, Alto Contraste e Cores Invertidas.
* **Ativar uma fonte para dislexia:** Para facilitar a leitura.

Essas configurações são salvas no `localStorage` para persistir entre as sessões.

---

## 🔄 CI/CD

O projeto está configurado com um pipeline de integração contínua (CI) utilizando **GitHub Actions**. O workflow, definido em `.github/workflows/ci.yml`, é acionado a cada `push` ou `pull request` e executa as seguintes etapas:

1.  Verificação do código.
2.  Configuração do ambiente Node.js.
3.  Instalação de dependências.
4.  Execução de testes.

---

## ⚙️ Itens de Configuração

Os principais arquivos de configuração do projeto estão detalhados no arquivo `CONFIGURATION_ITEMS.md` e incluem:

* `package.json`: Gerencia dependências, scripts e metadados.
* `tsconfig.json`: Define as configurações do compilador TypeScript.
* `next.config.js`: Configurações específicas do Next.js.
* `tailwind.config.js`: Personalização do Tailwind CSS.
