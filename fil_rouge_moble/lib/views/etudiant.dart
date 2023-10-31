import 'package:flutter/material.dart';
import 'package:fil_rouge/model/User.dart' show User;
import 'package:fil_rouge/model/session.dart' show Session;
import 'package:fil_rouge/service/session_service.dart';

import 'package:fil_rouge/service/auth_service.dart';
import 'cours.dart';

class EtudiantPage extends StatefulWidget {
  final User user;

  EtudiantPage({required this.user});

  @override
  _EtudiantPageState createState() => _EtudiantPageState();
}

class _EtudiantPageState extends State<EtudiantPage> {
  late Future<List<Session>> sessions;

  @override
  void initState() {
    super.initState();
    int userId = widget.user.id;

    sessions = SessionService.fetchSessionsForUser(userId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue,
      appBar: AppBar(
        backgroundColor: Color.fromARGB(255, 211, 82, 82),
        title: Text('${widget.user.nom}'),
        actions: [
          IconButton(
            icon: Icon(Icons.list),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ListeCoursPage(user: widget.user),
                ),
              );
            },
          ),
          IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: () {
              Authservice.logout(context);
            },
          ),
        ],
      ),

      body: FutureBuilder<List<Session>>(
        future: sessions,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erreur: ${snapshot.error}'));
          } else {
            List<Session> sessions = snapshot.data!;
            return DataTable(
              columns: [
                DataColumn(label: Text('Date')),
                DataColumn(label: Text('Module')),
               // DataColumn(label: Text('Professeur')),
                DataColumn(label: Text('début')),
                DataColumn(label: Text('fin')),
              ],
              rows: sessions.map((session) {
                return DataRow(cells: [
                  DataCell(Text(session.date)),
                  DataCell(Text(session.cours.module)),
                 // DataCell(Text(session.cours.professeurs)),
                  DataCell(Text(session.heureDebut)),
                  DataCell(Text(session.heureFin)),
                ]);
              }).toList(),
            );

          }
        },
      ),



      // bottomNavigationBar: NavigationBar(),
    );
  }
}
