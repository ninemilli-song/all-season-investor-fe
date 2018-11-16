/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const EditableContext = React.createContext();

const TableEditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

export const TableEditableFormRow = Form.create()(TableEditableRow);

export class TableEditableCell extends React.Component {
    state = {
        editing: false,
    }

    componentDidMount() {
        const { editable } = this.props;
        if (editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        const { editable } = this.props;
        if (editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        // eslint-disable-next-line react/destructuring-assignment
        const editing = !this.state.editing;
        
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = () => {
        const { record, handleSave } = this.props;

        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }

            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;

        return (
            <td 
                ref={(node) => { this.cell = node; }}
                {...restProps}
            >
                {
                    editable ? (
                        <EditableContext.Consumer>
                            {
                                (form) => {
                                    this.form = form;
                                    return (
                                        editing ? (
                                            <FormItem style={{ margin: 0 }}>
                                                {
                                                    form.getFieldDecorator(dataIndex, {
                                                        rules: [{
                                                            required: true,
                                                            message: `${title} is required.`
                                                        }],
                                                        initialValue: record[dataIndex],
                                                    })(
                                                        <Input 
                                                            ref={(node) => { this.input = node; }}
                                                            onPressEnter={this.save}
                                                        />
                                                    )
                                                }
                                            </FormItem>
                                        ) : (
                                            <div
                                                className="editable-cell-value-wrap"
                                                onClick={this.toggleEdit}
                                                role="presentation"
                                            >
                                                {restProps.children}
                                            </div>
                                        )
                                    );
                                }
                            }
                        </EditableContext.Consumer>
                    ) : restProps.children
                }
            </td>
        );
    }
}
