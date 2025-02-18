import PropTypes from "prop-types"
import "../styles/Card.css"

const Card = ({name}) => {
    return (
        <div className="card">
            <p>{name}</p>
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired
}

export default Card