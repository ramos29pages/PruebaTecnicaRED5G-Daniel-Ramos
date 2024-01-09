<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pay_confirms', function (Blueprint $table) {
            $table->id();
            $table->string('documento')->nullable()->defaultValue('00000');
            $table->string('nombre')->nullable()->defaultValue('John');
            $table->string('correo')->nullable();
            $table->integer('monto')->nullable();
            $table->string('fecha_pago')->nullable();
            $table->string('fecha_limite')->nullable();
            $table->string('id_pago')->nullable();
            $table->string('estado')->nullable()->default('Pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pay_confirms');
    }
};
