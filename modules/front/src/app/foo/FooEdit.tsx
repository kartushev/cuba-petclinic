import * as React from "react";
import {FormEvent} from "react";
import {Button, Card, Form, message} from "antd";
import {observer} from "mobx-react";
import {FooManagement} from "./FooManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction} from "mobx";
import {FormField, instance, Msg} from "@cuba-platform/react";
import {Foo} from "../../cuba/entities/petclinic_Foo";


type Props = FormComponentProps & {
  entityId: string;
};


@observer
class FooEdit extends React.Component<Props> {

  dataInstance = instance<Foo>(Foo.NAME, {view: '_local', loadImmediately: false});
  
  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = ['bar',];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.warn('Validation Error. Please check the data you entered.');
        return;
      }
      this.dataInstance.update(this.props.form.getFieldsValue(this.fields))
        .then(() => {
          message.success('Entity has been updated');
          this.updated = true;
        })
        .catch(() => {
          alert('Error')
        });
    });
  };

  render() {

    if (this.updated) {
      return <Redirect to={FooManagement.PATH}/>
    }

    const {getFieldDecorator} = this.props.form;
    const {status} = this.dataInstance;

    return (
      <Card className='page-layout-narrow'>
        <Form onSubmit={this.handleSubmit}
              layout='vertical'>
          
          <Form.Item label={<Msg entityName={Foo.NAME} propertyName='bar'/>}
                    key='bar'
                    style={{marginBottom: '12px'}}>{
              getFieldDecorator('bar', {})(
                <FormField entityName={Foo.NAME}
                          propertyName='bar'/>
              )}
          </Form.Item>
          
          <Form.Item style={{textAlign: 'center'}}>
            <Link to={FooManagement.PATH}>
              <Button htmlType="button">
                Cancel
              </Button>
            </Link>
            <Button type="primary"
                    htmlType="submit"
                    disabled={status !== "DONE" && status !== "ERROR"}
                    loading={status === "LOADING"}
                    style={{marginLeft: '8px'}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== FooManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new Foo());
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item
      },
      () => {
        this.props.form.setFieldsValue(this.dataInstance.getFieldValues(this.fields));
      }
    )
  }

  componentWillUnmount() {
    this.reactionDisposer();
  }

}

export default Form.create<Props>()(FooEdit);
