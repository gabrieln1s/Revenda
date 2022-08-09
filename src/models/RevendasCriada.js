import mongoose from "mongoose";
const { Schema } = mongoose;

const RevendaRetornosSchema = new Schema({
  slug: String,
  falhou: Boolean,
  message: String,
});

export default mongoose.models.revenda_retorno ||
  mongoose.model("revenda_retorno", RevendaRetornosSchema);
