import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function UnitPage () {
    const dispatch = useDispatch()
    const {id} = useParams()
    const unitInfo = useSelector(store => store.unit)

    useEffect(() => {
        dispatch({ 
            type: "GET_UNIT",
            payload: id
         });
    }, []);


    return(
        <>
            <h1>{unitInfo[0].unitsName}</h1>
        
            {unitInfo.map((unit, i) => {
                return(
                    <div key={i}>
                        <h2>{unit.lessonsName}</h2>
                        <p>{unit.description}</p>
                    </div>
                )
            })}
        </>
    )
}

export default UnitPage