import './../App.css';

export default function FilterItems(props) {
    function applyFilter(opt) {
        props.filterRecords(opt, props.filterType);
    }

    function createCheckbox(option) {
        return (
            <div>
                <input type="checkbox" id={option} name={props.filterType} value={option} onChange={() => applyFilter(option)}></input>
                <label for={option} id="light-text">{option}</label>
            </div>
        );
    }

    return (
        <div>
            <h3 id="light-text">{props.filterType.charAt(0).toUpperCase() + props.filterType.slice(1)}</h3>
            {props.filterGroup.options.map(createCheckbox)}
        </div>
    );
}