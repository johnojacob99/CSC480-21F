import { makeStyles } from '@mui/styles';
import { primaryColor, darkColor, whiteColor } from "./Style";
const ButtonStyle = makeStyles((theme) => ({
  root: {
    minHeight: "auto",
    minWidth: "auto",
    borderRadius: "50px",
    textTransform: "unset",
    fontWeight: "600",
    padding: "5px 20px",
    height: "42px",
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fullwidth: {
    width: "100%"
  },
  type1: {
    backgroundColor: darkColor,
    color: whiteColor,
    border: "1px solid #000000",
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#222" }
  },
  type2: {
    backgroundColor: "transparent",
    color: darkColor,
    border: "1px solid #000000"
  },
  type3: {
    backgroundColor: primaryColor,
    color: darkColor,
  },
  type4: {
    backgroundColor: "transparent",
    color: darkColor,
    borderRadius: "0",
    borderBottom: "1px solid #aaa",
    padding: "0 100x",
    marginBotom: "50px"
  }
}));

export default ButtonStyle;