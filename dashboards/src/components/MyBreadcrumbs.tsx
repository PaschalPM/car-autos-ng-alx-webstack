import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { pathBreadcrumbMapper } from "../libs/breadcrump";
import { Link as RouterLink } from "react-router-dom";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function MyBreadcrumbs() {
  return (
    <Box sx={{ mb: 2 }} role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {pathBreadcrumbMapper().map((mapper, idx, arr) => {
          if (idx === arr.length - 1)
            return (
              <Typography color="text.primary" key={idx}>
                {mapper.title}
              </Typography>
            );
          return (
            <Link
              key={idx}
              underline="hover"
              component={RouterLink}
              color="inherit"
              to={mapper.currentPath}
            >
              {mapper.title}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
