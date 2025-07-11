# 🔧 Dépannage Electron - Fenêtre Blanche

## 🚨 Problème : Fenêtre blanche après installation

### Causes possibles :
1. **Build React manquant** - Le dossier `dist/` n'existe pas
2. **Chemins incorrects** - Electron ne trouve pas les fichiers
3. **Configuration Vite** - Problème de base URL
4. **Antivirus** - Bloque l'exécution des fichiers

---

## ✅ Solution complète

### 1. Vérification du build React
```bash
# Dans le dossier racine du projet
npm run build
```
Vérifiez qu'un dossier `dist/` est créé avec un fichier `index.html`

### 2. Test en mode développement
```bash
# Lancer l'app Electron sans build
npm run electron:dev
```

### 3. Build Windows complet
```bash
# Windows : utiliser le script batch
build-electron.bat

# OU manuellement :
npm run build
cd electron
npm install
npm run build:win
```

### 4. Installation manuelle
1. Allez dans `electron/dist/`
2. Double-cliquez sur le fichier `.exe`
3. Suivez l'installation

---

## 🔍 Diagnostic avancé

### Vérifier les logs Electron
1. Lancez l'app depuis un terminal :
   ```bash
   cd electron
   npm start
   ```
2. Regardez les erreurs dans la console

### Structure de fichiers requise :
```
projet/
├── dist/                 ← Build React (OBLIGATOIRE)
│   ├── index.html
│   ├── assets/
│   └── ...
├── electron/
│   ├── main.js
│   ├── package.json
│   └── dist/            ← Exécutable Windows
│       └── Kona Charging Tracker Setup.exe
```

### Si le dossier dist/ est vide :
```bash
# Forcer le rebuild
rm -rf dist/
npm run build
```

---

## 🌐 Solution de secours

Si l'application ne fonctionne toujours pas :

### Mode fallback automatique
L'app charge automatiquement la version web depuis :
`https://kona-charging-tracker-2cuukbvv.sites.blink.new`

### Mode hors-ligne
Pour forcer le mode local, modifiez `electron/main.js` :
```javascript
// Commentez cette ligne :
// win.loadURL('https://...')

// Et gardez seulement :
win.loadFile(path.join(__dirname, '../dist/index.html'))
```

---

## 📞 Support

### Informations utiles pour le debug :
- Version Node.js : `node --version`
- Version npm : `npm --version`
- Système Windows : Version et architecture
- Antivirus utilisé
- Messages d'erreur exacts

### Tests rapides :
1. **Test web** : Ouvrez https://kona-charging-tracker-2cuukbvv.sites.blink.new
2. **Test local** : `npm run dev` puis http://localhost:3000
3. **Test Electron dev** : `npm run electron:dev`

---

## ⚡ Rebuild rapide

Si vous modifiez le code :
```bash
# Rebuild complet
npm run build && cd electron && npm start
```

Pour distribution :
```bash
# Nouveau build Windows
npm run electron:build
```