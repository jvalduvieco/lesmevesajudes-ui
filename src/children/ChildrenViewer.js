//@flow
import React from 'react';
import type {Child} from './ChildrenTypes';

type Props = {
    children: Array<Child>;
    onRemoveClick: Function,
    onUpdateClick: Function
};

class ChildrenViewer extends React.Component<Props> {
    renderChildrenList(children: Array<Child>) {
        return (
            <ul className="ItemList">
                {children.map((child) => (
                    <li className="Item" key={child.id}>
                       <span style={{float: 'left'}} onClick={() => this.props.onUpdateClick(child.id)}>
                            {child.nom} - {child.data_naixement}
                        </span>
                        <button style={{float: 'right'}} className="littlebutton" key={"delete" + child.id} onClick={e => this.props.onRemoveClick(child.id)}>
                            <i className="material-icons">delete</i>
                        </button>
                        <button style={{float: 'right'}} className="littlebutton" key={"edit" + child.id} onClick={e => this.props.onUpdateClick(child.id)}>
                            <i className="material-icons">edit</i>
                        </button>
                    </li>
                ))}
            </ul>);
    }

    render() {
        return (
            <div className="FormContainer">
                {this.renderChildrenList(this.props.children)}
            </div>
        );
    }
}

export default ChildrenViewer;