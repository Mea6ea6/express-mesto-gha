const getUsers = (req, res) => {
  console.log("getUsers");
  res.send("getUsers");
}

const getUsersById = (req, res) => {
  console.log("getUsersById");
  res.send("getUsersById");
}

const createUser = (req, res) => {
  console.log("createUser");
  res.send("createUser");
}

module.exports = { getUsers, getUsersById, createUser }