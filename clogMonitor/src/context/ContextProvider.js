import Context from './Context';
import React, { Component } from 'react';
export default class ContextProvider extends Component {
    state = {
        token: sessionStorage.getItem("token"),
    };

    render() {
        return (
            <Context.Provider
                value={{
                    token: this.state.token,
                    setToken: token => {
                        this.setState({
                            token: token
                        });
                    }
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}