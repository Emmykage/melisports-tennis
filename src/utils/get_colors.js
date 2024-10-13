export const pickColor = (color) => {

    const singleColor = (color) => {
        console.log(color)

        if(color == "white"){
            return `bg-white`
        }
        else if(color =="black"){
            return `bg-black`        }
        else if(color){
            return `bg-${color}-500`        }
        else{
                return  "bg-gray-500"
         }
       
    }

    const splitColor = (color) => {
    let colorArr =   color.split("/")
    console.log(colorArr[0])

    if(colorArr.length ==  1) {
        console.log(singleColor(colorArr[0]))

        return [singleColor(colorArr[0])]
        
    }
    else{
        let  color1 = singleColor(colorArr[0])
        let  color2 = singleColor(colorArr[1])

        return [color1, color2]
        
    }

    }

    console.log(splitColor(color))

 return   splitColor(color)


}