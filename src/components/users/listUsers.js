import React, { Component } from "react";
import { observer } from "mobx-react";
import { Spin, Button, Form, Input, Table, Modal, Col } from "antd";
import usersStore from "./usersStore";
import "./listUsers.css";
import { toJS } from "mobx";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import history from "../../utils/utils";
import FormItem from "antd/lib/form/FormItem";

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      email: "",
      name: "",
      phone: "",
      id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  formRef = React.createRef();

  columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",

      render: (record) => {
        return (
          <div>
            <img src={record} />
          </div>
        );
      },
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",

      render: (record, rowIndex) => (
        <div style={{ display: "flex" }}>
          <Button
            style={{
              display: "flex",
              alignContent: "center",
              marginRight: "1em",
            }}
            className="button"
            onClick={() => {
              this.setState({ visible: true });
              history.push({
                pathname: `/${record.id}`,
                state: { deviceId: record.id },
              });
              this.getUserById(record.id);
            }}
          >
            <EyeOutlined
              style={{ paddingTop: "0.3em", paddingRight: "0.2em" }}
            />
            <p>view</p>
          </Button>
        </div>
      ),
    },
  ];
  getUserById(id) {
    usersStore.getUserInfoById(id);
    const user = toJS(usersStore.singleUser);
    this.setState({
      email: user.email,
      name: user.name,
      phone: user.phoneNumber,
      id: user.id,
    });
  }

  handleSubmit() {
    usersStore.editUserInfo(this.state.id, {
      email: this.state.email,
      name: this.state.name,
      phoneNumber: this.state.phone,
    });
  }

  handleChange(event, field) {
    this.setState({ [field]: event.target.value });
  }

  componentDidMount() {
    usersStore.getUserInfo();
  }

  render() {
    const data = toJS(usersStore.users);

    if (usersStore.userIsLoading && data.length != 0) {
      return <Spin />;
    }
    return (
      <div>
        <h1>Users</h1>
        <Table
          loading={usersStore.userIsLoading}
          dataSource={data}
          columns={this.columns}
        />
        ;
        <Modal
          title="View User"
          visible={this.state.visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          width={1000}
        >
          <div>
            <Col span={16}>
              <Form onFinish={this.handleSubmit}>
                <Form.Item label="Email">
                  <Input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event, "email")}
                  />
                </Form.Item>

                <Form.Item label="Name">
                  <Input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={(event) => this.handleChange(event, "name")}
                  />
                </Form.Item>

                <Form.Item label="Phone">
                  <Input
                    name="phone"
                    type="text"
                    value={this.state.phone}
                    onChange={(event) => this.handleChange(event, "phone")}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => this.setState({ visible: false })}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </div>
        </Modal>
      </div>
    );
  }
}

export default observer(ListUsers);
