import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../model/Cours.dart';
import '../model/session.dart';


class SessionService {
 static Future<List<Session>> fetchSessionsForUser(int userId) async {
  final String apiUrl = 'http://10.0.2.2:8000/api/etudiant/sessions/$userId';
  final Uri apiUri = Uri.parse(apiUrl);

  final response = await http.get(apiUri);
  if (response.statusCode == 200) {
   Map<String, dynamic> responseData = json.decode(response.body);
   List<dynamic> sessionsData = responseData['data'];
   List<Session> sessions = sessionsData.map((data) {
    // Ignorez la propriété 'cours' lors de la désérialisation
    return Session.fromJson(data);
   }).toList();

   return sessions;
  } else {
   throw Exception('Failed to load sessions');
  }
 }
}




