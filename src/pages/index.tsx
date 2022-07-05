import React, { useEffect, useState } from "react";
import { FormLabel, Grid,  Input, Stack, Text, Button, Flex, HStack, Box, useFocusEffect } from "@chakra-ui/react";

import { BoxCard } from "../components/BoxCard";
import { api } from "../services/api";
import { SearchInput } from "../components/SearchInput";
import { Loading } from "../components/Loading";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Siderbar";
import { Footer } from "../components/Footer";


export default function Home() {
  const [pokemon, setPokemon] = useState("");
  const [type, setType] = useState("");
  const [typeData, setTypeData] = useState([])
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [previousUrl, setPreviousUrl] = useState('');
  const [isGettingData, setIsGettingData] = useState(true);

  async function getPokemon() {
    const toArray = [];

    const mainUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await api.get(mainUrl);

    toArray.push(response)
    setPokemonData(toArray)
  }

  async function getType() {
    const toArray = [];

    const mainUrl = `https://pokeapi.co/api/v2/type/${type}`;
    const response = await api.get(mainUrl);

    toArray.push(response)
    setTypeData(toArray)
  }

  async function getAllPokemon() {
    const mainUrl = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0'; // criando uma variavel para consumir a Pokeapi
    const response = await api.get(mainUrl);

    return response;
  }

  async function getAllPokemonType() {
    const mainUrl = `https://pokeapi.co/api/v2/type`;
    const response = await api.get(mainUrl);

    return response;
  }

  async function loadingPokemon(data) {
    let pokemonDetails = await Promise.all( // variavel que armazena e espera todas as promessa envolvidas (.all) 
      data.map(async item => {
        let pokemonRecord = await api.get(item.url);
        return pokemonRecord;
      })
    )    
    setPokemonData(pokemonDetails);
  }

  async function loadingType(data) {
    let typePokemon = await Promise.all(
      data.map(async item => {
        let typeRecord = await api.get(item.url);
        return typeRecord;
      })
    )

    console.log('Types do Pokemon:', typePokemon);
    setTypeData(typePokemon);
  }
  
  useEffect(() => {
    async function fetchData() {
      const { data: allData } = await getAllPokemon(); //recebo a princípio todos os dados do endpoint principal (mainUrl)

      setNextUrl(allData.next); //reservo o próximo endpoint
      setPreviousUrl(allData.previous); //reservo o anterior

      const { data: typeData } = await getAllPokemonType();

      await loadingPokemon(allData.results); //crio um array com todos os pokemons disponibilizados por esse endpoint
      const typeroto = await loadingType(typeData.results)

      setIsGettingData(false); //mudo setIsGettingData() para falso, pois os dados já foram carregados
    }
    fetchData();
  }, []);


  function handleChange(props) {
    setPokemon(props.target.value.toLowerCase());
    setType(props.target.value.toLowerCase());
  }
  
  function handleSubmit(props) {
    setIsGettingData(true)
    
    props.preventDefault();
    getPokemon();
    // getType();
    
    setIsGettingData(false)
  }
  
  function handleType(props) {
    
  }

  return (
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
        { isGettingData ? 
          <Flex justify='center' align='center' m="auto" h='80vh' w='100%' maxW={1230}>
            <Loading />
          </Flex> :
          <Flex justify='space-between' mt='8' mx="auto" p="4" w='100%' maxW={1230}>
            <Sidebar onPokemonType={typeData} onHandleType={handleType} />

            <Grid gap={8} alignItems='flex-start' templateColumns={'repeat(3, 1fr)'}>
              <BoxCard onPokemonData={pokemonData} /> 
            </Grid>
          </Flex>
        }           
      </Flex>

      <Footer />
    </Flex>
  )
}
