export interface Station {
    id: number;
    stationName: string;
    stationAddress: string;
    coordinateX: string | null;
    coordinateY: string | null;
  }

export interface Journey {
    id: number;
    departureDateTime: string; 
    returnDateTime: string; 
    departureStation: Station;
    returnStation: Station;
    distance: number;
    duration: number;
  }