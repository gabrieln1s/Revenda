import Database from "../../config/Database";
import Model from "../../models/RevendasCriada";

const database = new Database();
database.connect();

export default async function (req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { slug, falhou, message } = req.body;
      const revenda = await Model.create({ slug, falhou, message });
      res.status(200).json({ status: "ok" });
    } catch (error) {
      res.status(400).json({ message: "Ocorre um erro na requisição!" });
    }
  }

  if (method === "GET") {
    try {
      const { slug } = req.query;
      const revenda = await Model.findOne({ slug });
      res.status(200).json(revenda);
    } catch (error) {
      res.status(400).json({ message: "Ocorre um erro na requisição!" });
    }
  }
}
