import React from 'react';

const userEmail = ( props ) => {
    return (
        <form onSubmit={props.emailSubmit}>
        <input type="text" name="email" placeholder="Enter your email" value={props.UserEmail}></input>
        <button type="submit">Entrar</button>
        </form>
    )
}

export default userEmail