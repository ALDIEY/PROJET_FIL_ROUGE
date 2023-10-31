import 'package:flutter/material.dart';
import 'package:fil_rouge/model/Cours.dart'; // Assurez-vous d'importer le modèle Cours
import 'package:fil_rouge/model/User.dart' show User;
import 'package:fil_rouge/service/cour_service.dart';

class ListeCoursPage extends StatefulWidget {
  final User user;

  ListeCoursPage({required this.user});

  @override
  _ListeCoursPageState createState() => _ListeCoursPageState();
}

class _ListeCoursPageState extends State<ListeCoursPage> {
  late Future<List<Cours>> cours;

  @override
  void initState() {
    super.initState();
    int userId = widget.user.id;
    // Appelez fetchCourForUser avec l'ID de l'utilisateur
    cours = CourService.fetchCourForUser(userId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Liste des Cours'),
      ),
      body: FutureBuilder<List<Cours>>(
        future: cours,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erreur: ${snapshot.error}'));
          }  else {
            List<Cours> coursList = snapshot.data!;
            return ListView.builder(
              itemCount: coursList.length,
              itemBuilder: (context, index) {
                Cours coursItem = coursList[index];
                return ListTile(
                  title: Text(coursItem.module),
                  subtitle: Text(coursItem.semestre),
                  trailing: Text(coursItem.professeurs),

                );
              },
            );
          }
        },
      ),
    );
  }
}
