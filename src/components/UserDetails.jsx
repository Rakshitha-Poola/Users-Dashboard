import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Building2, MapPin, ArrowLeft } from "lucide-react";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/user/userDetails/${id}`
        );
        const data = await res.json();
        setUser(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading user details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            User Details
          </h1>
          <p className="text-sm text-gray-500">
            View user personal and address information
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-8">

          {/* PERSONAL INFO */}
          <Section title="Personal Information">
            <Info icon={User} label="Full Name" value={user.name} />
            <Info icon={Mail} label="Email Address" value={user.email} />
            <Info icon={Phone} label="Phone Number" value={user.phone} />
            <Info icon={Building2} label="Company" value={user.company} />
          </Section>

          {/* ADDRESS */}
          <Section title="Address">
            <Info icon={MapPin} label="City" value={user.address[0].city} />
            <Info icon={MapPin} label="Zipcode" value={user.address[0].zipcode} />
          </Section>
        </div>

        
      </div>
    </div>
  );
}



const Section = ({ title, children }) => (
  <div>
    <h3 className="mb-4 text-sm font-medium text-gray-700">
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Info = ({ label, value, icon: Icon }) => (
  <div className="relative flex items-center gap-3 rounded-lg border p-3">
    <Icon className="h-4 w-4 text-gray-400" />
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  </div>
);
