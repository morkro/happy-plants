// https://vuejs.org/v2/guide/list.html#Caveats
import add from './add'
import load from './load'
import deleteM from './delete'

export default {
  ...add,
  ...deleteM,
  ...load
}
