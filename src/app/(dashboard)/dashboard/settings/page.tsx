'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { BrandingSection } from './components/BrandingSection'
import { ProfileSection } from './components/ProfileSection'
import { useBrandSettings } from './hooks/useBrandSettings'
import { useProfileSettings } from './hooks/useProfileSettings'

export default function ConfiguracoesPage() {
  const {
    fullName,
    setFullName,
    email,
    avatarUrl,
    loading: loadingProfile,
    saving: savingProfile,
    uploadingAvatar,
    fileInputRef,
    updateProfile,
    handleAvatarChange,
    removeAvatar
  } = useProfileSettings()

  const {
    logoPreview,
    uploading,
    error,
    handleFileChange,
    uploadLogo,
    cancelUpload,
    removeLogo
  } = useBrandSettings()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Personalize seu perfil e a identidade visual do painel"
      />

      <ProfileSection
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        avatarUrl={avatarUrl}
        loading={loadingProfile}
        saving={savingProfile}
        uploadingAvatar={uploadingAvatar}
        fileInputRef={fileInputRef}
        onSave={updateProfile}
        onAvatarChange={handleAvatarChange}
        onRemoveAvatar={removeAvatar}
      />

      <BrandingSection
        logoPreview={logoPreview}
        uploading={uploading}
        error={error}
        onFileChange={handleFileChange}
        onUpload={uploadLogo}
        onCancel={cancelUpload}
        onRemove={removeLogo}
      />
    </div>
  )
}
