export default function getModule (moduleName, state) {
  const index = state.plants.selected.modules.findIndex(m => m.type === moduleName)
  return {
    index,
    module: state.plants.selected.modules[index]
  }
}
