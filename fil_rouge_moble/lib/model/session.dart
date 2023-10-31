class Session {
  final int id;
  final String mode;
  final String date;
  final String heureDebut;
  final String heureFin;
  final String duree;
  final String etat;
  final String classe;
  final Cours cours; // Ajoutez cette ligne pour stocker les informations sur le cours

  Session({
    required this.id,
    required this.mode,
    required this.date,
    required this.heureDebut,
    required this.heureFin,
    required this.duree,
    required this.etat,
    required this.classe,
    required this.cours, // Ajoutez cette ligne pour stocker les informations sur le cours
  });

  factory Session.fromJson(Map<String, dynamic> json) {
    return Session(
      id: json['id'],
      mode: json['mode'],
      date: json['date'],
      heureDebut: json['heure_debut'],
      heureFin: json['heure_fin'],
      duree: json['duree'],
      etat: json['etat'],
      classe: json['classe'],
      cours: Cours.fromJson(json['cours']), // Utilisez le constructeur factory de Cours pour désérialiser les données du cours
    );
  }
}

class Cours {
  final int id;
  final int modulesId;
  final int semestresId;
  final int professeursId;
  final String nbrHeure;
  final String professeurs;
  final String semestre;
  final String module;

  Cours({
    required this.id,
    required this.modulesId,
    required this.semestresId,
    required this.professeursId,
    required this.nbrHeure,
    required this.professeurs,
    required this.semestre,
    required this.module,
  });

  factory Cours.fromJson(Map<String, dynamic> json) {
    return Cours(
      id: json['id'],
      modulesId: json['modules_id'],
      semestresId: json['semestres_id'],
      professeursId: json['professeurs_id'],
      nbrHeure: json['nbr_heure'],
      professeurs: json['professeurs'],
      semestre: json['semestre'],
      module: json['module'],
    );
  }
}
