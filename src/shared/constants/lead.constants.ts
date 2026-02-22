export enum AtuacaoType {
  AUTONOMO = 'autonomo',
  SOCIO = 'socio',
  ASSOCIADO = 'associado',
  DEPT_JURIDICO = 'dept_juridico'
}

export const ATUACAO_LABELS: Record<AtuacaoType, string> = {
  [AtuacaoType.AUTONOMO]: 'Profissional Autônomo',
  [AtuacaoType.SOCIO]: 'Sócio Gestor',
  [AtuacaoType.ASSOCIADO]: 'Colaborador / Associado',
  [AtuacaoType.DEPT_JURIDICO]: 'Líder de Departamento'
}

export const ATUACAO_OPTIONS = [
  {
    value: AtuacaoType.AUTONOMO,
    label: ATUACAO_LABELS[AtuacaoType.AUTONOMO],
    description: 'Atua sozinho, sem sócios ou equipe fixa.'
  },
  {
    value: AtuacaoType.SOCIO,
    label: ATUACAO_LABELS[AtuacaoType.SOCIO],
    description: 'Participação societária em negócio ou operação.'
  },
  {
    value: AtuacaoType.ASSOCIADO,
    label: ATUACAO_LABELS[AtuacaoType.ASSOCIADO],
    description: 'Trabalha na operação sem participação societária.'
  },
  {
    value: AtuacaoType.DEPT_JURIDICO,
    label: ATUACAO_LABELS[AtuacaoType.DEPT_JURIDICO],
    description: 'Atua internamente em empresas ou corporativo.'
  }
]

export function formatAtuacao(atuacao: string): string {
  return ATUACAO_LABELS[atuacao as AtuacaoType] || atuacao
}

export enum RevenueType {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export const REVENUE_LABELS: Record<RevenueType, string> = {
  [RevenueType.LOW]: 'Até R$ 20 mil',
  [RevenueType.MEDIUM]: 'R$ 20 mil - R$ 40 mil',
  [RevenueType.HIGH]: 'Acima de R$ 40 mil'
}

export const REVENUE_OPTIONS = [
  {
    value: RevenueType.LOW,
    label: 'Até R$ 20.000,00',
    description: 'Negócio em fase inicial ou reestruturação.'
  },
  {
    value: RevenueType.MEDIUM,
    label: 'De R$ 20.000,00 a R$ 40.000,00',
    description: 'Operação em crescimento/expansão.'
  },
  {
    value: RevenueType.HIGH,
    label: 'Acima de R$ 40.000,00',
    description: 'Negócio consolidado.'
  }
]

export function formatRevenue(revenue: string): string {
  return REVENUE_LABELS[revenue as RevenueType] || revenue
}

import { LeadStatus } from '@/shared/enums/LeadStatus'
export { LeadStatus as LeadStatusType }

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  [LeadStatus.NOVO_LEAD]: 'NOVO LEAD',
  [LeadStatus.ANALISAR_LEAD]: 'ANALISAR LEAD',
  [LeadStatus.EM_CONTATO]: 'EM CONTATO',
  [LeadStatus.QUALIFICADO]: 'QUALIFICADO',
  [LeadStatus.AGENDADO]: 'EM REUNIÃO',
  [LeadStatus.NEGOCIACAO]: 'EM NEGOCIAÇÃO',
  [LeadStatus.PROPOSTA]: 'PROPOSTA',
  [LeadStatus.WON]: 'GANHO',
  [LeadStatus.LOST]: 'PERDIDO',
  [LeadStatus.ARCHIVED]: 'ARQUIVADO'
}

export const LEAD_STATUS_STYLES: Record<LeadStatus, string> = {
  [LeadStatus.NOVO_LEAD]: 'bg-cyan-100 text-cyan-600',
  [LeadStatus.ANALISAR_LEAD]: 'bg-amber-100 text-amber-700',
  [LeadStatus.EM_CONTATO]: 'bg-indigo-100 text-indigo-600',
  [LeadStatus.QUALIFICADO]: 'bg-purple-100 text-purple-600',
  [LeadStatus.AGENDADO]: 'bg-orange-100 text-orange-600',
  [LeadStatus.NEGOCIACAO]: 'bg-yellow-100 text-yellow-600',
  [LeadStatus.PROPOSTA]: 'bg-cyan-100 text-cyan-600',
  [LeadStatus.WON]: 'bg-emerald-100 text-emerald-600',
  [LeadStatus.LOST]: 'bg-red-100 text-red-600',
  [LeadStatus.ARCHIVED]: 'bg-gray-100 text-gray-600'
}

export function formatLeadStatus(status: string): string {
  const statusEnum = Object.values(LeadStatus).includes(status as LeadStatus)
    ? (status as LeadStatus)
    : undefined

  return statusEnum
    ? LEAD_STATUS_LABELS[statusEnum]
    : status
      ? status.toUpperCase()
      : 'SEM STATUS'
}

export function getLeadStatusStyle(status: string): string {
  const statusEnum = Object.values(LeadStatus).includes(status as LeadStatus)
    ? (status as LeadStatus)
    : undefined

  return statusEnum
    ? LEAD_STATUS_STYLES[statusEnum]
    : 'bg-gray-100 text-gray-700'
}

export const EXPERIENCE_OPTIONS = [
  { value: 'less_1', label: 'Menos de 1 ano' },
  { value: '1_3', label: '1 a 3 anos' },
  { value: '3_5', label: '3 a 5 anos' },
  { value: 'more_5', label: 'Mais de 5 anos' }
]

export function formatExperience(experience: string): string {
  const option = EXPERIENCE_OPTIONS.find((opt) => opt.value === experience)
  return option ? option.label : experience
}

export const TEAM_STRUCTURE_OPTIONS = [
  {
    value: 'clt_associados',
    label: 'Sim, tenho funcionários CLT/Parceiros',
    description: 'Operação com equipe fixa e estrutura formal'
  },
  {
    value: 'solo',
    label: 'Não, atuo sozinho',
    description: 'Profissional autônomo ou em parceria pontual'
  },
  {
    value: 'estagiarios',
    label: 'Tenho apenas estagiários/apoio',
    description: 'Estrutura enxuta com apoio auxiliar'
  }
]

export function formatTeamStructure(structure: string): string {
  const option = TEAM_STRUCTURE_OPTIONS.find((opt) => opt.value === structure)
  return option ? option.label : structure
}

export const MANAGEMENT_LEVEL_OPTIONS = [
  {
    value: 'precaria',
    label: 'Precária / Inexistente',
    description: 'Não há controle de processos ou fluxo de caixa organizado.',
    icon: 'warning'
  },
  {
    value: 'basica',
    label: 'Básica (Financeiro)',
    description: 'Controle mínimo de contas a pagar e receber, sem estratégia.',
    icon: 'attach_money'
  },
  {
    value: 'desenvolvimento',
    label: 'Em desenvolvimento',
    description:
      'Existem processos definidos mas não documentados ou seguidos.',
    icon: 'trending_up'
  }
]

export function formatManagementLevel(level: string): string {
  const option = MANAGEMENT_LEVEL_OPTIONS.find((opt) => opt.value === level)
  return option ? option.label : level
}
