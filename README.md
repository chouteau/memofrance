# 🗺️ Mémomap France

**Mémomap France** est un jeu de quiz géographique interactif moderne et esthétique, conçu pour tester et améliorer votre mémoire sur la géographie française (métropole et Outre-mer). 

*💡 Un clin d'œil amusant : C'est le jeu idéal à pratiquer en attendant que les Agents IA finissent de produire votre code... 😉*

L'application est entièrement statique, fluide et fonctionne **directement localement** dans votre navigateur (aucun serveur ni base de données requis).

---

## 🚀 Caractéristiques Principales

### 1. Deux Mécaniques de Jeu
*   **Mode QCM (Choix Multiples)** : Identifiez les zones mises en surbrillance sur la carte ou associez les bonnes préfectures parmi 4 propositions interactives.
*   **Mode Clic sur Carte (Localisation)** : Le jeu annonce une cible (département, code, région, préfecture) et vous devez cliquer directement sur le bon emplacement sur la carte muette.

### 2. Moteur de Quiz Intelligent (5 Catégories)
*   **Identification sur carte** : Trouver le nom d'un département ou d'une région à partir de sa mise en surbrillance.
*   **Associer le numéro** : Associer le code INSEE d'un département à son nom.
*   **Trouver la préfecture/sous-préfecture** : Trouver la préfecture d'un département, ou identifier laquelle parmi les propositions est une sous-préfecture.
*   **Trouver le département depuis la ville** : Identifier le département d'appartenance d'une préfecture ou sous-préfecture.
*   **Distracteurs intelligents** : Les fausses propositions du QCM sont sélectionnées intelligemment (par exemple, des départements de la même région) pour rendre le jeu stimulant.

### 3. Fonctionnalités Premium
*   **Fluidité de jeu (Auto-transition)** : Pour dynamiser le jeu, si vous donnez une réponse **correcte**, le quiz passe automatiquement à la question suivante après un délai d'une seconde (laissant le temps de voir la confirmation visuelle en vert). En revanche, si la réponse est **fausse**, le jeu se fige pour afficher les explications détaillées et nécessite un clic manuel sur le bouton "Question Suivante", favorisant ainsi la mémorisation et l'apprentissage.
*   **Système Anti-Triche** : Pendant une partie active, l'affichage des infobulles (tooltips) au survol de la carte est désactivé jusqu'à ce que la réponse soit validée, empêchant le joueur de tricher en survolant la carte pour lire les noms.
*   **Bilan de fin de jeu et révision interactive** : À l'issue des 20 questions, un écran affiche votre note sur 20 avec un message de niveau, ainsi qu'une liste récapitulative de toutes les erreurs commises. En cliquant sur une ligne du bilan, le département concerné s'illumine sur la carte (en rouge pour votre erreur, en vert pour la bonne réponse) pour vous permettre de réviser.
*   **Synthétiseur Audio Intégré** : Des effets sonores immédiats sont générés dynamiquement par l'API Web Audio (aucun fichier MP3 externe à charger).
*   **Design Épuré & Thèmes** : Interface responsive de type Glassmorphism avec un commutateur rapide entre le **thème sombre** (bleu nuit) et le **thème clair** (gris/blanc épuré), persistant via `localStorage`.

---

## 🛠️ Stack Technique

*   **HTML5** : Structure sémantique avec carte vectorielle **SVG** (dérivée des données de la Gendarmerie Nationale et de la norme ISO 3166-2) intégrée directement dans le DOM pour des performances optimales.
*   **CSS3** : Variables CSS pour le thémage, animations sur mesure, flexbox et grille responsive pour un affichage sur PC et tablettes.
*   **JavaScript (ES6 Vanilla)** : Algorithmes de génération de quiz, deduplication automatique par signature (aucune question identique dans la même partie), et manipulation du DOM.

---

## 📂 Organisation du Dépôt

*   `index.html` : La page d'accueil et d'exécution du jeu contenant la carte SVG en ligne.
*   `style.css` : Feuille de style CSS et design system de l'application.
*   `app.js` : Moteur de jeu et logique événementielle.
*   `departments.js` : Base de données compilée contenant les 101 départements français, leurs préfectures, régions et sous-préfectures.
*   `dev_tools/` : Scripts de développement (scraping Wikipédia pour les sous-préfectures, requêtes sur geo.api.gouv.fr pour les codes officiels géographiques et script de build HTML).

---

## 🎮 Comment Lancer le Jeu

1.  Téléchargez ou clonez le dépôt.
2.  Double-cliquez sur le fichier **`index.html`** à la racine pour l'ouvrir directement dans votre navigateur web habituel.
3.  Sélectionnez vos paramètres de jeu, puis cliquez sur **Commencer le Quiz** !
