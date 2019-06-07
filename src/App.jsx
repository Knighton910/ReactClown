/*** @desc : Hard-coded arrays:
 *  includes -[ initialIssues and sampleIssue ]- */
const initialIssues = [
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('2019-08-15'), due: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
        created: new Date('2018-08-12'), due: new Date('2018-08-30'),
        title: 'Missing bottom boder on panel'
    }
]

const sampleIssue = {
    status: 'New',
    owner: 'Pieta',
    title: 'Completion date should be optional'
};

/*** @desc:
 * class definitions: includes -[
 * IssueFilter, IssueRow, IssueTable, IssueAdd and IssueList
 * components]-  */
class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the issue filter.</div>
        );
    }
}

class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() : ""}</td>
                <td>{issue.title}</td>
            </tr>
        );
    }
}

/*** @desc:
 * IssueTable is a huge/monolitic stateful component, which should be in its on file @todo
 * Automatically adds the sample issue to the list of issues after the page is loaded */
class IssueTable extends React.Component {

    render() {
        const issueRows = this.props.issues.map(issue =>
            <IssueRow key={issue.id} issue={issue}/>
            );

        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>

                <tbody>
                    { issueRows }
                </tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        setTimeout(() => {
            this.props.createIssue(sampleIssue)
        }, 2000)
    }

    render() {
        return (
            <div>This is a placeholder for a form to add an issue.</div>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super()
        /*** @desc: here is the State Storage structure*/
        this.state = {
            issues: []
        };
        this.createIssue = this.createIssue.bind(this)
    }

    // ♽ life cycle method ♽
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            // taking issues the empty Arr and updating it with the initialIssue Arr
            this.setState({ issues: initialIssues })
        }, 500)
    }

    createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();

        // adding the newly minted issue to the (issues) pool
        newIssueList.push(issue);
        this.setState({ issues: newIssueList });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                /* (bind)giving IssueAdd access to the IssueList scope */
                <IssueAdd createIssue={ this.createIssue.bind(this) }/>
            </React.Fragment>
        );
    }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));








