import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");

  const fetchUsers = useCallback(async (targetPage: number) => {
    if (targetPage < 1) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://gorest.co.in/public/v2/users?page=${targetPage}&per_page=10`
      );
      if (!response.ok) {
        throw new Error("Błąd ładowania użytkowników");
      }
      const data = await response.json();
      setUsers(data);
      setPage(targetPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(1);
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

  return (
    <div className="card">
      <div className="header">
        <h3>Zadanie 3.</h3>
        <p>
          Napisz w React obsługę API dostępnego pod adresem
          https://gorest.co.in/. Aplikacja powinna posiadać widok listy
          użytkowników (pobranych z API) oraz mieć możliwość ich wyszukiwania i
          edycji istniejących wpisów.
        </p>
      </div>
      <div className="">
        <p>Szukaj Użytkowników</p>
        <input
          type="text"
          placeholder="Szukaj ..."
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <div className="">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię</th>
              <th>Email</th>
              <th>Płeć</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default usersList;
