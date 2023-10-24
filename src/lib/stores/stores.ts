import { writable } from "svelte/store";

export const menu = writable({
  isOpen: false,
  menuHeight: 0
})
