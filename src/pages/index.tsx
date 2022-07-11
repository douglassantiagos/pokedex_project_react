import React, { useCallback, useEffect, useState } from "react";
import { Grid, Flex, Text, Image, Link} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { Header } from "../components/Header";
import { SearchInput } from "../components/SearchInput";
import { Loading } from "../components/Loading";
import { Sidebar } from "../components/Sidebar";
import { PokemonCard } from "../components/PokemonCard";
import { Footer } from "../components/Footer";
import { getAllPokemons, getAllTypeData, getPokemon, getTypeData } from "../services";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [listColorsEachSpeciesData, setListColorsEachSpeciesData ] = useState([])
  const [pokemonsToShow, setPokemonsToShow] = useState([])
  const [pokemonsTypeSelectedData, setPokemonsTypeSelectedData] = useState([])
  const [listTypeNames, setListTypeNames] = useState([]); 
  const [typeSelected, setTypeSelected] = useState("All");


  async function selectPokemon(pokemon) {
    const toArray = [];

    const response = await getPokemon(pokemon)

    toArray.push(response)
    setPokemonData(toArray)
  }
  
  useEffect(() => {
    async function fetchPokemonData() {
     
      if (typeSelected !== 'All') return;

      const apiMainData = await getAllPokemons();
      const promisesAllPokemonsData = apiMainData.results.map(
        (pokemon) => getPokemon(pokemon.name)
      );

      const allPokemonsData = await Promise.all(promisesAllPokemonsData);

      const listAllPokemonsData = allPokemonsData.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork'].front_default,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight,
          // ability: pokemon.abilities
        }        
      })

      setPokemonData([...pokemonData, ...listAllPokemonsData]);
      
      setIsLoadingData(false); //mudo setIsLoadingData() para falso, pois os dados já foram carregados
    }

    fetchPokemonData();
  }, [typeSelected]);

  useEffect(() => {
    async function fetchTypesData() {
      setIsLoadingData(true)

      const apiTypesList = await getAllTypeData(); // recebo todos os dados do endpoint 'type'
      const listAllTypeName = await apiTypesList.results.map((type) => type.name);

      const listTypeNames = await listAllTypeName.filter(
        (name) => name !== "unknown" && name !== "shadow"
      );

      setListTypeNames(listTypeNames); // nome de todos os tipos de pokemons

      if (typeSelected === "All") return;

      const promisesEachTypeData = apiTypesList.results.map((type) => getTypeData(type.url)) // recebendo a url de cada tipo
      const eachTypeData = await Promise.all(promisesEachTypeData); // espera todas as promises de "promisesEachTypeData" e recebe

      // recebendo o nome do tipo do pokemon e comparando com o tipo que foi selecionado
      const typeSelectedData = eachTypeData.filter((type) => 
        type.name === typeSelected
      ); 

      // recebendo os nomes dos pokemons do tipo selecionado
      const typeSelectedPokemonsNames = typeSelectedData.map((data) => 
        data.pokemon.map((item) => item.pokemon.name)
      );     
      
      // rececendo o endpoint "https://pokeapi.co/api/v2/pokemon/${pokemon}" com o nome do pokemon
      const promisesPokemonsTypeSelected = typeSelectedPokemonsNames.map((item) => 
        item.map((name) => getPokemon(name))
      );

      // espera todas as promises de "promisesPokemonsTypeSelected" e recebe
      const pokemonsTypeSelected = await Promise.all(
        promisesPokemonsTypeSelected[0]
      ); 
      
      setPokemonsTypeSelectedData(pokemonsTypeSelected.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork'].front_default,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight,
        }
      }));

      setIsLoadingData(false)
    }
    
    fetchTypesData();
  }, [typeSelected])

  useEffect(() => {
    typeSelected === "All" ? setPokemonsToShow(pokemonData) : setPokemonsToShow(pokemonsTypeSelectedData);

  }, [
    pokemonData,
    typeSelected,
    pokemonsTypeSelectedData,
  ])

  useEffect(() => {
    pokemonsToShow.length > 0 ? setIsLoadingData(false) : setIsLoadingData(true);
  }, [])

  const handleClickCallback = useCallback((name: string) => {
    setTypeSelected(name);
  }, [])
  
  // console.log('X TypeSelected: ', typeSelected);

  function handleChange(props) {
    setPokemon(props.target.value.toLowerCase());
  }
  
  function handleSubmit(props) {
    setIsLoadingData(true)
    
    props.preventDefault();
    selectPokemon(pokemon);
    
    setIsLoadingData(false)
  }

  return (
    <>    
      <Head>
        <title>Pokedex</title>
      </Head>

      <Flex direction='column' w='100%' h='100vh'>
        <Header />

        <SearchInput 
          onHandleSubmit={handleSubmit} 
          onHandleChange={handleChange} 
        />

        <Flex 
          direction="column" 
          align='center' 
          justify='center' 
          mx="auto"        
          w='100%' 
          mb='10' 
          maxW={1230} 
          bgImage="./pokeballBg.svg" 
          bgRepeat='no-repeat' 
          bgPosition='center'
          bgSize='cover'
        >
          { isLoadingData ? 

            <Flex justify='center' align='center' m="auto" h='80vh' w='100%' maxW={1230}>
              <Loading />
            </Flex> :

            <Flex justify='space-between' mt='8' mx="auto" p="4" w='100%' maxW={1230}>
              <Sidebar
                handleClickCallback={handleClickCallback}
                onListTypeNames={listTypeNames}
                selected={typeSelected}
              />

              <Flex direction='column' justify='center'>
                <Flex mb='8'>
                  <Image src='../pokebolaA.png' w='6' h='6' mr='4' />                
                  <Text mr='1' fontWeight='bold'>
                    {pokemonsToShow.length} Pokémons
                  </Text>
                </Flex>

                <Grid gap={8} alignItems='flex-start' templateColumns={'repeat(3, 1fr)'}>
                  { pokemonsToShow.map(item => {
                    return (
                      <PokemonCard                      
                        onPokemonData={item}
                      />                           
                    )
                  }) }
                </Grid>
              </Flex>
            </Flex>
          }           
        </Flex>

        <Footer />
      </Flex>
    </>
  )
}
