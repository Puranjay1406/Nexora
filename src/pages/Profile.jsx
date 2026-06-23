import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { User, Mail, LogOut, Phone, MapPin, Pencil } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getProfile, saveProfile, validateProfile } from "../lib/profile";

const fields = [
  { key: "line1", label: "Address line 1", required: true, half: false },
  { key: "line2", label: "Address line 2", required: false, half: false },
  { key: "landmark", label: "Landmark", required: false, half: true },
  { key: "city", label: "City", required: true, half: true },
  { key: "state", label: "State", required: true, half: true },
  { key: "pincode", label: "Pincode", required: true, half: true },
];

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const needsCompletion = location.state?.needsCompletion;
  const returnTo = location.state?.from;

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;
    getProfile(user.uid)
      .then((p) => {
        setProfile(p);
        if (needsCompletion) {
          setDraft(JSON.parse(JSON.stringify(p)));
          setEditing(true);
        }
      })
      .finally(() => setFetching(false));
  }, [user, needsCompletion]);

  if (loading) return <div className="mx-auto max-w-3xl px-6 py-28 text-center text-muted">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;

  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const isGoogle = user.providerData?.[0]?.providerId === "google.com";

  const startEdit = () => {
    setDraft(JSON.parse(JSON.stringify(profile))); // deep copy so cancel discards
    setErrors({});
    setEditing(true);
  };

  const handleSave = async () => {
    const errs = validateProfile(draft);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaving(true);
    try {
      await saveProfile(user.uid, draft);
      setProfile(draft);
      setEditing(false);
      if (returnTo) navigate(returnTo); // bounce back to checkout if sent here for completion
    } finally {
      setSaving(false);
    }
  };

  const setAddr = (key, val) => setDraft((d) => ({ ...d, address: { ...d.address, [key]: val } }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl text-ink">My Profile</h1>
      <p className="mt-1 text-muted">Manage your account details.</p>

      {needsCompletion && (
        <div className="mt-4 rounded-md border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-ink">
          Please complete your shipping details to continue to checkout.
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-cream">
        {/* header */}
        <div className="flex items-center gap-4 border-b border-line bg-sand/40 p-6">
          {user.photoURL ? (
            <img src={user.photoURL} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-2xl font-medium text-cream">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-display text-2xl text-ink">{displayName}</p>
            <p className="text-sm text-muted">Signed in with {isGoogle ? "Google" : "email"}</p>
          </div>
        </div>

        {/* identity (from Auth, not editable) */}
        <div className="divide-y divide-line border-b border-line">
          <Row icon={User} label="Name" value={user.displayName || "—"} />
          <Row icon={Mail} label="Email" value={user.email} />
        </div>

        {/* editable contact + address */}
        <div className="p-6">
          {fetching ? (
            <p className="text-sm text-muted">Loading details…</p>
          ) : !editing ? (
            <ViewDetails profile={profile} onEdit={startEdit} />
          ) : (
            <div className="space-y-5">
              <Field
                icon={Phone}
                label="Contact number"
                value={draft.contact}
                onChange={(v) => setDraft((d) => ({ ...d, contact: v }))}
                error={errors.contact}
                required
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.key} className={f.half ? "" : "sm:col-span-2"}>
                    <Field
                      label={f.label}
                      value={draft.address[f.key]}
                      onChange={(v) => setAddr(f.key, v)}
                      error={errors[f.key]}
                      required={f.required}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-md bg-ink px-6 py-2.5 text-sm font-medium text-cream transition hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save details"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-md border border-line px-6 py-2.5 text-sm font-medium text-ink transition hover:bg-sand/50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={logout}
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-ink px-6 py-3 text-sm font-medium text-ink transition hover:bg-sand/50"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}

function ViewDetails({ profile, onEdit }) {
  const a = profile.address;
  const hasAddress = a.line1 || a.city;
  const addressLine = [a.line1, a.line2, a.landmark, a.city, a.state, a.pincode]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Phone size={18} className="text-muted" />
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Contact</p>
            <p className="text-ink">{profile.contact || "—"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={18} className="mt-0.5 text-muted" />
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Shipping address</p>
            <p className="text-ink">{hasAddress ? addressLine : "—"}</p>
          </div>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="inline-flex shrink-0 items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition hover:bg-sand/50"
      >
        <Pencil size={14} /> Edit
      </button>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, error, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-md border bg-white py-3 text-sm text-ink outline-none focus:border-ink ${
            Icon ? "pl-9 pr-4" : "px-4"
          } ${error ? "border-red-300" : "border-line"}`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-5">
      <Icon size={18} className="shrink-0 text-muted" />
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        <p className="truncate text-ink">{value}</p>
      </div>
    </div>
  );
}