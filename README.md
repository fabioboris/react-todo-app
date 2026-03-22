# Lista de Tarefas (To-Do List) - Modern React & TypeScript

Este é um projeto de estudo avançado criado para reciclagem de conhecimentos em frontend, evoluindo de uma estrutura simples para uma arquitetura profissional e escalável utilizando as ferramentas mais modernas do ecossistema React em 2026.

## 🚀 Tecnologias Utilizadas

- **React 19**: Versão mais recente, focada em performance e hooks nativos.
- **TypeScript**: Tipagem estática rigorosa para máxima segurança e previsibilidade.
- **Vite**: Ferramenta de build ultra-rápida.
- **Tailwind CSS v4**: Estilização utilitária moderna com configuração via CSS.
- **Shadcn UI & Radix UI**: Base de componentes acessíveis e estilizados.
- **Framer Motion**: Animações fluidas de layout e interações de estado.
- **Zod**: Validação de esquema para integridade total dos dados (runtime type checking).
- **Supabase (BaaS)**: Persistência remota, sincronização e autenticação (Magic Link).
- **clsx & tailwind-merge**: Gestão inteligente e dinâmica de classes CSS.
- **LocalStorage API**: Persistência de dados local automática e robusta.

## ✨ Funcionalidades Implementadas

- **Arquitetura de Componentes**: UI modularizada, desacoplada e reutilizável.
- **Edição Inline Dinâmica**: Edição rápida de tarefas com foco automático e suporte a atalhos (`Enter` para salvar, `Esc` para cancelar).
- **Autenticação Magic Link**: Login seguro e sem senha via e-mail, utilizando Supabase Auth.
- **Filtros Avançados**: Navegação inteligente entre Todas, Pendentes e Concluídas com contagem em tempo real.
- **Ações em Lote**: Funcionalidade de "Limpar tarefas concluídas" para facilitar a organização.
- **Validação de Dados com Zod**: Regras de negócio validadas rigorosamente tanto na criação quanto na edição.
- **Acessibilidade (a11y)**: HTML semântico, Aria labels e navegação completa via teclado.
- **Empty States**: Feedback visual amigável e contextual para listas vazias.
- **Animações Premium**: Transições suaves de layout ao adicionar, remover ou filtrar itens usando `AnimatePresence`.
- **Sincronização Remota (Supabase)**: Persistência em nuvem com arquitetura BaaS e segurança via Row Level Security (RLS).
- **Persistência Síncrona**: Sincronização automática com o `localStorage` para garantir que seus dados não sejam perdidos, mesmo offline.

## 📁 Estrutura do Projeto

O projeto segue uma organização modular voltada para manutenção e escalabilidade:

```text
src/
  components/       # Componentes de UI (UI base via Shadcn, Header, TaskInput, etc.)
  constants/        # Constantes globais, chaves de storage e labels
  hooks/            # Lógica de negócio e estado isolada (useTodos, useAuth)
  types/            # Definições de tipos TypeScript e esquemas de validação Zod
  lib/              # Utilitários e instâncias de clientes (ex: supabase.ts)
  App.tsx           # Orquestrador (Maestro) da aplicação
  index.css         # Configuração global do Tailwind v4
database/
  migrations/       # Scripts SQL para configuração do banco de dados remotos
```

## 💡 Conceitos Aplicados

- **Single Responsibility Principle (SRP)**: Cada componente e hook tem uma única responsabilidade clara.
- **Custom Hooks**: Toda a lógica de negócio está 100% isolada da interface.
- **Type-Safe Development**: Uso extensivo de TypeScript e Zod para eliminar erros comuns em tempo de desenvolvimento.
- **Verbatim Module Syntax**: Configuração rigorosa de imports de tipos para builds mais limpos e seguros.
- **Backend as a Service (BaaS)**: Uso de Supabase para delegar a infraestrutura de backend e banco de dados, mantendo a segurança via RLS (Row Level Security).
- **Offline-First / Sync**: Lógica de sincronização que prioriza a UI instantânea (localStorage) e sincroniza em background com o banco remoto.
- **Optimistic UI com Rollback**: Atualização imediata da interface com reversão automática em caso de falha na sincronização remota.
- **Fast Refresh Optimization**: Separação estratégica de constantes e componentes para máxima performance no desenvolvimento com Vite.

## 🛠️ Como rodar o projeto

### 1. Instalação
```bash
npm install
```

### 2. Configuração do Supabase
1. Crie um projeto no [Supabase](https://supabase.com/).
2. Execute o script SQL em `database/migrations/20260322_create_todos_table.sql` no Editor SQL do Supabase.
3. Crie um arquivo `.env.local` na raiz do projeto baseado no `.env.example`:
   ```env
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima
   ```
4. Certifique-se de que o **Magic Link** está habilitado em *Authentication > Providers > Email*.

### 3. Execução
```bash
npm run dev
```
Acesse no navegador: `http://localhost:5173/`

### 4. Build de Produção
```bash
npm run build
```
