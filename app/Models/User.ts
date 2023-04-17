import { compose } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeFetch,
  ModelQueryBuilderContract,
  afterDelete,
} from '@ioc:Adonis/Lucid/Orm'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Course from './Course'

type UserQuery = ModelQueryBuilderContract<typeof User>

export default class User extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public roles: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeFetch()
  public static withoutSoftDeletes(query: UserQuery) {
    query.whereNull('deleted_at')
  }

  @afterDelete()
  public static async deleteCourses(user: User) {
    const courses = await Course.query().where('user_id', user.id).whereNull('deleted_at')

    for (const course of courses) {
      await course.delete()
    }
  }
}
