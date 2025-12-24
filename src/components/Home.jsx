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
  const [mode, setMode] = useState("create"); // create | edit
  const [selectedUser, setSelectedUser] = useState(null);

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:4000/api/user/allUsers");
      const data = await res.json();

      setUsers(data);
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- DELETE USER ----------------
  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    await fetch(`http://localhost:4000/api/user/deleteUser/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-[#ede8e8] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-4 sm:p-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>

          <button
            onClick={() => {
              setMode("create");
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            <Plus size={18} /> Add User
          </button>
        </div>

        {/* LOADING / ERROR */}
        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* ================= DESKTOP TABLE ================= */}
        {!loading && !error && (
          <div className="hidden sm:block">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">City</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/users/${user._id}`)}
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.company}</td>
                    <td className="p-3">{user.address?.[0]?.city}</td>

                    <td className="p-3">
                      <div className="flex justify-center gap-4">
                        <Pencil
                          className="text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMode("edit");
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        />
                        <Trash2
                          className="text-red-400 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteUser(user._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= MOBILE CARDS ================= */}
        <div className="space-y-4 sm:hidden">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/users/${user._id}`)}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="flex justify-between gap-4">

                {/* LEFT: USER DETAILS */}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                  <p className="text-sm text-gray-500">
                    {user.address?.[0]?.city}
                  </p>
                </div>

                {/* RIGHT: ACTION ICONS */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <Pencil
                    className="text-blue-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMode("edit");
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                  />

                  <Trash2
                    className="text-red-400 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUser(user._id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
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
