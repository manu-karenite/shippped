import React from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
const { Search } = Input;

function SearchBar({ keyy, setKey }) {
  const searchHandler = (e) => {
    e.preventDefault();
    setKey(e.target.value.toLowerCase());
  };
  return (
    <Space>
      <Search
        placeholder="input search text"
        size="large"
        enterButton
        value={keyy}
        onChange={searchHandler}
      />
    </Space>
  );
}

export default SearchBar;
