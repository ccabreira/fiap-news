const API_URL = import.meta.env.VITE_API_URL;

export const getNews = async () => {
  const response = await fetch(`${API_URL}/news`);
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return response.ok ? data.token : null;
};