/* Edita aquí los datos de contacto. No introduzcas claves privadas en este archivo. */
window.AIREAL_CONFIG = Object.freeze({
  brand: 'Aireal Estudio',
  siteUrl: 'https://horizoncompany.es',
  email: 'williamluisgonzalez@gmail.com',
  instagram: 'https://instagram.com/airealestudio',
  whatsapp: '34603040431', // Prefijo 34 y solo dígitos: se muestra como +34 603 040 431.
  bookingUrl: '', // URL HTTPS de tu agenda, si decides utilizar una.

  // Envío real del formulario. Mientras esté vacío, la web prepara un borrador
  // para que el visitante lo envíe desde su propio correo.
  // Para activarlo con Web3Forms (gratuito): pide tu clave en web3forms.com,
  // pega el endpoint y la clave aquí, y no hace falta tocar nada más.
  // Si usas otro servicio, actualiza también connect-src en web/_headers.
  formEndpoint: '', // https://api.web3forms.com/submit
  formKey: ''       // La clave de acceso que te llega por correo
});
