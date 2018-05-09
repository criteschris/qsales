import { IWeather } from './IWeather';

export interface ISalesByHour {
    id: number;
    weatherId: number;
    entryDate: Date;
    hour: number;
    amount: number;
    customers: number;
    weather: IWeather;
}