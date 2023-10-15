// import { getCatalogRaquets } from "../catalog/catalog";
import pure_aero from '../../assets/images/products/101479-Pure_Aero-370-1-Face.avif'

import { createAsyncThunk } from "@reduxjs/toolkit";
const raquets = [
    {
        name: "Pure Aero",
        description: "Do you want to dominate the game with ultimate spin? The 8th generation BABOLAT Pure Aero tennis racquet evolves with a unique approach engineered around the spin in your game. Join players like Rafael Nadal, Leylah Fernandez, Félix Auger-Aliassime, and Carlos Alcaraz and discover which Pure Aero racquet lets you own your spin. Have powerful strokes and want to dictate the points with controllable spin? You will love the BABOLAT Pure Aero. Team BABOLAT pro players may play with a customized or different model than the equipment depicted",
        image: pure_aero,
        technical_characteristics: {
            head_size: "645 cm² / 100 in²",
            weight: "300 g +/- 7g / 10.6 oz",
            Swing_Weight: "290",
            Stiffness: "69 + / - 3",
            Composition: "CARBON",
            Length: "685 mm / 27 in",
            recommended_string: "RPM Blast / RPM Rough",
            recommended_grip: "Syntec Pro"
        }
    }
]
const getCatalogRaquets = createAsyncThunk('catalog/getRaquets', async (data) => {
    
    return raquets
})


// export {getCatalogRaquets}