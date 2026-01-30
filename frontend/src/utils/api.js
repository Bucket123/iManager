export const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: "Bearer " + token,
      ...(options.headers || {})
    }
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
    return;
  }

  return response;
};
