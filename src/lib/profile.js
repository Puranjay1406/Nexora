import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const emptyProfile = {
  contact: "",
  address: { line1: "", line2: "", landmark: "", city: "", state: "", pincode: "" },
};

// read a user's profile doc; returns empty shape if none exists yet
export async function getProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return { ...emptyProfile, address: { ...emptyProfile.address } };
  const data = snap.data();
  return {
    contact: data.contact || "",
    address: { ...emptyProfile.address, ...(data.address || {}) },
  };
}

// write (merge) a user's profile doc
export async function saveProfile(uid, profile) {
  await setDoc(
    doc(db, "users", uid),
    { ...profile, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

// required: line1, city, state, pincode, contact | optional: line2, landmark
export function validateProfile(profile) {
  const errors = {};
  const a = profile.address;

  if (!profile.contact.trim()) errors.contact = "Contact number is required.";
  else if (!/^\d{10}$/.test(profile.contact.replace(/\s/g, "")))
    errors.contact = "Enter a valid 10-digit number.";

  if (!a.line1.trim()) errors.line1 = "Address line 1 is required.";
  if (!a.city.trim()) errors.city = "City is required.";
  if (!a.state.trim()) errors.state = "State is required.";

  if (!a.pincode.trim()) errors.pincode = "Pincode is required.";
  else if (!/^\d{6}$/.test(a.pincode.trim())) errors.pincode = "Enter a valid 6-digit pincode.";

  return errors; // empty object = valid
}

// true when all required fields are present (used by the checkout gate)
export function isProfileComplete(profile) {
  return Object.keys(validateProfile(profile)).length === 0;
}