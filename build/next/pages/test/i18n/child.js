import React from 'react'
import { withTranslation } from 'react-i18next'

class App extends React.Component {
  render () {
    return (
      <div>
        <style jsx>
          {`
            p {
              color: pink;
            }
          `}
        </style>
        <p>
          {this.props.t('file2:wel')}
        </p>
      </div>
    )
  }
}
App.displayName = 'Child'
export default withTranslation()(App)