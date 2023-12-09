import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {

    const onClick = () => {
        console.log('Click')
    }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button onClick={onClick} color='green' text='Add' />
        </header>
    )
}

Header.defaultProps = {
    title: 'Welcome to React',
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'cyan'
// }

export default Header