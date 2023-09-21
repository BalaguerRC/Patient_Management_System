import { styled } from "@mui/material/styles";
import { ListItem } from "@mui/material";
import { blue } from "@mui/material/colors";

export const ListItemButtonCustom = styled(ListItem)({
  ":hover": {
    borderRight: 5,
    borderColor: blue[700],
    borderRadius: 0.8,
  },
});
