import { W3PData } from "./w3pdata.js";

const w3pd = new W3PData()
await w3pd.init()

console.log(w3pd.data)