import Clear from "../components/Clear";
import Paint from "../components/Paint";
import Undo from "../components/Undo";
import '../components/Tools.modules.css';

const Tools = (props) => {
    return (
        <div className="tools">
            <Undo/>
            <Clear/>
            <Paint/>
        </div>
    )
}

export default Tools;