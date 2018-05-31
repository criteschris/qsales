import { ISales } from "../types/ISales";

export const getSalesForDateByBar = (barId: string, entryDate: Date): Promise<ISales> => {
    return fetch(`/sales/getsales?b=${barId}&entryDate=${entryDate.toISOString()}`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        }

        return {} as ISales;
    });
}