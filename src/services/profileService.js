
import { authFetch } from "./apiClient";

export async function getProfile() {
  return authFetch("/profile/", {
    method: "GET",
  });
}

export async function saveProfile({
  name,
  email,
  phone,
  location,
  imageFile,
}) {
  const formData = new FormData();

  if (name !== undefined && name !== null) {
    formData.append("name", name);
  }

  if (email !== undefined && email !== null) {
    formData.append("email", email);
  }

  if (phone !== undefined && phone !== null) {
    formData.append("phone", phone);
  }

  if (location !== undefined && location !== null) {
    formData.append("location", location);
  }

  if (imageFile) {
    formData.append("image", imageFile);
  }

  return authFetch("/profile/", {
    method: "POST",
    body: formData,
  });
}
