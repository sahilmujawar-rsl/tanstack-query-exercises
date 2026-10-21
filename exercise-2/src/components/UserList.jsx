import React from "react";
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useCreateUser } from "../hooks/useCreateUser";
import { useDeleteUser } from "../hooks/useDeleteUser";

const ROLES = ["user", "admin", "moderator"];

export default function UserList() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const { data: users, isPending, isError, error } = useUsers();
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("user");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const payload = { firstName, lastName: rest.join(" "), email, role };
    createUserMutation.mutate(payload, { onSuccess: resetForm });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="panel">
        <strong>Create user</strong>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="actions">
          <button type="submit" disabled={createUserMutation.isPending}>
            {createUserMutation.isPending ? "Creating..." : "Create User"}
          </button>
        </div>
        {createUserMutation.isError && (
          <div className="message error">
            {createUserMutation.error?.message ?? "Error creating user"}
          </div>
        )}
        {createUserMutation.isSuccess && (
          <div className="message success">User created successfully</div>
        )}
      </form>

      {isPending && <div className="message">Loading users...</div>}
      {isError && (
        <div className="message error">{error?.message ?? "Error fetching users"}</div>
      )}

      {deleteUserMutation.isPending && (
        <div className="message">Deleting user...</div>
      )}
      {deleteUserMutation.isError && (
        <div className="message error">
          {deleteUserMutation.error?.message ??
            "Error deleting user - previous list restored"}
        </div>
      )}
      {deleteUserMutation.isSuccess && (
        <div className="message success">User deleted successfully</div>
      )}

      <div className="list">
        {users?.map((user) => (
          <div key={user.id} className="user">
            <div>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <div>{user.email}</div>
              {user.role && <div>{user.role}</div>}
            </div>
            <div className="actions">
              <button
                onClick={() => deleteUserMutation.mutate(user.id)}
                disabled={deleteUserMutation.isPending}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
