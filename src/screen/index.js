import './index.css'

function ScreenCalculator({saveValue,value}) {
    return ( 
        <div className="screen">
            <p>{saveValue}</p>
            <h1>{value}</h1>
        </div>
     );
}

export default ScreenCalculator;