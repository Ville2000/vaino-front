const login = (loginInfo) => {
  console.log("LoginService")
  console.log('loginInfo', loginInfo)
}

const logout = () => {
  console.log('logout');
}

export default { login, logout }