import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  // Language
  currentLanguage = 'fr';

  // Translations
  private translations: Record<string, any> = {
    fr: {
      title: "Trouvez des terrains de basket à Bruxelles",
      subtitle: "Découvrez les meilleurs terrains de basket, clubs et parties de pick-up dans la capitale",
      exploreButton: "Explorer la carte",
      features: {
        courts: "Terrains de basket",
        clubs: "Clubs de basket", 
        pickUp: "Parties de pick-up",
        multisport: "Terrains multisports"
      }
    },
    nl: {
      title: "Vind basketbalvelden in Brussel",
      subtitle: "Ontdek de beste basketbalvelden, clubs en pick-up games in de hoofdstad",
      exploreButton: "Verken de kaart",
      features: {
        courts: "Basketbalvelden",
        clubs: "Basketbalclubs",
        pickUp: "Pick-up games", 
        multisport: "Multisportvelden"
      }
    },
    en: {
      title: "Find basketball courts in Brussels",
      subtitle: "Discover the best basketball courts, clubs and pick-up games in the capital",
      exploreButton: "Explore the map",
      features: {
        courts: "Basketball courts",
        clubs: "Basketball clubs",
        pickUp: "Pick-up games",
        multisport: "Multisport courts"
      }
    }
  };

  ngOnInit() {
    // Set initial language based on browser
    const browserLang = navigator.language.startsWith("nl") ? "nl" :
                       navigator.language.startsWith("en") ? "en" : "fr";
    this.setLanguage(browserLang);
  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  getFeatureTranslation(key: string): string {
    return this.translations[this.currentLanguage]?.features?.[key] || key;
  }

  getCurrentLanguageFlag(): string {
    const flags = { fr: '🇫🇷', nl: '🇳🇱', en: '🇬🇧' };
    return flags[this.currentLanguage as keyof typeof flags] || '🇫🇷';
  }

  exploreMap() {
    window.location.href = '/#/map';
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
} 