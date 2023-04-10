import React, { Component, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

class DropdownWithSearch extends Component {

    renderItems() {
        const props = this.props;

        if (!props.values) {
            return;
        }

        const items = [];

        props.values.forEach(item => {
            items.push(<Dropdown.Item eventKey={item.name}
                active={props.selected && props.selected.id === item.id}
                onClick={props.onClick.bind(this, item)}>
                {item.name}
            </Dropdown.Item>)
        })

        return <Dropdown.Menu as={CustomMenu}>
            {items}
        </Dropdown.Menu>
    }
    render() {
        const props = this.props;
        return <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <span style={{ paddingRight: "10px" }}>
                    {props.selected ? props.selected.name : "Выберите проект"}
                </span>
            </Dropdown.Toggle>

            {this.renderItems()}
        </Dropdown>
    }
}

export default DropdownWithSearch;


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
                    )}
                </ul>
            </div>
        );
    },
);