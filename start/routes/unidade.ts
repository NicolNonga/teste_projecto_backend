import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/unidades', 'UnidadesController.create')
  Route.get('/unidades', 'UnidadesController.index')
})
