import dayjs from 'dayjs';
import { Contrato } from '../models/contrato.js';

export class ContratoFactory {
    static crear({ cliente_id, plan, fecha_inicio, contrato_origen_id = null }) {
        const inicio = fecha_inicio ?? dayjs().format('YYYY-MM-DD');
        const fin = dayjs(inicio).add(plan.duracion_dias, 'day').format('YYYY-MM-DD');

        return new Contrato({
            cliente_id,
            plan_id: plan.id,
            precio: plan.precio_base,
            fecha_inicio: inicio,
            fecha_fin: fin,
            estado: 'ACTIVO',
            contrato_origen_id,
            condiciones:
                `Plan "${plan.nombre_plan}" nivel ${plan.nivel}, duracion ${plan.duracion_dias} dias. ` +
                `Pago unico de $${Number(plan.precio_base).toFixed(2)}. ` +
                `Si el cliente cancela, se elimina su seguimiento fisico asociado y el contrato queda CANCELADO.`
        });
    }
}
