const GET_CATEGORIES = 'categories/GET_CATEGORIES';

const initialState = [{
  id: 1,
  name: 'Racquets',
  image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1651570894/Product_Media/2023/TENNIS_RACKETS/EXPERT/101499-Pure_Aero_98-370-1-Face.png',
},
{
  id: 3,
  name: 'Bags',
  image: 'https://www.e-tennis.com/pub/media/catalog/product/cache/f5f3da80ad7b670245aea7e970662954/7/5/753101-bp_aero-370-1-3_4_face_folded.webp',
},
{
  id: 2,
  name: 'Shoes',
  image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/t_michelin_logo/v1658505671/Product_Media/2023/Soes/30F23649-JET_TERE_ALL_COURT_MEN-4101-1-Exterieur.png',
},
{
  id: 4,
  name: 'Apparels',
  image: 'https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1595784162/Product_Media/2020/APPAREL/Exercise/Exercise%20Hood%20Sweat%20M%20-%204MP1041/4MP1041-Exercise_Hood_Sweat_M-4049-1-front.png',
},
];
export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return state;

    default:
      return state;
  }
}
export const getCategories = (dispatch) => {
  dispatch({
    type: GET_CATEGORIES,

  });
};
