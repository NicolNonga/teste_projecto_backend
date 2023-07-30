import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/grau_parantestcos', 'GrauParentescosController.create')
  Route.get('/grau_parantestcos', 'GrauParentescosController.index')
})
