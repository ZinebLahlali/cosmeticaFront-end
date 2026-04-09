# API E-commerce - Gestion des produits et commandes

## Description

Cette API permet de gérer une boutique en ligne avec authentification JWT, consultation des produits, passage et suivi des commandes, gestion interne par les employés, ainsi qu’un tableau de statistiques pour les administrateurs.

Elle a été conçue avec **Laravel** et suit une architecture RESTful.

---

## Fonctionnalités

### Côté client
- Inscription et connexion avec génération d’un **token JWT**
- Consultation de la liste des produits disponibles
- Consultation du détail d’un produit via son **slug**
- Passage d’une commande avec plusieurs produits et quantités
- Vérification de l’état d’une commande
- Annulation d’une commande avant préparation

### Côté employé
- Connexion sécurisée
- Gestion des commandes selon les permissions du rôle
- Passage d’une commande au statut **préparée / prête à livrer**

### Côté administrateur
- Consultation des statistiques de ventes
- Produits les plus populaires
- Répartition des ventes par catégorie
- Utilisation du **Query Builder Laravel** pour les rapports

### Côté développeur
- Collection **Postman** pour tester les endpoints
- Documentation API via **Swagger / OpenAPI**

---

## Technologies utilisées

- **PHP**
- **Laravel**
- **MySQL**
- **JWT Auth**
- **Laravel Query Builder**
- **Postman**

---

## Authentification

L’API utilise une authentification basée sur **JWT**.

Après connexion, l’utilisateur reçoit un token à envoyer dans les headers :

```http
Authorization: Bearer votre_token_jwt
