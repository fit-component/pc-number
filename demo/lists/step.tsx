import * as React from 'react'
import Number from '../../src'

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <div>
                <Number label="步长为5"
                        step={5}
                        max={10}/>
                <Number label="步长为1.5"
                        float={1}
                        step={1.5}
                        min={-1}
                        style={{marginTop:10}}/>
            </div>
        )
    }
}