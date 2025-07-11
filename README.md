# 🚗⚡ Kona Charging Tracker

Une application web moderne pour historiser et visualiser les données de recharge de votre **Hyundai Kona Electric** via l'API Bluelink.

![Kona Charging Tracker](https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop)

## ✨ Fonctionnalités

### 🎯 Données de Recharge
- **Récupération automatique** des données via API Bluelink
- **Historisation complète** des sessions de charge
- **Données détaillées** : niveau batterie, type de charge (AC/DC), durée, localisation, puissance
- **Statut en temps réel** de votre véhicule

### 📊 Visualisation
- **Dashboard interactif** avec statistiques en temps réel
- **Graphiques d'évolution** du niveau de batterie
- **Analyse des types de charge** (AC vs DC)
- **Historique détaillé** avec filtres et tri
- **Interface moderne** et responsive

### 💾 Export et Partage
- **Export Excel/CSV** compatible avec vos outils préférés
- **Rapports personnalisés** pour analyse détaillée
- **Données structurées** prêtes pour analysis

### ⚙️ Configuration
- **Connexion sécurisée** à Bluelink
- **Synchronisation automatique** configurable
- **Stockage local sécurisé** des identifiants
- **Planification flexible** des récupérations

## 🚀 Démarrage Rapide

### Prérequis
- Compte **Hyundai Bluelink** actif
- Véhicule **Hyundai Kona Electric** connecté
- Navigateur web moderne

### Installation
```bash
# Cloner le projet
git clone https://github.com/votre-repo/kona-charging-tracker.git

# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

### Configuration
1. **Ouvrez l'application** dans votre navigateur
2. **Allez dans Paramètres** (icône engrenage)
3. **Configurez vos identifiants Bluelink** :
   - Email de votre compte Bluelink
   - Mot de passe
   - Code PIN de votre véhicule
4. **Testez la connexion** et sauvegardez
5. **Activez la synchronisation automatique** si souhaité

## 📱 Utilisation

### Dashboard
- **Vue d'ensemble** : statistiques principales et statut actuel
- **Graphiques temps réel** : évolution batterie et répartition charges
- **Actions rapides** : planification, recherche bornes, rapports

### Historique
- **Table complète** de toutes vos sessions de charge
- **Filtres avancés** : par date, type, statut, localisation
- **Tri personnalisable** : par date, niveau batterie, durée
- **Export facile** vers Excel/CSV

### Paramètres
- **Configuration Bluelink** avec test de connexion
- **Synchronisation automatique** avec intervalles configurables
- **Gestion des données** et export
- **Sécurité et confidentialité**

## 🔧 Architecture Technique

### Frontend
- **React 19** avec TypeScript
- **Vite** pour le build et dev server
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants
- **Recharts** pour les graphiques
- **React Router** pour la navigation

### Données
- **Context API** pour la gestion d'état
- **LocalStorage** pour la persistance
- **API Bluelink** (non officielle) pour les données véhicule
- **Export CSV/Excel** pour l'analyse externe

### Sécurité
- **Chiffrement local** des identifiants
- **Aucun stockage serveur** des données personnelles
- **Communication HTTPS** uniquement
- **Validation des données** côté client

## 📊 Structure des Données

### Session de Recharge
```typescript
interface ChargingSession {
  id: string
  timestamp: Date
  batteryLevel: number
  isCharging: boolean
  chargeType: 'AC' | 'DC'
  remainingTimeMinutes?: number
  location?: string
  power?: number
  sessionDurationMinutes?: number
  startBatteryLevel?: number
  endBatteryLevel?: number
}
```

### Format d'Export Excel
| Colonne | Description |
|---------|-------------|
| Date/Heure | Timestamp de la session |
| Niveau batterie (%) | Pourcentage de charge |
| En charge | Oui/Non |
| Type de charge | AC ou DC |
| Temps restant (min) | Minutes restantes estimées |
| Localisation | Position géographique |
| Puissance (kW) | Puissance de charge |
| Durée session (min) | Durée totale de la session |

## ⚠️ Points d'Attention

### API Non Officielle
- L'API Bluelink utilisée n'est **pas officielle**
- Peut cesser de fonctionner si Hyundai modifie ses protocoles
- **Recommandation** : exécuter régulièrement pour constituer l'historique

### Données Personnelles
- Vos identifiants sont **stockés localement** uniquement
- **Aucune transmission** vers des serveurs tiers
- **Chiffrement** des données sensibles dans le navigateur

### Fréquence de Synchronisation
- **Évitez** les intervalles trop courts (< 10 minutes)
- **Respectez** les limites de l'API Bluelink
- **Surveillez** la consommation de votre forfait data

## 🔮 Évolutions Futures

### Court Terme
- [ ] **Notifications push** pour événements de charge
- [ ] **Exportation PDF** des rapports
- [ ] **Thème sombre** pour l'interface
- [ ] **PWA** pour installation mobile

### Moyen Terme
- [ ] **Historisation des trajets** et consommation
- [ ] **Comparaison mensuelle** et tendances
- [ ] **Géolocalisation** des bornes de recharge
- [ ] **Intégration calendrier** pour planification

### Long Terme
- [ ] **API officielle Hyundai** (si disponible)
- [ ] **Multi-véhicules** pour flottes
- [ ] **Partage communautaire** des données anonymisées
- [ ] **Machine Learning** pour prédictions

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- 🐛 **Signaler des bugs** via les issues
- 💡 **Proposer des améliorations**
- 🔧 **Soumettre des PR** pour nouvelles fonctionnalités
- 📚 **Améliorer la documentation**

## 📄 Licence

MIT License - Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Hyundai** pour le véhicule Kona Electric
- **Communauté open source** pour les outils utilisés
- **API Bluelink** (non officielle) pour l'accès aux données
- **Développeurs** ayant contribué au projet

---

**Note** : Cette application utilise une API non officielle. L'auteur n'est pas responsable des éventuels dysfonctionnements ou arrêts de service. Utilisez à vos propres risques et respectez les conditions d'utilisation de Hyundai Bluelink.