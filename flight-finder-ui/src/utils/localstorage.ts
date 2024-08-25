const setItem = item => {
  localStorage.setItem("user", JSON.stringify(item));
};
const getItem = () => {
  let item = localStorage.getItem("user");
  return JSON.parse(item);
};
const removeItem = () => {
  return localStorage.removeItem("user");
}
export { setItem, getItem, removeItem };
