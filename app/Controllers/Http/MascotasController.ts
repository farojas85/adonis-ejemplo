import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mascota from 'App/Models/Mascota'

export default class MascotasController {

  public async index({ view}: HttpContextContract) {


    const mascotas  = await Mascota.find()

    return view.render('mascota/inicio',{ mascotas: mascotas})
  }

  public async create({ view}: HttpContextContract) {
    return view.render('mascota/nuevo')
  }

  public async store({request,response}: HttpContextContract) {

    const mascota = new Mascota({
      nombre:request.input('nombre'),
      raza:request.input('raza'),
      tipo:request.input('tipo')
    })

    await mascota.save()

    return response.redirect().toRoute('mascotas.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({params,view}: HttpContextContract) {

    const mascota = await Mascota.findById(params.id)
    return view.render('mascota/editar',{mascota:mascota})

  }

  public async update({params,request,response}: HttpContextContract) {


    await Mascota.updateOne({_id:params.id},{$set:{
      nombre: request.input('nombre'),
      raza:request.input('raza'),
      tipo:request.input('tipo')
    }},{new:true,upsert:true})

    return response.redirect().toRoute('mascotas.index')
  }

  public async destroy({}: HttpContextContract) {}
}
