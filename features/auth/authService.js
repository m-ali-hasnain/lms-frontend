import globalAxios from "../../axios/index";

const login = async (userData) => {
  const response = await globalAxios.post("users/login", userData);
  if (response.data) {
    localStorage.setItem("authDetails", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("authDetails");
  localStorage.removeItem("currentPageUri");
};

const authService = {
  login,
  logout,
};

export default authService;
