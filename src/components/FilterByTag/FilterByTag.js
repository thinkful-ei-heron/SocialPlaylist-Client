import React, { Component } from 'react'
import classnames from 'classnames'
import UserDashboardRoute from '../../routes/UserDashboard/UserDashboardRoute';

export class FilterByTag extends Component {
    constructor(props) {
        super(props)
        this.tags = React.createRef()
    }

    submitForm = e => {
        e.preventDefault()
        ${this.tags.current.value}
    }

    render() {
      const containerClasses = classnames('container', 'mb-1', styles.container) 
      const formClasses = classnames('form-horizontal', styles.form)
      
      return (
          <div className={containerClasses}>
              <form className={formClasses}>
                  <p className='mb-1'>Fitler By Tags</p>
                  <div className='columns text-center'>
                      <div className='column col-4 col xs-12'>
                          <div className='form-group'>
                              <label className='form-label' htmlFor='tags'>
                                  Filter By:
                              </label>
                          </div>
                        <div className='col-9 col-sm-12'>
                            <input 
                                ref={this.tags}
                                className='form-input'
                                type='text'
                                id='tags'
                                placeholder='#datenight'
                                value={this.state.tags}
                                onChange={event => this.setState({ tags: event.target.value })}
                            />
                        </div>
                    </div>
                </div>
             </form>
          </div>
      )
    }

}