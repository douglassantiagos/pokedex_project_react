import { api } from "../services/api";

const urlMainApi = "https://pokeapi.co/api/v2/";

export async function getPokemon(pokemon) {
  const response = await fetch(`${urlMainApi}pokemon/${pokemon}`);
  return await response.json();
}

export async function getAllPokemons() {
  const response = await fetch(`${urlMainApi}pokemon?limit=9&offset=0`);
  return await response.json()
}

export async function getAllTypeData() {
  const response = await fetch(`${urlMainApi}type`);
  return await response.json();
}

export async function getTypeData(url) {
  const response = await fetch(url);
  return await response.json();
}