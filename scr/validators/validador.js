// VALIDADOR REUTILIZABLE
// Una sola funcion (validarCampo) que sabe validar segun una "regla".
// Los modelos solo describen sus reglas; no repiten codigo de validacion (principio DRY / SRP).
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

export class ErrorValidacion extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = 'ErrorValidacion';
    }
}

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^[0-9+\-\s()]{7,20}$/;

/**
 * regla = { tipo, requerido, min, max, largoMax, valores, noFutura }
 * tipo: 'texto' | 'entero' | 'decimal' | 'fecha' | 'correo' | 'telefono' | 'booleano' | 'enum' | 'url'
 */
export function validarCampo(nombre, valor, regla) {
    const vacio = valor === null || valor === undefined || valor === '';

    if (vacio) {
        if (regla.requerido) throw new ErrorValidacion(`El campo "${nombre}" es obligatorio.`);
        return null;
    }

    switch (regla.tipo) {
        case 'texto': {
            if (typeof valor !== 'string') throw new ErrorValidacion(`"${nombre}" debe ser texto.`);
            const limpio = valor.trim();
            if (limpio === '' && regla.requerido) throw new ErrorValidacion(`El campo "${nombre}" es obligatorio.`);
            if (regla.largoMax && limpio.length > regla.largoMax)
                throw new ErrorValidacion(`"${nombre}" no puede superar ${regla.largoMax} caracteres.`);
            return limpio === '' ? null : limpio;
        }
        case 'entero':
        case 'decimal': {
            const numero = Number(valor);
            if (Number.isNaN(numero)) throw new ErrorValidacion(`"${nombre}" debe ser un numero.`);
            if (regla.tipo === 'entero' && !Number.isInteger(numero))
                throw new ErrorValidacion(`"${nombre}" debe ser un numero entero.`);
            if (regla.min !== undefined && numero < regla.min)
                throw new ErrorValidacion(`"${nombre}" debe ser mayor o igual a ${regla.min}.`);
            if (regla.max !== undefined && numero > regla.max)
                throw new ErrorValidacion(`"${nombre}" debe ser menor o igual a ${regla.max}.`);
            return numero;
        }
        case 'fecha': {
            const fecha = dayjs(String(valor), 'YYYY-MM-DD', true); // true = modo estricto
            if (!fecha.isValid()) throw new ErrorValidacion(`"${nombre}" debe tener el formato YYYY-MM-DD.`);
            if (regla.noFutura && fecha.isAfter(dayjs(), 'day'))
                throw new ErrorValidacion(`"${nombre}" no puede ser una fecha futura.`);
            return fecha.format('YYYY-MM-DD');
        }
        case 'correo': {
            const correo = String(valor).trim().toLowerCase();
            if (!REGEX_CORREO.test(correo)) throw new ErrorValidacion(`"${nombre}" no es un correo valido.`);
            return correo;
        }
        case 'telefono': {
            const tel = String(valor).trim();
            if (!REGEX_TELEFONO.test(tel)) throw new ErrorValidacion(`"${nombre}" no es un telefono valido.`);
            return tel;
        }
        case 'url': {
            const url = String(valor).trim();
            if (!/^https?:\/\/\S+$/i.test(url)) throw new ErrorValidacion(`"${nombre}" debe ser una URL http(s) valida.`);
            return url;
        }
        case 'booleano':
            return valor === true || valor === 1 || valor === '1' || valor === 'true';
        case 'enum': {
            const texto = String(valor).trim().toUpperCase();
            if (!regla.valores.includes(texto))
                throw new ErrorValidacion(`"${nombre}" debe ser uno de: ${regla.valores.join(', ')}.`);
            return texto;
        }
        default:
            throw new Error(`Tipo de regla desconocido: ${regla.tipo}`);
    }
}
