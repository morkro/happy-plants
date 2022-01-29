import { useAppStore } from 'store'

interface UserProfile {
  id: string
  email: string
  displayName: string | null
  phoneNumber: string | null
  photoURL: string | null
  providerId?: string
}

export default function useUserProfile(): UserProfile {
  const { store } = useAppStore()
  return {
    id: store.user?.uid ?? '',
    email: store.user?.email || '',
    displayName: store.user?.displayName ?? 'Plant lover',
    phoneNumber: store.user?.phoneNumber || null,
    photoURL: store.user?.photoURL || null,
    providerId: store.user?.providerId,
  }
}
