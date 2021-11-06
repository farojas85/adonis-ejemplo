import { Schema, model } from '@ioc:Mongoose'

const mascotaSchema = new Schema({
  nombre:String,
  raza:String,
  tipo:String,
})

export default model('Mascota',mascotaSchema)
