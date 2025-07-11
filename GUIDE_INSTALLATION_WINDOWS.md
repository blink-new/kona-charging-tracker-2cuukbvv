# 🪟 Guide d'Installation Windows - Kona Charging Tracker

## 📋 Prérequis

- **Windows 10/11** (64-bit)
- **Node.js** (version 18 ou supérieure) - [Télécharger ici](https://nodejs.org/)
- **Git** (optionnel pour cloner le projet) - [Télécharger ici](https://git-scm.com/)

## 📦 Option 1 : Installation depuis le code source

### 1. Télécharger le projet
```bash
# Cloner le projet (si vous avez Git)
git clone https://github.com/votre-repo/kona-charging-tracker.git
cd kona-charging-tracker

# OU télécharger le ZIP depuis GitHub et l'extraire
```

### 2. Installer les dépendances
```bash
# Dans le dossier racine du projet
npm install

# Dans le dossier electron
cd electron
npm install
cd ..
```

### 3. Générer l'application Windows

#### Option A : Exécutable portable (recommandé)
```bash
# Build l'application React
npm run build

# Générer l'exécutable Windows
npm run electron:build
```

#### Option B : Lancement direct (pour test)
```bash
# Lancer en mode développement
npm run electron:dev
```

### 4. Installer l'application
- L'exécutable `.exe` sera généré dans le dossier `electron/dist/`
- Double-cliquez sur le fichier pour installer l'application
- Suivez les instructions de l'installateur

## 🚀 Option 2 : Exécutable pré-compilé (à venir)

*Un exécutable pré-compilé sera disponible dans les releases GitHub*

## 📱 Première utilisation

### 1. Configuration Bluelink
1. Lancez l'application installée
2. Cliquez sur **"Paramètres"** dans le menu
3. Renseignez vos identifiants Bluelink :
   - **Email** : votre email Bluelink
   - **Mot de passe** : votre mot de passe Bluelink
   - **Code PIN** : le code PIN de votre véhicule
4. Cliquez sur **"Tester la connexion"**
5. Si le test réussit, cliquez sur **"Sauvegarder"**

### 2. Synchronisation des données
1. Dans les paramètres, activez **"Synchronisation automatique"**
2. Choisissez l'intervalle (recommandé : 15-30 minutes)
3. L'application récupérera automatiquement vos données de recharge

### 3. Visualisation
- **Dashboard** : vue d'ensemble avec statistiques
- **Historique** : liste complète des sessions de recharge
- **Graphiques** : évolution batterie et types de charge

## 🔧 Fonctionnalités principales

### Dashboard
- Statut actuel du véhicule
- Statistiques de recharge
- Graphiques interactifs
- Actions rapides

### Historique
- Liste de toutes les sessions
- Filtres par date, type, statut
- Export Excel/CSV
- Tri personnalisable

### Paramètres
- Configuration Bluelink
- Synchronisation automatique
- Gestion des données
- Sécurité

## 📊 Export des données

### Excel
1. Allez dans **"Historique"**
2. Cliquez sur **"Exporter"**
3. Choisissez **"Excel"**
4. Le fichier sera téléchargé automatiquement

### CSV
1. Allez dans **"Historique"**
2. Cliquez sur **"Exporter"**
3. Choisissez **"CSV"**
4. Importez dans votre logiciel préféré

## 🌐 Accès depuis d'autres appareils

### Mode serveur local
1. Notez l'adresse IP de votre PC (ex: 192.168.1.100)
2. Depuis un autre appareil, ouvrez un navigateur
3. Tapez : `http://192.168.1.100:3000`
4. Vous accédez à l'interface web

### Configuration réseau
- L'application est accessible uniquement sur votre réseau local
- Aucune donnée n'est envoyée sur Internet
- Vos identifiants restent sur votre PC

## 🔒 Sécurité

### Stockage des données
- Identifiants chiffrés localement
- Aucun stockage cloud
- Données uniquement sur votre PC

### Recommandations
- Utilisez un antivirus à jour
- Évitez les réseaux WiFi publics
- Sauvegardez régulièrement vos données

## 🆘 Dépannage

### L'application ne se lance pas
1. Vérifiez que Node.js est installé
2. Réinstallez les dépendances : `npm install`
3. Vérifiez les permissions Windows

### Erreur de connexion Bluelink
1. Vérifiez vos identifiants
2. Testez la connexion via l'app mobile Bluelink
3. Vérifiez votre connexion Internet

### Données manquantes
1. Vérifiez la configuration de synchronisation
2. Regardez les logs d'erreur
3. Relancez la synchronisation manuellement

## 📞 Support

### Documentation
- README.md du projet
- Code source sur GitHub
- Issues GitHub pour les bugs

### Communauté
- Discord de la communauté Kona Electric
- Forums Hyundai
- Groupes Facebook dédiés

## 🔄 Mises à jour

### Automatiques
- L'application vérifie automatiquement les mises à jour
- Notification lors de nouvelles versions

### Manuelles
- Téléchargez la nouvelle version
- Désinstallez l'ancienne version
- Installez la nouvelle version
- Vos données sont préservées

## 📝 Notes importantes

⚠️ **API Non Officielle**
- L'API Bluelink utilisée n'est pas officielle
- Peut cesser de fonctionner si Hyundai modifie ses protocoles
- Utilisez l'application à vos propres risques

⚠️ **Fréquence de synchronisation**
- Évitez des intervalles trop courts (< 10 minutes)
- Respectez les limites de l'API
- Surveillez votre consommation data

⚠️ **Sauvegarde**
- Exportez régulièrement vos données
- Conservez une copie de vos fichiers Excel
- Sauvegardez vos paramètres

## 🎯 Conseils d'utilisation

### Optimisation
- Lancez l'application au démarrage Windows
- Configurez la synchronisation selon vos besoins
- Exportez les données mensuellement

### Analyse
- Utilisez les graphiques pour identifier les tendances
- Exportez vers Excel pour analyses avancées
- Comparez vos habitudes de recharge

### Maintenance
- Redémarrez l'application hebdomadairement
- Vérifiez les mises à jour mensuellement
- Nettoyez les données anciennes si nécessaire

---

**Version du guide** : 1.0  
**Date** : Janvier 2025  
**Compatibilité** : Windows 10/11, Hyundai Kona Electric