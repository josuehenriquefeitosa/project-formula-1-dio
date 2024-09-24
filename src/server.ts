import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({logger:true});

server.register(cors,{
    origin: "*"
})

const teams = [
    {id: 1, name: "McLaren", base: "Woking, United Kingdom"},
    {id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
    {id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom"},
    {id: 4, name: "Ferrari", base: "Maranello, Italy"},
    {id: 5, name: "Alpine", base: "Enstone, United Kingdom"},
    {id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom"},
    {id: 7, name: "AlphaTauri", base: "Faenza, Italy"},
    {id: 8, name: "Williams", base: "Grove, United Kingdom"},
    {id: 9, name: "Alfa Romeo", base: "Hinwil, Switzerland"},
    {id: 10, name: "Haas", base: "Kannapolis, United States"}
];


const drivers = [
    {id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
    {id: 2, name: "Sergio Pérez", team: "Red Bull Racing"},
    {id: 3, name: "Lewis Hamilton", team: "Mercedes"},
    {id: 4, name: "George Russell", team: "Mercedes"},
    {id: 5, name: "Charles Leclerc", team: "Ferrari"},
    {id: 6, name: "Carlos Sainz", team: "Ferrari"},
    {id: 7, name: "Lando Norris", team: "McLaren"},
    {id: 8, name: "Oscar Piastri", team: "McLaren"},
    {id: 9, name: "Fernando Alonso", team: "Aston Martin"},
    {id: 10, name: "Lance Stroll", team: "Aston Martin"},
    {id: 11, name: "Esteban Ocon", team: "Alpine"},
    {id: 12, name: "Pierre Gasly", team: "Alpine"},
    {id: 13, name: "Valtteri Bottas", team: "Alfa Romeo"},
    {id: 14, name: "Zhou Guanyu", team: "Alfa Romeo"},
    {id: 15, name: "Kevin Magnussen", team: "Haas"},
    {id: 16, name: "Nico Hülkenberg", team: "Haas"},
    {id: 17, name: "Yuki Tsunoda", team: "AlphaTauri"},
    {id: 18, name: "Daniel Ricciardo", team: "AlphaTauri"},
    {id: 19, name: "Alex Albon", team: "Williams"},
    {id: 20, name: "Logan Sargeant", team: "Williams"}
];



server.get("/teams",async(request,response)=> {
    response.type("application/json").code(200);
    return {teams};
})

server.get("/drivers",async (request,response) =>{
    response.type("application/json").code(200);
    return {drivers}
})

interface DriversParams{
    id:string
}
interface TeamsParams{
    id:string
}

server.get<{Params :DriversParams}>("/drivers/:id", async (request,response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find( (d) => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return { message : "Driver not found"}
    }else{
        response.type("application/json").code(200);
        return {driver};
    }
})

server.get<{Params :TeamsParams}>("/teams/:id", async (request,response) => {
    const id = parseInt(request.params.id);
    const team = teams.find( (d) => d.id === id);

    if(!teams){
        response.type("application/json").code(404);
        return { message : "Team not found"}
    }else{
        response.type("application/json").code(200);
        return {team};
    }
})


server.listen({port:3333},()=>{
    console.log("server init");
});
