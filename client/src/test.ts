import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Encontrar todos los archivos de prueba
const context = require.context('./', true, /\.spec\.ts$/);

// Inicializar el entorno de pruebas
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Cargar los módulos de pruebas
context.keys().forEach(context);
