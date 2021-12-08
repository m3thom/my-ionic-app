import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorInfo: null, debug: false }

    this.handleToggleDebug = this.handleToggleDebug.bind(this)
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)

    this.setState({ errorInfo, error })
  }

  handleToggleDebug() {
    this.setState(state => ({ debug: !state.debug }))
  }

  render() {
    const { hasError, errorInfo, error, debug } = this.state

    if (hasError) {
      return (
        <div className='error-boundary'>
          <button onClick={this.handleToggleDebug}>DEBUG</button>

          {
            debug ? (
              <>
                {error && <p>{error.message}</p>}
                {errorInfo && <pre>{errorInfo.componentStack}</pre>}
              </>
            ) : (
              <h3>Something went wrong!</h3>
            )
          }
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
