import { Zoom, Tooltip, styled } from "@mui/material";

export const CustomTooltip = styled((props) => (
   <Tooltip {...props} classes={{ popper: props.className }}>
      {props.children}
   </Tooltip>
))({
   "& .MuiTooltip-tooltip": {
      backgroundColor: "black",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
      fontSize: 14,
      fontWeight: 400,
      padding: 10,
      borderRadius: 5,
      maxWidth: 300,
   },
});

export const Tooltips = ({ children, title = "" }) => (
   <CustomTooltip
      title={title}
      disableFocusListener
      enterDelay={200}
      placement="top"
      TransitionComponent={Zoom}
      transitionDuration={500}
      arrow
   >
      {children}
   </CustomTooltip>
);
