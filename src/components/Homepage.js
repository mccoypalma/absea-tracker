import React, {Component} from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

export class HeaderHome extends Component {
    render() {
        return(
        <div>
            <h1 className="home-header-text">ANAKBAYAN-SEATTLE APP PROPOSAL</h1>
        </div>
        )
    }
}

export class MainHome extends Component {
    render() {
        return(
            <div className="main-home">
            <h2>THE PROPOSAL</h2>
            <p>Kumusta kasamas, this is a proposal being made by McCoy, secretary general of the Organizational Development committee as a potential tool used to improve our organization's ability to  <strong>keep track of educational discussions for our membership, as well as current campaigns</strong>.</p>
            <h2>ED-TRACKER</h2>
            <p>There are <strong>multiple</strong> "views" to change. When clicking the first toggle menu seen below, you can change whether to view a <strong>chart or table</strong>. From there click one of the two options!</p>
            <NavDropdown title="Change View" className="example" id="change-view-dropdown">
                <NavDropdown.Item><i className="fa fa-table"></i> Table</NavDropdown.Item>
                <NavDropdown.Item><i className="fa fa-signal"></i> Chart</NavDropdown.Item>
            </NavDropdown>
            <p>The second menu depends on what you selected on the first, and contains <strong>filters by Chapter Organizing Committee (COC)</strong>. Click the filter button and then click which COC you want to filter the data for!</p>
            <NavDropdown title="Filter Data" className="example" id="filter-data-dropdown">
                <NavDropdown.Item disabled>Choose COC:</NavDropdown.Item>
                <NavDropdown.Item>North</NavDropdown.Item>
                <NavDropdown.Item>Central</NavDropdown.Item>
                <NavDropdown.Item>South</NavDropdown.Item>
            </NavDropdown>
            <p>To add people to the dataset, <strong>click the add person button</strong>, "<strong>+</strong>", seen below. From there, fill out the required information and click the add button to add the person to the table. To add the EDs past or newly entered people have taken, simply <strong>click the box and a X should show up </strong>, marking the ED as complete!</p>
            <Button id="example" variant="white"><i className="fa fa-plus"></i> Add Person</Button>
            <h2>CAMPAIGNS</h2>
            <p>Work in progress! Will be second interaction for complete Project 2.</p>
            </div>
        )
    }
}
