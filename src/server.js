// import { createServer } from "http";
// import { Server } from "socket.io";
// import { app } from "./app.js";
// import { getWeather } from './services/weatherService.js';
// import { getFootballData } from './services/footballService.js';
// import { fetchOpenAIResponse } from './services/openaiService.js';
// import { getRandomPokemon, getPokemonHints } from './services/pokemonService.js';

// const PORT = process.env.PORT || 3000;
// const server = createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   let currentContext = null;
//   let hintIndex = 0;
//   let currentPokemon = null; 

//   socket.emit("bot reply", "Hola! ¿Sobre qué quieres conversar hoy? Clima, Fútbol o ¿Quieres jugar a adivinar un Pokémon?");

//   socket.on("chat message", async (msg) => {
//     try {
//       const lowerMsg = msg.toLowerCase();
//       if (currentContext === null) {
//         const aiResponse = await fetchOpenAIResponse(msg);
//         if (aiResponse.includes("clima")) {
//           socket.emit("bot reply", "¿De qué ciudad deseas saber el clima?");
//           currentContext = "weather";
//         } else if (aiResponse.includes("fútbol")) {
//           socket.emit("bot reply", "¿De qué país deseas información de fútbol? (España, Argentina, Uruguay)");
//           currentContext = "football";
//         } else if (aiResponse.includes("pokemon")) {
//           currentPokemon = await getRandomPokemon();
//           const hints = await getPokemonHints(currentPokemon);
//           currentPokemon.hints = hints;
//           socket.emit("bot reply", "¡Adivina el Pokémon! " + hints[hintIndex]);
//           hintIndex++;
//           currentContext = "pokemonGame";
//         } else {
//           socket.emit("bot reply", "No entiendo, por favor especifica si quieres saber sobre 'clima', 'fútbol' o 'pokemon'.");
//         }
//       } else if (currentContext === "weather") {
//         const weather = await getWeather(msg);
//         socket.emit("bot reply", `El clima en ${msg} es: ${weather}`);
//         currentContext = null;
//       } else if (currentContext === "football") {
//         const footballData = await getFootballData(msg);
//         socket.emit("bot reply", `Aquí está la información de fútbol de ${msg}: ${footballData}`);
//         currentContext = null;
//       } else if (currentContext === "pokemonGame") {
//         if (lowerMsg === "siguiente" || lowerMsg === "otra") {
//           if (hintIndex < currentPokemon.hints.length) {
//             socket.emit("bot reply", currentPokemon.hints[hintIndex]);
//             hintIndex++;
//           } else {
//             socket.emit("bot reply", "¿Cuál es este Pokémon?");
//             currentContext = "pokemonGuess";
//           }
//         } else if (currentContext === "pokemonGuess") {
//           if (lowerMsg === currentPokemon.name.toLowerCase()) {
//             socket.emit("bot reply", `¡Correcto! Era ${currentPokemon.name}. ¡Felicidades!`);
//             currentContext = null;
//             currentPokemon = null;
//             hintIndex = 0;
//           } else {
//             socket.emit("bot reply", `Lo siento, era ${currentPokemon.name}. ¡Intenta de nuevo!`);
//             currentContext = null;
//             currentPokemon = null;
//             hintIndex = 0;
//           }
//         }
//       }
//     } catch (error) {
//       socket.emit("bot reply", "Hubo un error procesando tu solicitud.");
//       console.error(error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { getWeather } from './services/weatherService.js';
import { getFootballData } from './services/footballService.js';
import { fetchOpenAIResponse } from './services/openaiService.js';
import { getRandomPokemon, getPokemonHints } from './services/pokemonService.js';

const PORT = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  let currentContext = null;
  let hintIndex = 0;
  let currentPokemon = null; 

  socket.emit("bot reply", "Hola! ¿Sobre qué quieres conversar hoy? Clima, Fútbol o ¿Quieres jugar a adivinar un Pokémon?");

  socket.on("chat message", async (msg) => {
    try {
      const lowerMsg = msg.toLowerCase();
      
      if (currentContext === null) {
        const aiResponse = await fetchOpenAIResponse(lowerMsg);
        console.log("AI response:", aiResponse);

        // Detectar intenciones de manera más robusta
        if (aiResponse.toLowerCase().includes("clima")) {
          socket.emit("bot reply", "¿De qué ciudad deseas saber el clima?");
          currentContext = "weather";
        } else if (aiResponse.toLowerCase().includes("fútbol") || aiResponse.toLowerCase().includes("futbol")) {
          socket.emit("bot reply", "¿De qué país deseas información de fútbol? (España, Argentina, Uruguay)");
          currentContext = "football";
        } else if (aiResponse.toLowerCase().includes("pokemon") || aiResponse.toLowerCase().includes("juego")) {
          currentPokemon = await getRandomPokemon();
          console.log("POKE RANDOM ES....:", currentPokemon);
          const hints = await getPokemonHints(currentPokemon);
          console.log("getPokemon HINTS....:", hints);
          currentPokemon.hints = hints;
          console.log("HINTS....PERO DEL RANDOM:", hints);
          socket.emit("bot reply", `Genial, jugemos ¡Adivina el Pokémon! La primera pista es: ${hints[hintIndex]}\nSi necesitas otra pista podes pedirlo, simplemente dime: otra`);
          hintIndex++;
          currentContext = "pokemonGame";
        } else if (aiResponse.toLowerCase().includes("de nada")) {
          socket.emit("bot reply", "De nada, cualquier otra duda de clima, futbol o si quieres volver a jugar con pokemons, me avisas!");
        } else {
          socket.emit("bot reply", "No entiendo, por favor especifica si quieres saber sobre 'clima', 'fútbol' o 'pokemon'.");
        }
      } else if (currentContext === "weather") {
        const weather = await getWeather(msg);
        socket.emit("bot reply", `El clima en ${msg} es: ${weather}`);
        currentContext = null;
      } else if (currentContext === "football") {
        console.log('País solicitado:', msg);
        const footballData = await getFootballData(msg);
        console.log('Datos de fútbol recibidos:', footballData);
        if (footballData.length > 0) {
          const formattedData = footballData.map(item => `${item.team} con ${item.points} puntos`).join(', ');
          socket.emit("bot reply", `Aquí está la información de fútbol de ${msg}: ${formattedData}`);
        } else {
          socket.emit("bot reply", `No se encontró información de fútbol para ${msg}.`);
        }
        currentContext = null;
      } else if (currentContext === "pokemonGame") {
        if (lowerMsg === "siguiente" || lowerMsg === "otra") {
          if (hintIndex < currentPokemon.hints.length) {
            socket.emit("bot reply", currentPokemon.hints[hintIndex]);
            hintIndex++;
          } else {
            socket.emit("bot reply", "¿Cuál es este Pokémon?");
            currentContext = "pokemonGuess";
          }
        }
      } else if (currentContext === "pokemonGuess") {
        if (lowerMsg === currentPokemon.name.toLowerCase()) {
          socket.emit("bot reply", `¡Correcto! Era ${currentPokemon.name}. ¡Felicidades!`);
        } else {
          socket.emit("bot reply", `Lo siento, era ${currentPokemon.name}. ¡Intenta de nuevo!`);
        }
        currentContext = null;
        currentPokemon = null;
        hintIndex = 0;
      }
    } catch (error) {
      socket.emit("bot reply", "Hubo un error procesando tu solicitud.");
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
