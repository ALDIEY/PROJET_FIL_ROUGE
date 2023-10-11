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
        Schema::table('users', function (Blueprint $table) {
            //
            $table->foreignId('professeur_id')->nullable()->constrained('professeurs');
            $table->foreignId('etudiant_id')->nullable()->constrained('etudiants');
            $table->foreignId('attache_id')->nullable()->constrained('attaches');
            $table->foreignId('responsable_id')->nullable()->constrained('responsables');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
