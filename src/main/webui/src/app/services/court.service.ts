import { Injectable } from '@angular/core';

export interface Court {
  nom: string;
  coord: [number, number];
  description: string;
}

export interface Club {
  nom: string;
  coord: [number, number];
  description: string;
  iconFileName: string;
}

export interface PickUpGame {
  nom: string;
  coord: [number, number];
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  
  private courts: Court[] = [
    { nom: "Parc du Cinquantenaire", coord: [50.842403, 4.392589], description: "2 paniers, sol béton" },
    { nom: "Parc Bonnevie (Molenbeek)", coord: [50.85618, 4.33678], description: "Terrain de quartier" },
    { nom: "Square Marguerite (Schaerbeek)", coord: [50.847037, 4.386453], description: "Terrain ouvert" },
    { nom: "Avenue Ernest Renan (Schaerbeek)", coord: [50.868425, 4.383567], description: "2 terrains en dur, 1 avec un seul panier, et l'autre full court" },
    { nom: "Parc Georges Henri (Woluwe-Saint-Lambert)", coord: [50.846087, 4.420241], description: "Terrain de basket en dur" },
    { nom: "Terrain Mehdi Bouda (Bruxelles-Ville)", coord: [50.850928, 4.344601], description: "Terrain de basket en dur" },
    { nom: "Diegem", coord: [50.89327, 4.440614], description: "Terrain de basket en dur" },
    { nom: "Parc de la Jeunesse (Jette)", coord: [50.88222296000289, 4.331819549676462], description: "Terrain de basket en dur" },
    { nom: "Parc Roi Baudouin (Jette)", coord: [50.88157110648408, 4.322927890250596], description: "Un seul panier, sol béton" },
    { nom: "Parc Elizabeth (Koekelberg)", coord: [50.864058216230596, 4.325778421427899], description: "Terrain de basket en dur" },
    { nom: "Rue de la Buanderie (Bruxelles-Ville)", coord: [50.84685258891501, 4.341920008129044], description: "Terrain de basket en dur, multisport basket/foot" },
    { nom: "Rinsdelle (Etterbeek)", coord: [50.83386127182172, 4.395674637704626], description: "Terrain de basket en dur" },
    { nom: "René Challon (Ixelles)", coord: [50.818551859712905, 4.359701862783356], description: "Terrain de basket en dur, paniers moins hauts" },
    { nom: "Espace Gaucheret (Schaerbeek)", coord: [50.864419635476764, 4.360204356627058], description: "2 terrains de basket en dur" },
    { nom: "Jules de Trooz (Bruxelles-Ville)", coord: [50.87322357535936, 4.360820234423366], description: "Terrain de basket en dur, 2 paniers" },
    { nom: "Cité Modèle (Laeken)", coord: [50.89526257196254, 4.3227826775054226], description: "Terrain de basket en dur, 2 paniers" },
    { nom: "Avenue du Port (Bruxelles-Ville)", coord: [50.85996493595401, 4.3465601730667345], description: "2 terrains de basket en dur, 2 paniers" },
    { nom: "Rue des Capucins (Bruxelles-Ville)", coord: [50.83749736615349, 4.347929563727628], description: "Terrain de basket en dur, 2 paniers" },
    { nom: "Morichar (Saint-Gilles)", coord: [50.8273587762185, 4.347722777331711], description: "Terrain de basket en dur, 2 paniers" },
    { nom: "Parc Lacroix (Schaerbeek)", coord: [50.87257275942605, 4.376767218842149], description: "Terrain de basket en dur" },
    { nom: "Peterbos (Anderlecht)", coord: [50.843619569337484, 4.295181633854831], description: "Terrain de basket en dur" },
    { nom: "Place Severine (Anderlecht)", coord: [50.83689391220824, 4.278317080677042], description: "Terrain de basket en dur" },
    { nom: "La Patch (Anderlecht)", coord: [50.81806925222572, 4.298753252547298], description: "Terrain de basket en dur" },
    { nom: "Veeweyde (Anderlecht)", coord: [50.827909951978825, 4.298267161735679], description: "Terrain de basket en dur" },
    { nom: "Place Lehon (Schaerbeek)", coord: [50.86462010236455, 4.3716100101168704], description: "Terrain de basket en dur" },
    { nom: "Basketball Court FC ST Josse", coord: [50.857674574501495, 4.422275114442067], description: "Terrain de basket en dur" },
    { nom: "Parc des Muses (Molenbeek)", coord: [50.85411394974745, 4.316630784892097], description: "Terrain de basket en dur" },
    { nom: "'t Hof Ter Overbeeke (Berchem-Sainte-Agathe)", coord: [50.86961, 4.286886], description: "Terrain de basket en dur" },
    { nom: "Moortebeek (Anderlecht)", coord: [50.84502698849703, 4.290570650026593], description: "Terrain de basket en dur" },
    { nom: "Merlo (Uccle)", coord: [50.79868219898505, 4.319082868000769], description: "Terrain de basket en dur" },
    { nom: "Square Felix Delhaye (Saint-Josse-ten-Noode)", coord: [50.85159398143303, 4.379633624995876], description: "Terrain de basket en dur" },
    { nom: "Melkriek Basketball (Uccle)", coord: [50.789212356034916, 4.3231587358381], description: "Terrain de basket en dur" },
    { nom: "Complexe Sportif de Berchem-Sainte-Agathe", coord: [50.86864247080661, 4.286554839714516], description: "2 paniers dans un cercle fermé" },
  ];

