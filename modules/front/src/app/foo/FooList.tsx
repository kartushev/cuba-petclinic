import * as React from "react";
import {observable} from 'mobx';
import {observer} from "mobx-react";
import {
  Modal, Button,
} from "antd";
import {Foo} from "../../cuba/entities/petclinic_Foo";
import {Link} from "react-router-dom";
import {
  collection,
  DataTable, injectMainStore, MainStoreInjected,
} from "@cuba-platform/react";
import {SerializedEntity} from "@cuba-platform/rest";
import {FooManagement} from "./FooManagement";

@injectMainStore
@observer
export class FooList extends React.Component<MainStoreInjected> {

  dataCollection = collection<Foo>(Foo.NAME, {view: '_local', sort: '-updateTs'});
  fields = ['bar',];

  @observable selectedRowId: string | undefined;

  showDeletionDialog = (e: SerializedEntity<Foo>) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${e._instanceName}?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        this.selectedRowId = undefined;
        return this.dataCollection.delete(e);
      }
    });
  };

  render() {
    const buttons = (
      [
        (<Link to={FooManagement.PATH + '/' + FooManagement.NEW_SUBPATH} key='create'>
          <Button htmlType='button'
                  style={{margin: '0 12px 12px 0'}}
                  type='primary'
                  icon="plus">
            Create
          </Button>
        </Link>),
        (<Link to={FooManagement.PATH + '/' + this.selectedRowId} key='edit'>
          <Button htmlType='button'
                  style={{margin: '0 12px 12px 0'}}
                  disabled={!this.selectedRowId}
                  type='default'>
            Edit
          </Button>
        </Link>),
        (<Button htmlType='button'
                 style={{margin: '0 12px 12px 0'}}
                 disabled={!this.selectedRowId}
                 onClick={this.deleteSelectedRow}
                 key='remove'
                 type='default'>
          Remove
        </Button>),
      ]
    );

    return (
      <DataTable dataCollection={this.dataCollection}
                 fields={this.fields}
                 onRowSelectionChange={this.handleRowSelectionChange}
                 hideSelectionColumn={true}
                 buttons={buttons}
      />
    );
  }

  getRecordById(id: string): SerializedEntity<Foo> {
    const record: SerializedEntity<Foo> | undefined =
      this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error('Cannot find entity with id ' + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowId = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowId!));
  };

}
