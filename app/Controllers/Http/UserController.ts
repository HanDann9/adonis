import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async registerShow({ view }: HttpContextContract) {
    return view.render('user/auth/register')
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const { email, password, name, roles } = request.all()
    const user = await User.create({ email, password, name, roles })

    await auth.use('user').login(user)

    return response.redirect('/')
  }

  public async loginShow({ view }: HttpContextContract) {
    return view.render('user/auth/login')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      await auth.use('user').attempt(email, password)

      return response.redirect('/')
    } catch (error) {
      session.flash('form', 'Your email or password is incorrect')
      return response.redirect().back()
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('user').logout()

    return response.redirect().toRoute('login.show')
  }

  public async show({ view, auth }: HttpContextContract) {
    return view.render('pages/user/index', { roles: auth.user?.roles })
  }
}
