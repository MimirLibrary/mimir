import { Component, ErrorInfo, ReactNode } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../../store/slices/userSlice';
import storage from 'redux-persist/lib/storage';
import ErrorType500 from '../ErrorType500';

interface Props {
  children?: ReactNode;
  dispatch: Dispatch;
}

interface IStateError {
  error: boolean;
}

class ErrorBoundary extends Component<Props, IStateError> {
  public override state: IStateError = {
    error: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { error: true };
  }

  private updateLocalStorage() {
    storage.removeItem('persist:root');
    this.props.dispatch(logout());
    localStorage.clear();
    location.reload();
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const userInfo = JSON.parse(localStorage.getItem('persist:root')!).user;
    const userLocation = JSON.parse(userInfo).location;
    if (!Array.isArray(userLocation)) {
      this.updateLocalStorage();
    }
  }

  public override render() {
    if (this.state.error) {
      return <ErrorType500 />;
    }
    return this.props.children;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });

export default connect(null, mapDispatchToProps)(ErrorBoundary);
