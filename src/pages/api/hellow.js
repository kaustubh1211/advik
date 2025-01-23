const product = [
  { id: 1, name: "Bambo pen", price: 50 },
  { id: 2, name: "Bambo notebook", price: 200 },
];
export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(product);
      break;

    case "POST":
      const newProduct = { ...req.body };
      product.push(newProduct);
      res.status(200).json(newProduct);
      break;
  }
}
