import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'UsersController.create')
  Route.post('/users/auth', 'AuthController.login')
  Route.get('/user_paciente/:userId', 'UsersController.getPaciente')
  Route.get('/user_medico/:userId', 'UsersController.getMedico')
})
