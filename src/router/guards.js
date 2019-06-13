import { hasUser } from '@/app/user/utils/user'

export async function beforeEnter (to, from, next) {
  if (await !hasUser()) {
    next('intro')
  } else {
    next()
  }
}
