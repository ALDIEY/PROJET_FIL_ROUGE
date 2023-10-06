<?php

use App\Models\Classes;
use App\Models\Cours;
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
        Schema::create('cour_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Cours::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Classes::class)->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cour_classes');
    }
};
