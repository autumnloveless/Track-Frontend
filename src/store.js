import { writable, derived } from "svelte/store";

export let isAuthenticated = writable(false);
export let user = writable({});
export let error = writable();
export let accessToken = writable();
export let accounts = writable([]);
export let selectedTransactions = writable([]);