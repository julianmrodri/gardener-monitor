import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderLogoLinkWrapper,
  AppHeaderNews,
  AppHeaderProof,
  AppHeaderRight,
  AppLogo,
  AppWrapper,
} from './components';
import { RequestProps } from './requests/Request';
import { defaultTheme } from './theme/defaultTheme';
import Modal from './utils/Modal';

import { gardenerWebsiteUrl } from './config';
import { CallForm } from './customerCalls/CallForm';
import logo from './images/gardener-logo_horizontal.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';

interface State {
  requests: {
    [key: string]: RequestProps,
  };
  isModalOpen: boolean;
  modalMessage: string;
}

class App extends React.Component<{}, State> {

  state = {
    requests: {} as { [key: string]: RequestProps },
    isModalOpen: false,
    modalMessage: '',
  };

  handleTransactionHashAndUrl = (hash: string, url: string) => {
    const { requests } = this.state;
    const newRequest = {
      hash,
      url,
    };
    this.setState({
      requests: {
        ...requests,
        [newRequest.hash]: newRequest,
      },
    });
  }
  // requests: {} as { [key: string]: RequestProps },
  handleUpdateState = (updatedState: any) => {
    const { requests } = this.state;
    this.setState({
      requests: {
        ...requests,
        [updatedState.id]: updatedState,
      },
    });
  }
  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  }

  handleModal = (modalState: boolean, modalMessage: string) => {
    this.setState({
      isModalOpen: modalState,
      modalMessage,
    });
  }

  render() {
    return (
      !this.state.isModalOpen ?
        <ThemeProvider theme={defaultTheme}>
          <AppWrapper>
            <AppHeader>
              <AppHeaderLeft>
                <AppHeaderNews>NEWS</AppHeaderNews>
                <AppHeaderProof>PROOF</AppHeaderProof>
              </AppHeaderLeft>
              <AppHeaderCenter>
                <AppHeaderLogoLinkWrapper href={gardenerWebsiteUrl} target='_blank' rel='noopener noreferrer'>
                  <AppLogo src={logo} alt='logo' />
                </AppHeaderLogoLinkWrapper>
                <CallForm handleModal={this.handleModal} handleTransactionHashAndUrl={this.handleTransactionHashAndUrl} />
              </AppHeaderCenter>
              <AppHeaderRight>
                <ServerStatus />
              </AppHeaderRight>
            </AppHeader>
            <RequestList requests={this.state.requests} handleUpdateState={this.handleUpdateState} />
          </AppWrapper>
        </ThemeProvider>
        :
        <ThemeProvider theme={defaultTheme}>
          <Modal
            show={this.state.isModalOpen}
            onClose={this.toggleModal}
          >
            {this.state.modalMessage}
          </Modal>
        </ThemeProvider>
    );
  }

}

export default App;
