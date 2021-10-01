import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {Structures} from "./Structures";

export const structuresStore: Writable<Structures[]> = writable([]);