  private multiSportCourts: Court[] = [
    { nom: "Rue des Palais Outre-Ponts (Laeken)", coord: [50.877143, 4.360295], description: "Terrain multisport basket/foot" },
    { nom: "Haren", coord: [50.894649, 4.420474], description: "Terrain multisport basket/foot" },
    { nom: "Parc Andromède (Woluwe Saint-Lamnbert)", coord: [50.854257656670846, 4.423462547363887], description: "Terrain multisport basket/foot" },
    { nom: "Parc Maximilien (Bruxelles-Ville)", coord: [50.862381721078954, 4.354739629202508], description: "Terrain multisport basket/foot" },
    { nom: "Parc d'Osseghem (Laeken)", coord: [50.893024832347805, 4.345481999785815], description: "Terrain multisport basket/foot" },
    { nom: "Versailles (Neder-Over-Heembeek)", coord: [50.89697371496511, 4.3754823724854015], description: "Terrain multisport basket/foot" },
    { nom: "Quai du Foin (Bruxelles-Ville)", coord: [50.85556062316355, 4.3481641140657645], description: "Terrain multisport basket/foot" },
    { nom: "Parc Neder Escalier (Neder-Over-Heembeek)", coord: [50.90004418045241, 4.381795893227433], description: "Terrain multisport basket/foot" },
    { nom: "Parc Marie Janson (Saint-Gilles)", coord: [50.8300604654061, 4.347095087126007], description: "Terrain multisport basket/foot" },
    { nom: "Stade Fallon (Woluwe Saint-Lambert)", coord: [50.84447235442927, 4.4546750404700255], description: "Terrain multisport basket/foot" },
    { nom: "Parc Victoria (Koekelberg)", coord: [50.85907948278428, 4.329739762517332], description: "Terrain multisport basket/foot" },
    { nom: "Brigittines (Bruxelles-Ville)", coord: [50.8405160468231, 4.347250574665108], description: "Terrain multisport basket/foot" },
    { nom: "Porte de Hal (Bruxelles-Ville)", coord: [50.83300066106908, 4.348142455981456], description: "Terrain multisport basket/foot" },
    { nom: "Place Adolphe Sax (Etterbeek)", coord: [50.82569996639458, 4.380444739201313], description: "Terrain multisport basket/foot" },
    { nom: "Botanique (Bruxelles-Ville)", coord: [50.855676429727566, 4.364110440248067], description: "Terrain multisport basket/foot" },
    { nom: "Square du Prince Léopold (Laeken)", coord: [50.88355665912639, 4.34033718130759], description: "Terrain multisport basket/foot" },
    { nom: "Ligne 28 (Bruxelles-Ville)", coord: [50.871348328148656, 4.341166638940061], description: "Terrain multisport basket/foot" },
    { nom: "Agoraspace Chazal (Schaerbeek)", coord: [50.85867973171001, 4.3939282576708365], description: "Terrain multisport basket/foot" },
    { nom: "Parc Fontainas (Bruxelles-Ville)", coord: [50.8460745161563, 4.345456332065738], description: "Terrain multisport basket/foot" },
    { nom: "Agoraspace Josaphat (Schaerbeek)", coord: [50.86402809058351, 4.38142317880381], description: "Terrain multisport basket/foot" },
    { nom: "Stephenson (Schaerbeek)", coord: [50.87146485575933, 4.370078336637557], description: "Terrain multisport basket/foot" },
    { nom: "Georges Benoidt (Watermael-Boitsfort)", coord: [50.79989190527104, 4.413958996135121], description: "Terrain multisport basket/foot" },
    { nom: "Quai du Hainaut (Molenbeek)", coord: [50.85057285219367, 4.336172519011198], description: "Terrain multisport basket/foot" },
    { nom: "Agoraspace Lambin (Auderghem)", coord: [50.809164858788996, 4.433118983575772], description: "Terrain multisport basket/foot" },
    { nom: "Agora Liverpool (Anderlecht)", coord: [50.84446245253038, 4.332243963473624], description: "Terrain multisport basket/foot" },
    { nom: "Agora Fécondité (Anderlecht)", coord: [50.83816303519733, 4.27641952661947], description: "Terrain multisport basket/foot" },
    { nom: "Aumale (Anderlecht)", coord: [50.84023562388431, 4.312273839959331], description: "Terrain multisport basket/foot" },
    { nom: "Dries (Watermael-Boitsfort)", coord: [50.80218449531089, 4.3972083830671505], description: "Terrain multisport basket/foot" },
    { nom: "Rue de Picardie (Evere)", coord: [50.877356016174836, 4.395265533813575], description: "Terrain multisport basket/foot" },
    { nom: "Parc Crickx (Anderlecht)", coord: [50.83615113166934, 4.320504149798774], description: "Terrain multisport basket/foot" },
    { nom: "Avenue du Gibet (Evere)", coord: [50.865080347770565, 4.423678144149052], description: "Terrain multisport basket/foot" },
    { nom: "Parc Bruyn (Neder-Over-Heembeek)", coord: [50.908798328403094, 4.38811273785228], description: "Terrain multisport basket/foot" },
    { nom: "Square Jacques Brel (Bruxelles-Ville)", coord: [50.851474448133715, 4.343261896617027], description: "Terrain multisport basket/foot" },
  ];

