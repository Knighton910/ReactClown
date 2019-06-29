
class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the issue filter.</div>
        );
    }
}

function IssueRow (props) {
    const issue = props.issue;
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created}</td>
            <td>{issue.effort}</td>
            <td>{issue.due}</td>
            <td>{issue.title}</td>
        </tr>
    );
}

function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
        <IssueRow key={issue.id} issue={issue} />
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
                {issueRows}
            </tbody>
        </table>
    );
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        // e.preventDefault()
        const form = document.forms.issueAdd
        const issue = {
            owner: form.owner.value,
            title: form.title.value,
            status: "New"
        }
        this.props.createIssue(issue)
        form.owner.value = ""; form.title.value = "";
    }

    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
            issueList {
                id title status owner
                created effort due
            }
        }`;

        const response = await fetch('/grapql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(({ query }))
        });
        const result = await response.json()
        this.setState({ issues: result.data.issueList })
    }

    createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({ issues: newIssueList });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </React.Fragment>
        );
    }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));




