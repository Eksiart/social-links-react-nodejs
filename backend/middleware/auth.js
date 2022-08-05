const jwt = require('../controllers/jwt')

module.exports = (req, res, next) => {
  const routes = ["/profile/change", '/profile/change/delete-provider']
  const url = req.path
  console.log(url)
  if (!routes.includes(url)) {
    next()
  } else {
    const { authorization } = req.headers
    if (authorization) {
      const bearer = 'Bearer'
      const token = authorization.slice(bearer.length + 1)
      const result = jwt.verify(token)
      if (result && result.type === 'success') {
        let userId = result.value.userId;
        if (req.method === "GET") req.query.userId = userId;
        else if (req.method === "POST") req.body.userId = userId;
        next();
      } else {
        res.status(402).json({ message: 'Bad Access Token' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}