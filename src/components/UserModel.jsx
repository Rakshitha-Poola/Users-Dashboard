import { useEffect, useState } from "react";
import { User, Mail, Phone, Building2, MapPin } from "lucide-react";

export default function UserModal({ open, onClose, mode, user, refreshUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [saving, setSaving] = useState(false);

  // fill data ONLY when modal opens
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setCompany(user.company || "");
      setCity(user.address?.[0]?.city || "");
      setZipcode(user.address?.[0]?.zipcode || "");
    }

    if (mode === "create") {
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setCity("");
      setZipcode("");
    }
  }, [open, mode, user]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Name and Email are required");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name,
        email,
        phone,
        company,
        address: [
          {
            city,
            zipcode,
            geo: []
          }
        ]
      };

      const url =
        mode === "create"
          ? `${import.meta.env.VITE_API_URL}/addUser`
          : `${import.meta.env.VITE_API_URL}/userUpdate/${user._id}`;

      await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      refreshUsers();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-semibold mb-4">
          {mode === "create" ? "Create User" : "Update User"}
        </h2>

        <div className="space-y-3">
          <Input icon={User} label="Name" value={name} onChange={setName} />
          <Input icon={Mail} label="Email" value={email} onChange={setEmail} />
          <Input icon={Phone} label="Phone" value={phone} onChange={setPhone} />
          <Input icon={Building2} label="Company" value={company} onChange={setCompany} />
          <Input icon={MapPin} label="City" value={city} onChange={setCity} />
          <Input icon={MapPin} label="Zipcode" value={zipcode} onChange={setZipcode} />
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}



const Input = ({ label, value, onChange, icon: Icon }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      className="w-full border rounded-lg px-10 py-2 text-sm"
    />
  </div>
);
