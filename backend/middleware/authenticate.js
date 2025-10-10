function authenticateJWT(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.sendStatus(401);
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.sendStatus(401);
  const token = parts[1];

  jwt.verify(token, "thisissecret", (err, payload) => {
    if (err) return res.sendStatus(401);
    req.user = { id: payload.id, email: payload.email };
    next();
  });
}