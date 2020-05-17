import React from 'react';
import { Card, Form, Input, Row, DatePicker, InputNumber } from 'antd';
import { get } from 'lodash';
import { DeleteFilled } from '@ant-design/icons';
import moment from 'moment';

type Props = {
  list: Array<Object>,
  handleFieldUpdate: Function,
  deleteTypeConfirmation: Function,
};

const ItemCard = ({
  list,
  handleFieldUpdate,
  deleteTypeConfirmation,
}: Props) => {
  return (
    <Row justif="start">
      {list.map((item, index) => (
        <Card
          style={{ width: 400, marginRight: 20, marginBottom: 20 }}
          key={item.id}
          title={`${item.name}-${get(item, 'fields[0].value', '')}`}
          extra={
            <DeleteFilled
              key="ellipsis"
              onClick={() => deleteTypeConfirmation(item.id)}
            />
          }
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            layout="vertical"
          >
            {item.fields.map((field, fieldIndex) => (
              <Form.Item
                key={`key-${fieldIndex}`}
                label={field.name}
                name={field.name}
              >
                {(get(field, 'fieldType') === 'SMALL_TEXT' ||
                  get(field, 'fieldType') === 'LONG_TEXT') && (
                  <Input
                    defaultValue={field.value}
                    style={{ width: '100%' }}
                    onChange={e =>
                      handleFieldUpdate(index, fieldIndex, e.target.value, item)
                    }
                  />
                )}
                {get(field, 'fieldType') === 'NUMBER' && (
                  <InputNumber
                    defaultValue={field.value}
                    style={{ width: '100%' }}
                    onChange={e =>
                      handleFieldUpdate(index, fieldIndex, e.target.value, item)
                    }
                  />
                )}
                {get(field, 'fieldType') === 'DATE' && (
                  <DatePicker
                    defaultValue={moment(field.value)}
                    style={{ width: '100%' }}
                    onChange={date =>
                      handleFieldUpdate(index, fieldIndex, date, item)
                    }
                  />
                )}
              </Form.Item>
            ))}
          </Form>
        </Card>
      ))}
    </Row>
  );
};

export default ItemCard;
