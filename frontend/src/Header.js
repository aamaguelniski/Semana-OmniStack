import React from 'react';

function Header(props){
    return (
        <Header>
            <h1>{props.children}</h1>
        </Header>
    );
}

export default Header;