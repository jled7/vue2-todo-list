export function addTask({ repository } = {}) {
  return async () => {
    return repository.list();
  };
}
