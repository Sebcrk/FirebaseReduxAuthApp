
import LoadingButton from "@mui/lab/LoadingButton";

function LoadingButtonComp(props) {
    console.log(props);
  return (
    <LoadingButton
    type="submit"
    loading={props.loading}
    fullWidth
    variant={props.variant}
    sx={{
      mt: 3,
      mb: 2,
      bgcolor: props.color,
      "&:hover" : {bgcolor: "warning.dark"},
    }}
  >
    {props.children}
  </LoadingButton>
  )
}

export default LoadingButtonComp