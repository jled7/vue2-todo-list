export default function listTasks({ repository } = {}) {
  return async () => {
    return repository.list();
  };
}
