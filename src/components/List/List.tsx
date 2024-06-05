import React, { useState, useEffect } from "react";
import Details from "../Details/Details";
import { User, UserDetails } from "../types"; // Предполагаем, что вы экспортируете типы отдельно

function List(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json",
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {users.map((user) => (
          <p key={user.id} onClick={() => setSelectedUser(user)}>
            {user.name}
          </p>
        ))}
      </div>
      {selectedUser && <Details info={selectedUser} />}
    </div>
  );
}

export default List;
