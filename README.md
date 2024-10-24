Système de Gestion des Employés

Description du Projet :
Ce projet consiste à créer un système de gestion des employés d'une entreprise. Il s'agit de gérer les informations des employés, des départements et des postes dans une entreprise via une interface web.
Le projet inclut les fonctionnalités suivantes :

Stockage des informations des employés, départements et postes dans une base de données SQL.
Affichage des données sur une page web à l'aide d'HTML et CSS.
Ajout d'interactivité avec JavaScript, permettant d'interagir avec la base de données via des formulaires HTML.
Navigation entre les différentes sections de l'interface utilisateur.
Ce projet a été réalisé dans le cadre du cursus Nantes Ynov Campus, en utilisant les technologies suivantes : SQLite, HTML, CSS, JavaScript. Nous avons utilisé VSCode comme éditeur de code principal.

Objectifs
Les principaux objectifs de ce projet sont :

Créer une base de données SQL qui stocke des informations sur les employés, les départements et les postes.
Utiliser des requêtes SQL pour extraire les informations de la base de données et les afficher sur une page web.
Créer une interface utilisateur conviviale en utilisant HTML et CSS pour présenter ces informations.
Permettre aux utilisateurs d'ajouter des employés, des départements, des postes et des produits via des formulaires HTML connectés à la base de données.
Mettre en place des pages de navigation pour faciliter la navigation entre les différentes sections de l'application.
Intégrer des fonctionnalités interactives avec JavaScript.
Technologies Utilisées
SQLite : Pour la gestion de la base de données relationnelle stockant les informations sur les employés, départements, postes, et produits.
HTML/CSS : Pour la création des pages web et la mise en page.
JavaScript : Pour l'ajout de fonctionnalités interactives, telles que la soumission des formulaires et l'affichage dynamique des données.
Node.js avec Express : Pour le serveur backend qui gère les requêtes vers la base de données SQLite.
VSCode : L'éditeur de code utilisé pour développer le projet.
Fonctionnalités
Gestion des employés : Ajouter, visualiser, et gérer les employés de l'entreprise.
Gestion des départements et des postes : Ajouter et organiser les départements ainsi que les postes au sein de l'entreprise.
Interface utilisateur conviviale : Navigation facile entre les différentes sections, formulaires interactifs pour soumettre des informations à la base de données.
Affichage dynamique : Utilisation de JavaScript pour charger et afficher les données des employés, départements, postes, et produits à partir de la base de données.
Structure de la Base de Données
La base de données SQLite comporte plusieurs tables pour gérer les différentes entités :

jobs : Stocke les informations sur les postes disponibles dans l'entreprise.
companies : Stocke les informations sur les entreprises.
departements : Stocke les départements au sein de chaque entreprise.
employees : Stocke les informations sur les employés, y compris leur poste, département, et entreprise.
products : Stocke les informations sur les produits (s'il y a une gestion de produits dans l'entreprise).
Chaque table est liée par des clés étrangères pour assurer l'intégrité des données.

Installation
Clonez le dépôt du projet.
Installez les dépendances Node.js en exécutant :
npm install
Assurez-vous que la base de données SQLite (entreprise.db) est présente dans le répertoire principal du projet.
Pour démarrer le serveur, exécutez :
node server.js
Ouvrez votre navigateur et accédez à http://localhost:3000 pour voir l'interface utilisateur.
Utilisation
Ajout d'employés : Remplissez les formulaires disponibles pour ajouter des employés à la base de données.
Affichage des départements et postes : Les départements et les postes peuvent être ajoutés et gérés via des formulaires similaires, et vous pouvez les afficher dans l'interface.
Gestion des entreprises : Vous pouvez ajouter des informations sur des entreprises et leurs départements.
Auteurs
Ce projet a été réalisé par JOLY Cassian et IBRAHIM Stanislas dans le cadre du projet final en SQL dans la filière de Bachelor Informatique à Nantes Ynov Campus.


