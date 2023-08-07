import { Button, Card, DatePicker, Form, Input, Space, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";

const ReportingForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    const { DA, TICKET_FARE } = values;
    const finalValues = {
      TOTAL: Number(DA) + Number(TICKET_FARE),
    };
    Object.keys(values).map((key) => {
      if (key === "DATE") {
        finalValues[key] = dayjs(values[key]).format("DD-MM-YYYY");
      } else {
        finalValues[key] = values[key];
      }
    });
    try {
      await axios.post(
        "https://sheet-api.up.railway.app/v1/sheet",
        finalValues
      );
      message.success("Report Submitted Successfully");
      form.resetFields();
    } catch (error) {
      message.error("Unable to process at this time");
    }
    setLoading(false);
  };
  const townData = Form.useWatch("TOWN", form);
  const leaveDay =
    townData?.toLowerCase() === "leave" || townData?.toLowerCase() === "sunday";

  return (
    <Card className={"container"}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ DATE: moment() }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Date"
          name="DATE"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker placeholder="Select date" format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          label="Town"
          name="TOWN"
          rules={[{ required: true, message: "reqired" }]}
        >
          <Input placeholder="Enter town" />
        </Form.Item>
        {!leaveDay && (
          <>
            <Space.Compact>
              <Form.Item
                label="From"
                name="FROM"
                rules={[{ required: true, message: "required" }]}
              >
                <Input placeholder="From" />
              </Form.Item>
              <Form.Item
                label="To"
                name="TO"
                rules={[{ required: true, message: "required" }]}
              >
                <Input placeholder="To" />
              </Form.Item>
              <Form.Item
                label="Km"
                name="KM"
                rules={[{ required: true, message: "required" }]}
              >
                <Input placeholder="Km" type="number" />
              </Form.Item>
            </Space.Compact>
            <Form.Item
              label="Ticket Fare 1.6"
              name="TICKET_FARE"
              rules={[{ required: true, message: "required" }]}
            >
              <Input type="number" placeholder="Enter ticket fare" />
            </Form.Item>
            <Form.Item label="Lodging HOTAL" name="LODGING_HOTAL">
              <Input placeholder="Lodging hotel" type="number" />
            </Form.Item>
            <Form.Item
              label="DA for HQ/EX"
              name="DA"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="Enter DA" type="number" />
            </Form.Item>
          </>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ReportingForm;
