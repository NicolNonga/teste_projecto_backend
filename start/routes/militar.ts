import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/militars', 'MilitarsController.create')
  Route.get('/militars', 'MilitarsController.index')
})
