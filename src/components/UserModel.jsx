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

  // simple error state (beginner style)
  const [errors, setErrors] = useState({});

  // fill data when modal opens
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setCompany(user.company || "");
      setCity(user.address?.[0]?.city || "");
      setZipcode(user.address?.[0]?.zipcode || "");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setCity("");
      setZipcode("");
    }

    setErrors({});
  }, [open, mode, user]);

  if (!open) return null;

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    }

    if (!phone) newErrors.phone = "Phone is required";
    if (!company) newErrors.company = "Company is required";
    if (!city) newErrors.city = "City is required";
    if (!zipcode) newErrors.zipcode = "Zipcode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!validate()) return;

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
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-semibold mb-4">
          {mode === "create" ? "Create User" : "Update User"}
        </h2>

        <div className="space-y-3">

          <Input
            icon={User}
            label="Name"
            value={name}
            onChange={setName}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

          <Input
            icon={Mail}
            label="Email"
            value={email}
            onChange={setEmail}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

          <Input
            icon={Phone}
            label="Phone"
            value={phone}
            onChange={(val) => {
                if (/^\d*$/.test(val) && val.length <= 10) {
                setPhone(val);
                }
            }}
            type="tel"
            />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

          <Input
            icon={Building2}
            label="Company"
            value={company}
            onChange={setCompany}
          />
          {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}

          <Input
            icon={MapPin}
            label="City"
            value={city}
            onChange={setCity}
          />
          {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}

          <Input
            icon={MapPin}
            label="Zipcode"
            value={zipcode}
            onChange={(val) => {
                if (/^\d*$/.test(val) && val.length <= 6) {
                setZipcode(val);
                }
            }}
            type="tel"
            />
          {errors.zipcode && <p className="text-xs text-red-500">{errors.zipcode}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
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

// ---------------- INPUT ----------------
const Input = ({ label, value, onChange, icon: Icon, type = "text" }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      className="w-full border rounded-lg px-10 py-2 text-sm"
    />
  </div>
);
