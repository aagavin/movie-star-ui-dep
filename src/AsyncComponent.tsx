import React, { Component } from 'react';
export default function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    public static Component = null;
    public state = { Component: AsyncComponent.Component };

    public componentWillMount() {
      if (!this.state.Component) {
        // tslint:disable-next-line: no-shadowed-variable
        getComponent().then((Component: any) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    public render() {
      // tslint:disable-next-line: no-shadowed-variable
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
  return AsyncComponent;
}