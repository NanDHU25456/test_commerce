import React, { Component } from 'react'
import { Result, Button } from 'antd';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button onClick={() => {
                        this.props.history.push("/")
                    }} type="primary">Back Home</Button>}
                />
            </div>
        )
    }
}
