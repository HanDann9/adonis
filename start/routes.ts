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
  Route.get('register', 'AdminController.registerShow').as('admin.register.show')
  Route.post('register', 'AdminController.register').as('admin.register')
  Route.get('login', 'AdminController.loginShow').as('admin.login.show').middleware('guest')
  Route.post('login', 'AdminController.login').as('admin.login').middleware('guest')
  Route.get('logout', 'AdminController.logout').as('admin.logout')

  Route.get('/', 'AdminController.show').middleware('auth').as('admin.show')
}).prefix('admin')

/****************************** USER ******************************/
Route.group(() => {
  Route.get('register', 'UserController.registerShow').as('register.show')
  Route.post('register', 'UserController.register').as('register')
  Route.get('login', 'UserController.loginShow').as('login.show').middleware('guest')
  Route.post('login', 'UserController.login').as('login').middleware('guest')
  Route.get('logout', 'UserController.logout').as('logout')

  Route.get('/', 'UserController.show').middleware('auth')
})
