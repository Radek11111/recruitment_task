import { useCallback, useEffect, useMemo, useState } from "react";
import "./Users.css";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface UserEdits {
  name: string;
  email: string;
  gender: string;
  status: string;
}

const usersList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<string>("");
  const [edits, setEdits] = useState<{ [key: number]: UserEdits }>({});

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://gorest.co.in/public/v2/users?`);
      if (!response.ok) {
        throw new Error("Błąd ładowania użytkowników");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    if (!query.trim()) return users;

    const searchTerms = query.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerms) ||
        user.email.toLowerCase().includes(searchTerms)
    );
  }, [query, users]);

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const startEdit = useCallback((user: User) => {
    setEdits((prev) => ({
      ...prev,
      [user.id]: {
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
      },
    }));
  }, []);

  const cancelEdit = useCallback((userId: number) => {
    setEdits((prevEdits) => {
      const newEdits = { ...prevEdits };
      delete newEdits[userId];
      return newEdits;
    });
  }, []);

  const saveEdit = useCallback(
    (userId: number) => {
      const userEdit = edits[userId];
      if (!userEdit) return;

      if (!userEdit.name.trim() || !userEdit.email.trim()) {
        setError("Imię i email są wymagane.");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(userEdit.email)) {
        setError("Nieprawidłowy format email.");
        return;
      }

      setUsers((prevUser) =>
        prevUser.map((user) =>
          user.id === userId ? { ...user, ...userEdit } : user
        )
      );
      cancelEdit(userId);
      setError("");
    },
    [edits, cancelEdit]
  );

  const handleEditChange = useCallback(
    (userId: number, field: keyof UserEdits, value: string) => {
      setEdits((prevEdits) => ({
        ...prevEdits,
        [userId]: {
          ...prevEdits[userId],
          [field]: value,
        },
      }));
    },
    []
  );

  return (
    <div className="card users-list">
      <div className="header">
        <h3>Zadanie 3.</h3>
        <p>
          Napisz w React obsługę API dostępnego pod adresem
          https://gorest.co.in/. Aplikacja powinna posiadać widok listy
          użytkowników (pobranych z API) oraz mieć możliwość ich wyszukiwania i
          edycji istniejących wpisów.
        </p>
      </div>
      <div className="search-section">
        <p>Szukaj Użytkowników</p>
        <input
          type="text"
          placeholder="Szukaj ..."
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">ładowanie użytkowników...</div>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię</th>
              <th>Email</th>
              <th>Płeć</th>
              <th>Status</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td>
                  {query
                    ? "Brak użytkowników spełniających kryteria wyszukiwania."
                    : "Brak użytkowników do wyświetlenia."}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {edits[user.id] ? (
                      <input
                        type="text"
                        value={edits[user.id].name}
                        onChange={(event) =>
                          handleEditChange(user.id, "name", event.target.value)
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {edits[user.id] ? (
                      <input
                        type="text"
                        value={edits[user.id].email}
                        onChange={(event) =>
                          handleEditChange(user.id, "email", event.target.value)
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {edits[user.id] ? (
                      <input
                        type="text"
                        value={edits[user.id].gender}
                        onChange={(event) =>
                          handleEditChange(
                            user.id,
                            "gender",
                            event.target.value
                          )
                        }
                      />
                    ) : (
                      user.gender
                    )}
                  </td>
                  <td>
                    {edits[user.id] ? (
                      <input
                        type="text"
                        value={edits[user.id].status}
                        onChange={(event) =>
                          handleEditChange(
                            user.id,
                            "status",
                            event.target.value
                          )
                        }
                      />
                    ) : (
                      user.status
                    )}
                  </td>
                  <td>
                    {edits[user.id] ? (
                      <>
                        <button
                          onClick={() => saveEdit(user.id)}
                          className="btn save"
                        >
                          Zapisz
                        </button>
                        <button
                          onClick={() => cancelEdit(user.id)}
                          className="btn cancel"
                        >
                          Anuluj
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(user)}
                        className="btn edit"
                      >
                        Edytuj
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default usersList;
