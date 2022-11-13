export default function handler(req, res) {
  //catch the post request
  if (req.method === "POST") {
    // Process a POST request
    const { id } = req.body;
    console.log(id);
    res.status(200).json({ id: id });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: "John Doe" });
  }
}
