<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PayConfirm;
use Carbon\Carbon;

class ConfirmController extends Controller
{

    public function store(Request $request)
    {

        if (is_array($request->all())) {
            foreach ($request->all() as $item) {
                $itemRequest = new Request($item);

                $itemRequest->validate([
                    'documento' => 'required',
                    'monto' => 'required',
                    'fecha_pago' => 'required',
                    'id_pago' => 'required',
                ]);

                // Buscar el PayConfirm en la base de datos que coincida con el id_pago
                $existingPayConfirm = PayConfirm::where('id_pago', $itemRequest->id_pago)->first();

                if ($existingPayConfirm) {
                    // Validar que la fecha no esté vencida y sea menor que la fecha límite
                    $fechaPago = Carbon::parse($itemRequest->fecha_pago);
                    $fechaLimite = Carbon::parse($existingPayConfirm->fecha_limite);

                    if ($fechaPago->lte($fechaLimite)) {
                        // Validar que el monto y el documento coincidan con los almacenados en la base de datos
                        if ($existingPayConfirm->monto == $itemRequest->monto && $existingPayConfirm->documento == $itemRequest->documento) {
                            // Si todo es correcto, guardar el estado como 'EXITO'
                            $existingPayConfirm->estado = 'EXITO';
                        } else {
                            // Si el monto o el documento no coinciden, guardar el estado como 'ERROR'
                            $existingPayConfirm->estado = 'ERROR';
                        }
                    } else {
                        // Si la fecha está vencida, guardar el estado como 'ERROR'
                        $existingPayConfirm->estado = 'ERROR';
                    }

                    $existingPayConfirm->save();

                } else {
                    return response()->json([ "error"=> "Id no enontrado"], 500);

                }

            }
            return response()->json([ "success"=> "Registros Cargados con exito."], 200);
        } else {
            return response()->json([ "error"=>"Entrada no valida."], 500);
        }

    }


}
