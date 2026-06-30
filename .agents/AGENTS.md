# AGENTS.md

## Missão

Você é o agente responsável por evoluir o projeto **Nero Study**.

Seu objetivo é produzir código limpo, consistente, reutilizável e
escalável, preservando a arquitetura existente e reduzindo complexidade.

------------------------------------------------------------------------

# Filosofia

-   Priorize simplicidade.
-   Faça alterações pequenas.
-   Preserve regras de negócio.
-   Evite retrabalho.
-   Antes de criar algo novo, procure reutilizar componentes existentes.

------------------------------------------------------------------------

# Inspirações

-   Notion
-   Linear
-   Obsidian
-   Raycast

Evite aparência de ERP tradicional.

------------------------------------------------------------------------

# Arquitetura

-   Next.js App Router
-   TypeScript Strict
-   Tailwind CSS
-   shadcn/ui
-   Lucide Icons

Estrutura:

    app/
    components/
      ui/
      layout/
      dashboard/
      study/
      finance/
      habits/
      shared/
    hooks/
    lib/
    services/
    types/

------------------------------------------------------------------------

# Componentes

Regras:

-   Máximo 250 linhas.
-   Uma responsabilidade por componente.
-   Preferir composição.
-   Nunca duplicar código.

------------------------------------------------------------------------

# Server Components

Sempre utilizar Server Components.

Somente utilizar "use client" quando houver:

-   estado
-   eventos
-   browser APIs
-   animações

------------------------------------------------------------------------

# UI

Visual premium.

Utilizar:

-   rounded-xl
-   border-zinc-800
-   shadow-sm
-   spacing generoso
-   animações discretas

Evitar:

-   gradientes exagerados
-   excesso de cores
-   excesso de informações
-   cards pequenos

------------------------------------------------------------------------

# Dashboard

Mostrar apenas informações essenciais.

Prioridade:

-   Continuar estudando
-   XP
-   Sequência
-   Tempo
-   Metas
-   Últimas sessões

------------------------------------------------------------------------

# Commits

Sempre pequenos.

Exemplo:

feat(layout): sidebar

refactor(ui): card

fix(study): timer

------------------------------------------------------------------------

# Refatoração

Nunca misturar:

-   layout
-   regra de negócio
-   banco
-   API

Cada PR deve possuir apenas um objetivo.

------------------------------------------------------------------------

# Redução do consumo de tokens

## Sempre

-   Leia apenas os arquivos necessários.
-   Nunca analise o projeto inteiro sem solicitação.
-   Evite reescrever arquivos completos.
-   Gere apenas diffs quando possível.
-   Modifique somente os trechos necessários.

## Antes de codificar

1.  Explique em até 5 linhas o plano.
2.  Liste os arquivos que serão alterados.
3.  Aguarde confirmação se a mudança for grande.

## Durante a implementação

-   Não explique conceitos.
-   Não descreva código linha a linha.
-   Responda de forma objetiva.
-   Evite repetir contexto já conhecido.

## Grandes tarefas

Dividir em etapas:

1.  Planejamento
2.  Estrutura
3.  Componentes
4.  Integração
5.  Refino

Concluir uma etapa antes da próxima.

## Geração de código

Preferir:

-   snippets
-   patches
-   funções isoladas

Evitar gerar arquivos completos quando apenas uma função mudou.

## Contexto

Assuma que:

-   a arquitetura já foi apresentada;
-   os padrões já são conhecidos;
-   não repita documentação.

------------------------------------------------------------------------

# Qualidade

Antes de finalizar verificar:

-   TypeScript
-   ESLint
-   Imports
-   Componentes não utilizados
-   Responsividade
-   Acessibilidade

------------------------------------------------------------------------

# Nunca

-   alterar regras de negócio sem autorização;
-   remover funcionalidades;
-   criar dependências desnecessárias;
-   utilizar any sem justificativa;
-   criar componentes gigantes;
-   duplicar lógica.
