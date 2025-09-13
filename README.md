# 📊 Analytiko Dashboard

Analytiko Dashboard est une application **React + Vite** connectée à **Supabase** pour afficher vos **produits réels, ventes et graphiques**.  
🚀 Déployée 100% en ligne via **Netlify** (aucune installation locale requise).

---

## ✨ Fonctionnalités
- 🔥 **Produits Tendances** (affichés depuis la table `products` de Supabase)
- 📈 **Graphique de ventes mensuelles** (Recharts)
- 📊 **Cartes de statistiques** (ventes totales, clients actifs, produits)

---

## ⚙️ Technologies utilisées
- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [Recharts](https://recharts.org/en-US/)
- [Netlify](https://www.netlify.com/)

---

## 🚀 Déploiement en ligne (100% sans installation locale)

### 1️⃣ Préparer votre projet GitHub
1. Créez un dépôt sur [GitHub](https://github.com/new) appelé **analytiko-dashboard**.  
2. Copiez-collez **tous les fichiers du projet** (structure fournie).  
3. Ajoutez aussi ce fichier `README.md`.

---

### 2️⃣ Configurer Supabase
1. Connectez-vous à [Supabase](https://supabase.com/).  
2. Créez une base de données si ce n’est pas déjà fait.  
3. Copiez :
   - **Project URL** (exemple : `https://xxxx.supabase.co`)
   - **anon public key**

---

### 3️⃣ Déployer sur Netlify
1. Créez un compte sur [Netlify](https://www.netlify.com/).  
2. Cliquez sur **Add new site → Import from GitHub**.  
3. Choisissez votre repo **analytiko-dashboard**.  

👉 Paramètres de build :  
- **Build command** : `npm run build`  
- **Publish directory** : `dist`  

4. Dans **Site settings → Environment variables**, ajoutez :  
   - `VITE_SUPABASE_URL = https://xxxx.supabase.co`  
   - `VITE_SUPABASE_ANON_KEY = votre_anon_key`  

---

### 4️⃣ Lancer votre dashboard
Une fois le déploiement terminé, Netlify vous donnera une **URL publique** comme :  
👉 `https://analytiko-dashboard.netlify.app`  

C’est votre **dashboard en ligne** connecté à vos données réelles 🎉.

---

## 📂 Structure du projet

analytiko-dashboard/
├── public/
│ └── favicon.ico
├── src/
│ ├── components/
│ │ ├── TrendingProducts.jsx
│ │ ├── SalesChart.jsx
│ │ └── StatsCard.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── supabaseClient.js
├── index.html
├── package.json
├── vite.config.js
└── README.md


---

## ✅ Notes importantes
- Aucun besoin d’installer quoi que ce soit sur votre machine locale.  
- Tout se fait **directement en ligne** avec **GitHub, Supabase et Netlify**.  
- Si vous modifiez le code dans GitHub, Netlify **redéploie automatiquement** votre site.  

---

👨‍💻 **Auteur** : Alexi (Cashflow 2030)  
📅 **Version** : 1.0  
