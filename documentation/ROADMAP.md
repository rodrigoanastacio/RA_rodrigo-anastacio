# 🗺️ Roadmap de Evolução - Projeto Dayane Anastácio

Este documento serve como o **backlog estratégico** do sistema. Aqui registramos ideias, melhorias e novas funcionalidades planejadas para as próximas fases do projeto.

---

## 📊 Módulo: Inteligência & Analytics

- [ ] **Definição de Conversão Inteligente**: Implementar lógica para marcar leads como "Convertido" baseado em ações específicas.
- [ ] **Configuração de ROI**: Tela para definir "Ticket Médio" e cálculo automático de ROI. (Concluído: Campo em Settings)
- [x] **Projeção de Faturamento no Dashboard**: Usar o Ticket Médio para exibir o valor financeiro do funil de leads. (Concluído)
- [ ] **Dashboard de Conversão**: Calcular taxa de conversão baseada em leads marcados como fechados vs. total de leads.
- [ ] **Tendências Temporais**: Gráficos comparativos (Mês Atual vs. Anterior).
- [ ] **Mapa de Calor Geográfico**: Visualização de demanda por Cidade/Estado.

---

## 🤝 Módulo: Gestão de Equipe

- [ ] **Sistema de Convites por E-mail**: Automação de envio de convites com link de ativação.
- [ ] **Log de Atividades (Audit Trail)**: Registro de alterações de status e notas.
- [ ] **Upload de Avatar Customizado**: Integração com Supabase Storage para fotos de perfil.

---

## 🚀 Próximas Implementações Técnicas

- [ ] **Auto-limpeza de Notificações**: Script para deletar notificações lidas com mais de 7 dias.
- [ ] **Integração Push Notifications**: Notificações via Web Push / Mobile.
- [ ] **Exportação de Relatórios**: Geração de PDFs e Planilhas dos leads.
- [x] **Automação de Branding em Landing Pages**: Herdar Nome do Negócio e Slogan do Perfil automaticamente nos templates. (Concluído no Footer)
- [ ] **Segurança Anti-Spam (API Pública)**: Implementar Rate Limiting ou reCAPTCHA / Cloudflare Turnstile na rota `/api/leads` e afins para proteção de Bypass RLS contra injeção de robôs.
- [ ] **Mapeamento Explícito de Form Fields (`systemAlias`)**: Atualizar o `useFormSchemaEditor` para injetar metadados como `"systemAlias": "nome" | "email" | "whatsapp"` nos schemas ao invés de depender de inferência por `type='text'` ou match na string `label`. Isso evitará falhas na rota `/api/leads` caso o tenant decida nomear o campo `nome` como "Como podemos te chamar?".
- [ ] **WhatsApp Global Redirect**: Configurar botões de CTA das LPs para usar o WhatsApp definido em Settings.
- [ ] **Automação de WhatsApp**: Templates pré-definidos para disparos rápidos.

---

> [!TIP]
> Itens concluídos (como Kanban e Realtime básico) foram removidos para manter o foco no futuro.
