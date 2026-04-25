const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET as string,
  { expiresIn: "7d" },
);

res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
