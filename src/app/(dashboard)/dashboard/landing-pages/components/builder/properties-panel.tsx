import { uploadCustomLpAction } from '@/app/(dashboard)/dashboard/landing-pages/actions'
import { LPSection } from '@/components/lp-renderer/SectionRenderer'
import { FeatureItem } from '@/components/lp-renderer/sections/FeaturesSection'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SectionHeader } from '@/components/ui/section-header'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { FormRow } from '@/shared/api-handlers/forms/forms.handler'
import { FileUp, Globe, Layers, Loader2, Search, Target } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { PageSettings } from '../../hooks/use-landing-page-builder'

interface PropertiesPanelProps {
  selectedSection: LPSection | undefined
  pageSettings: PageSettings
  setPageSettings: React.Dispatch<React.SetStateAction<PageSettings>>
  updateSectionData: (key: string, value: unknown) => void
  isPublished: boolean
  isSaving: boolean
  onTogglePublish: () => void
  onSave: () => void
  availableForms: FormRow[]
}

export function PropertiesPanel({
  selectedSection,
  pageSettings,
  setPageSettings,
  updateSectionData,
  isPublished,
  isSaving,
  onTogglePublish,
  onSave,
  availableForms
}: PropertiesPanelProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function handleUploadZip() {
    if (!file || !pageSettings.slug) {
      toast.error('Selecione um arquivo .zip e defina o slug da página.')
      return
    }
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await uploadCustomLpAction(formData, pageSettings.slug)
      if (res.success) {
        toast.success('Custom LP publicada com sucesso a partir do ZIP!')
        setFile(null)
      } else {
        toast.error(res.message || 'Erro no upload do ZIP.')
      }
    } catch (e) {
      console.error(e)
      toast.error('Erro inesperado no upload do arquivo ZIP.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-72 bg-white border-l border-gray-100 flex flex-col z-20 h-full [&_input]:rounded-none [&_textarea]:rounded-none **:[[role=combobox]]:rounded-none">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
              Propriedades
            </span>
          </div>

          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-60 text-white text-[11px] font-bold uppercase tracking-widest px-3 h-7 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            {isSaving ? 'Salvando' : 'Salvar'}
          </button>
        </div>

        {/* Status row */}
        <div className="flex items-center justify-between border border-gray-100 px-3 py-2 bg-gray-50">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Status
            </p>
            <p
              className={cn(
                'text-[11px] font-extrabold uppercase tracking-wide mt-0.5',
                isPublished ? 'text-emerald-600' : 'text-amber-500'
              )}
            >
              {isPublished ? '● Publicada' : '○ Rascunho'}
            </p>
          </div>

          <button
            onClick={onTogglePublish}
            disabled={isSaving}
            className={cn(
              'text-[10px] font-bold uppercase tracking-widest px-3 h-7 border transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer',
              isPublished
                ? 'border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent'
            )}
          >
            {isPublished ? 'Despublicar' : 'Publicar'}
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {selectedSection ? (
          <div className="p-5 space-y-5 animate-in slide-in-from-right-4 duration-300">
            {/* Section type badge */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-[#4F46E5]/8 text-[#4F46E5] text-[9px] font-extrabold uppercase tracking-widest border border-[#4F46E5]/20">
                {selectedSection.type}
              </span>
              <span className="text-[9px] text-gray-300 font-mono truncate">
                {selectedSection.id}
              </span>
            </div>

            {/* HERO */}
            {selectedSection.type === 'hero' && (
              <div className="space-y-4">
                <FieldGroup label="Headline">
                  <Textarea
                    id="headline"
                    value={(selectedSection.data.headline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('headline', e.target.value)
                    }
                    rows={2}
                    className="resize-none text-xs"
                  />
                </FieldGroup>

                <FieldGroup label="Subheadline">
                  <Textarea
                    id="subheadline"
                    value={(selectedSection.data.subheadline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('subheadline', e.target.value)
                    }
                    rows={3}
                    className="resize-none text-xs"
                  />
                </FieldGroup>

                <FieldGroup label="Texto do Botão">
                  <Input
                    id="ctaLabel"
                    value={(selectedSection.data.ctaLabel as string) || ''}
                    onChange={(e) =>
                      updateSectionData('ctaLabel', e.target.value)
                    }
                    className="text-xs"
                  />
                </FieldGroup>

                <FieldGroup label="Link de Destino">
                  <Input
                    id="ctaLink"
                    value={(selectedSection.data.ctaLink as string) || ''}
                    onChange={(e) =>
                      updateSectionData('ctaLink', e.target.value)
                    }
                    placeholder="https://..."
                    className="text-xs"
                  />
                  <p className="text-[10px] text-gray-500 mt-1.5 leading-tight">
                    💡{' '}
                    <span className="font-semibold text-gray-700">Dica:</span>{' '}
                    Use{' '}
                    <span className="font-bold text-[#4F46E5]">#whatsapp</span>{' '}
                    para gerar um link automático para o número do seu perfil.
                  </p>
                </FieldGroup>

                <FieldGroup label="Benefícios (um por linha)">
                  <Textarea
                    id="benefits"
                    value={(
                      (selectedSection.data.benefits as string[]) || []
                    ).join('\n')}
                    onChange={(e) =>
                      updateSectionData('benefits', e.target.value.split('\n'))
                    }
                    rows={4}
                    className="resize-none text-xs"
                    placeholder="Benefício 1&#10;Benefício 2"
                  />
                </FieldGroup>

                <SectionRow>
                  <FieldGroup label="Layout">
                    <SharpSelect
                      value={
                        (selectedSection.data.layout as string) || 'centered'
                      }
                      onValueChange={(v) => updateSectionData('layout', v)}
                      items={[
                        { value: 'centered', label: 'Centralizado' },
                        { value: 'split', label: 'Dividido' }
                      ]}
                    />
                  </FieldGroup>

                  <FieldGroup label="Tema Visual">
                    <SharpSelect
                      value={(selectedSection.data.theme as string) || 'light'}
                      onValueChange={(v) => updateSectionData('theme', v)}
                      items={[
                        { value: 'light', label: 'Claro' },
                        { value: 'dark', label: 'Escuro' }
                      ]}
                    />
                  </FieldGroup>
                </SectionRow>
              </div>
            )}

            {/* FEATURES */}
            {selectedSection.type === 'features' && (
              <div className="space-y-4">
                <FieldGroup label="Headline">
                  <Textarea
                    value={(selectedSection.data.headline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('headline', e.target.value)
                    }
                    rows={2}
                    className="resize-none text-xs"
                  />
                </FieldGroup>

                <FieldGroup label="Subheadline">
                  <Textarea
                    value={(selectedSection.data.subheadline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('subheadline', e.target.value)
                    }
                    rows={2}
                    className="resize-none text-xs"
                  />
                </FieldGroup>

                <SectionRow>
                  <FieldGroup label="Colunas">
                    <SharpSelect
                      value={String(selectedSection.data.columns || 3)}
                      onValueChange={(v) =>
                        updateSectionData('columns', Number(v))
                      }
                      items={[
                        { value: '2', label: '2 Col.' },
                        { value: '3', label: '3 Col.' },
                        { value: '4', label: '4 Col.' }
                      ]}
                    />
                  </FieldGroup>

                  <FieldGroup label="Tema Visual">
                    <SharpSelect
                      value={(selectedSection.data.theme as string) || 'light'}
                      onValueChange={(v) => updateSectionData('theme', v)}
                      items={[
                        { value: 'light', label: 'Claro' },
                        { value: 'dark', label: 'Escuro' },
                        { value: 'gray', label: 'Cinza' }
                      ]}
                    />
                  </FieldGroup>
                </SectionRow>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                    Itens (Features)
                  </p>
                  <div className="space-y-3">
                    {(
                      (selectedSection.data.features as FeatureItem[]) || []
                    ).map((feature, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-100 bg-gray-50/60 p-3 space-y-2"
                      >
                        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                          Item {idx + 1}
                        </span>

                        <SharpSelect
                          value={feature.icon}
                          onValueChange={(val) => {
                            const newFeatures = [
                              ...((selectedSection.data
                                .features as FeatureItem[]) || [])
                            ]
                            newFeatures[idx] = { ...feature, icon: val }
                            updateSectionData('features', newFeatures)
                          }}
                          items={[
                            { value: 'zap', label: 'Raio' },
                            { value: 'chart', label: 'Gráfico' },
                            { value: 'lock', label: 'Cadeado' },
                            { value: 'rocket', label: 'Foguete' },
                            { value: 'globe', label: 'Globo' },
                            { value: 'shield', label: 'Escudo' },
                            { value: 'bot', label: 'Robô' },
                            { value: 'clock', label: 'Relógio' },
                            { value: 'message', label: 'Mensagem' },
                            { value: 'check', label: 'Check' }
                          ]}
                          placeholder="Ícone"
                        />

                        <Input
                          value={feature.title}
                          onChange={(e) => {
                            const nf = [
                              ...((selectedSection.data
                                .features as FeatureItem[]) || [])
                            ]
                            nf[idx] = { ...feature, title: e.target.value }
                            updateSectionData('features', nf)
                          }}
                          placeholder="Título"
                          className="h-7 text-xs"
                        />

                        <Textarea
                          value={feature.description}
                          onChange={(e) => {
                            const nf = [
                              ...((selectedSection.data
                                .features as FeatureItem[]) || [])
                            ]
                            nf[idx] = {
                              ...feature,
                              description: e.target.value
                            }
                            updateSectionData('features', nf)
                          }}
                          className="min-h-[52px] text-xs resize-none"
                          placeholder="Descrição"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BIO */}
            {selectedSection.type === 'bio' && (
              <div className="space-y-4">
                <FieldGroup label="Nome / Título">
                  <Input
                    value={(selectedSection.data.headline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('headline', e.target.value)
                    }
                    className="text-xs"
                  />
                </FieldGroup>

                <FieldGroup label="Subtítulo / Cargo">
                  <Textarea
                    value={(selectedSection.data.subheadline as string) || ''}
                    onChange={(e) =>
                      updateSectionData('subheadline', e.target.value)
                    }
                    rows={2}
                    className="resize-none text-xs"
                  />
                </FieldGroup>

                <FieldGroup label="Biografia (parágrafos separados por linha em branco)">
                  <Textarea
                    value={((selectedSection.data.bio as string[]) || []).join(
                      '\n\n'
                    )}
                    onChange={(e) =>
                      updateSectionData('bio', e.target.value.split('\n\n'))
                    }
                    rows={5}
                    className="resize-none text-xs"
                    placeholder="Parágrafo 1&#10;&#10;Parágrafo 2"
                  />
                </FieldGroup>

                <FieldGroup label="URL da Foto">
                  <Input
                    value={(selectedSection.data.imageSrc as string) || ''}
                    onChange={(e) =>
                      updateSectionData('imageSrc', e.target.value)
                    }
                    className="text-xs"
                  />
                </FieldGroup>

                <SectionRow>
                  <FieldGroup label="Alinhamento">
                    <SharpSelect
                      value={
                        (selectedSection.data.alignment as string) || 'left'
                      }
                      onValueChange={(v) => updateSectionData('alignment', v)}
                      items={[
                        { value: 'left', label: 'Esquerda' },
                        { value: 'right', label: 'Direita' }
                      ]}
                    />
                  </FieldGroup>

                  <FieldGroup label="Tema">
                    <SharpSelect
                      value={(selectedSection.data.theme as string) || 'light'}
                      onValueChange={(v) => updateSectionData('theme', v)}
                      items={[
                        { value: 'light', label: 'Claro' },
                        { value: 'dark', label: 'Escuro' },
                        { value: 'gray', label: 'Cinza' }
                      ]}
                    />
                  </FieldGroup>
                </SectionRow>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Botão (Opcional)
                  </p>
                  <Input
                    value={(selectedSection.data.ctaLabel as string) || ''}
                    onChange={(e) =>
                      updateSectionData('ctaLabel', e.target.value)
                    }
                    placeholder="Texto do botão"
                    className="text-xs"
                  />
                  <Input
                    value={(selectedSection.data.ctaLink as string) || ''}
                    onChange={(e) =>
                      updateSectionData('ctaLink', e.target.value)
                    }
                    placeholder="https://..."
                    className="text-xs"
                  />
                  <p className="text-[10px] text-gray-500 leading-tight">
                    💡{' '}
                    <span className="font-semibold text-gray-700">Dica:</span>{' '}
                    Use{' '}
                    <span className="font-bold text-[#4F46E5]">#whatsapp</span>{' '}
                    para gerar um link automático para o número do seu perfil.
                  </p>
                </div>
              </div>
            )}

            {/* FOOTER */}
            {selectedSection.type === 'footer' && (
              <div className="space-y-4">
                <FieldGroup label="Nome da Empresa / Marca">
                  <Input
                    value={(selectedSection.data.companyName as string) || ''}
                    onChange={(e) =>
                      updateSectionData('companyName', e.target.value)
                    }
                    className="text-xs"
                  />
                </FieldGroup>

                <FieldGroup label="Descrição / Missão">
                  <Textarea
                    value={(selectedSection.data.description as string) || ''}
                    onChange={(e) =>
                      updateSectionData('description', e.target.value)
                    }
                    rows={3}
                    className="resize-none text-xs"
                  />
                </FieldGroup>

                <FieldGroup label="Tema Visual">
                  <SharpSelect
                    value={(selectedSection.data.theme as string) || 'light'}
                    onValueChange={(v) => updateSectionData('theme', v)}
                    items={[
                      { value: 'light', label: 'Claro' },
                      { value: 'dark', label: 'Escuro' },
                      { value: 'gray', label: 'Cinza' }
                    ]}
                  />
                </FieldGroup>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Contato
                  </p>
                  <Input
                    value={(selectedSection.data.email as string) || ''}
                    onChange={(e) => updateSectionData('email', e.target.value)}
                    placeholder="Email"
                    className="text-xs"
                  />
                  <Input
                    value={(selectedSection.data.phone as string) || ''}
                    onChange={(e) => updateSectionData('phone', e.target.value)}
                    placeholder="Telefone / WhatsApp"
                    className="text-xs"
                  />
                  <Input
                    value={(selectedSection.data.address as string) || ''}
                    onChange={(e) =>
                      updateSectionData('address', e.target.value)
                    }
                    placeholder="Endereço (opcional)"
                    className="text-xs"
                  />
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Redes Sociais
                  </p>
                  <Input
                    value={(selectedSection.data.instagram as string) || ''}
                    onChange={(e) =>
                      updateSectionData('instagram', e.target.value)
                    }
                    placeholder="Instagram URL"
                    className="text-xs"
                  />
                  <Input
                    value={(selectedSection.data.linkedin as string) || ''}
                    onChange={(e) =>
                      updateSectionData('linkedin', e.target.value)
                    }
                    placeholder="LinkedIn URL"
                    className="text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* PAGE SETTINGS */
          <div className="p-5 space-y-5 animate-in slide-in-from-right-4 duration-300">
            <div className="space-y-3">
              <SectionHeader
                icon={<Globe className="w-3 h-3" />}
                label="Página"
              />
              <FieldGroup label="Título da Página">
                <Input
                  id="pageTitle"
                  value={pageSettings.title}
                  onChange={(e) =>
                    setPageSettings((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Ex: Minha Landing Page"
                  className="text-xs"
                />
              </FieldGroup>

              <FieldGroup label="URL (Slug)">
                <div className="flex items-stretch border border-input">
                  <span className="px-2.5 flex items-center text-[11px] text-gray-400 bg-gray-50 border-r border-input font-mono shrink-0">
                    /lp/
                  </span>
                  <input
                    id="pageSlug"
                    value={pageSettings.slug}
                    onChange={(e) =>
                      setPageSettings((p) => ({ ...p, slug: e.target.value }))
                    }
                    placeholder="meu-slug"
                    className="flex-1 px-2.5 py-1.5 text-xs bg-transparent outline-none placeholder:text-gray-300"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Apenas minúsculas, números e hífens.
                </p>
              </FieldGroup>
            </div>

            <div className="space-y-3">
              <SectionHeader
                icon={<Search className="w-3 h-3" />}
                label="SEO &amp; Metadados"
              />
              <FieldGroup label="Título SEO">
                <Input
                  id="metaTitle"
                  value={pageSettings.metaTitle || ''}
                  onChange={(e) =>
                    setPageSettings((p) => ({
                      ...p,
                      metaTitle: e.target.value
                    }))
                  }
                  placeholder="Título que aparece no Google"
                  className="text-xs"
                />
              </FieldGroup>

              <FieldGroup label="Descrição SEO">
                <Textarea
                  id="metaDescription"
                  value={pageSettings.metaDescription || ''}
                  onChange={(e) =>
                    setPageSettings((p) => ({
                      ...p,
                      metaDescription: e.target.value
                    }))
                  }
                  rows={3}
                  placeholder="Breve resumo para buscadores..."
                  className="resize-none text-xs"
                />
              </FieldGroup>
            </div>

            <div className="space-y-3">
              <SectionHeader
                icon={<Target className="w-3 h-3" />}
                label="Captação de Leads"
              />
              <FieldGroup label="Formulário de Destino Principal">
                <Select
                  value={pageSettings.formId || 'none'}
                  onValueChange={(val) =>
                    setPageSettings((p) => ({
                      ...p,
                      formId: val === 'none' ? undefined : val
                    }))
                  }
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Nenhum (Botão padrão)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum (Botão padrão)</SelectItem>
                    {availableForms.map((form) => (
                      <SelectItem key={form.id} value={form.id}>
                        {form.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-gray-400 mt-1">
                  Exibido diretamente na Hero Section (Opção A).
                </p>
              </FieldGroup>

              <FieldGroup label="Formulário do WhatsApp">
                <Select
                  value={pageSettings.whatsappFormId || 'none'}
                  onValueChange={(val) =>
                    setPageSettings((p) => ({
                      ...p,
                      whatsappFormId: val === 'none' ? undefined : val
                    }))
                  }
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Nenhum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {availableForms.map((form) => (
                      <SelectItem key={`wa-${form.id}`} value={form.id}>
                        {form.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-gray-400 mt-1">
                  Exibido no modal ao clicar no botão de WhatsApp (Opção B).
                </p>
              </FieldGroup>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <SectionHeader
                icon={<FileUp className="w-3 h-3 text-purple-500" />}
                label="Custom LP (Avançado)"
              />
              <div className="space-y-2">
                <p className="text-[10px] text-gray-500">
                  Sobrescreve o construtor visual. Faça upload do arquivo{' '}
                  <b>.zip</b> exportado contendo o <code>index.html</code> e os
                  assets da sua Custom LP.
                </p>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept=".zip"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="text-[10px] bg-gray-50 cursor-pointer h-8 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[10px] file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                  <button
                    onClick={handleUploadZip}
                    disabled={isUploading || !file || !pageSettings.slug}
                    className="flex w-full items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-[10px] font-bold uppercase tracking-widest h-8 transition-colors duration-200"
                  >
                    {isUploading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <FileUp className="w-3 h-3" />
                    )}
                    {isUploading ? 'Fazendo Upload...' : 'Fazer Upload HTML'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FieldGroup({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
        {label}
      </Label>
      {children}
    </div>
  )
}

function SectionRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>
}

function SharpSelect({
  value,
  onValueChange,
  items,
  placeholder
}: {
  value: string
  onValueChange: (v: string) => void
  items: { value: string; label: string }[]
  placeholder?: string
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="text-xs h-8 rounded-none">
        <SelectValue placeholder={placeholder ?? 'Selecione...'} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
