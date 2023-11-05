module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
  
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
  
      client: {
        clearContext: false // Deja Jasmine administrar el contexto de pruebas
      },
  
      jasmineHtmlReporter: {
        suppressAll: true // Suprime la salida de éxito
      },
  
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, 'coverage'), // Directorio de salida para los informes
        reports: ['html', 'lcovonly', 'text-summary'], // Tipo de informes a generar
        fixWebpackSourcePaths: true, // Corrige los paths de los archivos fuente
      },
  
      reporters: ['progress', 'kjhtml'], // Reporteros a utilizar
  
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'], // Browser para ejecutar las pruebas
  
      singleRun: false, // Si se debe ejecutar una sola vez o mantenerse en ejecución
      restartOnFileChange: true
    });
  };
  