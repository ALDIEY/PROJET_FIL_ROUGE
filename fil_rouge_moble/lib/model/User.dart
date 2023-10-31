class User {
  final int id;
  final String nom;

  User({required this.id, required this.nom});

  // Factory constructor pour désérialiser les données JSON
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      nom: json['nom'],
    );
  }
}
