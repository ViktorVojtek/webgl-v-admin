import styled from 'styled-components';

export default styled.div`
  border: 1px solid #949494;
  border-radius: 0.25rem;
  float: left;
  padding: 0.5rem 1rem;
  margin-right: .5rem;
  :after {
    color: #747474;
    content: '${({ placeholder }) => placeholder}';
  }
  :hover {
    border: 2px solid #000;
    padding: calc(0.5rem - 1px) calc(1rem - 1px);
  }
`;
