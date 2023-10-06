<?php

use App\Models\Modules;
use App\Models\Professeurs;
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
        Schema::create('module_professeurs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Professeurs::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Modules::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('module_professeurs');
    }
};
