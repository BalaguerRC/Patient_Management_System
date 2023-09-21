import { Paper, styled } from "@mui/material";

export const PaperBox = styled(Paper)(({ theme }) => ({
    background: theme.palette.primary.main
  }));