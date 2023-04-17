import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CourseValidator from 'App/validators/CourseValidator'
import Course from 'App/Models/Course'
import User from 'App/Models/User'

export default class CourseController {
  public async show({ view, auth }: HttpContextContract) {
    const courses = await Course.all()
    const users = await User.all()

    if (auth.defaultGuard === 'admin') {
      return view.render('admin/courses/index', { roles: auth.user?.roles, courses, users })
    } else {
      return view.render('user/courses/index', { roles: auth.user?.roles, courses, users })
    }
  }

  public async createShow({ view, auth, bouncer }: HttpContextContract) {
    await bouncer.with('CoursePolicy').authorize('create')

    if (auth.defaultGuard === 'admin') {
      return view.render('admin/courses/add')
    } else {
      return view.render('user/courses/add')
    }
  }

  public async create({ request, response, bouncer, session, auth }: HttpContextContract) {
    await bouncer.with('CoursePolicy').authorize('create')

    const payload = await CourseValidator.validate(request.all(), 'create')

    await Course.create({ ...payload, status: 0, user_id: auth.user?.id })

    session.flash({ notification: 'Course has been created' })

    return response.redirect().toRoute('course.show')
  }

  public async isPublished({ request, response }: HttpContextContract) {
    const { id, status } = request.all()

    await Course.query()
      .where('id', id)
      .update({ status: status == 0 ? 1 : 0 })

    return response.status(200).send({
      title: 'Success',
      message: 'Course has been published',
    })
  }

  public async updateShow({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('CoursePolicy').authorize('update')

    const data = await Course.find(params.id)

    return view.render('admin/courses/update', { data })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('CoursePolicy').authorize('update')

    const payload = await CourseValidator.validate(request.all(), 'update')
    const course = await Course.findOrFail(params.id)

    await course.merge(payload).save()

    session.flash({ notification: 'Course has been updated' })

    return response.redirect().toRoute('course.show')
  }

  public async delete({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('CoursePolicy').authorize('delete')

    const course = await Course.findOrFail(params.id)

    await course.delete()

    session.flash({ notification: 'Course has been deleted' })

    return response.redirect().toRoute('course.show')
  }
}
