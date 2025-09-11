import { BarLoader } from "react-spinners";



const override = {
    display: 'block',
    margin: '0 auto 50px auto'
}

const Spinner = ({color = 'blue', loading, size = 150}) => {
    return ( 
        <div>
             <BarLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={size}
                aria-label="Loading..."
            /> 
         </div>
     );
}
 
export default Spinner;