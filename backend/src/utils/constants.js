export const crimeDataJsonURL = "https://data.calgary.ca/resource/78gh-n26t.json";
export const crimeDataCSVURL = "https://data.calgary.ca/resource/78gh-n26t.csv";
export const tmpFileFolder = '/tmpFiles/';
export const dataCategory = Object.freeze (
    {
        CRIMEDATA: 'crime',
        POPULATIONDATA: 'population',
        BOUNDARYDATA: 'boundary'
    }
);

export const boundaryDataJsonURL = "https://data.calgary.ca/resource/surr-xmvs.json";
export const boundaryDataCSVURL = "https://data.calgary.ca/resource/surr-xmvs.csv";
export const boundaryDataGeoURL = "https://data.calgary.ca/resource/surr-xmvs.geojson";
export const crimeDataSchedule = '5 0 28 * *';
export const boundaryDataSchedule = '0 0 28 * *';