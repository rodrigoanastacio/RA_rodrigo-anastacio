# Integração: Inteligência e Branding do Negócio - PRD

## Declaração do Problema

O sistema agora possui campos estratégicos de Identidade (`business_name`, `business_slogan`, `whatsapp_number`) e BI (`average_ticket`) nas configurações (`Settings`), mas essas informações estão atualmente estáticas. O gap que estamos resolvendo é a falta de conexão entre esses dados e as funcionalidades de valor core da plataforma (Landing Pages e Analytics).

A automação desses campos reduz o tempo de configuração das páginas (Branding) e transforma uma base de leads em uma projeção financeira de ROI (Intelligence).

## Público-Alvo

- Negócios Digitais e Profissionais Liberais (ex: Advogados) que precisam de uma marca profissional e visibilidade de faturamento sem lidar com complexidade técnica.

## User Stories

1. **Como** Usuário, **eu quero** que meu Ticket Médio seja usado para calcular o valor potencial do meu funil, **para que** eu tenha clareza de quanto dinheiro está "em jogo" nas minhas negociações. (Prioridade: P0 - MUST)
2. **Como** Usuário, **eu quero** que minhas Landing Pages herdem automaticamente meu Nome do Negócio e Slogan, **para que** minha marca seja consistente em todos os pontos de contato sem retrabalho. (Prioridade: P0 - MUST)
3. **Como** Usuário, **eu quero** que os botões de CTA nas minhas Landing Pages direcionem para meu WhatsApp configurado, **para que** eu centralize o atendimento no canal correto. (Prioridade: P0 - MUST)
4. **Como** Usuário, **eu quero** ver métricas de "Previsão de Receita" no dashboard baseadas na minha taxa de conversão histórica e ticket médio, **para que** eu possa planejar meus investimentos. (Prioridade: P1 - SHOULD)

## Critérios de Aceite (Acceptance Criteria)

### A. Dashboard BI

- [x] **Dado que** eu tenha um Ticket Médio definido em Settings, **Quando** eu acessar o Dashboard, **Então** o sistema deve exibir um card "Valor do Funil" (Soma de todos os Leads \* Ticket Médio).
- [x] **Dado que** eu filtre os leads por status, **Quando** eu visualizar a métrica de valor, **Então** ela deve se ajustar ao filtro atual (Ex: Valor em Negociação).

### B. Automação de Landing Pages

- [x] **Dado que** eu utilize um template de LP, **Quando** eu abrir a página, **Então** o Footer e o Header devem exibir o `Nome do Negócio` configurado no Perfil.
- [x] **Dado que** a LP tenha um botão de contato, **Quando** clicado pelo lead, **Então** ele deve abrir uma conversa com o `whatsapp_number` oficial do dono do projeto.

## Status: COMPLETED 🚀

As funcionalidades descritas neste PRD foram totalmente implementadas e validadas através das tasks:

- `task-dashboard-roi.md`
- `task-lp-branding-automation.md`

## Resumo Estratégico para o PO (Handoff)

1. **Business Value**: Transforma informações brutas em insights financeiros. O cliente não vê apenas "leads", ele vê "R$ potencial". Isso reduz o Churn.
2. **Happy Path**:
   - Usuário define Ticket Médio e WhatsApp em Settings.
   - Imediatamente o Dashboard reflete o valor financeiro do pipeline atual.
   - Qualquer nova LP publicada já sai "com a cara dele" (branding) e links configurados.
3. **Frontend Notes**:
   - Utilizar o componente `<StatCard>` para as novas métricas de Valor (BRL).
   - Injetar dados do perfil no `LpRenderer`.
4. **Backend Notes**:
   - Criar agregação de dados no Supabase para retornar o Valor Total Projetado.
   - Garantir que as Server Actions de salvamento de Perfil invalidem os caches de todas as telas que consomem esses dados (Dashboard e LPs).
5. **Edge Cases**:
   - Falta de Ticket Médio: Exibir "Configure seu ticket médio em configurações para ver projeções".
   - WhatsApp sem DDI: Tratar via helper de máscara se possível ou validar no input.
