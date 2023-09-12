import { styled } from "@mui/material/styles";
import { ListItem } from "@mui/material";

export const ListItemButtonCustom = styled(ListItem)({
  "&:hover": {
    borderRight: 5,
    borderColor: "#B8022E",
  },
});
