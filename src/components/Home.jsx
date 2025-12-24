import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import UserModal from "./UserModel";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/allUsers`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/deleteUser/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-3 md:p-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            User Management
          </h1>

          <button
            onClick={() => {
              setMode("create");
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
          >
            <Plus size={18} /> Add User
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* ================= DESKTOP TABLE (UNCHANGED) ================= */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                  <tr>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Company</th>
                    <th className="p-4 text-left">City</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-slate-50 cursor-pointer transition"
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      <td className="p-4 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-800">
                          {user.name}
                        </span>
                      </td>

                      <td className="p-4 text-slate-600">{user.email}</td>
                      <td className="p-4 text-slate-600">{user.phone}</td>
                      <td className="p-4 text-slate-600">{user.company}</td>
                      <td className="p-4 text-slate-600">
                        {user.address?.[0]?.city || "-"}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMode("edit");
                              setSelectedUser(user);
                              setIsModalOpen(true);
                            }}
                          >
                            <Pencil size={16} className="text-blue-600" />
                          </button>

                          <button
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUser(user._id);
                            }}
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden space-y-4 w-full max-w-full">
              {users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => navigate(`/users/${user._id}`)}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex justify-between items-center w-full overflow-hidden"
                >
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-800 truncate">
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-500 truncate">
                        {user.email}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        {user.phone}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        {user.address?.[0]?.city || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      className="p-2 rounded-lg bg-blue-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMode("edit");
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>

                    <button
                      className="p-2 rounded-lg bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUser(user._id);
                      }}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <UserModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={mode}
          user={selectedUser}
          refreshUsers={fetchUsers}
        />
      </div>
    </div>
  );
}
