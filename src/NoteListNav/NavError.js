import React from 'react'

class NavError extends React.Component {    
    constructor(props) {
        super(props)
         this.state = {
           hasError: null
        }
    }
    
    static getDerivedStateFromError(error) {
        this.setState({
            hasError: true
        })
    }

    componentDidCatch(error) {
        // You can also log the error to an error reporting service
        console.log(error)
    }

    render() {
        // If there was an error, show an error page
        if (this.state.error) {
            return (
                <main className="error-page">
                    <h1>Something seems to have gone wrong</h1>
                    <p>Try refreshing the page</p>
                </main>
            );
        }
        // Otherwise, render the children
        return this.props.children;
    }
}

export default NavError