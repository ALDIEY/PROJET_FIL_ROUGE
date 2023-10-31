import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../model/User.dart';
import '../views/etudiant.dart';
import '../views/login.dart';

class Authservice {
  static Future<http.Response> Login(BuildContext context, String login, String password) async {
    var url = Uri.parse('http://10.0.2.2:8000/api/login');
    Map data = {'login': login, 'password': password};
    var body = json.encode(data);
    Map<String, String> headers = {'Content-Type': 'application/json'};

    http.Response response = await http.post(url, body: body, headers: headers);

    if (response.statusCode == 200) {
     print('connexion reuissi');
     Map<String, dynamic> responseData = json.decode(response.body);
     String token = responseData['token'];


     // Utilisez le constructeur factory de User pour créer un objet User à partir des données JSON
    User user = User.fromJson(responseData['user']);
//print(user);
// Enregistrez le token et les données de l'utilisateur dans le local storage
  SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('token', token);
    prefs.setInt('userId', user.id); // Stockez l'ID de l'utilisateur comme entier
    prefs.setString('userName', user.nom);
print(user.nom);

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => EtudiantPage(user:user)),
      );
    } else {
      print(response.statusCode);
      print('Échec de l\'authentification');
    }
    return response;
  }
  static Future<void> logout(BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove('token');
    prefs.remove('userId');
    prefs.remove('userName');

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
    );
  }
}
