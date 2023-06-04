const user = process.env.USER || "usuario"
const password = process.env.PASSWORD || "contraseña"

module.exports = (credencial) => {
  try {
    if (credencial.user === user && credencial.password === password) {
      return true
    }
    return false
  }
  catch (e) {
    console.error(e)
  }
}