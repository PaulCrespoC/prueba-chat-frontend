import {ConversacionDetalleI} from "@/interfaces/ConversacionDetalleI";

type Props = {
 detalle: ConversacionDetalleI;
}

export default function Conversacion({detalle}: Props) {
    if (detalle.rol === "user") {
        return (
            <div className="max-w-md ml-auto bg-blue-100 rounded-md shadow-md p-4">
                <div className="font-bold">Usuario</div>
                <div>{detalle.mensaje}</div>
            </div>
        )
    }

    return (
        <div className="max-w-md mr-auto bg-green-100  rounded-md shadow-md p-4">
            <div className="font-bold">CPU</div>
            <div>{detalle.mensaje}</div>
        </div>
    )
}