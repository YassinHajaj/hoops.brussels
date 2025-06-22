import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';

interface Translations {
  suggestText: string;
  locationText: string;
  filterText: string;
  courtsText: string;
  clubsText: string;
  multisportCourtsText: string;
  pickUpGamesText: string;
  showText: string;
  hideText: string;
  installText: string;
  homeText: string;
}

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  
  // Menu states
  showMenu = false;
  showLanguageOptions = false;
  showFilters = false;
  showInstallButton = false;
  
  // Filter states
  showCourts = true;
  showMultiSportCourts = true;
  showClubs = true;
  showPickUpGames = true;
  
  // Language
  currentLanguage = 'fr';

  // Translations
  private translations: Record<string, Translations> = {
    fr: {
      suggestText: "Suggérer un terrain",
      locationText: "Autour de moi",
      filterText: "Filtres",
      courtsText: "Terrains",
      clubsText: "Clubs",
      multisportCourtsText: "Terrains MS",
      pickUpGamesText: "Pick-Up Games",
      showText: "Afficher",
      hideText: "Masquer",
      installText: "Installer l'app",
      homeText: "Accueil"
    },
    nl: {
      suggestText: "Stel een terrein voor",
      locationText: "Rondom mij",
      filterText: "Filters",
      courtsText: "Terreinen",
      clubsText: "Clubs",
      multisportCourtsText: "MS Terreinen",
      pickUpGamesText: "Pick-Up Games",
      showText: "Toon",
      hideText: "Verberg",
      installText: "App installeren",
      homeText: "Home"
    },
    en: {
      suggestText: "Suggest a court",
      locationText: "Around me",
      filterText: "Filters",
      courtsText: "Courts",
      clubsText: "Clubs",
      multisportCourtsText: "MS Courts",
      pickUpGamesText: "Pick-Up Games",
      showText: "Show",
      hideText: "Hide",
      installText: "Install app",
      homeText: "Home"
    }
  };

  ngOnInit() {
    // Set initial language based on browser
    const browserLang = navigator.language.startsWith("nl") ? "nl" :
                       navigator.language.startsWith("en") ? "en" : "fr";
    this.setLanguage(browserLang);
  }

  // Menu methods
  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (!this.showMenu) {
      this.showLanguageOptions = false;
    }
  }

  toggleLanguageOptions() {
    this.showLanguageOptions = !this.showLanguageOptions;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // Filter toggle methods
  toggleCourts() {
    this.showCourts = !this.showCourts;
  }

  toggleMultiSportCourts() {
    this.showMultiSportCourts = !this.showMultiSportCourts;
  }

  toggleClubs() {
    this.showClubs = !this.showClubs;
  }

  togglePickUpGames() {
    this.showPickUpGames = !this.showPickUpGames;
  }

  // Language methods
  setLanguage(lang: string) {
    this.currentLanguage = lang;
    this.showLanguageOptions = false;
  }

  getCurrentLanguageFlag(): string {
    const flags = { fr: '🇫🇷', nl: '🇳🇱', en: '🇬🇧' };
    return flags[this.currentLanguage as keyof typeof flags] || '🇫🇷';
  }

  getTranslation(key: keyof Translations): string {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  // Action methods
  suggestCourt() {
    const subject = encodeURIComponent('Suggestion de terrain');
    const body = encodeURIComponent(`Bonjour,
Je souhaite proposer le terrain suivant :
[Nom du lieu]
[Adresse ou coordonnées]
[Commentaire supplémentaire]`);
    window.location.href = `mailto:contact@hoops.brussels?subject=${subject}&body=${body}`;
  }

  getMyLocation() {
    // Call the map component's getMyLocation method
    if (this.mapComponent) {
      this.mapComponent.getMyLocation();
    }
  }

  goToHome() {
    window.location.href = '/#/';
  }

  // Close menus when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Close menu if clicking outside (but not on filters container or filter toggle)
    if (!target.closest('#menu') && !target.closest('.menu-toggle') && !target.closest('#filters-container') && !target.closest('.filter-toggle-btn')) {
      this.showMenu = false;
      this.showLanguageOptions = false;
    }
    
    // Close filters if clicking outside (but don't close the main menu)
    if (!target.closest('#filters-container') && !target.closest('.filter-toggle-btn')) {
      this.showFilters = false;
    }
  }
} 