📊 Analytiko Dashboard

Analytiko Dashboard est une application React + Vite connectée à Supabase pour afficher vos produits réels, ventes et graphiques.
🚀 Déployée 100% en ligne via Netlify (aucune installation locale requise).

✨ Fonctionnalités

🔥 Produits Tendances (affichés depuis la table products de Supabase)

📈 Graphiques de ventes mensuelles par produit (Recharts, données réelles Supabase)

📊 Cartes de statistiques (ventes totales, clients actifs, produits)

📤 Export CSV (placeholder, facile à connecter plus tard)

⚙️ Technologies utilisées

React 18

Vite

Supabase

Recharts

Netlify

🚀 Déploiement en ligne (100% sans installation locale)
1️⃣ Préparer le projet GitHub

Créez un dépôt sur GitHub
 appelé analytiko-dashboard

Copiez-collez tous les fichiers du projet (structure fournie)

Ajoutez aussi ce fichier README.md

2️⃣ Configurer Supabase

Connectez-vous à Supabase

Créez une base de données si ce n’est pas déjà fait

Copiez :

Project URL (ex : https://xxxx.supabase.co)

anon public key

3️⃣ Déployer sur Netlify

Créez un compte sur Netlify

Cliquez sur Add new site → Import from GitHub

Choisissez votre repo analytiko-dashboard

Paramètres de build :

Build command : npm run build

Publish directory : dist

Variables d’environnement :

VITE_SUPABASE_URL = https://xxxx.supabase.co

VITE_SUPABASE_ANON_KEY = votre_anon_key

Déployez 🎉
Votre site sera accessible à une URL comme :
👉 https://analytiko-dashboard.netlify.app

📂 Structure du projet
analytiko-dashboard/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TrendingProducts.jsx
│   │   ├── SalesChart.jsx
│   │   ├── MonthlySalesChart.jsx
│   │   ├── StatsCard.jsx
│   │   └── ExportCSV.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── supabaseClient.js
├── index.html
├── package.json
├── vite.config.js
└── README.md

✅ Notes importantes

Aucun besoin d’installer quoi que ce soit sur votre machine locale

Tout se fait directement en ligne avec GitHub, Supabase et Netlify

Les modifications sur GitHub déclenchent un redéploiement automatique sur Netlify

👨‍💻 Auteur : Alexi (Cashflow 2030)
📅 Version : 1.0
