import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/medicos', 'MedicosController.create')
  Route.get('/medicos', 'MedicosController.index')
})
