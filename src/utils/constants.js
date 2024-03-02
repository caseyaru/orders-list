export const DATE = new Date().toISOString().slice(0, 10).replace(/-/g, '');
export const PASSWORD = "Valantis";

export const AUTH = `${PASSWORD}_${DATE}`;

export const BASE_URL = "http://api.valantis.store:40000";
