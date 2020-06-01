import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import * as d3 from 'd3';
import data from '../data/sample-data.csv'
import { BarChart, Bar, Label, XAxis, YAxis, Tooltip } from 'recharts';

export class TrackerPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            filter: 'All',
            view: 'table',
            addToggle: 'd-none',
            tableToggle: '',
            chartToggle: 'd-none',
            name: '',
            pronoun: '',
            coc: '',
            email: '',
            phone: ''
        };
        this.handleCOC = this.handleCOC.bind(this);
        this.startAdd = this.startAdd.bind(this);
        this.cancelAdd = this.cancelAdd.bind(this);
        this.addRow = this.addRow.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.tableToggle = this.tableToggle.bind(this);
        this.chartToggle = this.chartToggle.bind(this);
      }

    handleCOC(COC) {
        this.setState({filter: COC});
    }

    tableToggle() {
        let test = this.state.tableToggle;
        if(test === 'd-none') {
            this.setState({tableToggle: '', chartToggle: 'd-none', view: 'table'});
        }
    }

    chartToggle() {
        let test = this.state.chartToggle;
        if(test === 'd-none') {
            this.setState({tableToggle: 'd-none', chartToggle: '', view: 'signal'});
        }
    }

    startAdd() {
        this.setState({addToggle: ''})
    }

    cancelAdd() {
        this.setState({addToggle: 'd-none'});
    }

    handleClick(index, ed) {
        let newArray = this.state.data;
        if(newArray[index][ed] === "X") {
            newArray[index][ed] = ""; 
        } else {
            newArray[index][ed] = "X"; 
        }
        this.setState({data: newArray})
    }

    handleInputChange = (e) => {
        let input = e.target;
        let name = e.target.name;
        let value = input.value;
        console.log(e.target);
        console.log(e.target.name);
        console.log(input.value);

        this.setState({
            [name]: value
        })
    }

    addRow() {
        console.log(this.state);
        let newArray = this.state.data;
        newArray.push({
            Name: this.state.name,
            Pronouns: this.state.pro,
            COC: this.state.coc,
            Email: this.state.email,
            Phone: this.state.phone
        });

        this.setState({
            data: newArray,
            name: '',
            pronouns: '',
            coc: '',
            email: '',
            phone: ''
          });
    }
    
    componentDidMount() {
        d3.csv(data)
        .then((data) => {
            this.setState({
                data: data,
                toggleSpinner: 'd-none'
            });
        })
    }
    
    render() {
        console.log(this.state.chartToggle);
        console.log(this.state.tableToggle);
        return(
            <div>
                <TrackerHeader filter={this.state.filter} view={this.state.view}/>
                <TrackerControls chartToggle={this.chartToggle} tableToggle={this.tableToggle} function={this.handleCOC} startAdd={this.startAdd} filter={this.state.filter} view={this.state.view}/>
                <TrackerAdd handleInput={this.handleInputChange} cancelFunction={this.cancelAdd} addToggle={this.state.addToggle} addRow={this.addRow}/>
                <Spinner animation="border" variant="grey" className={this.state.toggleSpinner}/>    
                <TrackerChart class={this.state.chartToggle} data={this.state.data} filter={this.state.filter}/>
                <TrackerTable class={this.state.tableToggle} handleClick={this.handleClick} filter={this.state.filter} view={this.state.view} data={this.state.data}/>
            </div>
        )
    }
}

export class TrackerHeader extends Component {
    render() {
        let res = this.props.view;
        if(res === "signal") {
            res = "chart";
        }
        let res2 = this.props.filter;
        if(res2 === "All") {
            res2 = "all members";
        } else {
            res2 = res2 + " COC"
        }
        return(
            <div className="header-home">
                <h1>ED-TRACKER</h1>
                <div className="header-home-container">
                    <i className={"fa fa-" + this.props.view}></i>
                    <p className="tracker-header-text">{res.toUpperCase() + " VIEW - " + res2.toUpperCase()}</p>
                </div>
            </div>
        );
    }
}

export class TrackerControls extends Component {
    render() {
        return(
            <div className="controls-tracker">
            <Nav>
            <NavDropdown title="Change View" id="change-view-dropdown">
                <NavDropdown.Item onClick={this.props.tableToggle}><i className="fa fa-table"></i> Table</NavDropdown.Item>
                <NavDropdown.Item onClick={this.props.chartToggle}><i className="fa fa-signal"></i> Chart</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Filter Data" id="filter-data-dropdown">
                <NavDropdown.Item disabled>Choose COC:</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.props.function('All')}>All</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.props.function('North')}>North</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.props.function('Central')}>Central</NavDropdown.Item>
                <NavDropdown.Item onClick={() => this.props.function('South')}>South</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Button variant="white" onClick={this.props.startAdd}><i className="fa fa-plus"></i> Add Person</Button>
            </div>
        );
    }
}

