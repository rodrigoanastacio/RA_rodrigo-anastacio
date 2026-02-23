'use client'

import { useBrandSettings } from '../hooks/useBrandSettings'
import { useProfileSettings } from '../hooks/useProfileSettings'
import { BrandingSection } from './BrandingSection'
import { ProfileSection } from './ProfileSection'

export function SettingsClient() {
  const {
    fullName,
    setFullName,
    email,
    loading: loadingProfile,
    saving: savingProfile,
    updateProfile
  } = useProfileSettings()

  const {
    logoPreview,
    uploading,
    error,
    handleFileChange,
    uploadLogo,
    cancelUpload
  } = useBrandSettings()

  return (
    <>
      <ProfileSection
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        loading={loadingProfile}
        saving={savingProfile}
        onSave={updateProfile}
      />

      <BrandingSection
        logoPreview={logoPreview}
        uploading={uploading}
        error={error}
        onFileChange={handleFileChange}
        onUpload={uploadLogo}
        onCancel={cancelUpload}
      />
    </>
  )
}
