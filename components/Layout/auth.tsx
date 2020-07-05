import React, { ReactNode } from 'react';
import Container from '@material-ui/core/Container';

interface ILayout {
  children?: ReactNode;
}

export default ({ children }: ILayout) => (
  <Container fixed maxWidth="sm">
    {children}
  </Container>
);
