
function handleAction(action) {
  switch(action) {
      case 'registro':
          document.getElementById('Menu').style.display = 'none';
          document.getElementById('registro').style.display = 'block';
          break;
      case 'consulta':
            document.getElementById('Menu').style.display = 'none';
            document.getElementById('consulta').style.display = 'block';
          break;
      case 'modificar':
          alert('Modificar seleccionado');
          break;
      case 'eliminar':
          alert('Eliminar seleccionado');
          break;
      case 'salir':
        alert('Salir seleccionado');
        break;
      case 'volver':
        if (menu.style.display === 'none' && registro.style.display === 'block') {
            document.getElementById('registro').style.display = 'none';
            document.getElementById('Menu').style.display = 'block';
            break;
        } else if (menu.style.display === 'none' && consulta.style.display === 'block') {
            document.getElementById('consulta').style.display = 'none';
            document.getElementById('Menu').style.display = 'block';
            break;
        }
      default:
          alert('Acción no reconocida');
  }
}