import { useLocation } from 'react-router'

export default function useSearchParams() {
  return new URLSearchParams(useLocation().search)
}
