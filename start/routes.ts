/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/****************************** ADMIN ******************************/
Route.group(() => {
  Route.get('register', 'AdminController.registerShow').as('admin.register.show').middleware('guest')
  Route.post('register', 'AdminController.register').as('admin.register')
  Route.get('login', 'AdminController.loginShow').as('admin.login.show').middleware('guest')
  Route.post('login', 'AdminController.login').as('admin.login')
  Route.get('logout', 'AdminController.logout').as('admin.logout')
}).prefix('admin')

/****************************** USER ******************************/
Route.group(() => {
  Route.get('register', 'UserController.registerShow').as('register.show').middleware('guest')
  Route.post('register', 'UserController.register').as('register')
  Route.get('login', 'UserController.loginShow').as('login.show').middleware('guest')
  Route.post('login', 'UserController.login').as('login')
  Route.get('logout', 'UserController.logout').as('logout')
  Route.get('user/delete/:id', 'UserController.delete').as('user.delete')
})

/****************************** Course ******************************/
Route.get('/', 'CourseController.show').as('show').middleware('auth')
Route.group(() => {
  Route.get('/', 'CourseController.show').as('course.show').middleware('auth')
  Route.get('create', 'CourseController.createShow').as('course.create.show').middleware('auth')
  Route.post('create', 'CourseController.create').as('course.create').middleware('auth')
  Route.get('isPublished', 'CourseController.isPublished').as('course.isPublished').middleware('auth')
  Route.get('update/:id', 'CourseController.updateShow').middleware('auth:admin')
  Route.post('update/:id', 'CourseController.update').middleware('auth:admin')
  Route.get('delete/:id', 'CourseController.delete').middleware('auth:admin')
}).prefix('course')
