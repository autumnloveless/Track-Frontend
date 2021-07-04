import { writable, derived } from "svelte/store";

export const isAuthenticated = writable(false);
export const user = writable({});
export const error = writable();
export let accessToken = writable()