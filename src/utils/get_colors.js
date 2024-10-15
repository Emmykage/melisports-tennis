const colors = {
    blue:  "bg-blue-500",
    red:  "bg-red-500",
    green:  "bg-green-500",
    yellow:  "bg-yellow-500",
    pink:  "bg-pink-500",
    orange:  "bg-orange-500",
    gray:  "bg-gray-500",
    white: "bg-white",
    black: "bg-black"
}
const selectColor = (color) => colors[color] || "bg-purple-500"

export const pickColor = (color) => {

    // const singleColor = (color) => {
    //     console.log(color)

    //     if(color == "white"){
    //         return `bg-white`
    //     }
    //     else if(color =="black"){
    //         return `bg-black`        }
    //     else if(color){
    //         return `bg-${color}-500`        }
    //     else{
    //             return  "bg-purple-500"
    //      }
       
    // }

    const splitColor = (color) => {
    let colorArr =   color.split("/")
    if(colorArr.length ==  1) {
        return [selectColor(colorArr[0])]
        
    }
    else{
        let  color1 = selectColor(colorArr[0])
        let  color2 = selectColor(colorArr[1])

        return [color1, color2]
        
    }

    }

 return   splitColor(color)


}


