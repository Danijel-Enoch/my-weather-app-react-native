import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image, ScrollView, } from 'react-native';
import * as Location from "expo-location"
import { useEffect,useState } from 'react';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e18ff3d947msh70afb7a7266b202p1162cajsna77a08badfa0',
		'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
	}
};

const weather_api_key='537e9c3542c5154776908270e4c16a23';
const weather_base_url="https://api.openweathermap.org/data/3.0/onecall?"

export default function App() {
  const [errorMessage,setErrorMessage]=useState(null);
  const [currentWeather,setCurrentWeather]=useState("No Weather Update");
      useEffect(()=>{
        load()
      },[]);

      async function load(){
        try {
          let {status}= await Location.requestBackgroundPermissionsAsync();
          if(status!="granted"){
            setErrorMessage("Access to Location Need for App to Run");
          }
          const location= await Location.getCurrentPositionAsync();
          const {latitude,longitude}=location;
          console.log(location);
          const weather_url=`${weather_base_url}lat=${latitude}&lon=${longitude}&appid=ca47b0d442e82ce31081fd9f3498adb9`

//      const response=await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lat=${String(latitude)}&lon=${String(longitude)}&callback=test&id=2172797&lang=null&units=imperial&mode=xml`, options)
            const respones=await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=822fc8446f5adc72ac8c766a871329a8");
            const result = await  JSON.stringify(response); 
          //console.log(result);
          if(response.ok){
            setCurrentWeather(result);
            alert("Weather is: "+result)
            console.log(result)
            console.log(location);
          }else{
            setErrorMessage(result.message);
          }

        } catch (error) {
          setErrorMessage(error);
        }
      }

      if(currentWeather){
        const {main}=currentWeather;
        //alert(main);
       // main.json()
      //  var personJSONString=JSON.stringify(main); 
        return (
          <View style={styles.container}>
            <Text>
             {"Welcome to To the Weather App "}
            </Text>
            <StatusBar style='auto'/>
          </View>
        );

      }else{
        return (
          <View style={styles.container}>
            <Text>
             {errorMessage}
            </Text>
          </View>
        );
      }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
