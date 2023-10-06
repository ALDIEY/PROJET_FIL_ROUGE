<?php

use App\Models\Attache;
use App\Models\Cour_Semestres;
use App\Models\Cours;
use App\Models\Professeurs;
use App\Models\Responsables;
use App\Models\Salles;
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
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->string('mode');
            $table->date('date');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->time('duree');
            $table->string('etat');
            $table->foreignIdFor(Cours::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Attache::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Responsables::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Salles::class)->nullable()->constrained()->cascadeOnDelete();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
