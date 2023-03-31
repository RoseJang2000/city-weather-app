interface WeatherData {
  degrees: string;
  location: string;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  country: string;
  timezone: string;
}

interface TimezoneDateProps {
  country: string;
  timezone: string;
}

export type { WeatherData, TimezoneDateProps };
