const createdUsers = [];
const deletedUserIds = new Set();

export function recordCreatedUser(user) {
  createdUsers.push(user);
}

export function recordDeletedUser(id) {
  deletedUserIds.add(id);
}

export function revertDeletedUser(id) {
  deletedUserIds.delete(id);
}

export function applyLocalChanges(users) {
  return [
    ...users.filter((user) => !deletedUserIds.has(user.id)),
    ...createdUsers.filter((user) => !deletedUserIds.has(user.id)),
  ];
}
