import { useParams } from "react-router-dom"

function UnitPage () {
    const {id} = useParams()

    return(
        <h1>UNIT PAGE {id}</h1>
    )
}

export default UnitPage