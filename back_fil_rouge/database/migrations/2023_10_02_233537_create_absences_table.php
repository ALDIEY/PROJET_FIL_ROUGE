<?php

use App\Models\Attache;
use App\Models\Etudiants;
use App\Models\Sessions;
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
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->string('motif');
            $table->date('date');
            $table->foreignIdFor(Etudiants::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Sessions::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Attache::class)->constrained()->cascadeOnDelete();

            $table->string('justifie');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absences');
    }
};
