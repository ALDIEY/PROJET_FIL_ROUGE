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
