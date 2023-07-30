import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/consultas', 'ConsultasController.create')
  Route.get('/consultas', 'ConsultasController.index')
  Route.get('/consultas/paciente/:pacienteId', 'ConsultasController.getByPaciente')
  Route.put('/consultas/update/:consultaId', 'ConsultasController.update')
  Route.put('/consultas/add_medico/:consultaId', 'ConsultasController.adicionarMedico')
  Route.get('/consultas/medico/:medicoId', 'ConsultasController.getByMedico')
})