  private clubs: Club[] = [
    { nom: "Dino Brussels", coord: [50.864373, 4.391774], description: "<a href='https://dino.brussels/'>🧑🏻‍💻</a>", iconFileName: "assets/images/dino-brussels-icon.png" },
    { nom: "Royal Canter Schaerbeek", coord: [50.869625, 4.384862], description: "<a href='https://www.royalcanter.be/'>🧑🏻‍💻</a>", iconFileName: "assets/images/royal-canter-icon.png" },
    { nom: "Royal Excelsior Brussels", coord: [50.892988, 4.376862], description: "<a href='https://www.excelsiorbrussels.be'>🧑🏻‍💻</a>", iconFileName: "assets/images/royal-excelsior-icon.png" },
    { nom: "ULB Owls (ULB Sports)", coord: [50.8137, 4.3823], description: "<a href='http://ulbsports.eu'>🧑🏻‍💻</a>", iconFileName: "assets/images/ulb-owls-icon.png" },
    { nom: "VUB Basketball", coord: [50.8208, 4.3943], description: "<a href='http://vub.be/sport'>🧑🏻‍💻</a>", iconFileName: "assets/images/vub-basketball-icon.png" },
    { nom: "Uccle Europe Basket", coord: [50.80056, 4.338801], description: "<a href='https://uebasket.be'>🧑🏻‍💻</a>", iconFileName: "assets/images/uccle-europe-icon.jpg" },
    { nom: "Fresh Air Jette", coord: [50.883264, 4.333509], description: "<a href='http://freshairbasket.be'>🧑🏻‍💻</a>", iconFileName: "assets/images/fresh-air-icon.jpg" },
    { nom: "Royal IV Brussels", coord: [50.841654, 4.343372], description: "<a href='mailto:bcroyal4@live.be'>📨</a>", iconFileName: "assets/images/royal-iv-icon.png" },
    { nom: "Royal Maccabi Brussels", coord: [50.8073, 4.3525], description: "<a href='mailto:royalmaccabi@gmail.com'>📨</a>", iconFileName: "assets/images/royal-maccabi-icon.png" },
    { nom: "Royal Linthout BC", coord: [50.843426, 4.428382], description: "<a href='mailto:info@royallinthout.be'>📨</a>", iconFileName: "assets/images/royal-linthout-icon.png" },
    { nom: "AS Haren", coord: [50.891654, 4.420456], description: "<a href='https://www.facebook.com/asharenbasket/'>📨</a>", iconFileName: "assets/images/as-haren-icon.png" },
    { nom: "Royal Anciens 13 BC", coord: [50.854215, 4.310561], description: "<a href='mailto:anciens13bc@gmail.com'>📨</a>", iconFileName: "assets/images/anciens13-icon.jpg" },
    { nom: "Berchem BBC", coord: [50.86961, 4.286886], description: "<a href='mailto:berchembbc@gmail.com'>📨</a>", iconFileName: "assets/images/berchem-bbc-icon.webp" },
    { nom: "Molenbeek Rebels", coord: [50.86225582379745, 4.326822937579879], description: "<a href='https://molenbeekrebels.wixsite.com/molenbeekrebels/home'> 🧑🏻‍💻</a>", iconFileName: "assets/images/rebels-icon.png" },
    { nom: "Black Devils Vorst", coord: [50.80764357688078, 4.326912401986094], description: "<a href='https://www.blackdevilsvorst.be/'> 🧑🏻‍💻</a>", iconFileName: "assets/images/black-devils-icon.svg" },
    { nom: "BC Avenir Evere", coord: [50.860725671938596, 4.416413666567762], description: "<a href='https://www.avenireverebc.be/'> 🧑🏻‍💻</a>", iconFileName: "assets/images/avenir-evere-icon.jpeg" },
    { nom: "Brussels Basketball", coord: [50.89286017335025, 4.3765829134223], description: "<a href='https://www.brusselsbasketball.be/'> 🧑🏻‍💻</a>", iconFileName: "assets/images/brussels-icon.png" },
    { nom: "BC Polaris Brussel", coord: [50.86485658717384, 4.357356284446961], description: "<a href='https://sport.brussels/clubs/polaris-brussel-basketball-sport-club//'> 🧑🏻‍💻</a>", iconFileName: "assets/images/polaris-icon.png" },
  ];

  private pickUpGames: PickUpGame[] = [
    { nom: "Pick Up Games - ADEPS Auderghem (Sun 5pm - 7pm)", coord: [50.80911657785603, 4.443453365027522], description: "<a href='https://www.supersaas.fr/schedule/Pickup_Brussels/Sunday_Ball'> Website</a>" },
  ];

  constructor() { }

  getCourts(): Court[] {
    return this.courts;
  }

  getMultiSportCourts(): Court[] {
    return this.multiSportCourts;
  }

  getClubs(): Club[] {
    return this.clubs;
  }

  getPickUpGames(): PickUpGame[] {
    return this.pickUpGames;
  }

  getAllData() {
    return {
      courts: this.courts,
      multiSportCourts: this.multiSportCourts,
      clubs: this.clubs,
      pickUpGames: this.pickUpGames
    };
  }
} 