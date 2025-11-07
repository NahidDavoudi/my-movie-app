import React from "react";

const Title = ({title}) => {
    return(
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2">
            <h2 className="text-base font-bold text-gray-800">{title}</h2>
          </div>
    )
}
export default Title