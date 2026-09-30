import dayjs from 'dayjs';
import { MovimientoFinanciero } from '../models/movimiento_financiero.js';

export class MovimientoFactory {
    static ingresoPorContrato(contrato, categoria_id, descripcion) {
        return new MovimientoFinanciero({
            categoria_id,
            cliente_id: contrato.cliente_id,
            contrato_id: contrato.id,
            descripcion,
            monto: contrato.precio,
            fecha: dayjs().format('YYYY-MM-DD')
        });
    }
}
