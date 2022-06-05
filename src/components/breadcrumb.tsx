/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { BreadcrumbProps } from "types";

const BreadcrumbStyled = styled.div({
  display: "flex",
  flexDirection: "row",
  paddingTop: "10px",
});

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }: BreadcrumbProps) => {
  return (
    <BreadcrumbStyled>
      {items.map((it, id) => {
        const _length = items.length - 1;
        return (
          <div
            css={css`
              display: flex;
              flex-direction: row;
              font-weight: bold;
              font-size: 16px;
            `}
          >
            <Link
              to={it.href}
              css={{ paddingRight: 3, textDecoration: "none", color: "#000" }}
            >
              {it.label}
            </Link>
            {id < _length && (
              <span
                css={css`
                  padding-left: 4px;
                  padding-right: 4px;
                `}
              >
                {"/"}
              </span>
            )}
          </div>
        );
      })}
    </BreadcrumbStyled>
  );
};

export default Breadcrumb;
