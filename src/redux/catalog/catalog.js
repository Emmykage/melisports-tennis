import { createSlice } from '@reduxjs/toolkit';
import pure_aero from '../../assets/images/products/101479-Pure_Aero-370-1-Face.avif';
import evo_drive from '../../assets/images/products/102431-EVO_Drive-136-1-face.avif';
import pure_rafa from '../../assets/images/products/101509-Pure_Aero_Rafa_Origin-371-1-Face.avif';
import Pure_Drive_Team_Wim from '../../assets/images/products/101471-Pure_Drive_Team_Wim-100-1-Face.avif';

const initialState = {
  products: [],
  racquets: [{
    name: 'Pure Aero',
    type: 'racquet',
    image: pure_aero,

    description: 'Do you want to dominate the game with ultimate spin? The 8th generation BABOLAT Pure Aero tennis racquet evolves with a unique approach engineered around the spin in your game. Join players like Rafael Nadal, Leylah Fernandez, Félix Auger-Aliassime, and Carlos Alcaraz and discover which Pure Aero racquet lets you own your spin. Have powerful strokes and want to dictate the points with controllable spin? You will love the BABOLAT Pure Aero. Team BABOLAT pro players may play with a customized or different model than the equipment depicted',
    technical_characteristics: {
      head_size: '645 cm² / 100 in²',
      weight: '300 g +/- 7g / 10.6 oz',
      Swing_Weight: '290',
      Stiffness: '69 + / - 3',
      Composition: 'CARBON',
      Length: '685 mm / 27 in',
      recommended_string: 'RPM Blast / RPM Rough',
      recommended_grip: 'Syntec Pro',
    },
  }, {
    name: 'EVO Drive Strung',
    image: pure_aero,
    type: 'racquet',
    description: 'Enjoying the self-improvement challenge of tennis? Check out the Evo Drive. Whether you want to have fun with friends or want to see how far you can take your game (why not both?!), this affordable performance racquet provides easy power and comfort as you enjoy tennis and reach your full potential. The Evo Drive brings easy power and comfort to your game.',
    technical_characteristics: {
      head_size: '670 cm²',
      weight: '270 g +/- 7g',
      Swing_Weight: '285',
      Stiffness: '70',
      Composition: 'Graphite',
      Length: '685 mm / 27 in',
      recommended_string: 'Xcel/Addixion',
      recommended_grip: 'Syntec Evo',
    },
  },
  {
    name: 'Pure Aero Rafa Origin Unstrung',
    image: pure_rafa,
    type: 'racquet',
    description: 'The master of spin. The king of clay. The legend of Vamos!. The Babolat Pure Aero Rafa Origin tennis racquet was developed with Rafa and features tour-level specifications for tour-level performance. With an unstrung weight of 317 grams (11.2 ounces) and a more head heavy balance (think massive swing weight), the Babolat Pure Aero Rafa Origin tennis racquet is for diehard Rafa fans and the biggest of hitters.',
    technical_characteristics: {
      head_size: '645 cm² / 100 in²',
      weight: '317 g +/- 7g / 10.6 oz',
      Swing_Weight: '335',
      Stiffness: '73 + / - 3',
      Composition: 'CARBON',
      Length: '685 mm / 27 in',
      recommended_string: 'RPM Blast / RPM Rough',
      recommended_grip: 'Syntec Pro',
    },
  },
  {
    name: 'Pure Drive Team Wimbledon Unstrung',
    image: Pure_Drive_Team_Wim,
    type: 'racquet',
    description: 'The racquet that defines power. The Pure Drive, an iconic BABOLAT product since 1994, is one of the world’s most popular and versatile racquets. Over the years, it’s been enhanced to respond to evolutions of the game. Boasting a combination of modern and vintage design, the Pure Drive Team Wimbledon takes inspiration from the legendary British Grand Slam. With a lighter weight (285g) than the standard Pure Drive, the Pure Drive Team Wimbledon offers maneuverability and explosive power. Your opponents will no doubt call it “an unfair advantage. Team BABOLAT pro players may play with a customized or different model than the equipment depicted',
    technical_characteristics: {
      head_size: '645 cm² / 100 in²',
      weight: '285 g +/- 7g / 10.6 oz',
      Swing_Weight: '285',
      Stiffness: '73 + / - 3',
      Composition: 'Graphite',
      Length: '685 mm / 27 in',
      recommended_string: 'RPM Power/Xcel',
      recommended_grip: 'Natural Grip',
    },
  }],
  accessories: [],
  apparels: [],
  loading: true,

};
const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    getCatalogRaquets: (state) => ({
      ...state,
      racquets: state.racquets.map((product) => {
        if (product.type == 'racquet') {
          return {
            product,

          };
        }
      }),
    }),
    getCatalogRaquets: (state) => ({
      ...state,
      racquets: state.racquets,
    }),
    getCatalogApparels: (state) => ({
      ...state,
      apparels: state.racquets.map((product) => {
        if (product.type == 'apparel') {
          return {
            product,

          };
        }
      }),
    }),
    getCatalogAccessories: (state) => ({
      ...state,
      accessories: state.racquets.filter((product) => {
        if (product.type == 'accessory') {
          return {
            product,

          };
        }
      }),

    }),
  },
});

export default catalogSlice.reducer;
export const { getCatalogRaquets, getCatalogAccessories } = catalogSlice.actions;
