import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorType500 from '../ErrorType500';

interface Props {
  children?: ReactNode;
}

interface IStateError {
  error: boolean;
}

class ErrorBoundary extends Component<Props, IStateError> {
  constructor(props: Props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: true };
  }

  clearErrors = () => {
    this.setState({
      error: false,
    });
  };

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  public override render() {
    if (this.state.error) {
      return <ErrorType500 clearErrors={this.clearErrors} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
