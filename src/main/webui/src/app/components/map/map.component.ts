import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CourtService, Court, Club, PickUpGame } from '../../services/court.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';

// Extend Leaflet namespace for marker clustering
declare module 'leaflet' {
  function markerClusterGroup(options?: any): any;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  // Input properties for filter states
  @Input() showCourts = true;
  @Input() showMultiSportCourts = true;
  @Input() showClubs = true;
  @Input() showPickUpGames = true;
  
  private map!: L.Map;
  private courtMarkers: L.Marker[] = [];
  private clubMarkers: L.Marker[] = [];
  private multisportCourtMarkers: L.Marker[] = [];
  private pickUpGamesMarkers: L.Marker[] = [];
  private userLocationMarker?: L.Marker;

  private courtClusterGroup = (L as any).markerClusterGroup();
  private clubClusterGroup = (L as any).markerClusterGroup();
  private multisportCourtClusterGroup = (L as any).markerClusterGroup();
  private pickUpGamesClusterGroup = (L as any).markerClusterGroup();

  // Icons
  private hoopIcon = L.icon({
    iconUrl: 'assets/images/hoop-icon.png',
    iconSize: [50, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
  });

  private multiSportIcon = L.icon({
    iconUrl: 'assets/images/multisport-icon.png',
    iconSize: [50, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
  });

  private pickUpGamesIcon = L.icon({
    iconUrl: 'assets/images/pick-up-games-icon.png',
    iconSize: [50, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
  });

  constructor(private courtService: CourtService) {}

  ngOnInit() {
    this.initMap();
    this.createMarkers();
    this.setupMapLayers();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update map when filter states change
    if (this.map && (changes['showCourts'] || changes['showMultiSportCourts'] || changes['showClubs'] || changes['showPickUpGames'])) {
      this.updateMapView();
    }
  }

  private initMap() {
    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: false
    }).setView([50.8503, 4.3517], 12);

    L.control.zoom({ position: 'bottomleft' }).addTo(this.map);

    // Base layers
    const lightBase = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png');
    const detailOverlay = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    
    lightBase.addTo(this.map);

    // Zoom-based layer switching
    this.map.on('zoomend', () => {
      if (this.map.getZoom() >= 16) {
        if (!this.map.hasLayer(detailOverlay)) this.map.addLayer(detailOverlay);
      } else {
        if (this.map.hasLayer(detailOverlay)) this.map.removeLayer(detailOverlay);
      }
    });
  }

  private createMarkers() {
    const courts = this.courtService.getCourts();
    const multiSportCourts = this.courtService.getMultiSportCourts();
    const clubs = this.courtService.getClubs();
    const pickUpGames = this.courtService.getPickUpGames();

    // Create court markers
    courts.forEach(court => {
      const marker = L.marker(court.coord, { icon: this.hoopIcon })
        .bindPopup(this.createCourtPopup(court, 'assets/images/hoop-icon.png'));
      this.courtMarkers.push(marker);
    });

    // Create multisport court markers
    multiSportCourts.forEach(court => {
      const marker = L.marker(court.coord, { icon: this.multiSportIcon })
        .bindPopup(this.createCourtPopup(court, 'assets/images/multisport-icon.png'));
      this.multisportCourtMarkers.push(marker);
    });

    // Create club markers
    clubs.forEach(club => {
      const marker = L.marker(club.coord, {
        icon: L.icon({
          iconUrl: club.iconFileName,
          iconSize: [30, 30],
          iconAnchor: [20, 40],
          popupAnchor: [0, -35]
        })
      }).bindPopup(this.createClubPopup(club));
      this.clubMarkers.push(marker);
    });

    // Create pickup game markers
    pickUpGames.forEach(game => {
      const marker = L.marker(game.coord, { icon: this.pickUpGamesIcon })
        .bindPopup(this.createPickUpGamePopup(game));
      this.pickUpGamesMarkers.push(marker);
    });
  }

  private setupMapLayers() {
    this.map.addLayer(this.courtClusterGroup);
    this.map.addLayer(this.multisportCourtClusterGroup);
    this.map.addLayer(this.clubClusterGroup);
    this.map.addLayer(this.pickUpGamesClusterGroup);
    
    this.updateMapView();
  }

  private createCourtPopup(court: Court, iconPath: string): string {
    return `<div class='court-popup'>
      <div class='court-popup-header'>
        <img src='${iconPath}' alt='Basketball Court' class='court-popup-icon'>
        <h3 class='court-popup-title'>${court.nom}</h3>
      </div>
      <div class='court-popup-content'>
        <p class='court-popup-description'>${court.description}</p>
      </div>
    </div>`;
  }

  private createClubPopup(club: Club): string {
    return `<div class='court-popup'>
      <div class='court-popup-header'>
        <img src='${club.iconFileName}' alt='Basketball Club' class='court-popup-icon'>
        <h3 class='court-popup-title'>${club.nom}</h3>
      </div>
      <div class='court-popup-content'>
        <p class='court-popup-description'>${club.description}</p>
      </div>
    </div>`;
  }

  private createPickUpGamePopup(game: PickUpGame): string {
    return `<div class='court-popup'>
      <div class='court-popup-header'>
        <img src='assets/images/pick-up-games-icon.png' alt='Pick Up Games' class='court-popup-icon'>
        <h3 class='court-popup-title'>${game.nom}</h3>
      </div>
      <div class='court-popup-content'>
        <p class='court-popup-description'>${game.description}</p>
      </div>
    </div>`;
  }

  private updateMapView() {
    this.courtClusterGroup.clearLayers();
    this.clubClusterGroup.clearLayers();
    this.multisportCourtClusterGroup.clearLayers();
    this.pickUpGamesClusterGroup.clearLayers();

    if (this.showCourts) {
      this.courtMarkers.forEach(marker => this.courtClusterGroup.addLayer(marker));
    }

    if (this.showMultiSportCourts) {
      this.multisportCourtMarkers.forEach(marker => this.multisportCourtClusterGroup.addLayer(marker));
    }

    if (this.showClubs) {
      this.clubMarkers.forEach(marker => this.clubClusterGroup.addLayer(marker));
    }

    if (this.showPickUpGames) {
      this.pickUpGamesMarkers.forEach(marker => this.pickUpGamesClusterGroup.addLayer(marker));
    }

    // Auto-zoom to fit remaining visible markers
    this.fitMapToVisibleMarkers();
  }

  private fitMapToVisibleMarkers() {
    // Collect all visible markers
    const visibleMarkers: L.Marker[] = [];
    
    if (this.showCourts) {
      visibleMarkers.push(...this.courtMarkers);
    }
    
    if (this.showMultiSportCourts) {
      visibleMarkers.push(...this.multisportCourtMarkers);
    }
    
    if (this.showClubs) {
      visibleMarkers.push(...this.clubMarkers);
    }
    
    if (this.showPickUpGames) {
      visibleMarkers.push(...this.pickUpGamesMarkers);
    }

    // If there are visible markers, fit the map to show them all
    if (visibleMarkers.length > 0) {
      const group = L.featureGroup(visibleMarkers);
      this.map.fitBounds(group.getBounds(), { 
        padding: [50, 50],
        maxZoom: 16 // Prevent zooming in too much
      });
    } else {
      // If no markers are visible, reset to default view
      this.map.setView([50.8503, 4.3517], 12);
    }
  }

  // Public method for getting user location (called from app component)
  getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          // Remove existing user location marker
          if (this.userLocationMarker) {
            this.map.removeLayer(this.userLocationMarker);
          }

          // Create new user location marker
          this.userLocationMarker = L.marker([lat, lng], {
            icon: L.divIcon({
              className: 'user-location-marker',
              html: '<div style="background-color: #007bff; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>',
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })
          }).addTo(this.map);

          // Add accuracy circle
          const accuracyCircle = L.circle([lat, lng], {
            radius: accuracy,
            color: '#007bff',
            fillColor: '#007bff',
            fillOpacity: 0.1,
            weight: 1
          }).addTo(this.map);

          // Center map on user location
          this.map.setView([lat, lng], 15);

          // Remove accuracy circle after 5 seconds
          setTimeout(() => {
            this.map.removeLayer(accuracyCircle);
          }, 5000);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check your browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
} 