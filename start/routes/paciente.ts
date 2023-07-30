import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/pacientes', 'PacientesController.create')
  Route.get('/pacientes', 'PacientesController.index')
})
