export default (req, res) => {
  if (req.method === "POST") {
    res.json({ method: "POST" });
  }
  if (req.method === "GET") {
    res.json({ method: "GET" });
  }
};
