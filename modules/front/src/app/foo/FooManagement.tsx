import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import FooEdit from "./FooEdit";
import {FooList} from "./FooList";

type Props = RouteComponentProps<{entityId?: string}>;

@observer
export class FooManagement extends React.Component<Props> {

  static PATH = '/fooManagement';
  static NEW_SUBPATH = 'new';

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId
          ? <FooEdit entityId={entityId}/>
          : <FooList/>}
      </>
    )
  }
}