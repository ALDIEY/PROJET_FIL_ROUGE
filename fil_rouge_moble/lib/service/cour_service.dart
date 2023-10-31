import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../model/Cours.dart';


class CourService {
  static Future<List<Cours>> fetchCourForUser(int userId) async {
    final String apiUrl = 'http://10.0.2.2:8000/api/etudiant/cours/$userId';
    final Uri apiUri = Uri.parse(apiUrl);

    final response = await http.get(apiUri);
    if (response.statusCode == 200) {
      Map<String, dynamic> responseData = json.decode(response.body);
      List<dynamic> courData = responseData['data'];
      List<Cours> cours = courData.map((data) {
        // Ignorez la propriété 'cours' lors de la désérialisation
        return Cours.fromJson(data);
      }).toList();

      return cours;
    } else {
      throw Exception('Failed to load sessions');
    }
  }
}


