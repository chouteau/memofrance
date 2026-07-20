const DEPARTMENTS_DATA = [
  {
    "code": "01",
    "name": "Ain",
    "prefecture": "Bourg-en-Bresse",
    "subprefectures": [
      "Belley",
      "Gex",
      "Nantua"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "02",
    "name": "Aisne",
    "prefecture": "Laon",
    "subprefectures": [
      "Château-Thierry",
      "Saint-Quentin",
      "Soissons",
      "Vervins"
    ],
    "region": "Hauts-de-France"
  },
  {
    "code": "03",
    "name": "Allier",
    "prefecture": "Moulins",
    "subprefectures": [
      "Montluçon",
      "Vichy"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "04",
    "name": "Alpes-de-Haute-Provence",
    "prefecture": "Digne-les-Bains",
    "subprefectures": [
      "Barcelonnette",
      "Castellane",
      "Forcalquier"
    ],
    "region": "Provence-Alpes-Côte d'Azur"
  },
  {
    "code": "05",
    "name": "Hautes-Alpes",
    "prefecture": "Gap",
    "subprefectures": [
      "Briançon"
    ],
    "region": "Provence-Alpes-Côte d'Azur"
  },
  {
    "code": "06",
    "name": "Alpes-Maritimes",
    "prefecture": "Nice",
    "subprefectures": [
      "Grasse"
    ],
    "region": "Provence-Alpes-Côte d'Azur"
  },
  {
    "code": "07",
    "name": "Ardèche",
    "prefecture": "Privas",
    "subprefectures": [
      "Largentière",
      "Tournon-sur-Rhône"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "08",
    "name": "Ardennes",
    "prefecture": "Charleville-Mézières",
    "subprefectures": [
      "Rethel",
      "Sedan",
      "Vouziers"
    ],
    "region": "Grand Est"
  },
  {
    "code": "09",
    "name": "Ariège",
    "prefecture": "Foix",
    "subprefectures": [
      "Pamiers",
      "Saint-Girons"
    ],
    "region": "Occitanie"
  },
  {
    "code": "10",
    "name": "Aube",
    "prefecture": "Troyes",
    "subprefectures": [
      "Bar-sur-Aube",
      "Nogent-sur-Seine"
    ],
    "region": "Grand Est"
  },
  {
    "code": "11",
    "name": "Aude",
    "prefecture": "Carcassonne",
    "subprefectures": [
      "Limoux",
      "Narbonne"
    ],
    "region": "Occitanie"
  },
  {
    "code": "12",
    "name": "Aveyron",
    "prefecture": "Rodez",
    "subprefectures": [
      "Millau",
      "Villefranche-de-Rouergue"
    ],
    "region": "Occitanie"
  },
  {
    "code": "13",
    "name": "Bouches-du-Rhône",
    "prefecture": "Marseille",
    "subprefectures": [
      "Aix-en-Provence",
      "Arles",
      "Istres"
    ],
    "region": "Provence-Alpes-Côte d'Azur"
  },
  {
    "code": "14",
    "name": "Calvados",
    "prefecture": "Caen",
    "subprefectures": [
      "Bayeux",
      "Lisieux",
      "Vire Normandie"
    ],
    "region": "Normandie"
  },
  {
    "code": "15",
    "name": "Cantal",
    "prefecture": "Aurillac",
    "subprefectures": [
      "Mauriac",
      "Saint-Flour"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "16",
    "name": "Charente",
    "prefecture": "Angoulême",
    "subprefectures": [
      "Cognac",
      "Confolens"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "17",
    "name": "Charente-Maritime",
    "prefecture": "La Rochelle",
    "subprefectures": [
      "Jonzac",
      "Rochefort",
      "Saintes",
      "Saint-Jean-d'Angély"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "18",
    "name": "Cher",
    "prefecture": "Bourges",
    "subprefectures": [
      "Saint-Amand-Montrond",
      "Vierzon"
    ],
    "region": "Centre-Val de Loire"
  },
  {
    "code": "19",
    "name": "Corrèze",
    "prefecture": "Tulle",
    "subprefectures": [
      "Brive-la-Gaillarde",
      "Ussel"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "21",
    "name": "Côte-d'Or",
    "prefecture": "Dijon",
    "subprefectures": [
      "Beaune",
      "Montbard"
    ],
    "region": "Bourgogne-Franche-Comté"
  },
  {
    "code": "22",
    "name": "Côtes-d'Armor",
    "prefecture": "Saint-Brieuc",
    "subprefectures": [
      "Dinan",
      "Guingamp",
      "Lannion"
    ],
    "region": "Bretagne"
  },
  {
    "code": "23",
    "name": "Creuse",
    "prefecture": "Guéret",
    "subprefectures": [
      "Aubusson"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "24",
    "name": "Dordogne",
    "prefecture": "Périgueux",
    "subprefectures": [
      "Bergerac",
      "Nontron",
      "Sarlat-la-Canéda"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "25",
    "name": "Doubs",
    "prefecture": "Besançon",
    "subprefectures": [
      "Montbéliard",
      "Pontarlier"
    ],
    "region": "Bourgogne-Franche-Comté"
  },
  {
    "code": "26",
    "name": "Drôme",
    "prefecture": "Valence",
    "subprefectures": [
      "Die",
      "Nyons"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "27",
    "name": "Eure",
    "prefecture": "Évreux",
    "subprefectures": [
      "Les Andelys",
      "Bernay"
    ],
    "region": "Normandie"
  },
  {
    "code": "28",
    "name": "Eure-et-Loir",
    "prefecture": "Chartres",
    "subprefectures": [
      "Châteaudun",
      "Dreux",
      "Nogent-le-Rotrou"
    ],
    "region": "Centre-Val de Loire"
  },
  {
    "code": "29",
    "name": "Finistère",
    "prefecture": "Quimper",
    "subprefectures": [
      "Brest",
      "Châteaulin",
      "Morlaix"
    ],
    "region": "Bretagne"
  },
  {
    "code": "2A",
    "name": "Corse-du-Sud",
    "prefecture": "Ajaccio",
    "subprefectures": [
      "Sartène"
    ],
    "region": "Corse"
  },
  {
    "code": "2B",
    "name": "Haute-Corse",
    "prefecture": "Bastia",
    "subprefectures": [
      "Corte",
      "Calvi"
    ],
    "region": "Corse"
  },
  {
    "code": "30",
    "name": "Gard",
    "prefecture": "Nîmes",
    "subprefectures": [
      "Alès",
      "Le Vigan"
    ],
    "region": "Occitanie"
  },
  {
    "code": "31",
    "name": "Haute-Garonne",
    "prefecture": "Toulouse",
    "subprefectures": [
      "Muret",
      "Saint-Gaudens"
    ],
    "region": "Occitanie"
  },
  {
    "code": "32",
    "name": "Gers",
    "prefecture": "Auch",
    "subprefectures": [
      "Condom",
      "Mirande"
    ],
    "region": "Occitanie"
  },
  {
    "code": "33",
    "name": "Gironde",
    "prefecture": "Bordeaux",
    "subprefectures": [
      "Blaye",
      "Langon",
      "Lesparre-Médoc",
      "Libourne",
      "Arcachon"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "34",
    "name": "Hérault",
    "prefecture": "Montpellier",
    "subprefectures": [
      "Béziers",
      "Lodève"
    ],
    "region": "Occitanie"
  },
  {
    "code": "35",
    "name": "Ille-et-Vilaine",
    "prefecture": "Rennes",
    "subprefectures": [
      "Fougères",
      "Redon",
      "Saint-Malo"
    ],
    "region": "Bretagne"
  },
  {
    "code": "36",
    "name": "Indre",
    "prefecture": "Châteauroux",
    "subprefectures": [
      "Le Blanc",
      "La Châtre",
      "Issoudun"
    ],
    "region": "Centre-Val de Loire"
  },
  {
    "code": "37",
    "name": "Indre-et-Loire",
    "prefecture": "Tours",
    "subprefectures": [
      "Chinon",
      "Loches"
    ],
    "region": "Centre-Val de Loire"
  },
  {
    "code": "38",
    "name": "Isère",
    "prefecture": "Grenoble",
    "subprefectures": [
      "La Tour-du-Pin",
      "Vienne"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "39",
    "name": "Jura",
    "prefecture": "Lons-le-Saunier",
    "subprefectures": [
      "Dole",
      "Saint-Claude"
    ],
    "region": "Bourgogne-Franche-Comté"
  },
  {
    "code": "40",
    "name": "Landes",
    "prefecture": "Mont-de-Marsan",
    "subprefectures": [
      "Dax"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "41",
    "name": "Loir-et-Cher",
    "prefecture": "Blois",
    "subprefectures": [
      "Vendôme",
      "Romorantin-Lanthenay"
    ],
    "region": "Centre-Val de Loire"
  },
  {
    "code": "42",
    "name": "Loire",
    "prefecture": "Saint-Étienne",
    "subprefectures": [
      "Montbrison",
      "Roanne"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "43",
    "name": "Haute-Loire",
    "prefecture": "Le Puy-en-Velay",
    "subprefectures": [
      "Brioude",
      "Yssingeaux"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "44",
    "name": "Loire-Atlantique",
    "prefecture": "Nantes",
    "subprefectures": [
      "Saint-Nazaire",
      "Châteaubriant"
    ],
    "region": "Pays de la Loire"
  },
  {
    "code": "45",
    "name": "Loiret",
    "prefecture": "Orléans",
    "subprefectures": [
      "Montargis",
      "Pithiviers"
    ],
    "region": "Centre-Val de Loire"
  },
  {
    "code": "46",
    "name": "Lot",
    "prefecture": "Cahors",
    "subprefectures": [
      "Figeac",
      "Gourdon"
    ],
    "region": "Occitanie"
  },
  {
    "code": "47",
    "name": "Lot-et-Garonne",
    "prefecture": "Agen",
    "subprefectures": [
      "Marmande",
      "Villeneuve-sur-Lot",
      "Nérac"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "48",
    "name": "Lozère",
    "prefecture": "Mende",
    "subprefectures": [
      "Florac Trois Rivières"
    ],
    "region": "Occitanie"
  },
  {
    "code": "49",
    "name": "Maine-et-Loire",
    "prefecture": "Angers",
    "subprefectures": [
      "Cholet",
      "Saumur",
      "Segré-en-Anjou Bleu"
    ],
    "region": "Pays de la Loire"
  },
  {
    "code": "50",
    "name": "Manche",
    "prefecture": "Saint-Lô",
    "subprefectures": [
      "Avranches",
      "Cherbourg-en-Cotentin",
      "Coutances"
    ],
    "region": "Normandie"
  },
  {
    "code": "51",
    "name": "Marne",
    "prefecture": "Châlons-en-Champagne",
    "subprefectures": [
      "Épernay",
      "Reims",
      "Vitry-le-François"
    ],
    "region": "Grand Est"
  },
  {
    "code": "52",
    "name": "Haute-Marne",
    "prefecture": "Chaumont",
    "subprefectures": [
      "Langres",
      "Saint-Dizier"
    ],
    "region": "Grand Est"
  },
  {
    "code": "53",
    "name": "Mayenne",
    "prefecture": "Laval",
    "subprefectures": [
      "Château-Gontier-sur-Mayenne",
      "Mayenne"
    ],
    "region": "Pays de la Loire"
  },
  {
    "code": "54",
    "name": "Meurthe-et-Moselle",
    "prefecture": "Nancy",
    "subprefectures": [
      "Val de Briey",
      "Lunéville",
      "Toul"
    ],
    "region": "Grand Est"
  },
  {
    "code": "55",
    "name": "Meuse",
    "prefecture": "Bar-le-Duc",
    "subprefectures": [
      "Commercy",
      "Verdun"
    ],
    "region": "Grand Est"
  },
  {
    "code": "56",
    "name": "Morbihan",
    "prefecture": "Vannes",
    "subprefectures": [
      "Lorient",
      "Pontivy"
    ],
    "region": "Bretagne"
  },
  {
    "code": "57",
    "name": "Moselle",
    "prefecture": "Metz",
    "subprefectures": [
      "Forbach",
      "Sarrebourg",
      "Sarreguemines",
      "Thionville"
    ],
    "region": "Grand Est"
  },
  {
    "code": "58",
    "name": "Nièvre",
    "prefecture": "Nevers",
    "subprefectures": [
      "Château-Chinon (Ville)",
      "Clamecy",
      "Cosne-Cours-sur-Loire"
    ],
    "region": "Bourgogne-Franche-Comté"
  },
  {
    "code": "59",
    "name": "Nord",
    "prefecture": "Lille",
    "subprefectures": [
      "Avesnes-sur-Helpe",
      "Cambrai",
      "Douai",
      "Dunkerque",
      "Valenciennes"
    ],
    "region": "Hauts-de-France"
  },
  {
    "code": "60",
    "name": "Oise",
    "prefecture": "Beauvais",
    "subprefectures": [
      "Clermont",
      "Compiègne",
      "Senlis"
    ],
    "region": "Hauts-de-France"
  },
  {
    "code": "61",
    "name": "Orne",
    "prefecture": "Alençon",
    "subprefectures": [
      "Argentan",
      "Mortagne-au-Perche"
    ],
    "region": "Normandie"
  },
  {
    "code": "62",
    "name": "Pas-de-Calais",
    "prefecture": "Arras",
    "subprefectures": [
      "Béthune",
      "Boulogne-sur-Mer",
      "Montreuil-sur-Mer",
      "Saint-Omer",
      "Calais",
      "Lens"
    ],
    "region": "Hauts-de-France"
  },
  {
    "code": "63",
    "name": "Puy-de-Dôme",
    "prefecture": "Clermont-Ferrand",
    "subprefectures": [
      "Ambert",
      "Issoire",
      "Riom",
      "Thiers"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "64",
    "name": "Pyrénées-Atlantiques",
    "prefecture": "Pau",
    "subprefectures": [
      "Bayonne",
      "Oloron-Sainte-Marie"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "65",
    "name": "Hautes-Pyrénées",
    "prefecture": "Tarbes",
    "subprefectures": [
      "Argelès-Gazost",
      "Bagnères-de-Bigorre"
    ],
    "region": "Occitanie"
  },
  {
    "code": "66",
    "name": "Pyrénées-Orientales",
    "prefecture": "Perpignan",
    "subprefectures": [
      "Céret",
      "Prades"
    ],
    "region": "Occitanie"
  },
  {
    "code": "67",
    "name": "Bas-Rhin",
    "prefecture": "Strasbourg",
    "subprefectures": [
      "Haguenau",
      "Molsheim",
      "Saverne",
      "Sélestat"
    ],
    "region": "Grand Est"
  },
  {
    "code": "68",
    "name": "Haut-Rhin",
    "prefecture": "Colmar",
    "subprefectures": [
      "Altkirch",
      "Mulhouse",
      "Thann"
    ],
    "region": "Grand Est"
  },
  {
    "code": "69",
    "name": "Rhône",
    "prefecture": "Lyon",
    "subprefectures": [
      "Villefranche-sur-Saône"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "70",
    "name": "Haute-Saône",
    "prefecture": "Vesoul",
    "subprefectures": [
      "Lure"
    ],
    "region": "Bourgogne-Franche-Comté"
  },
  {
    "code": "71",
    "name": "Saône-et-Loire",
    "prefecture": "Mâcon",
    "subprefectures": [
      "Autun",
      "Chalon-sur-Saône",
      "Charolles",
      "Louhans"
    ],
    "region": "Bourgogne-Franche-Comté"
  },
  {
    "code": "72",
    "name": "Sarthe",
    "prefecture": "Le Mans",
    "subprefectures": [
      "La Flèche",
      "Mamers"
    ],
    "region": "Pays de la Loire"
  },
  {
    "code": "73",
    "name": "Savoie",
    "prefecture": "Chambéry",
    "subprefectures": [
      "Albertville",
      "Saint-Jean-de-Maurienne"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "74",
    "name": "Haute-Savoie",
    "prefecture": "Annecy",
    "subprefectures": [
      "Bonneville",
      "Saint-Julien-en-Genevois",
      "Thonon-les-Bains"
    ],
    "region": "Auvergne-Rhône-Alpes"
  },
  {
    "code": "75",
    "name": "Paris",
    "prefecture": "Paris",
    "subprefectures": [],
    "region": "Île-de-France"
  },
  {
    "code": "76",
    "name": "Seine-Maritime",
    "prefecture": "Rouen",
    "subprefectures": [
      "Dieppe",
      "Le Havre"
    ],
    "region": "Normandie"
  },
  {
    "code": "77",
    "name": "Seine-et-Marne",
    "prefecture": "Melun",
    "subprefectures": [
      "Meaux",
      "Provins",
      "Fontainebleau",
      "Torcy"
    ],
    "region": "Île-de-France"
  },
  {
    "code": "78",
    "name": "Yvelines",
    "prefecture": "Versailles",
    "subprefectures": [
      "Mantes-la-Jolie",
      "Rambouillet",
      "Saint-Germain-en-Laye"
    ],
    "region": "Île-de-France"
  },
  {
    "code": "79",
    "name": "Deux-Sèvres",
    "prefecture": "Niort",
    "subprefectures": [
      "Bressuire",
      "Parthenay"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "80",
    "name": "Somme",
    "prefecture": "Amiens",
    "subprefectures": [
      "Abbeville",
      "Montdidier",
      "Péronne"
    ],
    "region": "Hauts-de-France"
  },
  {
    "code": "81",
    "name": "Tarn",
    "prefecture": "Albi",
    "subprefectures": [
      "Castres"
    ],
    "region": "Occitanie"
  },
  {
    "code": "82",
    "name": "Tarn-et-Garonne",
    "prefecture": "Montauban",
    "subprefectures": [
      "Castelsarrasin"
    ],
    "region": "Occitanie"
  },
  {
    "code": "83",
    "name": "Var",
    "prefecture": "Toulon",
    "subprefectures": [
      "Draguignan",
      "Brignoles"
    ],
    "region": "Provence-Alpes-Côte d'Azur"
  },
  {
    "code": "84",
    "name": "Vaucluse",
    "prefecture": "Avignon",
    "subprefectures": [
      "Apt",
      "Carpentras"
    ],
    "region": "Provence-Alpes-Côte d'Azur"
  },
  {
    "code": "85",
    "name": "Vendée",
    "prefecture": "La Roche-sur-Yon",
    "subprefectures": [
      "Fontenay-le-Comte",
      "Les Sables-d'Olonne"
    ],
    "region": "Pays de la Loire"
  },
  {
    "code": "86",
    "name": "Vienne",
    "prefecture": "Poitiers",
    "subprefectures": [
      "Châtellerault",
      "Montmorillon"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "87",
    "name": "Haute-Vienne",
    "prefecture": "Limoges",
    "subprefectures": [
      "Bellac",
      "Rochechouart"
    ],
    "region": "Nouvelle-Aquitaine"
  },
  {
    "code": "88",
    "name": "Vosges",
    "prefecture": "Épinal",
    "subprefectures": [
      "Neufchâteau",
      "Saint-Dié-des-Vosges"
    ],
    "region": "Grand Est"
  },
  {
    "code": "89",
    "name": "Yonne",
    "prefecture": "Auxerre",
    "subprefectures": [
      "Avallon",
      "Sens"
    ],
    "region": "Bourgogne-Franche-Comté"
  },
  {
    "code": "90",
    "name": "Territoire de Belfort",
    "prefecture": "Belfort",
    "subprefectures": [],
    "region": "Bourgogne-Franche-Comté"
  },
  {
    "code": "91",
    "name": "Essonne",
    "prefecture": "Évry-Courcouronnes",
    "subprefectures": [
      "Étampes",
      "Palaiseau"
    ],
    "region": "Île-de-France"
  },
  {
    "code": "92",
    "name": "Hauts-de-Seine",
    "prefecture": "Nanterre",
    "subprefectures": [
      "Antony",
      "Boulogne-Billancourt"
    ],
    "region": "Île-de-France"
  },
  {
    "code": "93",
    "name": "Seine-Saint-Denis",
    "prefecture": "Bobigny",
    "subprefectures": [
      "Le Raincy",
      "Saint-Denis"
    ],
    "region": "Île-de-France"
  },
  {
    "code": "94",
    "name": "Val-de-Marne",
    "prefecture": "Créteil",
    "subprefectures": [
      "Nogent-sur-Marne",
      "L'Haÿ-les-Roses"
    ],
    "region": "Île-de-France"
  },
  {
    "code": "95",
    "name": "Val-d'Oise",
    "prefecture": "Pontoise",
    "subprefectures": [
      "Argenteuil",
      "Sarcelles"
    ],
    "region": "Île-de-France"
  },
  {
    "code": "971",
    "name": "Guadeloupe",
    "prefecture": "Basse-Terre",
    "subprefectures": [
      "Pointe-à-Pitre"
    ],
    "region": "Guadeloupe"
  },
  {
    "code": "972",
    "name": "Martinique",
    "prefecture": "Fort-de-France",
    "subprefectures": [
      "La Trinité",
      "Le Marin",
      "Saint-Pierre"
    ],
    "region": "Martinique"
  },
  {
    "code": "973",
    "name": "Guyane",
    "prefecture": "Cayenne",
    "subprefectures": [
      "Saint-Laurent-du-Maroni",
      "Saint-Georges"
    ],
    "region": "Guyane"
  },
  {
    "code": "974",
    "name": "La Réunion",
    "prefecture": "Saint-Denis",
    "subprefectures": [
      "Saint-Pierre",
      "Saint-Benoît",
      "Saint-Paul"
    ],
    "region": "La Réunion"
  },
  {
    "code": "976",
    "name": "Mayotte",
    "prefecture": "Mamoudzou",
    "subprefectures": [],
    "region": "Mayotte"
  }
];