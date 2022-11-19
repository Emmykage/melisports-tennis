const GET_CATEGORIES = "categories/GET_CATEGORIES"

const initialState = [{
    id: 1,
    name: 'racquets',
    image: "https://www.e-tennis.com/pub/media/catalog/product/cache/f5f3da80ad7b670245aea7e970662954/1/0/101406-babolat-pure-strike-16-x-19-tennis-racquet-2019_2_1.jpg"
},
{
    id: 2,
    name: "bags",
    image: "https://www.e-tennis.com/pub/media/catalog/product/cache/f5f3da80ad7b670245aea7e970662954/7/5/753101-bp_aero-370-1-3_4_face_folded.webp"
},
{
    id: 3,
    name: "shoes",
    image: "https://www.e-tennis.com/pub/media/catalog/product/cache/9cb80aaa700fbabda1d30deb1d8f7ff5/1/0/1041a335_001_sr_rt_glb.webp"
},
{
    id: 4,
    name: "men's apparel",
    image: "https://www.tennispro.eu/media/catalog/product/cache/5/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/4/m/4mp1441-4005_bleu_1.jpg"
}
];
export default function categoryReducer (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return state
    
        default:
            return state;
    }
}
export const getCategories = (dispatch) =>{
    dispatch({
        type: GET_CATEGORIES
        
    })
}