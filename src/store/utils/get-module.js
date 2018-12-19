export default function getModule (moduleName, state) {
  const index = state.selected.modules.findIndex(m => m.type === moduleName)
  return {
    index,
    module: state.selected.modules[index]
  }
}
