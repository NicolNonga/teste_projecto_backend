import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/especialiddes', 'EspecilidadesController.create')
  Route.get('/especialiddes', 'EspecilidadesController.index')
})
