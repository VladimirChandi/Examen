const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const validarCedula = (cedula) => {
    if (cedula.length !== 10) return 'incorrecta';
  
    const digitos = cedula.split('').map(Number);
    const digitoVerificador = digitos.pop();
  
    let sumaImpares = 0;
    let sumaPares = 0;
  
    for (let i = 0; i < digitos.length; i++) {
      if (i % 2 === 0) { // Posiciones impares (index 0, 2, 4, 6, 8)
        let producto = digitos[i] * 2;
        if (producto > 9) producto -= 9;
        sumaImpares += producto;
      } else { // Posiciones pares (index 1, 3, 5, 7)
        sumaPares += digitos[i];
      }
    }
  
    const totalSuma = sumaImpares + sumaPares;
    const moduloDiez = totalSuma % 10;
    const decimoDigitoCalculado = moduloDiez === 0 ? 0 : 10 - moduloDiez;
  
    return digitoVerificador === decimoDigitoCalculado ? 'correcta' : 'incorrecta';
  };
  

  app.post('/validar-cedula', async (req, res) => {
    const { cedula } = req.body;
    if (!cedula) {
      return res.status(400).send({ error: 'La cédula es requerida' });
    }
  
    const resultadoValidacion = validarCedula(cedula);
    if (resultadoValidacion === 'incorrecta') {
      return res.send({ cedula, resultado: 'incorrecta' });
    }
  
    try {
      // Aquí iría la lógica para validar la cédula en un servicio externo (simulado con jsonplaceholder)
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/1`);
      const data = response.data;
  
      // Simulando una validación exitosa con el campo 'valida'
      res.send({ cedula, resultado: 'correcta', validacionExterna: true });
    } catch (error) {
      console.error('Error al verificar la cédula en el servicio externo:', error);
      res.status(500).send({ 
        error: 'Error al verificar la cédula en el servicio externo',
        details: error.message 
      });
    }
  });
  

app.listen(port, () => {
  console.log(`servidor corriendo en puerto:${port}`);
});



