# Utiliser une image légère officielle Node.js
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port (ajuste selon ton app)
EXPOSE 4000

# Démarrer l'application
CMD ["npm", "run", "start"]
