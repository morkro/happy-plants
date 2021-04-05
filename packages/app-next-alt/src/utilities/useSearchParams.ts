import { useHistory } from 'react-router'

export default function useSearchParams() {
  return new URLSearchParams(useHistory().location.search)
}
