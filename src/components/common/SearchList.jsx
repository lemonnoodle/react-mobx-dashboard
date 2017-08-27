import { Form, Select } from 'antd';
import React from 'react';
const Option = Select.Option;
const FormItem = Form.Item;

class SearchList extends React.Component{
    handleChange = (value) => {
        let { getSearchList } = this.props.store;
        getSearchList(value);
    }
    render() {
        const { getFieldDecorator, formItemLayout, store } = this.props;
        let { searchResults } = store;
        const searchOptions = searchResults.slice();
        const options = searchOptions.map(o => <Option key={o.text}>{o.value}</Option>);
        return (
            <FormItem {...formItemLayout} label="Search">
                {getFieldDecorator('instrument')(
                    <Select
                        showSearch
                        placeholder="Search..."
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={false}
                        showArrow={false}
                        notFoundContent=""
                        mode="combobox"
                        defaultActiveFirstOption={false}
                    >
                        {options}
                    </Select>
                )}
            </FormItem>
        )
    }
}

export default SearchList;
