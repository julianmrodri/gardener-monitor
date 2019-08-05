import React, { PureComponent } from 'react';
import * as web3Contract from 'web3-eth-contract';

import oracleAbi from '../abi/oracle.abi';
import convertUnixToDate from '../utils/convertUnixToDate';
import web3 from '../utils/createAndUnlockWeb3';
import {
  RequestTable,
  RequestTableBody,
  RequestTableHead,
  RequestTableHeadCell,
  RequestTableHeadRow,
  RequestTableWrapper,
} from './components';
import { Labels } from './namespace';
import Request, { RequestProps } from './Request';

interface State {
  requests: {
    [key: string]: RequestProps,
  };
}

interface Props {
  requests: {
    [key: string]: RequestProps,
  };
  handleUpdateState: any;
}
class RequestList extends PureComponent<Props, State> {
  state = {
    requests: {} as { [key: string]: RequestProps },
  };

  get tableHeaders(): JSX.Element[] {
    return Object.values(Labels).map((label) => (
      <RequestTableHeadCell key={label}>{label}</RequestTableHeadCell>
    ));
  }

  constructor(props: Props) {
    super(props);

    const handleUpdateState = (updatedState: object): any => {
      this.props.handleUpdateState(updatedState);
    };

    const oracleContract = new web3.eth.Contract(
      oracleAbi,
      process.env.REACT_APP_ORACLE_ADDRESS,
    );

    oracleContract.events.allEvents()
      .on('data', (event: web3Contract.EventData) => {
        if (['DataRequested', 'DelayedDataRequested'].includes(event.event)) {
          const { requests } = this.props;
          if (Object.entries(requests).length === 0 && requests.constructor === Object) {
            return;
          }
          const { id, validFrom } = event.returnValues;
          const { transactionHash } = event;
          delete Object.assign(requests, { [id]: requests[transactionHash] })[transactionHash];
          const updatedRequest = {
            ...requests[id],
            id,
            validFrom: validFrom ? convertUnixToDate(validFrom) : new Date(),
          };
          handleUpdateState(updatedRequest);
        }

        if (event.event === 'RequestFulfilled') {
          const { requests } = this.props;
          if (Object.entries(requests).length === 0 && requests.constructor === Object) {
            return;
          }
          const { id, value, errorCode } = event.returnValues;
          if (!requests[id]) {
            return;
          }
          const updatedRequest = { ...requests[id], value, errorCode };
          handleUpdateState(updatedRequest);
        }
      })
      .on('error', console.error);
  }

  render() {
    const { requests } = this.props;
    return (
      <RequestTableWrapper>
        <RequestTable>
          <RequestTableHead>
            <RequestTableHeadRow>
              {this.tableHeaders}
            </RequestTableHeadRow>
          </RequestTableHead>
          <RequestTableBody>
            {
              Object.values(requests).map((request, index) => (
                <Request labels={this.tableHeaders} isOdd={Boolean(index % 2)} key={index} {...request} />
              ))
            }
          </RequestTableBody>
        </RequestTable>
      </RequestTableWrapper>
    );
  }
}

export default RequestList;
