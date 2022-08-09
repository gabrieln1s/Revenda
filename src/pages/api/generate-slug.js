import Database from "../../config/Database";
import Model from "../../models/RevendasCriada";

const database = new Database();
database.connect();

const randomSlug = (min = 100000, max = 999999999) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateSlug = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    const slug = randomSlug();
    let isSlugValid = false;

    while (!isSlugValid) {
      const revenda = await Model.findOne({ slug });
      if (!revenda) isSlugValid = true;
    }

    return res.status(200).json({ slug: slug });
  }
};

export default generateSlug;
