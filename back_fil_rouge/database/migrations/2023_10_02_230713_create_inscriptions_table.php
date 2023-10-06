<?php

use App\Models\Annees;
use App\Models\Classes;
use App\Models\Etudiants;
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
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignIdFor(Etudiants::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Classes::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Annees::class)->constrained()->cascadeOnDelete();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
