import React, { Component } from 'react';

export class Footer extends Component {
    render() {
        return(
            <footer>
                <address>
                Site by <a href="mailto:mccoyirick.p@gmail.com">McCoy-Irick Palma</a>
                <br/>
                Tel: <a href="tel:206-973-9099">(206) 973-9099</a>
                </address>
                <p className="copy">&copy; Copyright 2014 | Anakbayan-Seattle</p>
            </footer>
            )
        }
    }
