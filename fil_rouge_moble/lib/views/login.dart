import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fil_rouge/service/auth_service.dart';
import 'package:fil_rouge/widgets/imput_widget.dart';
import 'etudiant.dart';

class LoginPage extends StatefulWidget {
 const LoginPage({Key? key}) : super(key: key);

 @override
 _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
 final TextEditingController _loginController = TextEditingController();
 final TextEditingController _passwordController = TextEditingController();

 Future<void> connecter() async {
  var login = _loginController.text;
  var password = _passwordController.text;


  await Authservice.Login(context, login, password);


 }
 @override
 Widget build(BuildContext context) {
  return Scaffold(
   body: Center(
    child: Column(
     mainAxisAlignment: MainAxisAlignment.center,
     children: [
      const Text('Page de connexion'),
      const SizedBox(
       height: 30,
      ),
      InputWidget(
       hintText: 'login',
       obscureText: false,
       controller: _loginController,
      ),
      const SizedBox(
       height: 20,
      ),
      InputWidget(
       hintText: 'password',
       obscureText: true,
       controller: _passwordController,
      ),
      const SizedBox(
       height: 30,
      ),
      ElevatedButton(
       style: ElevatedButton.styleFrom(
        backgroundColor: Colors.black,
        elevation: 0,
        padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
       ),
       onPressed: () => connecter(),
       child: const Text('connexion'),
      ),
     ],
    ),
   ),
  );
 }
}
