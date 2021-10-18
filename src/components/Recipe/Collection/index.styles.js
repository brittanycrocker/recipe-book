import styled from "styled-components";
import { blue } from "@ant-design/colors";

export const Styles = styled.div`
  table {
    border-spacing: 0;
    border-radius: 0.5px;
    width: 100%;
    table-layout: auto;
  }

  th {
    background-color: ${blue[9]};
    color: white;
    padding: 8px;
    padding: 15px;
    font-size: 15px;
  }
  td {
    border: 1px solid ${blue[6]};
    white-space: nowrap;
    vertical-align: middle;
    padding: 12px;
    // font-weight: 600;
    :hover {
      cursor: pointer;
    }
  }
`;

export const StyledTr = styled.tr`
  white-space: nowrap;
  background: white;
  :hover {
    background-color: RGBA(0, 58, 140, 0.5);
  }
  :nth-child(even) {
    background: RGBA(0, 58, 140, 0.7);
    color: white;
    :hover {
      background-color: RGBA(0, 58, 140, 0.5);
    }
  }
`;
