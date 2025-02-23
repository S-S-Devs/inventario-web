function handleAction(action) {
  switch(action) {
      case 'registro':
          alert('Registro seleccionado');
          break;
      case 'consulta':
          alert('Consulta seleccionada');
          break;
      case 'modificar':
          alert('Modificar seleccionado');
          break;
      case 'listar':
          alert('Listar seleccionado');
          break;
      case 'salir':
          alert('Salir seleccionado');
          break;
      default:
          alert('Acción no reconocida');
  }
}