<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PayConfirm;
use Carbon\Carbon;

class PendingController extends Controller
{
    public function store(Request $request)
    {
        if (is_array($request->all())) {
            foreach ($request->all() as $item) {
                $itemRequest = new Request($item);

            /*     $itemRequest->validate([
                    'documento' => 'required',
                    'monto' => 'required',
                    'fecha_pago' => 'required'
                ]); */

                $pay_confirm = new PayConfirm;
                $pay_confirm->documento = $itemRequest->documento;
                $pay_confirm->nombre = $itemRequest->nombre;
                $pay_confirm->correo = $itemRequest->correo;
                $pay_confirm->monto = $itemRequest->monto;
                $pay_confirm->fecha_pago = $itemRequest->fecha_pago;
                $pay_confirm->fecha_limite = $itemRequest->fecha_limite;
                $pay_confirm->save();

                $fecha_pago = Carbon::parse($itemRequest->fecha_pago)->format('Ymd');
                $id_pago = str_pad($pay_confirm->id, 12, '0', STR_PAD_LEFT);
                $codigo = $fecha_pago . $id_pago;
                $pay_confirm->id_pago = $codigo;
                $pay_confirm->save();
                
            }
            return response()->json(["success" => "Registros añadidos."], 203);
        } else {
            return response()->json(["error" => "Entrada no valida."], 500);
        }
    }

    public function index(){
        $data = PayConfirm::all();
        if ($data) {
            return response()->json($data, 200);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

}