export class TrackerChart extends Component {
    render() {
        let exData = [];
        let newEDs = [];
        if(this.props.data !== undefined) {
            exData = this.props.data;
            newEDs = Object.keys(exData[0]);
            newEDs = newEDs.slice(5);
            if(this.props.filter === "All") {
                newEDs = newEDs.map((row, index) => {
                    let count = 0;
                    exData.map((member) => {
                        if(member[row] === "X") {
                            count++;
                        }
                        return(member);
                    })
                    return(
                        {ed: row, 'Members Taken': count}
                    )
                })
            } else {
                newEDs = newEDs.map((row, index) => {
                    let count = 0;
                    exData.map((member) => {
                        if(member[row] === "X" && member.COC === this.props.filter) {
                            count++;
                        }
                        return(member);
                    })
                    return(
                        {ed: row, 'Members Taken': count}
                    )
                })
            }
        }

        return(
        <div className={"chart-contain " + this.props.class}>
        <BarChart width={1300} height={500} data={newEDs} margin={{top: 20, right: 30, left: 10, bottom: 20,}}>
            <XAxis dataKey="ed">
            <Label value="Educational Discussions" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis>
            <Label value="Number of Members Taken" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip/>
            <Bar dataKey="Members Taken" stackId="a" fill={'darkred'} />
        </BarChart>
        </div>
        )
    }
}

export class TrackerAdd extends Component {
    render() {
        return(
            <section className={"add-form-contain " + this.props.addToggle}>
                <label>
                    Name:
                    <input text="text" id="name-input" onChange={this.props.handleInput} name="name"></input>
                </label>
                <label>
                    Pronouns:
                    <input text="text" id="pro-input" onChange={this.props.handleInput} name="pro"></input>
                </label>
                <label>
                    COC:
                    <input text="text" id="coc-input" onChange={this.props.handleInput} name="coc"></input>
                </label>
                <label>
                    Email:
                    <input text="email" id="email-input" onChange={this.props.handleInput} name="email"></input>
                </label>
                <label>
                    Tel:
                    <input text="tel" id="tel-input" onChange={this.props.handleInput} name="phone"></input>
                </label>
                <div>
                    <input type="submit" value="Add" id="add-button" onClick={this.props.addRow}></input>
                    <input type="submit" value="Cancel" id="cancel-button" onClick={this.props.cancelFunction}></input>
                </div>
            </section>
        )
    }
}

export class TrackerTable extends Component {
    render() {
        let colArray = [];
        let rowArray = [];
        if(this.props.data !== undefined) {
            colArray = Object.keys(this.props.data[0]);
            rowArray = this.props.data;
        }
        return(
        <div className={"table-contain " + this.props.class}>
        <Table striped hover responsive className="tracker-table">
            <TableHeaders cols={colArray}/>
            <TableBody handleClick={this.props.handleClick} filter={this.props.filter} rows={rowArray}/>
        </Table>
        </div>
        );
    }
}

export class TableHeaders extends Component {
    render() {
        let thArray = this.props.cols.map((col) => {
        return(<th key={col}>{col}</th>)
        }) 
        return(
            <thead>
                <tr>
                {thArray}
                </tr>
            </thead>
        );
    }
}

export class TableBody extends Component {
    render() {
        let trArray = this.props.rows.map((row, index) => {
            let rowElem = 
            <tr key={row.Name}>
            <td>{row.Name}</td>
            <td>{row.Pronouns}</td>
            <td>{row.COC}</td>
            <td>{row.Email}</td>
            <td>{row.Phone}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, 'Constitution'))}>{row.Constitution}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, 'Seattle Situationer'))}>{row["Seattle Situationer"]}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, '12-Year History'))}>{row["12-Year History"]}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, '5 Golden Rays'))}>{row["5 Golden Rays"]}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, 'PSR'))}>{row.PSR}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, 'CASER'))}>{row.CASER}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, 'Peace Talks'))}>{row["Peace Talks"]}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, 'Martial Law'))}>{row["Martial Law"]}</td>
            <td id="table-td" onClick={() => (this.props.handleClick(index, 'Neoliberalism'))}>{row.Neoliberalism}</td>
            </tr>;
            if(this.props.filter === "All") {
                return(rowElem)
            } else if (this.props.filter === row.COC) {
                return(rowElem)
            }
            })
        return(
        <tbody>
            {trArray}
        </tbody>
        );
    }
}
