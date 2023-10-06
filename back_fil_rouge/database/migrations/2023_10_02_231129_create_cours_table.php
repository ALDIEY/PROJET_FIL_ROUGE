<?php

use App\Models\Classes;
use App\Models\Modules;
use App\Models\Professeurs;
use App\Models\Semestres;
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
        Schema::create('cours', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Modules::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Semestres::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Professeurs::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Classes::class)->constrained()->cascadeOnDelete();
            $table->time('nbr_heure');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
