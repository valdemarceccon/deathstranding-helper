import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {Structure} from "./Structure";

export const structuresStore: Writable<Structure[]> = writable([]);
