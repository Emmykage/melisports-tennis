import { createSlice } from '@reduxjs/toolkit';
import pure_aero from '../../assets/images/products/101479-Pure_Aero-370-1-Face.avif';
// import evo_drive from '../../assets/images/products/102431-EVO_Drive-136-1-face.avif';
// import pure_rafa from '../../assets/images/products/101509-Pure_Aero_Rafa_Origin-371-1-Face.avif';
// import Pure_Drive_Team_Wim from '../../assets/images/products/101471-Pure_Drive_Team_Wim-100-1-Face.avif';

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
      swing_weight: '290',
      stiffness: '69 + / - 3',
      composition: 'CARBON',
      balance: '320 mm +/- 7mm',
      length: '685 mm / 27 in',
      recommended_string: 'RPM Blast / RPM Rough',
      recommended_grip: 'Syntec Pro',
    },
    variations: [
      {
        racquet: 'Pure Aero Team',
        head_size: '645 cm /100 in',
        weight: '285 g +/- 7g / 10.1 oz',
        swing_weight: '280',
        balance: '320 mm +/- 7mm',
        length: '685 mm / 27 in',
      },
    ],
  },
  {
    name: 'Pure Drive',
    type: 'racquet',
    image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_3024,h_3024/v1606497922/Product_Media/2021/TENNIS_RACKETS/Expert/Pure%20Drive/Pure%20Drive%20110%20-%20101449/102449-Pure_Drive_110-136-1-face.png',

    description: 'Some call it the definition of power. You will call it your unfair advantage. We call it the Pure Drive. /t BABOLAT launched the Pure Drive in 1994 and quickly established the benchmark for power. With every subsequent model, we’ve innovated and Evolved to meet the demands of the game. It’s no wonder the Pure Drive is one of most popular and versatile racquets in the world. The 10th generation of the Pure Drive takes your game to the next level with point-ending explosive power and increased feel. The Pure Drive 110 has an even larger headsize offering forgiveness and extrem maneuverability. Team BABOLAT pro players may play with a customized or different model than the equipment depicted.',
    technical_characteristics: {
      head_size: '710 cm² / 100 in²',
      weight: '255 g +/- 7g ',
      swing_weight: '260',
      stiffness: '72 + / - 3',
      composition: 'Graphite',
      length: '700 mm',
      balance: '330 mm +/- 7mm',
      recommended_string: 'Touch VS/Xcel',
      recommended_grip: 'Syntec Pro',
    },
    variations: [
      {
        racquet: 'Pure Drive Lite',
        head_size: '645 cm /100 in',
        weight: '270 g +/- 7g ',
        swing_weight: '270',
        length: '700 mm',
      },
      {
        racquet: 'Pure Drive 110',
        head_size: '710 cm /100 in',
        weight: '255 g +/- 7g ',
        swing_weight: '260',
        stiffness: '72 + / - 3',
        length: '700 mm',
        balance: '330 mm +/- 7mm',
      },
      {
        racquet: 'Pure Drive +',
        head_size: '645 cm /100 in',
        weight: '300 g +/- 7g ',
        swing_weight: '290',
        stiffness: '72 + / - 3',
        length: '700 mm',
        balance: '320 mm +/- 7mm',
      },
    ],

  },
  {
    name: 'Pure Strike 100',
    type: 'racquet',
    image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_3024,h_3024/v1638549414/Product_Media/2022/Tennis_Rackets/PERF_RACKETS/101470-Pure_Strike_VS-362-1-Face.png',

    description: 'Are you looking for extreme control and ultimate precision? Switch to the Pure Strike VS to play early and take control of the game.  Since 1875, BABOLAT has been breaking with convention by proposing the best possible solutions for the most dedicated and passionate players. Thanks to the expertise built up by observing the game, BABOLAT has invented a signature hallmark: the VS. The Pure Strike VS racquet combines the control of the Pure Strike racquet and the ultimate precision that your game requires.Team BABOLAT pro players may play with a customized or different model than the equipment depicted.',
    category: "professional",
    technical_characteristics: {
      head_size: '645  cm² / 93 in²',
      weight: '300  g +/- 7g ',
      swing_Weight: '295',
      stiffness: '72 + / - 3',
      balance: '320 mm +/- 7mm',
      composition: 'Graphite',
      length: '685 mm',
      recommended_string: 'RPM Blast/VS',
      recommended_grip: 'Syntec Team',
    },
    variations: [
      {
        racquet: 'Pure Strike Team',
        head_size: '645 cm /100 in',
        weight: '285  g +/- 7g ',
        Swing_Weight: '275',
      },
    ],
  },
  {
    name: 'Evo Drive',
    type: 'racquet',
    image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_576,h_576/v1598891187/Product_Media/2021/TENNIS_RACKETS/EVO/EVO%20Drive%20-%20102431/102431-EVO_Drive-136-1-face.png',
    category: "intermediate",
    description: 'Enjoying the self-improvement challenge of tennis? Check out the Evo Drive. Whether you want to have fun with friends or want to see how far you can take your game (why not both?!), this affordable performance racquet provides easy power and comfort as you enjoy tennis and reach your full potential. The Evo Drive brings easy power and comfort to your game.',
    technical_characteristics: {
      head_size: '670   cm² / 104 in²',
      weight: '270   g +/- 7g / 9.5 oz ',
      swing_weight: '285',
      stiffness: '70 + / - 3',
      composition: 'Graphite',
      length: '685 mm',
      recommended_string: 'Xcel/Addixion',
      recommended_grip: 'Syntec Evo',
    },
    variations: [
      {
        racquet: 'Evo Drive Tour',
        head_size: '670 cm /104 in²',
        weight: '285   g +/- 7g / 9 oz ',
        swing_weight: '270',
        length: '685 mm',
        balance: '320 mm +/- 7mm',
      },
      {
        racquet: 'Evo Drive Lite Women',
        head_size: '660 cm /102 in²',
        weight: '255   g +/- 7g / 9 oz ',
        swing_weight: '270',
        length: '685 mm',
        balance: '320 mm +/- 7mm',
      },
    ],
  },
  {
    name: 'Boost Aero',
    image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1651571347/Product_Media/2023/TENNIS_RACKETS/Intermediate/121242-Boost_Aero-100-1-Face.png',
    type: 'racquet',
    description: 'Make the most of every moment on court! With its innovative and graphite composition, the new Boost Aero is the first racquet to turn to if you want to have fun and harness your tennis potential. This racquet can be used for all tennis strokes and offers the perfect combination of power, lightness and maneuverability to support you as you progress, all for a reasonable price..',
    technical_characteristics: {
      head_size: '660 cm / 102 in²',
      weight: '260 g +/- 7g',
      swing_weight: '277',
      Stiffness: '70',
      composition: 'Graphite',
      length: '685 mm / 27 in',
      recommended_string: 'Syntec Uptake',
      recommended_grip: 'Full Cover',
    },
    variations: [
      {
        racquet: 'Pure Aero',
        head_size: '645 cm /100 in',
      },
    ],
  },
  {
    name: 'EVOKE 105',
    type: 'racquet',
    image: 'https://www.tennispro.eu/media/catalog/product/cache/5/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/1/2/121223_1_5.jpg',
    category: "beginner",
    description: 'The Babolat Evoke 105 racquet is perfect for casual players or beginners thanks to its easy grip and tolerance. Its construction combining aluminum and graphite brings lightweight, manoeuvrability and durability, for an easier tennis practice. The 680cm² head with wide sweetspot promotes ball centering and erases small placement errors to facilitate rallies and enhance game enjoyment. The light weight of this racquet (275g) and its very good balance (33cm) make it very easy to handle and will not tire your arm, even after several hours of play. The perfect combination of power and feel will allow beginners or recreational players to progress and take their game to the next leve',
    technical_characteristics: {
      head_size: '680    cm² / 105 in²',
      weight: '275   g +/- 7g / 9.7 oz ',
      swing_weight: '285',
      stiffness: '70 + / - 3',
      composition: 'Graphite',
      length: '685 mm',
      recommended_string: 'Xcel/Addixion',
      recommended_grip: 'Syntec Evo',
    },
    variations: [
      {
        racquet: 'EVOKE 102 Wembledon',
        head_size: '660 cm /100 in',
        weight: '270g +/- 7g / 9.7 oz ',
        length: '685 mm',
        balance: '12.99 in / 33 cm',
      },
    ],
  },
  
  {
    name: 'Leisure Racquets',
    image: 'https://www.babolat.ca/cdn/shop/products/121204_EAGLE_face.jpg?v=1641831995',
    type: 'racquet',
    category: "beginner",
    description: 'Ideal for players starting out in tennis, with this racket you can improve your game at a low cost while having fun on the court..',
    technical_characteristics: {
      head_size: '680 cm² / 100 in²',
      weight: '275 g +/- 7g / 10.6 oz',
      swing_weight: '335',
      stiffness: '73 + / - 3',
      composition: 'Aluminium',
      length: '685 mm / 27 in',
      recommended_string: 'Syn Gut',
      recommended_grip: 'Syntec Uptake',
    },
    variations: [
      {
        racquet: 'Voltage',
        head_size: '660 cm² / 102 in²',
        weight: '270g +/- 7g / 10.6 oz',
        swing_weight: '285',
        Stiffness: '73 + / - 3',
        composition: 'Aluminium',
        length: '685 mm / 27 in',
        recommended_string: 'RPM Power/Xcel',
        recommended_grip: 'Natural Grip',
      },
      {
        racquet: 'Falcon',
        head_size: '680 cm² / 105 in²',
        weight: '280 g +/- 7g / 10.6 oz',
        swing_weight: '285',
        Stiffness: '73 + / - 3',
        composition: 'Aluminium',
        length: '685 mm / 27 in',
        recommended_string: 'RPM Power/Xcel',
        recommended_grip: 'Natural Grip',
      },
      {
        racquet: 'Eagle',
        head_size: '680 cm² / 105 in²',
        weight: '275 g +/- 7g / 10 oz',
        swing_weight: '335',
        Stiffness: '73 + / - 3',
        composition: 'Aluminium',
        length: '685 mm / 27 in',
        recommended_string: 'RPM Power/Xcel',
        recommended_grip: 'Natural Grip',
      },
    ],
  },
  {
    name: 'Junior Wimbledon',
    image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1617537316/Product_Media/2022/Tennis_Rackets/WIMBLEDON_RACKETS/140447-Junior_25_Wim-100-1-Face.png',
    type: 'racquet',
    description: 'The Junior 25 Wimbledon racquet is suitable for young beginners between 130 and 140 cm tall. Designed in the image of the legendary British Grand Slam.',
    technical_characteristics: {
      head_size: '685 cm²',
      weight: '220 g +/- 10g',
      swing_Weight: 'N/A',
      stiffness: '  String bed RA: 45 +/- 5',
      composition: 'Aluminium',
      length: '635 mm / 25 in',
      recommended_string: 'RPM Power/Xcel',
      recommended_grip: 'Natural Grip',
    },
    variations: [
      {
        racquet: 'Junior 25 Wimbledon',
        head_size: '685 cm² / 102 in²',
        weight: '220g +/- 10g / 10.6 oz',
        swing_Weight: '285',
        stiffness: '73 + / - 3',
        composition: 'Aluminium',
        length: '635 mm / 25 in',    
      },
      {
        racquet: 'Junior 21 Wimbledon',
        head_size: '610 cm² / 102 in²',
        weight: '190  g +/- 10g / 10.6 oz',
        swing_Weight: '285',
        stiffness: '73 + / - 3',
        composition: 'Aluminium',
        length: '533mm / 27 in',
        recommended_string: 'RPM Power/Xcel',
        recommended_grip: 'Natural Grip',
      },
      {
        racquet: 'Junior 19 Wimbledon',
        head_size: '610 cm² / 102 in²',
        weight: '190  g +/- 10g / 10.6 oz',
        swing_Weight: '285',
        stiffness: '73 + / - 3',
        composition: 'Aluminium',
        length: '533mm / 27 in',
    
      },
    ],
  },
  {
    name: 'B Fly',
    image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1675439325/Product_Media/2023/TENNIS_RACKETS/140483-Bfly_17-100-1-3_4_Face_card.png',
    type: 'racquet',
    category: "junior",
    description: 'The Junior 25 Wimbledon racquet is suitable for young beginners between 130 and 140 cm tall. Designed in the image of the legendary British Grand Slam.',
    technical_characteristics: {
      head_size: '532 cm²',
      weight: '160 g +/- 10g',
      swing_weight: 'N/A',
      stiffness: '  String bed RA: 45 +/- 5',
      composition: 'Aluminium',
      length: '483mm / 25in',
      recommended_string: 'RPM Power/Xcel',
      recommended_grip: 'MEMOGRIP',
    },
    variations: [
      {
        racquet: 'B Fly 19',
        head_size: '532 cm²',
        weight: '160 g +/- 10g',
        swing_weight: 'N/A',
        stiffness: '  String bed RA: 45 +/- 5',
        composition: 'Aluminium',
        length: '482 mm / 19 in',
        recommended_string: 'RPM Power/Xcel',
        recommended_grip: 'MEMOGRIP',
      },
       {
        racquet: 'B Fly 17',
        head_size: '400 cm²',
        weight: '138 g +/- 10g',
        swing_weight: 'N/A',
        stiffness: '  String bed RA: 45 +/- 5',
        composition: 'Aluminium',
        length: '432 mm / 17in',
        recommended_string: 'RPM Power/Xcel',
        recommended_grip: 'MEMOGRIP',
      },
    ],
  },
  {
    name: 'Pure Drive Junior 26 Girl',
    image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1598891198/Product_Media/2021/TENNIS_RACKETS/Junior/Pure%20Drive%20Junior%20Girl%2026%20-%20140424/140424-Pure_Drive_Junior_Girl_26-348-1-face.png',
    description: 'Some call it unfair to the competition. Some call if the definition of power. We call it the Pure Drive.  Babolat launched the Pure Drive in 1994 and quickly established the benchmark for power. With every subsequent model, we’ve innovated and Evolved to meet the demands of the game. It’s no wonder the Pure Drive is one of most popular and versatile racquets in the world. The 10th generation of the Pure Drive offers point-ending explosive power with increased feel.  The Pure Drive Junior Girl 26 is designed specifically for competitive junior players. This alternate cosmetic allows juniors to express their unique sense of style.  The Pure Drive Junior 26 is the prefect racquet for your competitive junior looking to develop their game with power and feel. This alternate cosmetic allows your junior to express their unique sense of style   team BABOLAT pro players may play with a customized or different model than the equipment depicted.',
    technical_characteristics: {
      head_size: '645 cm²',
      weight: '250 g +/- 7g',
      swing_weight: 'N/A',
      stiffness: 'String bed RA: 45 +/- 5',
      composition: 'Graphite',
      length: '660 mm / 26 in',
      recommended_string: 'Xcel/AddiXion',
      recommended_grip: 'Syntec Pro',
    },
    variations: [
      {
        racquet: 'Pure Aero',
        head_size: '645 cm /100 in',
      },
    ],
  }],
  accessories: [],
  apparels: [{
    name: "Men's Play Crew",
    type: 'apparels',
    image: "https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1595785684/Product_Media/2020/APPAREL/Play/Play%20Crew%20Neck%20Tee%20M%20-%203MP1011/3MP1011-Play_Crew_Neck_Tee_M-4049-1-front.png",

    description: 'Feel confident on the court in the Babolat Play Crew. This performance top features contrast raglan sleeves, quick-drying material, colorblocking, and Babolat logos at left sleeve, back hem and left chest.',
    content: "100% Polyester",
    colors: ['Blue', 'Blue Aster', 'Estate Blue', 'Tomota Red', 'White']
  
  },
  {
    name: "Men's Play Short",
    type: 'apparels',
    image: "https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1595785594/Product_Media/2020/APPAREL/Play/Play%20Short%208%20M%20-%203MP1061/3MP1061-Play_Short_8_M-1000-1-front.png",

    description: 'The Babolat Play Shorts are ready for any tennis session. These shorts feature an elastic waistband with drawcord, side pockets, contrast panel at back waist, and a Babolat logo at right leg hem',
    content: "100% Polyester",
    colors: ['Black', 'Blue Aster', 'Estate Blue', 'White']
  
  },
  {
    name: "Exercise Jogger Pant",
    type: 'apparels',
    image: "https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1595784887/Product_Media/2020/APPAREL/Exercise/Exercise%20Jogger%20Pant%20M%20-%204MP1131/4MP1131-Exercise_Jogger_Pant_M-3002-1-front.png",

    description: 'The EXERCISE collection is designed for all your training sessions and matches. All the products have been developed to be combined with the PLAY range.The garments are primarily made from cotton blended with polyester, combining the comfort of cotton with the suppleness of polyester.A few warm items are included for the transition between the seasons. The perfect clothing for your warm-up and training sessions, as well as for coaching from the courtside.',
    content: "100% Polyester",
    colors: ['Heather Grey', 'Blue Aster', 'Estate Blue', 'Heather Black']
  
  }],
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