import { useHistory } from 'react-router-dom'

const PageNotFound = () => {
    const history = useHistory();
    
    const handleReturnToHomePage = () => {
        history.replace('/')
    }

    return (
        <div>
            Sorry, The page you are looking for is not found.
            <button onClick={handleReturnToHomePage}>
                Return to home page.
            </button>
        </div>
    )
}

export default PageNotFound
